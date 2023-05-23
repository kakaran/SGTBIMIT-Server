const Facultys = require("../Models/Faculty");
const fs = require('fs');

const FacultyAdd = async (req, res) => {
    try {
        const { name, post, detail, Department, Index } = req.fields;
        const { image } = req.files;
        if (!name) {
            return res.status(401).send("Name is required");
        } else if (!post) {
            return res.status(401).send("Post is required");
        } else if (!detail) {
            return res.status(401).send("Detail is required");
        } else if (!Department) {
            return res.status(401).send("Department is required");
        } else if (image && image.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        } 

        const Faculty = await new Facultys(req.fields);
        if (image) {
            Faculty.image.data = fs.readFileSync(image.path),
                Faculty.image.contentType = image.type,
                Faculty.image.Name = image.name
        }

        if (!Index) {
            const Data = await Facultys.find();
            if (Data == undefined) {
                Facultys.Index = 1;
            } else {
                Facultys.Index = Data.length + 1
            }
        }

        await Faculty.save();
        return res.status(201).send({
            Success: true,
            message: "Data Upload",
            data: Faculty
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


const FacultyImageDisplay = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await Facultys.findById({ _id }).select("image");

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

const FacultyDisplay = async (req, res) => {
    try {

        const Data = await Facultys.find().sort({ createdAt: -1 }).select("-image");

        return res.status(200).send(Data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const FacultySingle = async (req, res) => {
    try {
        const { _id } = req.params;
        const Data = await Facultys.findById({ _id }).select("-image");
        if (!Data) {
            return res.status(400).send({
                message: "Data not found"
            })
        }
        return res.status(200).send(Data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const FacultyDelete = async (req, res) => {
    try {
        const { _id } = req.params;
        const Faculty_Search = await Facultys.findById({ _id });

        if (Faculty_Search) {
            await Facultys.findByIdAndDelete({ _id });
            return res.status(200).send(Faculty_Search.name + " Delete")
        } else {
            return res.status(200).send({
                message: "Data not found"
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


const FacultyUpdate = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, post, detail, Department } = req.fields;
        const { image } = req.files;

        console.log(req.fields);
        const Search_Faculty = await Facultys.findById({ _id });

        if (Search_Faculty) {
            if (!name) {
                return res.status(401).send("Name is required");
            } else if (!post) {
                return res.status(401).send("Post is required");
            } else if (!detail) {
                return res.status(401).send("Detail is required");
            } else if (!Department) {
                return res.status(401).send("Department is required");
            } else if (image && image.size > 1000000) {
                return res.status(401).send("Image is required and should be less 1mb");
            }

            const FacultyUpdate = await Facultys.findByIdAndUpdate(
                Search_Faculty,
                { ...req.fields },
                { new: true }
            );

            if (image) {
                FacultyUpdate.image.data = fs.readFileSync(image.path),
                    FacultyUpdate.image.contentType = image.type,
                    FacultyUpdate.image.Name = image.name
            }

            await FacultyUpdate.save();
            return res.status(201).send({
                Success: true,
                message: "Data Upload",
                data: FacultyUpdate
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
    FacultyAdd,
    FacultyDelete,
    FacultyDisplay,
    FacultySingle,
    FacultyUpdate,
    FacultyImageDisplay

}