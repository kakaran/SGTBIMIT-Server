const IndustrialModel = require('../Models/IndustrialVisits')
const fs = require('fs');

//add
const IndustrialVisitsAdd = async(req,res) => {
    
    try {

        const {name, about} = req.fields;
        const {image, companyImage} = req.files;

        if (!name || !about){
            return res.status(201).send({ message: "All fields are required" });
        }
        if (!image || !companyImage){
            return res.status(201).send({ message: "Image field can not be blank" });
        }
        if (image && image.size > 1000000 || companyImage && companyImage.size > 1000000){
            return res.status(201).send({ message: "Image field can not be blank or should be less 1mb" });
        }

        const indusvisit = await new IndustrialModel(req.fields);

        if(image){
            indusvisit.image.data = fs.readFileSync(image.path),
            indusvisit.image.contentType = image.type
        }

        if(companyImage){
            indusvisit.image.data = fs.readFileSync(companyImage.path),
            indusvisit.image.contentType = companyImage.type
        }

          const indus = await indusvisit.save()
          
          return res.status(200).send({
            message : "Created successfully",
            data : indus
          });
          
    } catch (error) {
        console.log(error);
       
    }
}

//display
const IndustrialVisitsDisplay = async(req,res) => {

    try {

        const indusvisit = await IndustrialModel.find({}).select("-image");

        if (!indusvisit) {
            return res.status(201).send("No data found");
        }

           return res.status(200).send(indusvisit);
        
    } catch (error) {
        
    }
}


//image display
const IndustrialVisitsImageDisplay = async(req,res) => {

    try {

        const { _id } = req.params;

        const indusvisit = await IndustrialModel.findById({_id});

        if (indusvisit) {
            res.set("Content-type", indusvisit.image.contentType);
            res.set("Content-type", indusvisit.companyImage.contentType);
            return res.status(200).send(indusvisit.image.data,indusvisit.companyImage.data);
        }

        return res.status(201).send("No data found");
        
    } catch (error) {
        console.log(error);
    }
}


//Company image display
// const IndustrialVisitsCompanyImDaisplay = async(req,res) => {

//     try {
//         const { _id } = req.params;

//         const indusvisit = await IndustrialModel.findById({_id});

//         if (indusvisit) {
//             res.set("Content-type", indusvisit.image.contentType)
//             return res.status(200).send(indusvisit.image.data);
//         }

//         return res.status(201).send("No data found");
        
//     } catch (error) {
//         console.log(error);        
//     }
// }

const IndustrialVisitsDelete = async(req,res) => {

    try {

        const indusDelete = await IndustrialModel.findById(req.params._id);


        if (!indusDelete) {
            return res.status(201).send("No data found");
        }

        const finalDelete = await IndustrialModel.findByIdAndDelete(indusDelete);        
        return res.status(201).send(`${finalDelete.name} is deleted successfully`);
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = {IndustrialVisitsAdd, IndustrialVisitsDisplay, IndustrialVisitsDelete,
        IndustrialVisitsImageDisplay }