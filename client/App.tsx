import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TourDetail from "./pages/TourDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Prevent multiple root creation during hot reloads
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

let root: Root;

function initializeApp() {
  if (!root) {
    root = createRoot(rootElement);
  }
  root.render(<App />);
}

// Initialize the app
initializeApp();

// Hot module replacement support
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    initializeApp();
  });
}
