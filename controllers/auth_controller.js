const UserModel = require('../models/user')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, ACCESS_LIFE, REFRESH_LIFE } = process.env


function createTokens(user) {
    var access = jwt.sign({
        id: user._id,
        role: user.role
    }, PRIVATE_KEY, {
        expiresIn: ACCESS_LIFE
    })
    var refresh = jwt.sign({
        id: user._id,
        role: user.role
    }, PRIVATE_KEY, {
        expiresIn: REFRESH_LIFE
    })
    return { access, refresh }
}

async function login(req, res) {
    try {
        const { username, password } = req.body

        const findedUser = await UserModel.findOne({ username });
        if (!findedUser)
            throw 'Incorrect login'

        const isValidPass = crypto.HmacSHA256(password, PRIVATE_KEY).toString() === findedUser.password;
        if (!isValidPass)
            throw 'Invalid password';

        const tokens = createTokens(findedUser)
        return res.status(200).send(tokens)

    } catch (error) {
        console.log(error)
        return res.status(401).send(error)
    }


}

async function registration(req, res) {
    try {
        const { username, password, name, surname } = req.body
        const hashPass = crypto.HmacSHA256(password, PRIVATE_KEY)

        const findedUser = await UserModel.findOne({ username })
        if (findedUser) { return res.status(401).send("User already exist") }

        const doc = new UserModel({
            username: username,
            password: hashPass,
            name: name,
            surname: surname,
        }
        )
        await doc.save()
        return res.status(201).send("User created")
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Iternal server error")
    }

}

async function refresh(req, res) {
    try {
        const refresh = req.body.refresh

        const verified = jwt.verify(refresh, PRIVATE_KEY)
        if (!verified) throw "Invalid token"

        const findedUser = UserModel.findById(verified.id)
        if (!findedUser) throw "Invalid token data"

        const token = createTokens(findedUser)
        return res.send(token)

    } catch (error) {
        console.log(error)
        return res.status(403).send("Unathorizired")
    }
}

module.exports = {
    login,
    registration,
    refresh,
}