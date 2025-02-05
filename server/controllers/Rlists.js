const connectDb = require('../db');

const getRestaurants = async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection("restaurants");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search ? req.query.search.toLowerCase() : "";

    const query = searchQuery
      ? {
          $or: [
            { "restaurants.restaurant.name": { $regex: searchQuery, $options: "i" } },
            { "restaurants.restaurant.cuisines": { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};

    const totalRestaurants = await collection.aggregate([
      { $unwind: "$restaurants" },
      { $match: query },
      { $count: "total" },
    ]).toArray();

    const total = totalRestaurants.length ? totalRestaurants[0].total : 0;
    const totalPages = Math.ceil(total / limit);

    const result = await collection.aggregate([
      { $unwind: "$restaurants" },
      { $match: query }, 
      { $skip: skip },
      { $limit: limit },
      { $project: { "restaurant": "$restaurants.restaurant" } },
    ]).toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    res.json({
      page,
      limit,
      total,
      totalPages,
      restaurants: result.map(r => r.restaurant),
    });

  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getRestaurants;
