import PartyPalace from "../models/PartyPalace.js";
import Venue from "../models/Venue.js";


// CREATE
export const createPartyPalace = async (req,res,next) => {
    const newPartyPalace = new PartyPalace(req.body);
    
    try{
        const savedPartyPalace = await newPartyPalace.save()
        res.status(200).json(savedPartyPalace);
    }catch(err){
        next(err);
    }
};

//UPDATE
export const updatePartyPalace = async (req,res,next) => {
    try{
        const updatedPartyPalace = await PartyPalace.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true});
        res.status(200).json(updatedPartyPalace);
    }catch(err){
        next(err);
    }
};

//DELETE
export const deletePartyPalace = async (req,res,next) => {
    try{
        await PartyPalace.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("PartyPalace has been successfully Deleted!!!");
    }catch(err){
        next(err);
    }
};

//GET 
export const getPartyPalace = async (req,res,next) => {
    try{
        const partyPalace = await PartyPalace.findById(
            req.params.id
            );
        res.status(200).json(partyPalace);
    }catch(err){
        next(err);
    }
};

//GET ALL
export const getPartyPalaces = async (req,res,next) => {
    const { min, max, ...others } = req.query;
    try{
        const partyPalaces = await PartyPalace.find({...others, 
            cheapestPrice: {
                $gt:min | 1, $lt: max || 999
            },
        }).limit(req.query.limit);
        res.status(200).json(partyPalaces);
    }catch(err){
        next(err);
    }
};

export const countByCity = async (req,res,next) => {
    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city=>{
            return PartyPalace.countDocuments({city:city});
        }))
        res.status(200).json(list);
    }catch(err){
        next(err);
    }
};

export const countByType = async (req,res,next) => {
    try {
        const partyPalaceCount = await  PartyPalace.countDocuments({type:"PartyPalace"});
        const seminaHallCount = await PartyPalace.countDocuments({type:"SeminarHall"});
        const hotelCount = await PartyPalace.countDocuments({type:"Hotel"});
        const banquetCount = await PartyPalace.countDocuments({type:"Banquet"});
       
        res.status(200).json([
            {type: "PartyPalace", count: partyPalaceCount},
            {type: "SeminarHalls", count: seminaHallCount},
            {type: "Hotels", count: hotelCount},
            {type: "Banquet", count: banquetCount},
        ]);
    }catch(err){
        next(err);
    }
};

export const getPartyPalaceVenues = async (req, res, next) => {
    try{
        const partyPalace = await PartyPalace.findById(req.params.id);
        const list = await Promise.all(partyPalace.venues.map(venue=>{
            return Venue.findById(venue);
        })
        );
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
};