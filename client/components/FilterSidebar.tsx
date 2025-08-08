import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DualRangeSlider from "./DualRangeSlider";

interface FilterSidebarProps {
  onDurationChange: (min: number, max: number) => void;
  onPriceChange: (min: number, max: number) => void;
}

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

  const handleDurationChange = (type: 'min' | 'max', value: number) => {
    const newRange = { ...durationRange, [type]: value };
    setDurationRange(newRange);
    onDurationChange(newRange.min, newRange.max);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onPriceChange(newRange.min, newRange.max);
  };

  return (
    <div className={`w-64 bg-white p-6 border-r border-gray-200 ${isOpen ? 'block' : 'hidden'} md:block`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Criteria</h2>
      
      {/* Duration Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsDurationOpen(!isDurationOpen)}
          className="flex items-center justify-between w-full text-left text-gray-900 font-medium mb-3"
        >
          <span>Duration</span>
          {isDurationOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {isDurationOpen && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>1 Days</span>
              <span>30 Days</span>
            </div>
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
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-left text-gray-900 font-medium mb-3"
        >
          <span>Price Range</span>
          {isPriceOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {isPriceOpen && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>$5000</span>
            </div>
            <div className="relative">
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-red-500 rounded"
                  style={{
                    marginLeft: `${(priceRange.min / 5000) * 100}%`,
                    width: `${((priceRange.max - priceRange.min) / 5000) * 100}%`
                  }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
