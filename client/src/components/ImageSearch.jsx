import { useState } from "react";

const ImageSearch = () => {
  const [image, setImage] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setError(null);
    } else {
      setError("Please upload a valid image file.");
      setImage(null);
    }
  };

  const fetchRestaurants = async () => {
    if (!image) {
      setError("No image selected. Please upload an image.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(
        "https://restaurant-production-06c2.up.railway.app/restaurants/imgsearch",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setRestaurants(data.restaurants || []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-screen-xl mx-auto bg-gray-900 text-white">
      <h2 className="text-center text-3xl font-semibold mb-5">Search Restaurants by Image</h2>
      
      {/* Flex container for input and button */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full sm:w-auto"
        />
        <button
          onClick={fetchRestaurants}
          disabled={loading}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 w-full sm:w-auto"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="border border-gray-700 p-4 rounded-lg text-center bg-gray-800 shadow-lg hover:shadow-xl transition duration-200">
            <img
              src={restaurant.featured_image || "https://via.placeholder.com/150"}
              alt={restaurant.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
            <p><strong>City:</strong> {restaurant.location.city || "N/A"}</p>
            <p><strong>Locality:</strong> {restaurant.location.locality_verbose || "N/A"}</p>
            <p><strong>Address:</strong> {restaurant.location.address || "N/A"}</p>
            <p><strong>Zipcode:</strong> {restaurant.location.zipcode || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
