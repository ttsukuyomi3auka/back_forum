const UserModel = require('../models/user')

async function getUserById(req, res) {
    try {
        const userId = req.params.id
        const findedUser = await UserModel.findById(userId)
        if (!findedUser) {
            return res.status(404).send("User not found")
        }
        return res.status(200).send(findedUser);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Iternal server error")
    }

}

module.exports = {
    getUserById,
}