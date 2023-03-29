const Administrations = require("../Models/Administration");
const fs = require('fs');


// const justForchecking = async(req,res) => {
//     try {

//         return res.status(200).send("Everything is working fine!");

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             success:false,
//             message : `Error`
//         });
//     }
// }


const AdministrationAdd = async (req, res) => {
    try {
        const { name, position, shortNote, longNote } = req.fields;
        const { image } = req.files;

        if (!name) {
            return res.status(401).send("Name is required");
        } else if (!position) {
            return res.status(401).send("Position is required");
        } else if (!shortNote) {
            return res.status(401).send("Title is required");
        } else if (!longNote) {
            return res.status(401).send("Description is required");
        } else if (image && image.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        }

        const AdminiStation = await new Administrations(req.fields);
        if (image) {
            AdminiStation.image.data = fs.readFileSync(image.path),
                AdminiStation.image.contentType = image.type,
                AdminiStation.image.Name = image.name
        }

        await AdminiStation.save();
        return res.status(201).send({
            Success: true,
            message: "Data Upload",
            data: AdminiStation
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const AdministrationDelete = async (req, res) => {
    try {
        const { _id } = req.params;
        const Adminis_Search = await Administrations.findById({ _id });

        if (Adminis_Search) {
            await Administrations.findByIdAndDelete({ _id });
            return res.status(200).send(Adminis_Search.name + " Delete");
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

const AdministrationDisplay = async (req, res) => {
    try {

        const data = await Administrations.find().select("-image");
        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const AdministrationImageDisplay = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await Administrations.findById({ _id }).select("image");

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

const SingleAdministrationDisplay = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await Administrations.findById({ _id }).select("-image");

        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

// const dataCheck = async (req, res, next) => {
//     const Search_Admin = await Administrations.findById({ _id: req.params._id });

//     if (Search_Admin) {
//         next()
//     } else {
//         return res.status(401).send("Data Not Found")
//     }
// }


const AdministrationUpdate = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, position, shortNote, longNote } = req.fields;
        const { image } = req.files;
        const Search_Admin = await Administrations.findById({ _id: req.params._id });

        if (Search_Admin) {
            if (!name) {
                return res.status(401).send("Name is required");
            } else if (!position) {
                return res.status(401).send("Position is required");
            } else if (!shortNote) {
                return res.status(401).send("Title is required");
            } else if (!longNote) {
                return res.status(401).send("Description is required");
            } else if (image && image.size > 1000000) {
                return res.status(401).send("Image is required and should be less 1mb");
            }

            const AdminiStration = await ImageData.findByIdAndUpdate(
                { _id },
                { ...req.fields },
                { new: true }
            );

            if (image) {
                AdminiStration.image.data = fs.readFileSync(image.path),
                AdminiStration.image.contentType = image.type,
                AdminiStration.image.Name = image.name
            }
        }

        
        await AdminiStration.save();
        return res.status(201).send({
            Success: true,
            message: "Data Upload",
            data: AdminiStration
        })


    } catch (error) {

        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}



module.exports = {
    AdministrationAdd,
    SingleAdministrationDisplay,
    AdministrationDelete,
    AdministrationDisplay,
    AdministrationUpdate,
    AdministrationImageDisplay
}