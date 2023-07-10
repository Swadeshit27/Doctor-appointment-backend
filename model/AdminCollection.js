const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    catagory: {
        type: String,
        required: [true, "please enter the catagory"],    
    },
    listofDoctors: [{
        name: {
            type: String,
            required: [true,"please enter doctor's name"],    
        },
        photo: {
            type: String,
            required: [true,"please enter doctor's photo"],    
        },
        qual: {
            type: String,
            required: [true, "please enter doctor's qualifation"],    
        },
        special: {
            type: String,
            required: [true, "please enter doctor's specialification"],    
        },
        exp: {
            type: Number,
            required: [true, "please enter doctor's experience"],    
        },
        fee: {
            type: Number,
            required: [true, "please enter doctor's fee"],    
        },
        rating: {
            type: Number,
            required: [true, "please enter doctor's fee"],    
        },
        shortAdd: {
            type: String,
            required: [true, "please enter doctor's Clinic short address"],
        },
        info: {
            type: String,
            required: [true, "please enter doctor's information"],
        },
        clinicDetails: {
            clinicName: {
                    type: String,
                    required: [true, "please enter doctor's clinic name"],
            },
            address: {
                    type: String,
                    required: [true, "please enter doctor's clinic full address"],
            },
            week: {
                    type: String,
                    required: [true, "please enter doctor's clinic date"],
            },
            timing: {
                    type: String,
                    required: [true, "please enter doctor's clinic time"],
            },
            helpNo: {
                    type: String,
                    required: [true, "please enter doctor's clinic helpline no"],
            },
        }
    }],
});
module.exports = mongoose.model("DoctorData", DoctorSchema)