const Collaborations = require('../Models/Collaborations');
const fs = require('fs');


const CollaborationsAdd = async (req,res) =>{
    try {
        const {name} = req.fields
        const {image} = req.files;

        if(!name){
            return res.status(401).send("Name is required")
        }

        const Collaborations_Data = await new Collaborations(req.fields);

        if(image){
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


module.exports = {CollaborationsAdd};
