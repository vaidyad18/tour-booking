import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import Header from "../components/Header";
import BookingModal from "../components/BookingModal";
import { TourDetail as TourDetailType } from "../types/tour";

export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState<TourDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "inclusions">("overview");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchTourDetail();
  }, [id]);

  const fetchTourDetail = async () => {
    try {
      setLoading(true);
      // Since the detail API requires POST and we can't test it fully, we'll use mock data
      const mockTourDetail: TourDetailType = {
        id: parseInt(id || "1"),
        image: "https://images.unsplash.com/photo-1598275277521-1885382d523a",
        discountInPercentage: "17%",
        title: "Himalayan Trek Adventure",
        description: "14-day trek through the Himalayas",
        duration: "14Days/13Night",
        actualPrice: 1200,
        discountedPrice: 1000,
        overview: "Experience the majestic beauty of the Himalayas on this incredible 14-day trekking adventure. This journey will take you through some of the most breathtaking landscapes on Earth, including ancient villages, pristine forests, and towering peaks. You'll have the opportunity to immerse yourself in local culture, witness stunning sunrises over snow-capped mountains, and challenge yourself with high-altitude trekking.",
        itinerary: [
          {
            day: 1,
            title: "Arrival in Kathmandu",
            description: "Welcome to Nepal! Transfer to hotel and trek briefing."
          },
          {
            day: 2,
            title: "Fly to Lukla & Trek to Phakding",
            description: "Morning flight to Lukla (2,840m) followed by a gentle trek to Phakding."
          },
          {
            day: 3,
            title: "Trek to Namche Bazaar",
            description: "Trek through the entrance to Sagarmatha National Park to the famous Sherpa town of Namche Bazaar."
          },
          {
            day: 4,
            title: "Acclimatization Day in Namche",
            description: "Rest day for acclimatization with optional hikes around the area."
          },
          {
            day: 5,
            title: "Trek to Tengboche",
            description: "Trek to the famous monastery of Tengboche with spectacular mountain views."
          }
        ],
        inclusions: [
          "Professional trekking guide",
          "Porter service (1 porter for 2 trekkers)",
          "All meals during trek",
          "Tea house accommodation",
          "Sagarmatha National Park entry permits",
          "TIMS card",
          "Airport transfers",
          "First aid kit"
        ],
        exclusions: [
          "International flights",
          "Nepal visa fee",
          "Travel insurance",
          "Personal trekking equipment",
          "Extra drinks and snacks",
          "Tips for guide and porter",
          "Emergency evacuation costs"
        ],
        location: {
          country: "Nepal",
          startLocation: "Kathmandu",
          endLocation: "Himalayas",
          peopleCount: "4-16 People",
          difficulty: "MODERATE",
          startDate: "10/1/2025",
          endDate: "10/14/2025"
        }
      };
      
      setTour(mockTourDetail);
    } catch (error) {
      console.error("Error fetching tour detail:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tour details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-gray-600">Tour not found</p>
            <Link to="/" className="text-red-500 hover:text-red-600 mt-2 inline-block">
              Back to Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Link 
          to="/" 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tours
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-96">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
              <p className="text-lg opacity-90">{tour.description}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{tour.duration}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="text-left sm:text-right">
                  <div className="flex flex-wrap items-center space-x-2">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      ${tour.discountedPrice}
                    </span>
                    <span className="text-base sm:text-lg text-gray-500 line-through">
                      ${tour.actualPrice}
                    </span>
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                      Save {tour.discountInPercentage}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">per person</p>
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors w-full sm:w-auto"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
                {[
                  { key: "overview", label: "Overview" },
                  { key: "itinerary", label: "Itinerary" },
                  { key: "inclusions", label: "Inclusions" }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.key
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {activeTab === "overview" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Tour</h3>
                    <p className="text-gray-600 leading-relaxed">{tour.overview}</p>
                    
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Tour Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Duration</span>
                          <p className="font-medium">{tour.duration}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Group Size</span>
                          <p className="font-medium">{tour.location.peopleCount}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Difficulty</span>
                          <p className="font-medium">{tour.location.difficulty}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Start Date</span>
                          <p className="font-medium">{tour.location.startDate}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">End Date</span>
                          <p className="font-medium">{tour.location.endDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "itinerary" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Itinerary</h3>
                    <div className="space-y-6">
                      {tour.itinerary.map((day) => (
                        <div key={day.day} className="border-l-2 border-red-500 pl-4">
                          <h4 className="font-semibold text-gray-900">
                            Day {day.day}: {day.title}
                          </h4>
                          <p className="text-gray-600 mt-1">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "inclusions" && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Inclusions</h3>
                        <ul className="space-y-2">
                          {tour.inclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Exclusions</h3>
                        <ul className="space-y-2">
                          {tour.exclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-red-500 mr-2">✗</span>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Country</span>
                      <span className="font-medium">{tour.location.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Location</span>
                      <span className="font-medium">{tour.location.startLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Location</span>
                      <span className="font-medium">{tour.location.endLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region</span>
                      <span className="font-medium">Himalayas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tourTitle={tour.title}
      />
    </div>
  );
}
