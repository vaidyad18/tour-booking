import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Clock } from "lucide-react";
import { Tour } from "../types/tour";

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(tour.wishlist || false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-48 object-cover"
        />
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {tour.discountInPercentage} OFF
        </div>
        {/* Wishlist Heart */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2">{tour.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{tour.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>{tour.duration}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${tour.discountedPrice}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${tour.actualPrice}
            </span>
            <span className="text-xs text-gray-500">per person</span>
          </div>
          
          <Link
            to={`/tour/${tour.id}`}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
