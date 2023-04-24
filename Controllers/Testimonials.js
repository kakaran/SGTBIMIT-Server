const Testimonial = require('../Models/Testimonials');
const fs = require('fs');

const TestimonialAdd = async (req, res) => {
    try {
        const { name, detail, Year, Course } = req.fields;
        const { image } = req.files;

        if (!name) {
            return res.status(200).send({ message: "Name is required" });
        } else if (!detail) {
            return res.status(200).send({ message: "Detail is required" });
        } else if (!Year) {
            return res.status(200).send({ message: "Year is required" });
        } else if (!Course) {
            return res.status(200).send({ message: "Course is required" });
        } else if (image && image.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        }

        const TestimonialData = await Testimonial(req.fields);

        if (image) {
            TestimonialData.image.data = fs.readFileSync(image.path),
                TestimonialData.image.contentType = image.type,
                TestimonialData.image.Name = image.name
        }

        await TestimonialData.save();

        return res.status(200).send({
            Success: true,
            message: "Data Upload",
            data: TestimonialData
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const TestimonialDisplay = async (req, res) => {
    try {

        const data = await Testimonial.find().select("-image");
        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const TestimonialUpdate = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, detail, Year, Course } = req.fields;
        const { image } = req.files;


        const Search_Data = await Testimonial.findById({ _id });

        if (Search_Data) {

            if (!name) {
                return res.status(200).send({ message: "Name is required" });
            } else if (!detail) {
                return res.status(200).send({ message: "Detail is required" });
            } else if (!Year) {
                return res.status(200).send({ message: "Year is required" });
            } else if (!Course) {
                return res.status(200).send({ message: "Course is required" });
            } else if (image && image.size > 1000000) {
                return res.status(401).send("Image is required and should be less 1mb");
            }

            const TestimonialData = await Testimonial.findByIdAndUpdate(
                {_id},
                {...req.fields},
                {new :  true}
            );

            if(image){
                TestimonialData.image.data = fs.readFileSync(image.path),
                TestimonialData.image.contentType = image.type,
                TestimonialData.image.Name = image.name
            }

            await TestimonialData.save();

            return res.status(201).send({
                Success: true,
                message: "Data Upload",
                data: TestimonialData
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

const TestimonialImageDisplay = async (req,res) =>{
    try {
        const {_id} = req.params;

        const Testimonialfind = await Testimonial.findById({_id});
        console.log(Testimonialfind);
        if(Testimonialfind){
            res.set("Content-type", Testimonialfind.image.contentType);
            return res.status(201).send(Testimonialfind.image.data);
        }
    } catch (error) {
        console.log(error);
    }
}

const TestimonialDelete = async (req, res) => {
    try {
        const {_id} = req.params;
        const Search_Data = await Testimonial.findById({ _id});

        if (Search_Data) {

            const deleteData = await Testimonial.findByIdAndDelete({ _id: Search_Data._id });

            return res.status(200).send(data = {
                message: "Testimonial Delete",
                source: deleteData
            });
        } else {
            return res.send(400).send("Data Not Found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const singleTestimonialDisplay = async (req, res) => {
    try {
        const {_id} = req.params;
        const Search_Data = await Testimonial.findById({_id}).select("-image");
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

module.exports = {
    TestimonialAdd,
    TestimonialDisplay,
    TestimonialUpdate,
    TestimonialDelete,
    singleTestimonialDisplay,
    TestimonialImageDisplay
}