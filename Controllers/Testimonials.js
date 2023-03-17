const Testimonial = require('../Models/Testimonials');

const TestimonialAdd = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            detail: req.body.detail
        }

        await new Testimonial(data).save();
        return res.status(200).send(data);

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
                name: req.body.name,
                detail: req.body.detail
            }
            
            await Testimonial.updateMany({ _id: req.params._id}, data);
            return res.send("Data Successfully Update")
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

            return res.status(200).send(deleteData);
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


module.exports = {
    TestimonialAdd,
    TestimonialDisplay,
    TestimonialUpdate,
    TestimonialDelete
}