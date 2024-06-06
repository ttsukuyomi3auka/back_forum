const AreaModel = require('../models/area')


async function createArea(req, res) {
    try {
        const { title } = req.body;

        const findedArea = await AreaModel.findOne({ title: title })
        if (findedArea) throw "Already exist"

        const doc = new AreaModel({
            title: title
        })
        await doc.save()
        return res.send("Added")

    } catch (error) {
        console.log(error)
        return res.send(error)
    }

}

async function getAllAreas(req, res) {
    try {
        const areas = await AreaModel.find();
        res.status(200).json(areas);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}



module.exports = {
    createArea,
    getAllAreas,

}
