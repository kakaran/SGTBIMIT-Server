const EventHandler = require('../Models/EventHandler');
const fs = require('fs')


const EventHandlerAdd = async (req, res) => {
    try {
        const { name, detail } = req.fields;
        console.log(req.fields);
        const { images ,HeaderImage} = req.files;
console.log(HeaderImage);
        if (!name) {
            return res.status(401).send({ message: "name is required" });
        } else if (!detail) {
            return res.status(401).send({ message: "Detail is required " });
        }

        const EventHandler_Check = await EventHandler.find({ name: name });
        console.log(EventHandler_Check);
        if (!EventHandler_Check.length) {
            const EventHandler_Data = await new EventHandler(req.fields);
            if (images.length) {
                for (let i = 0; i < images.length; i++) {
                    EventHandler_Data.images.push({
                        data: fs.readFileSync(images[i].path),
                        contentType: images[i].type,
                        Name: images[i].name
                    })
                }
            } else {
                EventHandler_Data.images.push({
                    data: fs.readFileSync(images.path),
                    contentType: images.type,
                    Name: images.name
                })
            }

            if(HeaderImage){
                EventHandler_Data.HeaderImage.data = fs.readFileSync(HeaderImage.path);
                EventHandler_Data.HeaderImage.contentType = HeaderImage.type;
                EventHandler_Data.HeaderImage.Name = HeaderImage.name;
            }

            await EventHandler_Data.save();
            return res.status(200).send("EventHandler Created");
        } else {
            return res.status(200).send("EventHandler allready exist")
        }


    } catch (error) {
        console.log(error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    }
}

const EventHandlerSingleDisplay = async (req, res) => {
    try {
        const {_id} = req.params;
        const data = await EventHandler.findById({_id}).populate("Years.Events.Event_id", "Images._id name year eventHandler detail").select("images._id name mainImage._id detail Years");

        if (data) {
            return res.status(200).send(data);
        } else {
            return res.status(404).send("data not found"); s
        }
    } catch (error) {
        console.log(error);
    }
}

const EventHandleRHederImage = async (req,res) =>{
    try {
        const {_id} = req.params;
        const data = await EventHandler.find({_id}).select("HeaderImage")
        // console.log(data);
        if(data){
            res.set("Content-type", data[0].HeaderImage.contentType);
            return res.status(201).send(data[0].HeaderImage.data)
        }
    } catch (error) {
        console.log(error);
    }
}

const EventHandlerDisplay = async (req,res) =>{
    try {
        const data = await EventHandler.find().select("name Years");
        if(data){
            return res.send(data);
        }else
        {
            return res.send("Data not found")
        }
    } catch (error) {
        console.log(error);
    }
}

const AllEventsDisplay = async (req,res) =>{
    try {
         const data = await EventHandler.find().populate("Years.Events.Event_id", "Images._id name year eventHandler detail").select("images._id name mainImage._id detail Years");
         if(data){
            return res.status(200).send({message : "Data is send", data})
         }
    } catch (error) {
        console.log(error);
    }
}


const EventHandlerImageDisplay = async (req, res) => {
    try {
        const { _id, image_id } = req.params;
        const Data = await EventHandler.findOne({ _id }, { images: { $elemMatch: { _id: image_id } } });

        if (Data) {
            res.set("Content-type", Data.images[0].contentType);
            return res.status(201).send(Data.images[0].data)
        }
    } catch (error) {
        console.log(error);
    }
}


const EventHandlerDelete = async (req, res) => {
    try {
        const { _id } = req.params;

        const data = await EventHandler.find({ _id }).select("-images"); 3

        if (data.length) {
            await EventHandler.findByIdAndDelete({ _id });
            return res.status(200).send("Data Deleted")
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    EventHandlerAdd,
    EventHandlerDisplay,
    EventHandlerImageDisplay,
    EventHandlerDelete,
    EventHandlerSingleDisplay,
    EventHandleRHederImage,
    AllEventsDisplay 
} 