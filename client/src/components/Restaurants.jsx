import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
  const location = useLocation();
  const history = useNavigate(); 

  const searchQuery = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (searchQuery !== searchTerm) {
      setSearchTerm(searchQuery);  
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        let url = `https://restaurant-finder123.onrender.com/api/restaurants?page=${page}&limit=20`;
        if (searchTerm) {
          url += `&search=${searchTerm}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setRestaurants(data.restaurants || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page, searchTerm]); 

  const filteredRestaurants = useMemo(() => {
    if (!searchTerm) return restaurants;
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisines.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [restaurants, searchTerm]);

  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    if (rating >= 2) return "bg-orange-500";
    return "bg-red-500";
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    history.push({ search: params.toString() });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Restaurant List</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search restaurants by name or cuisine..."
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id || restaurant.name} className="max-w-xs w-full bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src={restaurant.featured_image || restaurant.thumb || "https://placekitten.com/150/150"} 
                    alt={restaurant.name} 
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold truncate">{restaurant.name || "Unnamed Restaurant"}</h2>
                    <p className="mt-1 truncate">{restaurant.location?.city || "Unknown City"}</p>
                    <p className="mt-1 text-lg">Avg Cost: Rs. {restaurant.average_cost_for_two || "N/A"}</p>

                    <div className="flex items-center mt-3">
                      <span className={`px-3 py-1 text-white text-sm rounded-full ${getRatingColor(restaurant.user_rating?.aggregate_rating)}`}>
                        ⭐ {restaurant.user_rating?.aggregate_rating || "N/A"}
                      </span>
                      <span className="ml-2 text-gray-400">({restaurant.user_rating?.votes || 0} votes)</span>
                    </div>

                    <Link to={`/restaurant/${restaurant.id}`} className="block mt-4 text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Details → 
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No restaurants found.</p>
            )}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1} className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <span className="px-6 py-2 bg-gray-800 rounded-lg">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantsList;
