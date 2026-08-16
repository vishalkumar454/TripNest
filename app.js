const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listings.js")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")

const MONGO_URL = "mongodb://127.0.0.1:27017/tripnest"
const path = require("path")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)

main().then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err))

async function main() {
    await mongoose.connect(MONGO_URL)
}

app.get("/",(req,res) => {
    res.send("hii, i am Tripnest page")
})

// index route
app.get("/listings",async (req,res) => {
    let allListings = await Listing.find({})
    res.render("./listings/index.ejs",{allListings})
})

// New route
app.get("/listings/new",(req,res) => {
    res.render("./listings/new.ejs")
})

// show route
app.get("/listings/:id",async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id)
    res.render("./listings/show.ejs",{listing})
})

// create route
app.post("/listings",async (req,res) => {
    const newListing = await new Listing(req.body.listing)
    await newListing.save()
    res.redirect("/listings")
})

// edit route
app.get("/listings/:id/edit",async (req,res) => {
    let {id} = req.params
    let userData = await Listing.findById(id);
    res.render("./listings/edit.ejs",{userData})
})

// update route
app.put("/listings/:id",async (req,res) => {
    let {id} = req.params
    let listing = req.body.listing
    await Listing.findByIdAndUpdate(id,listing)
    res.redirect(`/listings/${id}`)
})

// delete route
app.delete("/listings/:id",async (req,res) => {
    let {id} = req.params
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
})

app.listen(8080,() => {
    console.log("server is running on port 8080")
})