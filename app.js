const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listings.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/tripnest"

const path = require("path")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended : true}))

main().then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err))

async function main() {
    await mongoose.connect(MONGO_URL)
}

app.get("/",(req,res) => {
    res.send("hii, i am root")
})

// index route
app.get("/listings",async (req,res) => {
    let allListings = await Listing.find({});
    console.log("data fetched")
    res.render("./listings/index.ejs",{allListings})
})

// show route
app.get("/listings/:id",async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id)
    res.render("./listings/show.ejs",{listing})
})

app.listen(8080,() => {
    console.log("server is running on port 8080")
})