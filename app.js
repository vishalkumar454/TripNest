const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listings");

const MONGO_URL = "mongodb://127.0.0.1:27017/tripnest";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req,res) => {
    res.send("Hi, i am root1");
})

app.get("/testListing",async (req,res) => {

    let sampleListing = new Listing({
        title : "My new villa",
        description : "By the Beach",
        price : 1200,
        location : "Mumbai",
        Country : "India",
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("Successful testing");
});

app.listen(8080,() => {
    console.log("Server is listing to port 8080");
})