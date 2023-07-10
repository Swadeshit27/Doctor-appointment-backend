const mongoose = require("mongoose");
const colors=require("colors");
const { error } = require("console");

const uri = process.env.MONGODB_URL ;

async function run() {
    try {
        await mongoose.connect(uri)
        console.log("connected to database".bgGreen.yellow)
    } catch {
        console.log("no connection".bgRed.white , error)
    }
}
run().catch(console.error);      