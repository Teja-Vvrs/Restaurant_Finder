import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`https://restaurant-finder123.onrender.com/api/restaurants/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant details");
        }
        const data = await response.json();
        setRestaurant(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchRestaurantDetails();
  }, [id]);

  if (loading) return <div className="text-center text-xl text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg">Error: {error}</div>;

  return (
    <motion.div 
      className="mt-10 p-8 bg-gradient-to-r from-emerald-800 to-indigo-600 shadow-lg rounded-lg text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section - Image & Rating */}
        <div className="relative">
          <motion.img
            src={restaurant.featured_image || "https://via.placeholder.com/600"}
            alt={restaurant.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg text-lg font-semibold">
            ⭐ {restaurant.user_rating?.aggregate_rating || "N/A"}
          </div>
        </div>

        {/* Right Section - Details */}
        <div>
          <h1 className="text-5xl font-bold mb-3">{restaurant.name}</h1>
          <p className="text-lg italic text-gray-200">{restaurant.location?.locality || "Location not available"}</p>
          <div className="mt-4 space-y-3">
            <p><b>Cuisine:</b> {restaurant.cuisines || "N/A"}</p>
            <p><b>Address:</b> {restaurant.location?.address || "N/A"}</p>
            <p><b>Cost for Two:</b> ₹{restaurant.average_cost_for_two || "N/A"}</p>
            <p><b>Phone:</b> {restaurant.phone_numbers || "Not available"}</p>
          </div>
          {restaurant.url && (
            <a
              href={restaurant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              Visit Website
            </a>
          )}
        </div>
      </div>

      {/* Menu Section */}
      {restaurant.menu_url && (
        <div className="mt-10 p-6 bg-white text-black rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Menu</h2>
          <a
            href={restaurant.menu_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-lg"
          >
            🍽 Click here to view menu
          </a>
        </div>
      )}
    </motion.div>
  );
};

export default RestaurantDetails;
