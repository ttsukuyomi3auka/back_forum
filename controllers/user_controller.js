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

        const existingAreas = user.areas.map(area => area.toString());
        const newAreas = areas.filter(area => !existingAreas.includes(area._id.toString()));

        if (newAreas.length === 0) {
            return res.status(200).send("No new areas to add");
        }

        user.areas.push(...newAreas.map(area => area._id));
        await user.save();

        return res.status(201).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}



module.exports = {
    getUserById,
    addAreasToUser,
}