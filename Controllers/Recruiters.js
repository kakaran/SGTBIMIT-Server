const Recruiters = require('../Models/Recruiters');
const fs = require('fs');



const recruitersAdd = async (req, res) => {
    try {
        const { Name } = req.fields;
        const { image } = req.files;

        if (!Name) {
            return res.status(401).send("Name is required");
        } else if (image && image.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        }

        const Recruiter_Add = await new Recruiters(req.fields);
        if (image) {
            Recruiter_Add.image.data = fs.readFileSync(image.path),
                Recruiter_Add.image.contentType = image.type,
                Recruiter_Add.image.Name = image.name
        }

        await Recruiter_Add.save();
        return res.status(201).send({
            Success: true,
            message: "Data Upload",
            data: Recruiter_Add
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


const recruitersDelete = async (req, res) => {
    try {
        const { _id } = req.params;
        const Recruiter_Search = await Recruiters.findById({ _id });

        if (Recruiter_Search) {

            await Recruiters.findByIdAndDelete({ _id });
            return res.status(200).send(" Delete")
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


const recruitersDisplay = async (req, res) => {
    try {
        const data = await Recruiters.find().select("-image");

        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const RecruiterImageDisplay = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await Recruiters.findById({ _id }).select("image");

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

const recruitersUpdate = async (req, res) => {
    try {
        const { _id } = req.params;
        const { Name } = req.fields;
        const { image } = req.files;
        const Search_Recru = await Recruiters.findById({ _id });

        if (Search_Recru) {
            if (!Name) {
                return res.status(401).send("Name is required");
            } else if (image && image.size > 1000000) {
                return res.status(401).send("Image is required and should be less 1mb");
            }
            const Recruiter_Update = await Recruiters.findByIdAndUpdate(
                { _id },
                { ...req.fields },
                { new: true }
            );

            if (image) {
                Recruiter_Update.image.data = fs.readFileSync(image.path),
                    Recruiter_Update.image.contentType = image.type,
                    Recruiter_Update.image.Name = image.name
            }

            await Recruiter_Update.save();
            return res.status(201).send({
                Success: true,
                message: "Data Upload",
                data: Recruiter_Update
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
    recruitersAdd,
    recruitersUpdate,
    recruitersDisplay,
    recruitersDelete,
    RecruiterImageDisplay
}