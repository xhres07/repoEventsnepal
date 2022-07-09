import Venue from "../models/Venue.js";
import PartyPalace from "../models/PartyPalace.js";
import { createError } from "../utils/error.js";

export const createVenue = async (req, res, next) => {

    const partyPalaceId = req.params.partyPalaceId;
    const newVenue = new Venue(req.body);

    try{
        const savedVenue = await newVenue.save();
        try{
            await PartyPalace.findByIdAndUpdate(partyPalaceId, {
                $push: { venues: savedVenue._id },
            });
        }catch(err) {
            next(err);
        }
        res.status(200).json(savedVenue);
    }catch(err) {
        next(err);
    }
};

//UPDATE
export const updateVenue = async (req,res,next) => {
    try{
        const updatedVenue = await Venue.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true})
        res.status(200).json(updatedVenue);
    }catch(err){
        next(err);
    }
};

//DELETE
export const deleteVenue = async (req,res,next) => {
    const partyPalaceId = req.params.partyPalaceId;
    
    try{
        await Venue.findByIdAndDelete(
            req.params.id
        );
        try{
            await PartyPalace.findByIdAndUpdate(partyPalaceId, {
                $pull: { venues: req.params.id },
            });
        }catch(err) {
            next(err);
        }
        res.status(200).json("Venue has been successfully Deleted!!!")
    }catch(err){
        next(err);
    }
};

//GET 
export const getVenue = async (req,res,next) => {
    try{
        const venue = await Venue.findById(
            req.params.id
            );
        res.status(200).json(venue);
    }catch(err){
        next(err);
    }
};

//GET ALL
export const getVenues = async (req,res,next) => {
    try{
        const venues = await Venue.find();
        res.status(200).json(venues);
    }catch(err){
        next(err);
    }
};

export const updateVenueAvailability = async (req,res,next) => {
    try{
        await Venue.updateOne({"Menue._id": req.params.id},
        {
            $push: {
                "Menue.$.unavailableDates": req.body.dates
            },
        });
        res.status(200).json("Room status has been Updated!!!");
    }catch(err){
        next(err);
    }
};