const calendarModel = require('../Models/Calendar')


//Add
const CalendarAdd = async(req,res) => {
    
    try {
        
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
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


//delete
const CalendarUpdate = async(req,res) => {

    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}

//updtae
const CalendarDelete = async(req,res) => {

    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error'
        })
    }
}


module.exports = {CalendarAdd, CalendarDisplay, CalendarSingle, CalendarDelete, CalendarUpdate};