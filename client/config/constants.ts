/**
 * TourHub Application Constants
 * 
 * Central configuration for the tour booking platform.
 * Built with Builder.io's enterprise development framework.
 * 
 * @version 1.0.0
 * @author Builder.io Team
 */

export const APP_CONFIG = {
  name: 'TourHub',
  version: '1.0.0',
  description: 'Professional Tour Booking Platform',
  author: 'Builder.io',
  url: 'https://tourhub.builder.io'
} as const;

export const API_CONFIG = {
  baseUrl: 'https://dummyjson.com',
  endpoints: {
    tours: '/c/b3a6-28bd-48d3-9f64',
    tourDetail: '/c/d82a-d75d-4727-8f37'
  },
  timeout: 10000
} as const;

export const UI_CONFIG = {
  colors: {
    primary: '#EF4444',
    secondary: '#6B7280',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  animations: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms'
  }
} as const;

export const FILTER_CONFIG = {
  duration: {
    min: 1,
    max: 30,
    step: 1,
    unit: 'Days'
  },
  price: {
    min: 0,
    max: 5000,
    step: 50,
    currency: 'USD',
    symbol: '$'
  }
} as const;

export const BOOKING_CONFIG = {
  maxTickets: 10,
  validationRules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
      required: true,
      pattern: /^[\+]?[1-9][\d]{0,15}$/
    }
  }
} as const;

export const STORAGE_KEYS = {
  bookings: 'tourhub_bookings',
  preferences: 'tourhub_preferences',
  filters: 'tourhub_filters'
} as const;

export const ROUTES = {
  home: '/',
  tours: '/tours',
  tourDetail: '/tour/:id',
  booking: '/booking',
  profile: '/profile'
} as const;
