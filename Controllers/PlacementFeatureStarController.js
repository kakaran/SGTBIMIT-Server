const PlacementFeature = require('../Models/PlacementFeatureStar');
const fs = require('fs');

const PlacementFeatureAdd = async (req, res) => {
    try {
        const { Name, Course } = req.fields;
        const { image, CompanyImage } = req.files;

        if (!Name) {
            return res.status(201).send({ message: "Name is required" });
        } else if (!Course) {
            return res.status(201).send({ message: "Course is required" });
        } else if (image && image.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        } else if (CompanyImage && CompanyImage.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        }

        const PlacementFea_Data = await new PlacementFeature(req.fields);

        if (image) {
            PlacementFea_Data.image.data = fs.readFileSync(image.path),
                PlacementFea_Data.image.contentType = image.type,
                PlacementFea_Data.image.Name = image.name
        }

        if (CompanyImage) {
            PlacementFea_Data.CompanyImage.data = fs.readFileSync(CompanyImage.path),
                PlacementFea_Data.CompanyImage.contentType = CompanyImage.type,
                PlacementFea_Data.CompanyImage.Name = CompanyImage.name
        }

        await PlacementFea_Data.save();
        return res.status(200).send({
            message: "Data is Created",
            status: true,
            data :PlacementFea_Data
        })
    } catch (error) {
        console.log(error);
    }
}

const PlacemetFeatureDisplay = async (req,res) =>{
    try {
        const AllData = await PlacementFeature.find({}).select(" Name Course ");

        if(AllData){
            return res.status(200).send(AllData);
        }else {
            return res.status(400).send("Data not Found");
        }
    } catch (error) {
        console.log(error);
    }
}

const PlacementfeatureImageDisplay = async (req,res) =>{
    try {
        const {_id} = req.params;

        const data_find =  await PlacementFeature.findById({_id})

        if(data_find){
            res.set("Content-type", data_find.image.contentType);
            return res.status(200).send(data_find.image.data);
        }else {
            return res.send("Data not found")
        }
    } catch (error) {
        console.log(error);
    }
}

const PlacementFeatureCompanyImDaisplay = async (req,res) =>{
    try {
        const {_id} = req.params;

        const data_find = await PlacementFeature.findById({_id});

        if(data_find){
            res.set("Content-type", data_find.CompanyImage.contentType);
            return res.status(200).send(data_find.CompanyImage.data);
        }else{
            return res.send("Data not found")
        }
    } catch (error) {
        console.log(error);
    }
}

const PlacementFeatureDelete = async (req,res) =>{
    try {
        const {_id} = req.params;

        const data_find = await PlacementFeature.findById({_id});

        if(data_find){
            await PlacementFeature.findByIdAndDelete({_id});
            return res.status(200).send("data Deleted")
        }else{
            return res.send("Data not found")
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    PlacementFeatureAdd,
    PlacemetFeatureDisplay,
    PlacementfeatureImageDisplay,
    PlacementFeatureCompanyImDaisplay,
    PlacementFeatureDelete
}