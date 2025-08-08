# 🌍 TourHub - Professional Tour Booking Platform

**Built with Builder.io's Advanced React Framework**

A cutting-edge tour booking platform featuring real-time filtering, interactive search, and seamless booking experiences. Powered by modern web technologies and Builder.io's enterprise-grade development framework.

![TourHub Demo](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop)

## ✨ Features

### 🎯 Core Functionality

- **Advanced Tour Search** - Real-time filtering with dynamic price and duration ranges
- **Interactive Booking System** - Streamlined reservation flow with form validation
- **Responsive Design** - Optimized for all devices and screen sizes
- **Modern UI/UX** - Clean, intuitive interface with smooth animations

### 🛠️ Technical Highlights

- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast development and building
- **TailwindCSS** for modern, responsive styling
- **Custom Dual-Range Sliders** with interactive handles
- **Sticky Navigation** with smooth scroll behavior
- **Professional Component Architecture**

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
client/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── Header.tsx    # Navigation header
│   ├── TourCard.tsx  # Tour display card
│   ├── FilterSidebar.tsx     # Advanced filtering
│   ├── DualRangeSlider.tsx   # Custom range input
│   └── BookingModal.tsx      # Reservation form
├── pages/
│   ├── Index.tsx     # Tour listing page
│   ├── TourDetail.tsx # Individual tour page
│   └── NotFound.tsx  # 404 error page
├── types/
│   └── tour.ts       # TypeScript interfaces
└── hooks/            # Custom React hooks

server/
├── routes/           # API endpoints
└── index.ts          # Express server setup

shared/
└── api.ts           # Shared type definitions
```

## 🎨 Design System

### Color Palette

- **Primary**: `#EF4444` (Red-500) - CTA buttons, active states
- **Secondary**: `#6B7280` (Gray-500) - Text, borders
- **Background**: `#F9FAFB` (Gray-50) - Page background
- **Surface**: `#FFFFFF` - Cards, modals

### Typography

- **Headings**: `font-semibold` with hierarchical sizing
- **Body**: `text-gray-600` for readability
- **Labels**: `text-sm text-gray-500` for metadata

## 🔧 Configuration

### Environment Variables

```env
VITE_API_BASE_URL=https://dummyjson.com
VITE_APP_NAME=TourHub
VITE_APP_VERSION=1.0.0
```
