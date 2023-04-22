const Registration = require('../Models/Registration');


const RegistrationAdd = async (req, res) => {
    try {
        const { Fname, Lname, Email, MNumber, Address, AdhaarNo, course, Year, employed, placement, presentOrgani, CurrentDesignation } = req.body;

        if(!Fname){
            return res.status(401).send("First Name is required");
        }else if(!Lname){
            return res.status(401).send("Last Name is required");
        }else if(!Email){
            return res.status(401).send("Emailis is required");
        }else if(!MNumber){
            return res.status(401).send("Mobile Number is required");
        }else if(!Address){
            return res.status(401).send("Address is required");
        }else if(!AdhaarNo){
            return res.status(401).send("Adhaar No is required");
        }else if(!course){
            return res.status(401).send("Course is required");
        }else if(!Year){
            return res.status(401).send("Year is  required");
        }else if(!employed){
            return res.status(401).send("Employed Detail is required");
        }

        const RegistrationCheck = await Registration.find({Email : Email});
        if(!RegistrationCheck.length){
            const RegistrationData = await Registration({
                Fname :Fname,
                Lname :Lname,
                Email :Email,
                MNumber :MNumber,
                Address :Address,
                AdhaarNo : AdhaarNo,
                HigerEducation :{
                    course : course,
                    Year : Year,
                    employed :employed
                },
                CurrentWorking :{
                    placement : placement,
                    presentOrgani :presentOrgani,
                    CurrentDesignation :CurrentDesignation
                }
            });
    
            await RegistrationData.save();
    
            return res.status(200).send("Registration Successfully Submit")
        }else {
            return res.status(200).send("Your are allready Submited")
        }
        
    } catch (error) {
        console.log(error);
    }
}

const RegistrationDisplayAll = async (req,res) =>{
    try {
        const data = await Registration.find();

        if(data){
            return res.status(200).send(data);
        }else{
            return res.status(404).send("Data not found")
        }
    } catch (error) {
        console.log(error);
    }
}

const RegistrationDelete = async (req,res) =>{
    try {
        const {_id} = req.params
        const data = await Registration.find({_id});
        if(data){
            await Registration.findByIdAndDelete({_id});
            return res.status(200).send("Deleted")
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports ={
    RegistrationAdd,
    RegistrationDisplayAll,
    RegistrationDelete
}