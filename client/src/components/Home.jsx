import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon, SearchIcon, LocationMarkerIcon, GlobeIcon, ViewListIcon, CameraIcon } from "@heroicons/react/solid";

const Home = () => {
  const [search, setSearch] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState(100);
  const [theme, setTheme] = useState("light");
  const [image, setImage] = useState(null);  // New state to store image
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeClasses = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/restaurants?query=${search.trim()}`);
    } else {
      navigate("/restaurants");
    }
  };

  const handleLocationSearch = () => {
    if (latitude && longitude) {
      navigate(`/restaurants/location?lat=${latitude}&lng=${longitude}&radius=${radius}`);
    }
  };

  const handleGeoLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          navigate(`/restaurants/location?lat=${latitude}&lng=${longitude}&radius=${radius}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please grant location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleImageSearch = () => {
    // if (image) {
    //     // Create a base64 string for the image
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         const base64Image = reader.result;
    //         // Now pass the base64 string along with any other state you need
            navigate("/restaurants/imgsearch")
    //             state: { image: base64Image },
    //         });
    //     };
    //     reader.readAsDataURL(image); // Read the image as base64
    // } else {
    //     alert("Please upload an image before searching.");
    // }
};



  const handleViewAll = () => {
    setSearch("");  
    navigate("/restaurants"); 
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-5 transition-colors duration-300 ${themeClasses}`} style={{ backgroundImage: `url(${theme === "dark" ? "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80" : "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80"})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <button onClick={toggleTheme} className="fixed top-4 right-4 p-2 rounded-full bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 transition-all duration-300">
        {theme === "light" ? <MoonIcon className="h-6 w-6 text-gray-900" /> : <SunIcon className="h-6 w-6 text-yellow-400" />}
      </button>

      <motion.h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Find Your Favorite Restaurants 🍽️
      </motion.h1>

      <motion.div className="w-full max-w-md mb-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <div className={`flex rounded-2xl shadow-lg overflow-hidden p-1 ${theme === "dark" ? "bg-gray-800" : "bg-gray-800"}`}>
          <input type="text" placeholder="Search by Name or ID..." className={`w-full border-none focus:ring-0 focus:outline-none px-3 bg-transparent ${theme === "dark" ? "text-white placeholder-gray-500" : "text-white placeholder-gray-500"}`} value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer" onClick={handleSearch}>
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      <motion.div className="w-full max-w-md" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <div className={`flex flex-col rounded-2xl shadow-lg overflow-hidden p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-800"}`}>
          <div className="flex items-center mb-2">
            <LocationMarkerIcon className={`h-5 w-5 mr-2 ${theme === "dark" ? "text-white" : "text-white"}`} />
            <input type="text" placeholder="Enter Latitude..." className={`w-full border-none focus:ring-0 focus:outline-none px-3 bg-transparent ${theme === "dark" ? "text-white placeholder-gray-500" : "text-white placeholder-gray-500"}`} value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          </div>
          <div className="flex items-center mb-2">
            <LocationMarkerIcon className={`h-5 w-5 mr-2 ${theme === "dark" ? "text-white" : "text-white"}`} />
            <input type="text" placeholder="Enter Longitude..." className={`w-full border-none focus:ring-0 focus:outline-none px-3 bg-transparent ${theme === "dark" ? "text-white placeholder-gray-500" : "text-white placeholder-gray-500"}`} value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          </div>
          <div className="flex items-center mb-2">
            <GlobeIcon className={`h-5 w-5 mr-2 ${theme === "dark" ? "text-white" : "text-white"}`} />
            <input type="number" placeholder="Enter Radius in km..." className={`w-full border-none focus:ring-0 focus:outline-none px-3 bg-transparent ${theme === "dark" ? "text-white placeholder-gray-500" : "text-white placeholder-gray-500"}`} value={radius} onChange={(e) => setRadius(e.target.value)} />
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center" onClick={handleLocationSearch}>
            <SearchIcon className="h-5 w-5 mr-2" />
            Search Nearby
          </button>
          <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center" onClick={handleGeoLocationSearch}>
            <LocationMarkerIcon className="h-5 w-5 mr-2" />
            Use My Location for Nearby Restaurants
          </button>
        </div>
      </motion.div>

      {/* Image Upload for Searching */}
      <motion.div className="w-full max-w-md mt-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <div className={`flex flex-col rounded-2xl shadow-lg overflow-hidden p-5 ${theme === "dark" ? "bg-gray-800" : "bg-gray-800"}`}>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center" onClick={handleImageSearch}>
            <CameraIcon className="h-5 w-5 mr-2" />
            Search by Image
          </button>
        </div>
      </motion.div>

      <div className="mt-6 flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center" onClick={handleViewAll}>
          <ViewListIcon className="h-5 w-5 mr-2" />
          View All Restaurants
        </button>
      </div>
    </div>
  );
};

export default Home;
