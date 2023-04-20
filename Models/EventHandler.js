const mongoose = require('mongoose');

const EvendHandlerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    HeaderImage: {
        data: Buffer, contentType: String, Name: String
    },
    detail: {
        type: String,
    },
    images: [{ data: Buffer, contentType: String, Name: String }],
    Years: [{
        year: {
            type: String
        },
        Events: [{
            Event_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event"
            }
        }]
    }],
}, {
    timestamps: true
});

const EventHandler = mongoose.model("EventHandler", EvendHandlerSchema);

module.exports = EventHandler;