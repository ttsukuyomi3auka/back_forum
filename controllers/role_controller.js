const RoleModel = require('../models/role')



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


module.exports = {
    createRole
}