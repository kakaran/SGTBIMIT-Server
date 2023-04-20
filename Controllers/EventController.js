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

const EventImageDisplay = async (req,res) =>{ 
    try {
        const {_id,Image_id} = req.params;

        const data = await Event.find({_id},{Images : {$elemMatch :{_id : Image_id}}});

        if(data){
            res.set("Content-type",data.Images[0].contentType);
            return res.status(201).send(data.Images[0].data)
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    EventAdd,
    EventImageDisplay
}
