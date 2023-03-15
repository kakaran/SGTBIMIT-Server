const Administrations = require("../Models/Administration");
const fs = require('fs');
const path = require('path');
const imagepath = path.join(__dirname,"../public/images")


const justForchecking = async(req,res) => {
    try {
        
        return res.status(200).send("Everything is working fine!");

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message : `Error`
        });
    }
}

const AdministrationAdd = async(req,res) =>{
    try {
        const data = {
            name: req.body.name,
            image: path.join('/Public/Images/'+req.file.filename),
            position: req.body.position,
            shortNote: req.body.shortNote,
            longNote: req.body.longNote,
        }

        await new Administrations(data).save();
        return res.status(200).send(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message : 'Error'
        })
    }
}

const AdministrationDelete = async(req,res) =>{
    try {
        const _id = req.body.Id;
        const Adminis_Search = await Administrations.findById({_id});

        if(Adminis_Search){
            const files = fs.readdirSync(imagepath);
            let imagearr = [Adminis_Search.image];
            let repldata = imagearr[0].replace("\\Public\\Images\\","");
            files.forEach(async (ele) =>{
                if(ele == repldata){
                    fs.unlinkSync(`${imagepath}\\${repldata}`);
                }
            });
            await Administrations.findByIdAndDelete({_id});
            return res.status(200).send(Adminis_Search.name + " Delete")
        }else{
            return res.status(401).send("User not found");
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message : 'Error'
        })
    }
}

const AdministrationDisplay = async(req,res) =>{
    try {

        const data = await Administrations.find();
        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message : 'Error'
        })
    }
}

const AdministrationUpdate = async(req,res) =>{
    try {


        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message : 'Error'
        })
    }
}

module.exports = {justForchecking,AdministrationAdd,AdministrationDelete,AdministrationDisplay}