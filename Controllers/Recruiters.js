const Recruiters = require('../Models/Recruiters');
const fs = require('fs');
const path = require('path');
const imagepath = path.join(__dirname, "../public/images");


const recruitersAdd = async (req, res) => {
    try {

        const data = {
            image: path.join('/Public/Images/'+req.file.filename),
        }

        await new Recruiters(data).save();
        return res.status(200).send(data)

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
        const _id = req.body.Id;
        const Recruiter_Search = await Recruiters.findById({ _id });

        if (Recruiter_Search) {
            const files = fs.readdirSync(imagepath);
            let imagearr = [Recruiter_Search.image];
            let repldata = imagearr[0].replace("\\Public\\Images\\", "");
            files.forEach(async (ele) => {
                if (ele == repldata) {
                    fs.unlinkSync(`${imagepath}\\${repldata}`);
                }
            });
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
        const data = await Recruiters.find();

        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const dataCheckRecruiters = async (req, res, next) => {
    const Search_Recru = await Recruiters.findById({ _id: req.params._id });

    if (Search_Recru) {
        next()
    } else {
        return res.status(401).send("Data Not Found")
    }
}


const recruitersUpdate = async (req, res) => {
    try {
        const Search_Recru = await Recruiters.findById({ _id: req.params._id });

        //Delete the old image from Public Dir...
        const files = fs.readdirSync(imagepath);
        let imagearr = [Search_Recru.image];
        let repldata = imagearr[0].replace("\\Public\\Images\\", "");
        files.forEach(async (ele) => {
            if (ele == repldata) {
                await fs.unlinkSync(`${imagepath}\\${repldata}`);
            }
        });

        const data = {
            image: path.join('/Public/Images/' + req.file.filename),
        }

        const Update_Data = await Recruiters.updateMany({ _id: req.params._id }, data);

        return res.status(200).send({
            message: "Successfully Update the detail",
            detail: Update_Data,
        });

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
    dataCheckRecruiters
}