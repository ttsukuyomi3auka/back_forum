const RoleModel = require('../models/role')
const UserModel = require('../models/user')


async function createRole(req, res) {
    try {
        const { value } = req.body;
        const findedRole = await RoleModel.findOne({ value })
        if (findedRole) { return res.status(401).send("Role already exist") }

        const doc = new RoleModel({ value: value })
        await doc.save()
        return res.send("Role created")

    } catch (error) {
        return res.status(500).send("Iternal server error")
    }
}

async function addRole(req, res) {
    try {
        const { username, role } = req.body
        const findedUser = await UserModel.findOne({ username })
        if (!findedUser) {
            return res.status(400).send("User not found")
        }
        const findedRole = await RoleModel.findOne({ value: role })
        if (!findedRole) {
            return res.status(400).send("Role not found")
        }
        if (findedUser.roles.includes(findedRole.value)) {
            return res.status(400).send("User already has this role");
        }

        findedUser.roles.push(findedRole.value)
        await findedUser.save()
        res.send("Role added")
    } catch (error) {
        console.log(error)
        res.status(500).send("Iternal server error")
    }

}


module.exports = {
    createRole,
    addRole,
}