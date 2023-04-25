const Event = require("../Models/Events");
const EventHandler = require("../Models/EventHandler");
const fs = require('fs');

const EventhandlerManage = async (eventName, year, Id) => {
    try {
        const Search_Data = await EventHandler.find({ name: eventName });
        const _id = Id.toString();

        const YearData = {
            result: false,
            data: ""
        }

        const EventData = {
            result: false,
            data: ""
        }

        if (Search_Data) {
            if (Search_Data[0].Years.length) {
                Search_Data[0].Years.forEach((value1) => {
                    if (value1.year == year) {
                        YearData.result = true,
                            YearData.data = value1
                    }
                })
            } else {
                await EventHandler.updateOne({ name: eventName }, {
                    $push: {
                        Years: [{
                            year: year,
                            Events: [{
                                Event_id: _id
                            }]
                        }
                        ]
                    }
                });
                return
            }
        }
        if (YearData.result) {
            YearData.data.Events.forEach((value2) => {
                if (value2.Event_id.toString() == _id) {
                    EventData.result = true,
                        EventData.data = value2
                }
            })
        }
        else {
            await EventHandler.updateOne({ name: eventName }, {
                $push: {
                    Years: [{
                        year: year,
                        Events: [{
                            Event_id: _id
                        }]
                    }
                    ]
                }
            });
            return
        }

        if (!EventData.result) {
            await EventHandler.updateOne({ name: eventName, "Years.year": year }, {
                $push: {
                    "Years.$.Events": {
                        Event_id: _id
                    }
                }
            })
            return
        }

    } catch (error) {
        console.log(error);
    }
}

const EventAdd = async (req, res) => {
    try {
        const { detail, name, year, eventHandler } = req.fields;
        const { mainImage, Images } = req.files;

        if (!detail) {
            return res.status(401).send("Info is required");
        } else if (!name) {
            return res.status(401).send("Name is required");
        } else if (!year) {
            return res.status(401).send("Year is required");
        } else if (!eventHandler) {
            return res.status(401).send('select Event Handler');
        } else if (mainImage && mainImage.size > 1000000) {
            return res.status(401).send("Image is required and should be less 1mb");
        }

        const EventCreate = await new Event(req.fields);
        if (mainImage) {
            EventCreate.mainImage.data = fs.readFileSync(mainImage.path),
                EventCreate.mainImage.contentType = mainImage.type,
                EventCreate.mainImage.Name = mainImage.name
        }
        if (Images.length) {
            for (let i = 0; i < Images.length; i++) {
                EventCreate.Images.push({
                    data: fs.readFileSync(Images[i].path),
                    contentType: Images[i].type,
                    Name: Images[i].name
                })
            }
        } else {
            EventCreate.Images.push({
                data: fs.readFileSync(Images.path),
                contentType: Images.type,
                Name: Images.name
            })
        }
        await EventhandlerManage(eventHandler, year, EventCreate._id)
        await EventCreate.save();
        return res.status(200).send({
            message: "Event has been Created",
            Success: true,
            data: EventCreate
        })

    } catch (error) {
        console.log(error);
    }
}

const EventImageDisplay = async (req, res) => {
    try {
        const { _id, Image_id } = req.params;
        const data = await Event.find({ _id }, { Images: { $elemMatch: { _id: Image_id } } });
        
        if (data) {
            res.set("Content-type", data[0].Images[0].contentType);
            return res.status(201).send(data[0].Images[0].data)
        }
    } catch (error) {
        console.log(error);
    }
}

const EventHandlerDeleteEvent = async (_id, name, year) => {
    try {
        const SearcheventHandler = await EventHandler.find({ name: name }).select("-images -HeaderImage");
        if (SearcheventHandler) {
            const EventDeleteFromEveHand = await EventHandler.updateOne({ name: name, "Years.year": year }, {
                $pull: {
                    "Years.$.Events": {
                        Event_id: _id
                    }
                }
            })

            console.log(EventDeleteFromEveHand);
        }
    } catch (error) {
        console.log(error);
    }
}

const EventDelete = async (req, res) => {
    try {
        const { _id } = req.params;

        const Search_Data = await Event.find({ _id });

        // console.log(Search_Data);

        if (Search_Data.length) {
            await EventHandlerDeleteEvent(Search_Data[0]._id, Search_Data[0].name, Search_Data[0].year);
            await Event.findByIdAndDelete({ _id });
            return res.status(200).send("Data deleted");
        } else {
            return res.status(404).send("data not exist")
        }
    } catch (error) {
        console.log(error);
    }
}

const EventMainImageDisplay = async (req,res) =>{
    try {
        const {_id} = req.params;

        const SearchData = await Event.findById({_id}).select("mainImage");

        if(SearchData){
            res.set("Content-type", SearchData.mainImage.contentType);
            return res.status(201).send(SearchData.mainImage.data)
        }else{
            return res.status(404).send("Data NotFound");
        }

    } catch (error) {
        console.log(error);
    }
}

const SingleEventDisplay = async (req,res) =>{
    try {
        const {_id} = req.params;

        const SearchData = await Event.findById({_id}).select("-Images, mainImage");

        if(SearchData){
            return res.status(200).send(SearchData);
        }
    } catch (error) {
        console.log(error);
    }
}

const EventUpdate = async (req, res) => {
    try {
        const { _id } = req.params;
        const { detail, name, year, eventHandler } = req.fields;
        const { mainImage, Images } = req.files;

        const Search_Data = await Event.findById({ _id });

        if (Search_Data) {

            if (!detail) {
                return res.status(401).send("Info is required");
            } else if (!name) {
                return res.status(401).send("Name is required");
            } else if (!year) {
                return res.status(401).send("Year is required");
            } else if (!eventHandler) {
                return res.status(401).send('select Event Handler');
            } else if (mainImage && mainImage.size > 1000000) {
                return res.status(401).send("Image is required and should be less 1mb");
            }

            const EventUpdateData = await Event.findByIdAndUpdate({ _id },
                { ...req.fields },
                { new: true });

            if (mainImage) {
                EventUpdateData.mainImage.data = fs.readFileSync(mainImage.path),
                EventUpdateData.mainImage.contentType = mainImage.type,
                EventUpdateData.mainImage.Name = mainImage.name
            }

            if (Images.length) {
                for (let i = 0; i < Images.length; i++) {
                    EventUpdateData.Images.push({
                        data: fs.readFileSync(Images[i].path),
                        contentType: Images[i].type,
                        Name: Images[i].name
                    })
                }
            } else {
                EventUpdateData.Images.push({
                    data: fs.readFileSync(Images.path),
                    contentType: Images.type,
                    Name: Images.name
                })
            }

            await EventUpdateData.save();
            return res.status(201).send({
                Success : true ,
                message : "Data Updated",
                data : EventUpdateData
            })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    EventAdd,
    EventImageDisplay,
    EventDelete,
    EventUpdate,
    EventMainImageDisplay,
    SingleEventDisplay
}
