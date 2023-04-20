const EventHandler = require('../Models/EventHandler');
const fs = require('fs')


const EventHandlerAdd = async (req,res) =>{
    try {
        const {name,detail} = req.fields;
        console.log(req.fields);
        const {images} = req.files;

        if(!name){
            return res.status(401).send({ message: "name is required" });
        }else if(!detail){
            return res.status(401).send({message : "Detail is required "});
        }

        const EventHandler_Check = await EventHandler.find({name : name});

        if(EventHandler_Check){
            const EventHandler_Data = await new EventHandler(req.fields);

            if(images.length){
                for(let i=0; i< images.length;i++){
                    EventHandler_Data.images.push({
                        data : fs.readFileSync(images[i].path),
                        contentType : images[i].type,
                        Name : images[i].name
                    })
                }
            }else{
                EventHandler_Data.images.push({
                    data : fs.readFileSync(images.path),
                    contentType : images.type,
                    Name : images.name
                })
            }
            
            await EventHandler_Data.save();
            return res.status(200).send("EventHandler Created");
        }else{
            return res.status(200).send("EventHandler allready exist")
        }

        
    } catch (error) {
        console.log(error);
    }
}

const EventHandlerDisplay = async (req,res) =>{
    try {
        const data = await EventHandler.find().populate("Years.Events.Event_id");

        if(data){
            return res.status(200).send(data);
        }else{
            return res.status(404).send("data not found");s
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    EventHandlerAdd,
    EventHandlerDisplay
}