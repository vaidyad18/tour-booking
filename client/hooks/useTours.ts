/**
 * useTours Hook
 * 
 * Professional data fetching and state management for tour listings.
 * Implements Builder.io's advanced React patterns for optimal performance.
 * 
 * @version 1.0.0
 * @author Builder.io Team
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Tour, TourListResponse } from '../types/tour';
import { API_CONFIG } from '../config/constants';

interface UseToursOptions {
  searchQuery?: string;
  sortBy?: 'name' | 'price-low' | 'price-high';
  durationFilter?: { min: number; max: number };
  priceFilter?: { min: number; max: number };
}

interface UseToursReturn {
  tours: Tour[];
  filteredTours: Tour[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  totalCount: number;
}

export function useTours(options: UseToursOptions = {}): UseToursReturn {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    searchQuery = '',
    sortBy = 'name',
    durationFilter = { min: 1, max: 30 },
    priceFilter = { min: 0, max: 5000 }
  } = options;

  // Professional mock data for demonstration
  const mockTours: Tour[] = useMemo(() => [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1598275277521-1885382d523a?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1464822759844-d150baec76b1?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1464822759844-d150baec76b1?w=400&h=300&fit=crop",
      discountInPercentage: "18%",
      title: "Coastal Adventure",
      description: "6-day coastal exploration",
      duration: "6Days/5Night",
      actualPrice: 750,
      discountedPrice: 615,
      wishlist: false
    }
  ], []);

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // In a real application, this would fetch from the API
      // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tours}`);
      // const data: TourListResponse = await response.json();
      
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setTours(mockTours);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tours');
      setTours(mockTours); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  }, [mockTours]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  // Advanced filtering and sorting logic
  const filteredTours = useMemo(() => {
    let filtered = tours.filter(tour => {
      // Search filter
      const matchesSearch = !searchQuery || 
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Duration filter
      const durationDays = parseInt(tour.duration.split('Days')[0]);
      const matchesDuration = durationDays >= durationFilter.min && durationDays <= durationFilter.max;
      
      // Price filter
      const matchesPrice = tour.discountedPrice >= priceFilter.min && tour.discountedPrice <= priceFilter.max;
      
      return matchesSearch && matchesDuration && matchesPrice;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price-low':
          return a.discountedPrice - b.discountedPrice;
        case 'price-high':
          return b.discountedPrice - a.discountedPrice;
        default:
          return 0;
      }
    });

    return filtered;
  }, [tours, searchQuery, sortBy, durationFilter, priceFilter]);

  return {
    tours,
    filteredTours,
    loading,
    error,
    refetch: fetchTours,
    totalCount: filteredTours.length
  };
}
