const PlaceInter = require('../Models/Interships_Placements');
const fs = require('fs');



const PlacementIntershipsAdd = async (req,res) =>{
    try {

        const {name, companyName} = req.fields;
        const {image} = req.files;
        
        if (!name) {
            return res.status(401).send("Name is required");
        } else if (!companyName) {
            return res.status(401).send("Company name is required");
        } else if (image && image.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        }

        const placeInter = await new PlaceInter(req.fields);
        if (image) {
            placeInter.image.data = fs.readFileSync(image.path),
            placeInter.image.contentType = image.type,
            placeInter.image.Name = image.name
        }

        await placeInter.save();

        return res.status(201).send({
            Success: true,
            message: "Data Upload",
            data: placeInter
        })    

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const PlacementIntershipsDisplay = async (req,res) =>{
    try {
        const data = await PlaceInter.find().select("-image");

        if(!data){
            return res.status(400).send("Data not found")
        }

        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


const PlacementIntershipsSingle = async (req,res) =>{
    try {
        const { _id } = req.params;
        const data = await PlaceInter.findById({_id}).select("-image");
        if(data){
            return res.status(200).send(data);
        }else{
            return res.status(400).send("Data Not Found")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const PlacementIntershipsImageDisplay = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await PlaceInter.findById({ _id }).select("image");

        if (data) {
            res.set("Content-type", data.image.contentType);
            return res.status(201).send(data.image.data);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error
        })
    }
}

const PlacementIntershipsDelete =  async (req,res) =>{
    try {
        const {_id} = req.params;
        const PlaceInter_Search = await PlaceInter.findById({ _id });

        if (PlaceInter_Search) {
            await PlaceInter.findByIdAndDelete({ _id });
            return res.status(200).send(PlaceInter_Search.name + " Delete");
        } else {
            return res.status(401).send("User not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


const PlacementIntershipsUpdate = async (req, res) => {
    try {

        const { _id } = req.params;
        const {name, companyName} = req.fields;
        const {image} = req.files;

        console.log(name , companyName, _id);
        const Search_PlInt = await PlaceInter.findById({ _id });

        if(Search_PlInt){
            if (!name) {
                return res.status(401).send("Name is required");
            } else if (!companyName) {
                return res.status(401).send("Position is required");
            } else if (image && image.size > 1000000) {
                return res.status(401).send("Image is required and should be less 1mb");
            }
            

            const PlaceIntership = await PlaceInter.findByIdAndUpdate(
                { _id },
                { ...req.fields },
                { new: true }
            );

            if (image) {
                PlaceIntership.image.data = fs.readFileSync(image.path),
                PlaceIntership.image.contentType = image.type,
                PlaceIntership.image.Name = image.name
            }

            await PlaceIntership.save();
            return res.status(201).send({
                Success: true,
                message: "Data Upload",
                data: PlaceIntership
            })
        }
        
    } catch (error) {

        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


module.exports = {
    PlacementIntershipsAdd,
    PlacementIntershipsSingle,
    PlacementIntershipsDisplay,
    PlacementIntershipsDelete,
    PlacementIntershipsUpdate,
    PlacementIntershipsImageDisplay

}