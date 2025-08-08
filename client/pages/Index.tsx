import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import Header from "../components/Header";
import TourCard from "../components/TourCard";
import FilterSidebar from "../components/FilterSidebar";
import { Tour, TourListResponse } from "../types/tour";

export default function Index() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [durationFilter, setDurationFilter] = useState({ min: 1, max: 30 });
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 5000 });

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    filterAndSortTours();
  }, [tours, searchQuery, sortBy, durationFilter, priceFilter]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/c/b3a6-28bd-48d3-9f64");
      const data: TourListResponse = await response.json();
      
      // Transform the API data to match our Tour interface
      const transformedTours = data.data.map(tour => ({
        ...tour,
        actualPrice: tour.discountedPrice * 1.2, // Calculate actual price from discounted
        wishlist: false
      }));
      
      setTours(transformedTours);
    } catch (error) {
      console.error("Error fetching tours:", error);
      // Fallback mock data
      setTours([
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1598275277521-1885382d523a",
          discountInPercentage: "17%",
          title: "Himalayan Trek Adventure",
          description: "14-day trek through the Himalayas",
          duration: "14Days/13Night",
          actualPrice: 1200,
          discountedPrice: 1000,
          wishlist: false
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          discountInPercentage: "20%",
          title: "Mountain Expedition",
          description: "7-day mountain climbing adventure",
          duration: "7Days/6Night",
          actualPrice: 800,
          discountedPrice: 640,
          wishlist: false
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1464822759844-d150baec76b1",
          discountInPercentage: "15%",
          title: "Alpine Discovery",
          description: "10-day alpine exploration",
          duration: "10Days/9Night",
          actualPrice: 1000,
          discountedPrice: 850,
          wishlist: false
        },
        {
          id: 4,
          image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
          discountInPercentage: "25%",
          title: "Desert Safari",
          description: "5-day desert expedition",
          duration: "5Days/4Night",
          actualPrice: 600,
          discountedPrice: 450,
          wishlist: false
        },
        {
          id: 5,
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          discountInPercentage: "12%",
          title: "Forest Trail",
          description: "3-day forest hiking",
          duration: "3Days/2Night",
          actualPrice: 400,
          discountedPrice: 352,
          wishlist: false
        },
        {
          id: 6,
          image: "https://images.unsplash.com/photo-1464822759844-d150baec76b1",
          discountInPercentage: "18%",
          title: "Coastal Adventure",
          description: "6-day coastal exploration",
          duration: "6Days/5Night",
          actualPrice: 750,
          discountedPrice: 615,
          wishlist: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTours = () => {
    let filtered = tours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tour.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const durationDays = parseInt(tour.duration.split('Days')[0]);
      const matchesDuration = durationDays >= durationFilter.min && durationDays <= durationFilter.max;
      
      const matchesPrice = tour.discountedPrice >= priceFilter.min && tour.discountedPrice <= priceFilter.max;
      
      return matchesSearch && matchesDuration && matchesPrice;
    });

    // Sort tours
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "price-low":
          return a.discountedPrice - b.discountedPrice;
        case "price-high":
          return b.discountedPrice - a.discountedPrice;
        default:
          return 0;
      }
    });

    setFilteredTours(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tours...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <FilterSidebar
          onDurationChange={(min, max) => setDurationFilter({ min, max })}
          onPriceChange={(min, max) => setPriceFilter({ min, max })}
        />
        
        <div className="flex-1 p-6">
          {/* Search and Sort Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tours, destinations, activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-80"
                />
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Search
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">
                {filteredTours.length} tours found
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Tour Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tours match your criteria</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
