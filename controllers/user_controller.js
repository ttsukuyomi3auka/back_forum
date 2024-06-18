const UserModel = require('../models/user')
const AreaModel = require('../models/area')

async function getUserById(req, res) {
    try {
        const userId = req.params.id
        const findedUser = await UserModel.findById(userId)
            .populate('areas', 'title')
        if (!findedUser) {
            return res.status(404).send("User not found")
        }
        return res.status(200).send(findedUser);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Iternal server error")
    }

}


async function addAreasToUser(req, res) {
    try {
        const userId = req.params.id;
        const areaIds = req.body.areas;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const areas = await AreaModel.find({ _id: { $in: areaIds } });
        if (areas.length !== areaIds.length) {
            return res.status(404).send("One or more areas not found");
        }
        user.areas = areaIds;

        await user.save();

        return res.status(201).send(user)
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}

async function updateUser(req, res) {
    try {
        const { username, name, surname, aboutMe } = req.body;
        const userId = req.params.id;

        const findedUser = await UserModel.findById(userId)
            .populate('areas', 'title')
        if (!findedUser) {
            return res.status(404).send("User not found")
        }
        if (username) {
            const existingUser = await UserModel.findOne({ username });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(403).send("Username already taken");
            }
        }

        findedUser.name = username
        findedUser.name = name || findedUser.name;
        findedUser.surname = surname || findedUser.surname;
        findedUser.aboutMe = aboutMe;
        await findedUser.save();

        return res.status(201).send("User updated successfully")

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error")
    }

}


module.exports = {
    getUserById,
    addAreasToUser,
    updateUser,
}