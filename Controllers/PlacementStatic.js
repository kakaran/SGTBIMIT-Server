const PlacementStatic = require('../Models/PlacementStatic');


const PlacementStaticAdd = async (req,res) =>{
    try {
        const Data = await PlacementStatic.find();
        const {Year,Name,Eligible,Offers} = req.body

        const NameCheck = {
            status : false,
            value : ""
        }

        if(Data.length > 2){
            return res.status(500).send("Kindly Delete the Previeus Year");
        }

        Data.map((value) =>{
            if(value.Year == Year){
                value.Course.map((value) =>{
                    if(value.Name == Name){
                        NameCheck.status = true,
                        NameCheck.value == value
                    }
                })
            }
        })

        if(NameCheck.status){
            await PlacementStatic.updateOne({Year}, {$pull : {Course : {Name,Eligible,Offers}}})
            return res.status(200).send("Data Added")
        }else{
            await PlacementStatic({
                Year,
                Course : [{
                    Name : Name,
                    Eligible : Eligible,
                    Offers : Offers
                }]
            }).save()
            return res.status(200).send("Data Added");
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    PlacementStaticAdd
}