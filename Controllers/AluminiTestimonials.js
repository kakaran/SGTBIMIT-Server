const aluminiTestimonalsModel = require('../Models/AluminiTestimonials');

const aluminiTestimonialsAdd = async(req,res) => {

    try {
        const { name, detail } = req.fields;
        const { image } = req.files;

        if (!name) {
            return res.status(200).send({ message: "Name is required" });
        } else if (!detail) {
            return res.status(200).send({ message: "Detail is required" });
        } else if (image && image.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        }

        const alumini_TestimonialData = await aluminiTestimonalsModel(req.fields);

        if (image) {
            alumini_TestimonialData.image.data = fs.readFileSync(image.path),
            alumini_TestimonialData.image.contentType = image.type
        }

        await alumini_TestimonialData.save();

        return res.status(200).send({
            Success: true,
            message: "Data Upload",
            data: alumini_TestimonialData
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}



const aluminiTestimonialDisplay = async(req,res) => {

    try {

        const data = await aluminiTestimonalsModel.find({}).select("-image");
        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


const aluminiTestimonialUpdate = async(req,res) => {
    try {
        const { _id } = req.params;
        const { name, detail } = req.fields;
        const { image } = req.files;


        const Search_Data = await aluminiTestimonalsModel.findById({ _id });

        if (Search_Data) {

            if (!name) {
                return res.status(200).send({ message: "Name is required" });
            } else if (!detail) {
                return res.status(200).send({ message: "Detail is required" });
            } else if (image && image.size > 1000000) {
                return res.status(401).send("Image is required and should be less 1mb");
            }

           const alumini_TestimonialData = await aluminiTestimonalsModel.findByIdAndUpdate(Search_Data, {...req.fields}, {new : true});

            if(image){
                alumini_TestimonialData.image.data = fs.readFileSync(image.path),
                alumini_TestimonialData.image.contentType = image.type
            }

            await alumini_TestimonialData.save();

            return res.status(201).send({
                Success: true,
                message: "Data Upload",
                data: alumini_TestimonialData
            })
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


const aluminiTestimonialImageDisplay = async (req,res) =>{
    try {
        const {_id} = req.params;

        const aluminiTestimonialfind = await aluminiTestimonalsModel.findById({_id});
        if(aluminiTestimonialfind){
            res.set("Content-type", aluminiTestimonialfind.image.contentType);
            return res.status(201).send(aluminiTestimonialfind.image.data);
        }
    } catch (error) {
        console.log(error);
    }
}

const aluminiTestimonialDelete = async (req, res) => {
    try {
        const {_id} = req.params;
        const Search_Data = await aluminiTestimonalsModel.findById({ _id});

        if (Search_Data) {

            const deleteData = await aluminiTestimonalsModel.findByIdAndDelete(Search_Data);

            return res.status(200).send(data = {
                message: "Testimonial Deleted",
                source: deleteData
            });
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

const singleAluminiTestimonialDisplay = async (req, res) => {
    try {
        const {_id} = req.params;
        const Search_Data = await aluminiTestimonalsModel.findById({_id}).select("-image");
        if (Search_Data) {
            return res.status(200).send({
                message: "Result",
                source: Search_Data
            });
        } else {
            return res.status(400).send({
                message: "Data Not found",
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


module.exports = {aluminiTestimonialsAdd, 
    aluminiTestimonialDisplay, 
    aluminiTestimonialUpdate, 
    aluminiTestimonialDelete, 
    aluminiTestimonialImageDisplay, 
    singleAluminiTestimonialDisplay}