const fs = require('fs');
const path = require('path');
const imagepath = path.join(__dirname, "../public/images");
const Society = require('../Models/society');


const SocietyAdd = async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            image: path.join('/Public/Images/' + req.file.filename),
            subdetail: req.body.subdetail,
            detail: req.body.detail
        }

        await Society(data).save();
        return res.status(200).send(data);

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
        const _id = req.body.Id;
        console.log(req.body.Id);
        const Society_Search = await Society.findById({ _id });

        if (Society_Search) {
            const files = fs.readdirSync(imagepath);
            let imagearr = [Society_Search.image];
            let repldata = imagearr[0].replace("\\Public\\Images\\", "");
            files.forEach(async (ele) => {
                if (ele == repldata) {
                    fs.unlinkSync(`${imagepath}\\${repldata}`);
                }
            });
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

        const data = await Society.find();
        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const SingleSocietyDisplay = async (req, res) => {
    try {
        const data = await Society.findById({ _id: req.body._id });

        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const dataCheckSociety = async (req, res, next) => {
    const Search_Socity = await Society.findById({ _id: req.params._id });

    if (Search_Socity) {
        next()
    } else {
        return res.status(401).send("Data Not Found")
    }
}

const SocietyUpdate = async (req, res) => {
    try {

        const Search_Socity = await Society.findById({ _id: req.params._id });

        //Delete the old image from Public Dir...

        const files = fs.readdirSync(imagepath);
        let imagearr = [Search_Socity.image];
        let repldata = imagearr[0].replace("\\Public\\Images\\", "");
        files.forEach(async (ele) => {
            if (ele == repldata) {
                await fs.unlinkSync(`${imagepath}\\${repldata}`);
            }
        });

        const data = {
            title: req.body.title,
            image: path.join('/Public/Images/' + req.file.filename),
            subdetail: req.body.subdetail,
            detail: req.body.detail,
        }

        const Update_Data = await Society.updateMany({ _id: req.params._id }, data);

        return res.status(200).send({
            message: "Successfully Update the detail",
            detail: Update_Data,
        });

        // return res.status(200).send("Successfully Update the detail");

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
    dataCheckSociety,
    SocietyUpdate
}