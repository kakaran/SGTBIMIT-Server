const eventModel = require("../Models/EventGallery");
const fs = require('fs');


//event image add
const eventAddImage = async(req,res) => {

    try {
        const {category} = req.fields;
        const {image,images} = req.files;

        if (!image || !images || image.size > 1000000 || images.size > 1000000) {
            return res.status(401).send(`image is req or image size should be less then 1MB`);
        }else if (!category) {
            return res.status(401).send(`category must be defined`);            
        }

        const already = await eventModel.findOne({category})

        if (already) {
            return res.status(400).send(`This kind of Category is already exists`)
        }



        const event = await new eventModel(req.fields);

        if (image) {
            event.image.data = fs.readFileSync(image.path),
            event.image.contentType = image.type            

            if (images.length) {
                for (let i = 0; i < images.length; i++) {
                    event.images.push({
                        data: fs.readFileSync(images[i].path),
                        contentType: images[i].type,
                    })
                }
            }else {
                event.images.push({
                    data: fs.readFileSync(images.path),
                    contentType: images.type,
                })
            }
        }

        const final = await event.save();

        return res.status(200).send({
            message : `Image uploaded successfully`,
            final
        });
    
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


//alumini image display 
const eventDisplayImage = async(req,res) => {
    try {
        
        const image_display = await eventModel.find().select('-images');
        return res.status(201).send(image_display);


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}



//alumini image update
const eventUpdateImage = async(req,res) => {

    try {
        const {image} = req.files;
        const id = req.params._id

        if (!image || image.size > 1000000) {
            return res.status(401).send(`image is req or image size should be less then 1MB`);
        }


        const alumini = await eventModel.findById(id);

        if (alumini) {
            const alumini_g  = await eventModel.findByIdAndUpdate(alumini, {...req.fields }, { new: true });
            alumini_g.image.data = fs.readFileSync(image.path)
            alumini_g.image.contentType = image.type   

        }

        return res.status(200).send({message : `Image Updated successfully`});
    
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


//one alumini delete with carousel images
const eventDelete = async(req,res) => {
    try {
        
        const id = req.params.id;

        const alumini_delete = await eventModel.findById(id);

        if (!alumini_delete) {
            return res.status(400).send(`No category found`); 
        }

        const final = await eventModel.findByIdAndDelete(alumini_delete);
     

        return res.status(200).send(`alumini deleted successfully `)

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}





//-----------alumini images carousel----------------

//alumini images carousel display 
const eventDisplayImages = async(req,res) => {
    try {
        
        
        const {id,Index}  = req.params;
        console.log(req.params);
        
        const data = await eventModel.findById({id}).select("images");

        if (data) {
            res.set("Content-type", data.images[Number(Index)].contentType);
            return res.send(data.images[Number(Index)].data);
        } else {
            return res.status(400).send("No result found")
        }
               

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}



//alumini images i.e carousel update
const eventUpdateImages = async(req,res) => {

    try {
        const {images} = req.files;
        const id = req.params.id

        if (!images || images.size > 1000000) {
            return res.status(401).send(`image is req or image size should be less then 1MB`);
        }

        const alumini = await eventModel.findById(id);

        if (alumini) {
            const alumini_g  = await eventModel.findByIdAndUpdate(alumini, {...req.fields }, { new: true });

            if (images.length) {
                for (let i = 0; i < images.length; i++) {
                    alumini_g.images.push({
                        data: fs.readFileSync(images[i].path),
                        contentType: images[i].type,
                    })
                }
            }else {
                alumini_g.images.push({
                    data: fs.readFileSync(images.path),
                    contentType: images.type,
                })
            }
            return res.status(200).send({message : `Images Updated successfully`});
             
        }

            
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}



//alumini images carousel delete
const eventImagesDelete = async(req,res) => {
    try {
        const { _id, Index } = req.params;
        console.log(req.params);
        const alumini_delete = await eventModel.findById({ _id }).select("images");

        if (alumini_delete) {
            const imgeId = alumini_delete.images[Index]._id;
            const data1 = await eventModel.updateOne({ _id: { $eq: _id } }, {
                $pull: {
                    images: { _id: imgeId }
                }
            })
            console.log(data1);
            return res.status(200).send("Deleted")
        } else {
            return res.status(404).send("Data Not Found")
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Please check the detail",
        })
    }
}





module.exports = {
    eventAddImage,
    eventDisplayImage,
    eventDisplayImages,
    eventUpdateImage,
    eventUpdateImages,
    eventDelete,
    eventImagesDelete,
}