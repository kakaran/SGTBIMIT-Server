const researchAnddevlpmtModel = require("../Models/Research&Development");
const fs = require("fs");

const AddResearch_Development = async(req,res) => {

    try {
        
        const {Date, Detail, category, index} = req.fields;
        const {image,images} = req.files;

        if(!Date || !Detail || !category || !index){
            return res.status(401).send("All Details are Required");
        }
        else if(index < 0){
            return res.status(401).send("index cannot be negative");            
        }
        else  if (!image || !images) {
            return res.status(201).send({ message: "Image field can not be blank" });
        }
        else if (image && image.size > 1000000 || images && images.size > 1000000) {
            return res.status(201).send({ message: "Image field can not be blank or should be less 1mb" });
        }

        const resanddev = await new researchAnddevlpmtModel(req.fields);

        if (image) {
            resanddev.image.data = fs.readFileSync(image.path);
            resanddev.contentType = image.type;
        }
        if(images.length)
        {
            for (let i = 0; i < images.length; i++) {
                resanddev.images.push({
                    data : fs.readFileSync(images[i].path),
                    contentType :  images[i].type,
                });
            }
        }else {
            resanddev.images.push({
                data : fs.readFileSync(images.path),
                contentType :  images.type,
            });
        }


        const final = await resanddev.save();

        return res.status(20).send({ message: "R and D created successfully",final});



    } catch (error) {
        console.log(error);
    }

}


const Research_DevelopmentImageDisplay = async(req,res) => {

    try {

        const res_dev = await researchAnddevlpmtModel.find().select("image");

        if (!res_dev) {
            return res.status(401).send({ message: "data can not be found" });            
        }

        res.set("content-type", res_dev.image.contentType);
        return res.status(200).send(res_dev.image.contentType);            

        
    } catch (error) {
        console.log(error);        
    }

}


const Research_DevelopmentImagesDisplay = async(req,res) => {

    try {

        const res_dev = await researchAnddevlpmtModel.find(req.params).select("images");

        if (!res_dev) {
            return res.status(401).send({ message: "data can not be found" });            
        }

        if(res_dev.length)
        {
            for (let i = 0; i < res_dev.length; i++) {
                res.set("content-type", res_dev.image[i].contentType);                
            }
        }
        return res.status(200).send(res_dev.image[i].contentType);            

        
    } catch (error) {
        console.log(error);        
    }

}


const SingleResearch_Development = async(req,res) => {}
const Research_DevelopmentDelete = async(req,res) => {}
const Research_DevelopmentUpdate = async(req,res) => {}


module.exports = {
    AddResearch_Development,
    SingleResearch_Development,
    Research_DevelopmentImageDisplay,
    Research_DevelopmentImagesDisplay,
    Research_DevelopmentDelete,
    Research_DevelopmentUpdate
}