const PlaceInter = require('../Models/Interships_Placements');
const fs = require('fs');
const path = require('path');
const imagepath = path.join(__dirname, "../public/images");


const PlacementIntershipsAdd = async (req,res) =>{
    try {
        const data = {
            name : req.body.name,
            image : path.join('/Public/Images/' + req.file.filename),
            companyName :req.body.companyName
        }

        await new PlaceInter(data).save();
        return res.status(200).send(data)

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const PlacementIntershipsDisplay = async (req,res) =>{
    try {
        const data = await PlaceInter.find();
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


const PlacementIntershipsSingle = async (req,res) =>{
    try {
        const data = await PlaceInter.findById({_id: req.body._id});
        if(data){
            return res.status(200).send(data);
        }else{
            return res.status(400).send("Data Not Found")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


const PlacementIntershipsDelete =  async (req,res) =>{
    try {
        const _id = req.body.Id;
        const Adminis_Search = await PlaceInter.findById({ _id });

        if (Adminis_Search) {
            const files = fs.readdirSync(imagepath);
            let imagearr = [Adminis_Search.image];
            let repldata = imagearr[0].replace("\\Public\\Images\\", "");
            files.forEach(async (ele) => {
                if (ele == repldata) {
                    fs.unlinkSync(`${imagepath}\\${repldata}`);
                }
            });
            await PlaceInter.findByIdAndDelete({ _id });
            return res.status(200).send(Adminis_Search.name + " Delete")
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

const dataCheckInterShip = async (req, res, next) => {
    const Search_PlInt = await PlaceInter.findById({ _id: req.params._id });

    if (Search_PlInt) {
        next()
    } else {
        return res.status(401).send("Data Not Found")
    }
}

const PlacementIntershipsUpdate = async (req, res) => {
    try {

        const Search_PlInt = await PlaceInter.findById({ _id: req.params._id });
        
        //Delete the old image from Public Dir...

        const files = fs.readdirSync(imagepath);
        let imagearr = [Search_PlInt.image];
        let repldata = imagearr[0].replace("\\Public\\Images\\", "");
        files.forEach(async (ele) => {
            if (ele == repldata) {
                await fs.unlinkSync(`${imagepath}\\${repldata}`);
            }
        });

        const data = {
            name : req.body.name,
            image : path.join('/Public/Images/' + req.file.filename),
            companyName :req.body.companyName
        }

        const Update_Data = await PlaceInter.updateMany({ _id: req.params._id }, data);

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
    PlacementIntershipsAdd,
    PlacementIntershipsSingle,
    PlacementIntershipsDisplay,
    PlacementIntershipsDelete,
    dataCheckInterShip,
    PlacementIntershipsUpdate

}