import express from 'express'
import {createTour, updateTour,deleteTour,getSingleTour,getAllTour,getTourBySearch,getFeaturedTour,getTourCount
} from './../controllers/tourController.js';

import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

router.post("/createtour",verifyAdmin, createTour);
// update tour
router.put("/:id",verifyAdmin, updateTour);
//get delete tour
router.delete("/:id",verifyAdmin, deleteTour);
// get single tours
router.get("/:id", getSingleTour);
// get all tours
router.get("/", getAllTour);

// get  tour by search
router.get("/search/getTourBySearch",getTourBySearch);
router.get("/search/getFeaturedTours",getFeaturedTour);
router.get("/search/getTourCount",getTourCount);

export default router;