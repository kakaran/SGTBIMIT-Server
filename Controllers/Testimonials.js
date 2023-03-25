const Testimonial = require('../Models/Testimonials');

const TestimonialAdd = async (req, res) => {
    try {
        const data = {
            name: req.body.testiUpdate.name,
            detail: req.body.testiUpdate.detail
        }
        if(data.name && data.detail == " "){
            return res.status(400).send("Pleace fill the all information");
        }else{
            await Testimonial(data).save();
            return res.status(200).send("Testimonial Created")
        }

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

        const data = await Testimonial.find();
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
        const Search_Data = await Testimonial.findById({ _id: req.params._id });

        if (Search_Data) {
            const data = {
                name: req.body.SingleData.name,
                detail: req.body.SingleData.detail
            }

            await Testimonial.updateMany({ _id: req.params._id }, data);
            return res.status(200).send("Data Successfully Update")
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

const TestimonialDelete = async (req, res) => {
    try {
        const Search_Data = await Testimonial.findById({ _id: req.body._id });

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
        const Search_Data = await Testimonial.findById({ _id: req.body.id });
        if (Search_Data) {
            return res.status(200).send(data = {
                message: "Result",
                source: Search_Data
            });
        } else {
            return res.status(400).send(data = {
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
    singleTestimonialDisplay
}