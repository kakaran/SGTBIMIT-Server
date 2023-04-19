const Notice = require("../Models/Notices");
const fs = require('fs');

const NoticeAdd = async (req, res) => {
    try {
        const { Name, Detail, Categories } = req.fields;
        const { file } = req.files;

        if (!Name) {
            return res.status(404).send("Name is required");
        } else if (!Detail) {
            return res.status(404).send("Detail is required");
        } else if (!Categories) {
            return res.status(404).send("Categorie is required");
        } else if (file && file.size > 1000000) {
            return res.status(401).send("file is required and should be less 1mb");
        }

        const NoticeData = await new Notice(req.fields);

        if (file) {
            NoticeData.file.data = fs.readFileSync(file.path);
            NoticeData.file.contentType = file.type;
            NoticeData.file.Name = file.name;
        }

        await NoticeData.save();
        return res.status(200).send("Notice is Created");
    } catch (error) {
        console.log(error);
        // return res.send(error)
    }
}

const NoticeDelete = async (req, res) => {
    try {
        const { _id } = req.params;
        const Data = await Notice.findById({ _id }).select("-file");

        if (Data) {
            await Notice.findByIdAndDelete({ _id });
            return res.status(201).send("Notice Delete");
        } else {
            return res.status(401).send("Data Not found");
        }
    } catch (error) {
        console.log(error);
        // return res.send(error)
    }
}

const NoticeDataDisplay = async (req, res) => {
    try {
        const Data = await Notice.find().select("-file");

        if (Data) {
            return res.status(200).send(Data);
        } else {
            return res.send("Data not found");
        }
    } catch (error) {
        console.log(error);
        // return res.send(error);
    }
}

const NoticeFileDisplay = async (req, res) => {
    try {
        const { _id } = req.params;

        const Data = await Notice.findById({ _id }).select("file");

        if (Data) {
            res.set("Content-type", Data.file.contentType);
            return res.status(200).send(Data.file.data);
        } else {
            return res.send("Data not found")
        }

    } catch (error) {
        console.log(error);
        // return res.send(error)
    }
}


const NoticeUpdata = async (req, res) => {
    try {
        const { _id } = req.params;
        const { Name, Detail, Categories } = req.fields;
        const { file } = req.files;

        // console.log(file);

        if (!Name) {
            return res.status(404).send("Name is required");
        } else if (!Detail) {
            return res.status(404).send("Detail is required");
        } else if (!Categories) {
            return res.status(404).send("Categorie is required");
        } else if (file && file.size > 1000000) {
            return res.status(401).send("file is required and should be less 1mb");
        }

        const Search_Data = await Notice.findById({ _id }).select("-file");

        if (Search_Data) {
            const NoticeUpdateData = await Notice.findByIdAndUpdate({ _id }, { ...req.fields }, { new: true });
            if(req.files){
                NoticeUpdateData.file.data = fs.readFileSync(file.path);
                NoticeUpdateData.file.contentType = file.type;
                NoticeUpdateData.file.Name = file.name;
            }
            await NoticeUpdateData.save();
            return res.status(200).send("Notice Successfully Update");
        }
        else{
            return res.send("Data not found");
        }
    } catch (error) {
        console.log(error);
        // return res.send(error)
    }
}

module.exports = {
    NoticeAdd,
    NoticeDelete,
    NoticeDataDisplay,
    NoticeFileDisplay,
    NoticeUpdata
} 