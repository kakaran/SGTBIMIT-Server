const calendarModel = require('../Models/Calendar')


//Add
const CalendarAdd = async(req,res) => {
    
    try {

        const {Date, Event} = req.body;

        if (!Date || !Event) { 
            return res.status(401).send("All fields are required");
        }

        const create = await new calendarModel({
            Date,
            Event,
        }).save();

        return res.status(200).send(create)
                
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


//display
const CalendarDisplay = async(req,res) => {

    try {

        const c_display = await calendarModel.find();

        if (!c_display) {
           return res.status(401).send("Data is not there");
        }

        return res.status(200).send(c_display);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


//single display
const CalendarSingle = async(req,res) => {

    try {

        const c_sdisplay = await calendarModel.findById(req.params.id)

        if (!c_sdisplay) {
           return res.status(401).send("No event found");
        }

        return res.status(200).send(c_sdisplay);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


//updtae
const CalendarUpdate = async(req,res) => {

    try {

        const _id = req.params.id;
        
        const c_update = await calendarModel.findById(_id);
        
        if (!c_update) {
            return res.status(401).send("No event found");
        }
        
         const data = {
             Date : req.body.Date,
             Event : req.body.Event
         }

        const final = await calendarModel.findByIdAndUpdate(c_update, data, {new:true});

        return res.status(200).send(final);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


//delete
const CalendarDelete = async(req,res) => {

    try {

        const c_delete = await calendarModel.findById(req.params.id);

        if (!c_delete) {
           return res.status(401).send("No event found");
        }

        const final = await calendarModel.findByIdAndDelete(c_delete);

        return res.status(200).send(`${final.Event} deleted successfully`);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}




module.exports = {CalendarAdd, CalendarDisplay, CalendarSingle, CalendarDelete, CalendarUpdate};