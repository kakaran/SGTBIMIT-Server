const aluminiModel = require("../Models/AluminiGallery");
const fs = require('fs');


//alumini image add
const aluminiAddImage = async (req, res) => {

    try {
        const { category } = req.fields;
        const { image, images } = req.files;

        if (!image || !images || image.size > 1000000 || images.size > 1000000) {
            return res.status(401).send(`image is req or image size should be less then 1MB`);
        } else if (!category) {
            return res.status(401).send(`category must be defined`);
        }

        const already = await aluminiModel.findOne({ category })

        if (already) {
            return res.status(400).send(`This kind of Category is already exists`)
        }



        const alumini = await new aluminiModel(req.fields);

        if (image) {
            alumini.image.data = fs.readFileSync(image.path),
                alumini.image.contentType = image.type

            if (images.length) {
                for (let i = 0; i < images.length; i++) {
                    alumini.images.push({
                        data: fs.readFileSync(images[i].path),
                        contentType: images[i].type,
                    })
                }
            } else {
                alumini.images.push({
                    data: fs.readFileSync(images.path),
                    contentType: images.type,
                })
            }
        }

        const final = await alumini.save();

        return res.status(200).send({
            message: `Image uploaded successfully`,
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


//alumini image update
// const aluminiUpdateImage = async(req,res) => {

//     try {
//         const {category} = req.fields;
//         const {image} = req.files;
//         const id = req.params._id

//         if (!image || image.size > 1000000) {
//             return res.status(401).send(`image is req or image size should be less then 1MB`);
//         }else if (!category) {
//             return res.status(401).send(`category must be defined`);            
//         }


//         const alumini = await aluminiModel.findById(id);

//         if (alumini) {
//             const alumini_g  = await aluminiModel.findByIdAndUpdate(alumini, {...req.fields }, { new: true });
//             alumini_g.image.data = fs.readFileSync(image.path),
//             alumini_g.image.contentType = image.type   
//         }

//         // const final = await alumini_g.save();

//         return res.status(200).send({message : `Updated successfully`});


//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             success: false,
//             message: 'Error'
//         })
//     }
// }


//alumini carousel image
// const aluminiAddCarouselImage = async(req,res) => {

//     try {

//         const {images} = req.files

//         if (!images || images.size > 1000000) {
//             return res.status(401).send(`image is req or image size should be less then 1MB`);
//         }

//         const alumini = await new aluminiModel(req.fields);

//         if (images.length) {
//             for (let i = 0; i < images.length; i++) {
//                 alumini.images.push({
//                     data: fs.readFileSync(images[i].path),
//                     contentType: images[i].type,
//                 })
//             }
//         }else {
//             alumini.images.push({
//                 data: fs.readFileSync(images.path),
//                 contentType: images.type,
//             })
//         }

//         const final = await alumini.save();

//         return res.status(200).send({
//             message : `Images uploaded successfully`,
//             final
//         });



//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             success: false,
//             message: 'Error'
//         })
//     }
// }

module.exports = { aluminiAddImage, 
    // aluminiUpdateImage, 
    // aluminiAddCarouselImage 
} 