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
async function getAreaById(req, res) {
    try {
        const area = await AreaModel.findById(req.params.id);
        if (!area) {
            return res.status(404).send("Area not found")
        }
        res.status(200).json(area);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}


module.exports = {
    createArea,
    getAllAreas,
    getAreaById,

}
