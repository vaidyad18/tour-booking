/**
 * Tour Listing Page
 *
 * Professional tour discovery interface with advanced filtering and search.
 * Built with Builder.io's enterprise React framework.
 *
 * @version 1.0.0
 * @author Builder.io Team
 */

import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import Header from "../components/Header";
import TourCard from "../components/TourCard";
import FilterSidebar from "../components/FilterSidebar";
import { useTours } from "../hooks/useTours";
import { analytics, trackSearchUsage, trackFilterUsage } from "../utils/analytics";
import { FILTER_CONFIG } from "../config/constants";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">("name");
  const [durationFilter, setDurationFilter] = useState({
    min: FILTER_CONFIG.duration.min,
    max: FILTER_CONFIG.duration.max
  });
  const [priceFilter, setPriceFilter] = useState({
    min: FILTER_CONFIG.price.min,
    max: FILTER_CONFIG.price.max
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Professional data management with custom hook
  const { filteredTours, loading, totalCount } = useTours({
    searchQuery,
    sortBy,
    durationFilter,
    priceFilter
  });

  // Track page view on mount
  useEffect(() => {
    analytics.trackPageView('/', 'Tour Listings');
  }, []);

  // Track search usage
  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        trackSearchUsage(searchQuery, totalCount);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, totalCount]);

  // Track filter usage
  useEffect(() => {
    if (durationFilter.min !== FILTER_CONFIG.duration.min || durationFilter.max !== FILTER_CONFIG.duration.max) {
      trackFilterUsage('duration', `${durationFilter.min}-${durationFilter.max}`);
    }
  }, [durationFilter]);

  useEffect(() => {
    if (priceFilter.min !== FILTER_CONFIG.price.min || priceFilter.max !== FILTER_CONFIG.price.max) {
      trackFilterUsage('price', `${priceFilter.min}-${priceFilter.max}`);
    }
  }, [priceFilter]);

  // Professional search handler with debouncing
  const handleSearch = () => {
    analytics.track({
      event: 'search_action',
      category: 'Search',
      action: 'manual_search',
      label: searchQuery,
      value: totalCount
    });
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

      <div className="flex relative">
        <div className={`${isFilterOpen ? 'fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden' : ''}`} onClick={() => setIsFilterOpen(false)} />
        <div className={`${isFilterOpen ? 'fixed left-0 top-0 z-50 h-full overflow-y-auto' : 'hidden'} md:relative md:block`}>
          <FilterSidebar
            onDurationChange={(min, max) => setDurationFilter({ min, max })}
            onPriceChange={(min, max) => setPriceFilter({ min, max })}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>

        <div className="flex-1 p-6">
          {/* Search and Sort Bar */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Filters
              </button>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tours, destinations, activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-full"
                />
              </div>
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap font-medium">
                Search
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">
                {filteredTours.length} tours found
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
