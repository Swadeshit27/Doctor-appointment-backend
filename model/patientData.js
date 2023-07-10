const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    patient: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    problem: {
        type: String,
        required: true,
    },
    docname: {
        type: String,
        required: true,
    },
    clinic: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    fee: {
        type: String,
        required: true,
    },
    bookingTime: {
        type: Date,
        required: true,
    },
});
module.exports = mongoose.model("PatientData", PatientSchema)