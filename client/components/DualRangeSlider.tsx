import { useState, useRef, useCallback, useEffect } from "react";

interface DualRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  className?: string;
}

export default function DualRangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  className = ""
}: DualRangeSliderProps) {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return min;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    return Math.round(rawValue / step) * step;
  }, [min, max, step]);

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newValue = getValueFromPosition(e.clientX);
    const [currentMin, currentMax] = value;
    
    if (isDragging === 'min') {
      onChange([Math.min(newValue, currentMax), currentMax]);
    } else {
      onChange([currentMin, Math.max(newValue, currentMin)]);
    }
  }, [isDragging, value, onChange, getValueFromPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Add event listeners when dragging
  useState(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Calculate positions as percentages
  const minPosition = ((value[0] - min) / (max - min)) * 100;
  const maxPosition = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={sliderRef}
        className="relative w-full h-2 bg-gray-200 rounded cursor-pointer"
        onClick={(e) => {
          const newValue = getValueFromPosition(e.clientX);
          const [currentMin, currentMax] = value;
          const distanceToMin = Math.abs(newValue - currentMin);
          const distanceToMax = Math.abs(newValue - currentMax);
          
          if (distanceToMin < distanceToMax) {
            onChange([Math.min(newValue, currentMax), currentMax]);
          } else {
            onChange([currentMin, Math.max(newValue, currentMin)]);
          }
        }}
      >
        {/* Active range */}
        <div
          className="absolute h-2 bg-red-500 rounded"
          style={{
            left: `${minPosition}%`,
            width: `${maxPosition - minPosition}%`
          }}
        />
        
        {/* Min handle */}
        <div
          className="absolute w-4 h-4 bg-white border-2 border-red-500 rounded-full cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
          style={{
            left: `${minPosition}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          onMouseDown={handleMouseDown('min')}
        />
        
        {/* Max handle */}
        <div
          className="absolute w-4 h-4 bg-white border-2 border-red-500 rounded-full cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
          style={{
            left: `${maxPosition}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>
    </div>
  );
}
