import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const LocationSearch = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState(100);  // Default to 100 km for geolocation
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const rad = searchParams.get("radius") || 100; // Default radius is 100 km

    if (lat && lng) {
      setLatitude(lat);
      setLongitude(lng);
      setRadius(rad);
      fetchRestaurants(lat, lng, rad);
    }
  }, [searchParams]);

  const fetchRestaurants = async (lat, lng, radius) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/location?lat=${lat}&lng=${lng}&radius=${radius}`
      );
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Restaurants Around You 🌎
      </motion.h1>

      {loading ? (
        <motion.div
          className="text-center text-xl text-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {restaurant.restaurant.featured_image ? (
                  <motion.img
                    src={restaurant.restaurant.featured_image}
                    alt={restaurant.restaurant.name}
                    className="w-full h-48 object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {restaurant.restaurant.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {restaurant.restaurant.location.address}
                  </p>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="ml-1 text-gray-700">
                      {restaurant.restaurant.user_rating.aggregate_rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center text-gray-500 col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No restaurants found within {radius} km.
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LocationSearch;
  