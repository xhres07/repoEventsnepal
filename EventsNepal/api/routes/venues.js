import express from "express";
import { createVenue, 
        deleteVenue, 
        getVenue, 
        getVenues, 
        updateVenue, 
        updateVenueAvailability } 
        from "../controllers/venue.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/:partyPalaceId",verifyAdmin, createVenue);

//Update
router.put("/:id",verifyAdmin, updateVenue);
router.put("/availability/:id", updateVenueAvailability);

//Delete
router.delete("/:id/:partyPalaceId",verifyAdmin, deleteVenue);

//Get
router.get("/:id", getVenue);

//Get All
router.get("/", getVenues);


export default router