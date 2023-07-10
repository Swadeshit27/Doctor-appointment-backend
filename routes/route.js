require("dotenv").config();
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload")
const DoctorData = require("../model/AdminCollection")
const PatientData = require("../model/patientData");
const { userRegistor, userLogin, userDetail } = require("../controlers/control");
const authenticate = require("../middleware/auth");
const Review = require("../model/Review");

router.get("/", (req, res) => {
    console.log("hello i am home page");
    res.send("hello this is home page router js");
}); 

// user sign up route
router.post("/signup", upload.single("photo"), userRegistor);
// user log in  route
router.post("/login", userLogin);
//  user details
router.post("/userdata", authenticate, userDetail)


// send doctor list
router.get("/doctorsData", async(req, res) => {
    try {
        const list = await DoctorData.find({})
        res.status(201).json({ list, success: true })
    } catch (error) {
        res.status(401).json({ success: false })
        console.log(error)
    }
}) 
 
//For inser data of doctors
router.post("/doctorData", upload.single("photo"), async (req, res) => {
    console.log("backend part")
    const photo = req.file.filename;
    const { name, qual, special, exp, fee, rating, shortAdd, info, catagory } = req.body;
    const { clinicName, week, timing, address, helpNo } = req.body;
    try {
        const findCatagory = await DoctorData.findOne({ catagory });
        if (!findCatagory) {  
            const doc = await DoctorData.create({ catagory });
            await doc.save();
        } 
        const docData = await DoctorData.findOneAndUpdate({ catagory },
            {
                $push: {
                    listofDoctors: { name, qual, photo, special, exp, fee, rating, shortAdd, info, clinicDetails: { clinicName, week, timing, address, helpNo } }
                }
            });
        res.status(201).json({ message: "doctor's data added", data: docData, success: true });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error, data: error, success: false });
    }
});

//patient appoitment  information
router.post("/patientdata", async (req, res) => {
    try {
        const { patient, mobile, time, date, gender, age, problem, docname, clinic, address, fee, bookingTime } = req.body.patientData;
        const patientData = new PatientData({
            patient, mobile, time, date, gender, age, problem, docname, clinic, address, fee,bookingTime
        });
        await patientData.save();
        res.status(201).json({ message: "Appoitment booking successful", success: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "server error", success: false });
    }
})

// getpatient information
router.post("/getpatient", async (req, res) => {
    try {
        const patient = req.body.inputval;
        const data = await PatientData.find({ mobile: patient });
        if (!data) res.status(404).json({ message: "you did not book any appoitment", success: false })
        res.status(201).json({ data, success: true })
    } catch (error) {
        res.status(404).json({ message: "server error", success: false })
    }
})

// create review route
router.post("/userReview", async (req, res) => {
    try {
        const { name, profession, rate, reviewData } = req.body.revData;
        await Review.create({
            name, profession, rate, reviewData
        })
        res.status(201).json({ success: true, message: "Thank you for review us" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "internal error" })
    }
})
// send client review list
router.get("/getReview", async (req, res) => {
    try {
        const data = await Review.find({});
        res.status(201).json({ success: true, data })
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false})
    }
})

module.exports = router;
