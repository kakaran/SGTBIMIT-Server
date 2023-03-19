const Facultys = require("../Models/Faculty");

const FacultysAdd = async(req,res) =>{
    try {
        const data = {
            name : req.body.name,
            image : path.join('/Public/Images/' + req.file.filename),
            detail : req.body.detail
        }

        await new Facultys(data).save();

        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


const FacultyDisplay = async (req,res)=>{
    try {
        
        const Data = await Facultys.find();

        return res.status(200).send(Data);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

const FacultySingle = async (req,res) =>{
    try {

        const Data = await Facultys.findById({_id: req.body._id});
        if(!Data){
            return res.status(400).send({
                message : "Data not found"
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

const FacultyDelete = async (req,res) =>{
    try {
        const Faculty_Search = await Facultys.findById({_id: req.body._id});

        if(Faculty_Search){
            const files = fs.readdirSync(imagepath);
            let imagearr = [Faculty_Search.image];
            let repldata = imagearr[0].replace("\\Public\\Images\\", "");
            files.forEach(async (ele) => {
                if (ele == repldata) {
                    fs.unlinkSync(`${imagepath}\\${repldata}`);
                }
            });
            await PlaceInter.findByIdAndDelete({ _id });
            return res.status(200).send(Faculty_Search.name + " Delete")
        }else{
            return res.status(200).send({
                message : "Data not found"
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

const dataCheckFaculty = async (req, res, next) => {
    const Search_PlInt = await Facultys.findById({ _id: req.params._id });

    if (Search_PlInt) {
        next()
    } else {
        return res.status(401).send("Data Not Found")
    }
}

const FacultyUpdate = async(req,res)=>{
    try {
        const Search_PlInt = await Facultys.findById({ _id: req.params._id });
        
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

        const Update_Data = await Facultys.updateMany({ _id: req.params._id }, data);

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
    FacultysAdd,
    FacultyDelete,
    FacultyDisplay,
    FacultySingle,
    FacultyUpdate,
    dataCheckFaculty

}