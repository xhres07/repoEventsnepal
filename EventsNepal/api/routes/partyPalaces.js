import express from "express";
import { countByCity, countByType, createPartyPalace, deletePartyPalace, getPartyPalace, getPartyPalaces,  getPartyPalaceVenues, updatePartyPalace } from "../controllers/partyPalace.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/",verifyAdmin, createPartyPalace);

//Update
router.put("/:id",verifyAdmin, updatePartyPalace);

//Delete
router.delete("/:id",verifyAdmin, deletePartyPalace);

//Get
router.get("/find/:id", getPartyPalace);

//Get All
router.get("/", getPartyPalaces);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/venue/:id", getPartyPalaceVenues);

export default router