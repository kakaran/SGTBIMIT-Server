const fs = require('fs');
const Society = require('../Models/society');


const SocietyAdd = async (req, res) => {
    try {
        const { title, subdetail, detail } = req.fields;
        const { image } = req.files;

        if (!title) {
            return res.status(401).send("Socity is required");
        } else if (!subdetail) {
            return res.status(401).send("Heading is required");
        } else if (!detail) {
            return res.status(401).send("Detail is required");
        } else if (image && image.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        }

        const SocietyDetail = await new Society(req.fields);
        if (image) {
            SocietyDetail.image.data = fs.readFileSync(image.path),
                SocietyDetail.image.contentType = image.type,
                SocietyDetail.image.Name = image.name
        }

        await SocietyDetail.save();
        return res.status(201).send({
            Success: true,
            message: "Data Upload",
            data: SocietyDetail
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const SocietyDelete = async (req, res) => {
    try {
        const { _id } = req.params;
        const Society_Search = await Society.findById({ _id });

        if (Society_Search) {
            await Society.findByIdAndDelete({ _id });
            return res.status(200).send(Society_Search.title + " Delete");

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


const SocietyDisplay = async (req, res) => {
    try {

        const data = await Society.find().select("-image");

        if (!data) {
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

const SocietyImageDisplay = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await Society.findById({ _id }).select("image");

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


const SingleSocietyDisplay = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await Society.findById({ _id }).select("-image");

        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}



const SocietyUpdate = async (req, res) => {
    try {
        const { _id } = req.params;
        const { title, subdetail, detail } = req.fields;
        const { image } = req.files;
        const Search_Socity = await Society.findById({ _id });

        if (Search_Socity) {
            if (!title) {
                return res.status(401).send("Socity is required");
            } else if (!subdetail) {
                return res.status(401).send("Heading is required");
            } else if (!detail) {
                return res.status(401).send("Detail is required");
            } else if (image && image.size > 1000000) {
                return res.status(401).send("Image is required and should be less 1mb");
            }

            const SocietyDataUpdate = await Society.findByIdAndUpdate(
                { _id },
                { ...req.fields },
                { new: true }
            );

            if (image) {
                SocietyDataUpdate.image.data = fs.readFileSync(image.path),
                SocietyDataUpdate.image.contentType = image.type,
                SocietyDataUpdate.image.Name = image.name
            }

            await SocietyDataUpdate.save();
            return res.status(201).send({
                Success: true,
                message: "Data Upload",
                data: SocietyDataUpdate
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
    SocietyAdd,
    SocietyDelete,
    SocietyDisplay,
    SingleSocietyDisplay,
    SocietyUpdate,
    SocietyImageDisplay
}