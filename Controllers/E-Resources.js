const EResources = require('../models/E-Resources');

const EResourcesAdd = async (req, res) => {
    try {

        const {name,url} = req.body;
        if (!name || !url) {
            return res.status(500).send({success: false,message: 'field are required'});
        }

        const data = await new EResources({
            name,
            url
        }).save();
       
         return res.status(201).send(data);

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
        const getData = await EResources.find({});
        res.json(getData);
    } catch (err) {
        // console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
};

const EResourcesSingle = async (req, res) => {
    try {
        const _id = req.params._id;
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

        if (!Search_Data) {
            return await res.status(400).send("Data Not found")
        }

        const data = {
            name: req.body.name,
            url: req.body.url
        }
          const updateData = await EResources.findByIdAndUpdate({ _id: req.params._id }, { $set: data }, { new: true });
          return res.send(`Data Successfully Update ${updateData}`);
       
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
