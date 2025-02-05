const express = require('express');
const router = express.Router();
const getRestaurantId = require("../controllers/RestaurantController");
const locationR  = require("../controllers/locationController");
const getRestaurants=require("../controllers/Rlists")

router.get("/restaurants/:id", getRestaurantId);
router.get("/location", locationR); 
router.get("/restaurants",getRestaurants);
module.exports = router;