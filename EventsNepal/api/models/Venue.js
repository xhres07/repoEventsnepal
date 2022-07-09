import mongoose from "mongoose";
const VenueSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required:true,
    },
    maxPeople: {
        type: Number,
        required:true,
    },
    desc: {
        type: String,
        required:true,
    },
    menue: 
        [{ Menue: String, unavailableDates: {type: [Date]}}],
    }, 

{timestamps:true}
);

export default mongoose.model("Venue", VenueSchema);