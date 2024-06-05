const UserModel = require('../models/user')

const { Roles } = require("../models/enum")


async function addRoleToUser(req, res) {
    try {
        const { username, role } = req.body

        if (!Object.values(Roles).includes(role)) {
            return res.status(400).send("Invalid role");
        }

        const findedUser = await UserModel.findOne({ username })
        if (!findedUser) {
            return res.status(400).send("User not found")
        }
        if (findedUser.roles.includes(role)) {
            return res.status(400).send("User already has this role");
        }
        findedUser.roles.push(role)
        await findedUser.save()
        res.send("Role added")
    } catch (error) {
        console.log(error)
        res.status(500).send("Iternal server error")
    }

}

async function removeUserRole(req, res) {
    try {
        const { username, role } = req.body

        if (!Object.values(Roles).includes(role)) {
            return res.status(400).send("Invalid role");
        }

        const findedUser = await UserModel.findOne({ username })
        if (!findedUser) {
            return res.status(400).send("User not found")
        }


        if (!findedUser.roles.includes(role)) {
            return res.status(400).send("User does not have this role");
        }

        findedUser.roles = findedUser.roles.filter(userRole => userRole !== role);
        await findedUser.save()
        res.send("Role deleted")

    } catch (error) {
        console.log(error)
        res.status(500).send("Iternal server error")
    }

}


module.exports = {
    addRoleToUser,
    removeUserRole
}