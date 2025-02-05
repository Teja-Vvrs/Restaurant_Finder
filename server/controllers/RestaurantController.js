const connectDb = require("../db");

const getRestaurantId = async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection("restaurants");
    if (!collection) {
      return res.status(500).json({ message: "Database connection failed" })
    }
    const res_id = req.params.id || req.query.id;
    if (!res_id) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }
    const data = await collection.findOne({ "restaurants.restaurant.id": res_id });

    if (!data) {
      return res.status(404).json({ message: "No restaurant found" });
    }
    const restaurant=data.restaurants.find( r => r.restaurant.id==res_id);
    res.json(restaurant.restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getRestaurantId;