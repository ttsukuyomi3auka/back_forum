const UserModel = require('../models/user');
const { Roles } = require('../models/enum');


async function setRoleToUser(req, res) {
    try {
        const { username, role } = req.body;

        if (!Object.values(Roles).includes(role)) {
            return res.status(400).send("Invalid role");
        }

        const findedUser = await UserModel.findOne({ username });
        if (!findedUser) {
            return res.status(400).send("User not found");
        }

        findedUser.role = role;
        await findedUser.save();
        res.send("Role updated");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    setRoleToUser
};