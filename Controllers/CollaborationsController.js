const Collaborations = require('../Models/Collaborations');
const fs = require('fs');


const CollaborationsAdd = async (req, res) => {
    try {
        const { name } = req.fields
        const { image } = req.files;

        if (!name) {
            return res.status(401).send("Name is required")
        }

        const Collaborations_Data = await new Collaborations(req.fields);

        if (image) {
            Collaborations_Data.image.data = fs.readFileSync(image.path);
            Collaborations_Data.image.contentType = image.type;
            Collaborations_Data.image.Name = image.name;
        }

        await Collaborations_Data.save()
        return res.send("Data Upload Successfully");
    } catch (error) {
        console.log(error);
    }
}


const CollaborationsDisplay = async (req, res) => {
    try {
        const Data = await Collaborations.find().select("-image");

        if (Data) {
            return res.status(200).send(Data);
        }
    } catch (error) {
        console.log(error);
    }
}


const CollaborationsImageDisplay = async (req, res) => {
    try {
        const {_id} = req.params;

        const data = await Collaborations.findById({_id}).select("image");
        if(data){
            res.set("Content-type", data.image.contentType);
            return res.status(200).send(data.image.data);
        }else{
            return res.status(404).send("Data not found")
        }
    } catch (error) {
        console.log(error);
    }
}

const CollaborationsDelete = async (req,res) =>{
    try {
        const {_id} = req.params;

        const Search_Data = await Collaborations.findById({_id}).select("-image");
        if(Search_Data){
            await Collaborations.findByIdAndDelete({_id});
            return res.status(200).send("Deleted");
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = { 
    CollaborationsAdd,
    CollaborationsDelete,
    CollaborationsImageDisplay,
    CollaborationsDisplay };
