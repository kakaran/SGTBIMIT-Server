const EResources = require('../models/E-Resources');

const EResourcesAdd = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            url: req.body.url
        }
        await new EResources(data).save();
        res.status(201).json(data);
    } catch (err) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
};

const EResourcesDisplay = async (req, res) => {
    try {
        const getData = await EResources.find();
        res.json(getData);
    } catch (err) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
};

const EResourcesSingle = async (req, res) => {
    try {
        const _id = req.body._id;
        const data = await EResources.findById({ _id });
        if (!data) {
            return await res.status(400).send("Data Not found")
        } else {
            return await res.status(200).send(data);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
};


const EResourcesUpdate = async (req, res) => {
    try {

        const Search_Data = await EResources.findById({ _id: req.params._id });

        if (Search_Data) {
            console.log(req.body);
            const data = {
                name: req.body.name,
                url: req.body.url
            }
            console.log(data);
            await EResources.updateMany({ _id: req.params._id}, data);
            return res.send("Data Successfully Update")
        } else {
            return res.status(400).send("Data Not Found");
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const EResourcesDelete = async (req, res) => {
  try {
    const Data = await EResources.findById(req.params.id);
    if (!Data) {
      return res.status(404).json({ message: 'Website not found' });
    }
        await EResources.findByIdAndDelete(req.params.id);
        return res.status(200).send("Delete");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    EResourcesAdd,
    EResourcesDisplay,
    EResourcesSingle,
    EResourcesUpdate,
    EResourcesDelete
}
