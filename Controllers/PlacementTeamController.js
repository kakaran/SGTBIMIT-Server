const PlacementTeam = require('../Models/PlacemetTeam');


const PlacementTeamAdd = async (req,res) =>{
    try {
        const {Name,linkdin} = req.fields;
        const {Image} = req.files;

        if(!Name){
            return res.status(404).send("Name is required");
        }else if (!linkdin){
            return res.status(404).send("Linkdein Deteail is required");
        }else if(Image && Image.size > 1000000){
            return res.status(404).send("Image size 1mb required");
        }

        const PlacementTeamAdd = await PlacementTeam(req.fields);

        if(Image){
            PlacementTeamAdd.Image.data = Image.path;
            PlacementTeamAdd.Image.contentType = Image.type;
            PlacementTeamAdd.Image.Name = Image.Name
        }

        await PlacementTeamAdd.save();
        return res.status(200).send("Placement Team member Add");
    } catch (error) {
        console.log(error);
    }
}


const PlacementTeamDelete = async (req,res) =>{
    try {
        const {_id} = req.params;

        const searchData = await PlacementTeam.findById(_id);
        if(searchData){
            await PlacementTeam.findByIdAndDelete(_id) 
            return res.status(200).send("Placement member Delete");
        }
    } catch (error) {
        console.log(error);
    }
}


const PlacementTeamDisplay = async (req,res) =>{
    try {
        const AllData = await PlacementTeam.find().select("-Image");

        if(AllData.length) return res.status(200).send(AllData)
        else return res.status(404).send({message : "Data not found" , status : false})
    } catch (error) {
        console.log(error);
    }
}

const PlacementTeamImageDisplay = async (req,res) =>{
    try {
        const {_id} = req.params;

        const SearchData = await PlacementTeam.findById(_id);

        if(SearchData){
            res.set("Content-type", SearchData.Image.contentType);
            return res.status(200).send(SearchData.Image.data)
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    PlacementTeamAdd,
    PlacementTeamDelete,
    PlacementTeamDisplay,
    PlacementTeamImageDisplay
}