import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DualRangeSlider from "./DualRangeSlider";

interface FilterSidebarProps {
  onDurationChange: (min: number, max: number) => void;
  onPriceChange: (min: number, max: number) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({ onDurationChange, onPriceChange, isOpen = true, onClose }: FilterSidebarProps) {
  const [isDurationOpen, setIsDurationOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [durationRange, setDurationRange] = useState({ min: 1, max: 30 });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  return (
    <div className={`w-64 ${isOpen ? 'block' : 'hidden'} md:block`}>
      <div className="sticky top-4 space-y-4 animate-slide-in-left">
        <h2 className="text-lg font-semibold text-gray-900 ml-6 transform transition-all duration-300 hover:scale-105 hover:text-red-600">
          Criteria
        </h2>
        <div className="bg-white p-6 border-r border-gray-200 ml-6 rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm">
          {/* Duration Filter */}
          <div className="mb-6 transform transition-all duration-300 hover:translate-x-1">
            <button
              onClick={() => setIsDurationOpen(!isDurationOpen)}
              className="flex items-center justify-between w-full text-left text-gray-900 font-medium mb-3 group transition-all duration-200 hover:text-red-600"
            >
              <span className="transition-transform duration-200 group-hover:scale-105">Duration</span>
              <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                {isDurationOpen ? (
                  <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                )}
              </div>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isDurationOpen ? 'max-h-32 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
            }`}>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm text-gray-600 transform transition-all duration-300 hover:text-gray-800">
                  <span className="transition-transform duration-200 hover:scale-105">1 Days</span>
                  <span className="transition-transform duration-200 hover:scale-105">30 Days</span>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <DualRangeSlider
                    min={1}
                    max={30}
                    value={[durationRange.min, durationRange.max]}
                    onChange={([min, max]) => {
                      setDurationRange({ min, max });
                      onDurationChange(min, max);
                    }}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6 transform transition-all duration-300 hover:translate-x-1">
            <button
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="flex items-center justify-between w-full text-left text-gray-900 font-medium mb-3 group transition-all duration-200 hover:text-red-600"
            >
              <span className="transition-transform duration-200 group-hover:scale-105">Price Range</span>
              <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                {isPriceOpen ? (
                  <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                )}
              </div>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isPriceOpen ? 'max-h-32 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
            }`}>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm text-gray-600 transform transition-all duration-300 hover:text-gray-800">
                  <span className="transition-transform duration-200 hover:scale-105">$0</span>
                  <span className="transition-transform duration-200 hover:scale-105">$5000</span>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <DualRangeSlider
                    min={0}
                    max={5000}
                    value={[priceRange.min, priceRange.max]}
                    onChange={([min, max]) => {
                      setPriceRange({ min, max });
                      onPriceChange(min, max);
                    }}
                    step={50}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
