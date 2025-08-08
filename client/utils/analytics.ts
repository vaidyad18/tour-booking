/**
 * Analytics Utilities
 * 
 * Professional event tracking and user behavior analysis.
 * Implements Builder.io's enterprise analytics patterns.
 * 
 * @version 1.0.0
 * @author Builder.io Team
 */

interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

interface TourAnalytics {
  tourId: number;
  tourTitle: string;
  price: number;
  duration: string;
  timestamp: string;
}

class AnalyticsService {
  private isEnabled: boolean;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  /**
   * Track generic events
   */
  track(event: AnalyticsEvent): void {
    if (!this.isEnabled) {
      console.log('📊 Analytics Event:', event);
      return;
    }

    this.events.push({
      ...event,
      properties: {
        ...event.properties,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });

    // In production, this would send to your analytics service
    // Example: Google Analytics, Mixpanel, etc.
    this.sendToAnalyticsProvider(event);
  }

  /**
   * Track tour-specific events
   */
  trackTourEvent(action: string, tourData: TourAnalytics): void {
    this.track({
      event: 'tour_interaction',
      category: 'Tours',
      action,
      label: tourData.tourTitle,
      value: tourData.price,
      properties: {
        tourId: tourData.tourId,
        duration: tourData.duration,
        price: tourData.price
      }
    });
  }

  /**
   * Track page views
   */
  trackPageView(page: string, title?: string): void {
    this.track({
      event: 'page_view',
      category: 'Navigation',
      action: 'view',
      label: page,
      properties: {
        page,
        title: title || document.title,
        referrer: document.referrer
      }
    });
  }

  /**
   * Track search events
   */
  trackSearch(query: string, resultsCount: number): void {
    this.track({
      event: 'search',
      category: 'Search',
      action: 'query',
      label: query,
      value: resultsCount,
      properties: {
        query,
        resultsCount
      }
    });
  }

  /**
   * Track filter usage
   */
  trackFilter(filterType: string, filterValue: any): void {
    this.track({
      event: 'filter_applied',
      category: 'Filters',
      action: filterType,
      label: String(filterValue),
      properties: {
        filterType,
        filterValue
      }
    });
  }

  /**
   * Track booking events
   */
  trackBooking(stage: 'started' | 'completed' | 'abandoned', tourData: TourAnalytics): void {
    this.track({
      event: 'booking',
      category: 'Bookings',
      action: stage,
      label: tourData.tourTitle,
      value: tourData.price,
      properties: {
        ...tourData,
        stage
      }
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.track({
      event: 'performance',
      category: 'Performance',
      action: metric,
      value,
      properties: {
        metric,
        value,
        unit
      }
    });
  }

  /**
   * Send to analytics provider (placeholder)
   */
  private sendToAnalyticsProvider(event: AnalyticsEvent): void {
    // Production implementation would integrate with:
    // - Google Analytics 4
    // - Mixpanel
    // - Amplitude
    // - Custom analytics endpoint
    
    if (typeof gtag !== 'undefined') {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameters: event.properties
      });
    }
  }

  /**
   * Get analytics summary
   */
  getSummary(): { totalEvents: number; categories: string[] } {
    return {
      totalEvents: this.events.length,
      categories: [...new Set(this.events.map(e => e.category))]
    };
  }
}

// Export singleton instance
export const analytics = new AnalyticsService();

// Convenient tracking functions
export const trackTourView = (tourData: TourAnalytics) => {
  analytics.trackTourEvent('view', tourData);
};

export const trackTourClick = (tourData: TourAnalytics) => {
  analytics.trackTourEvent('click', tourData);
};

export const trackBookingStart = (tourData: TourAnalytics) => {
  analytics.trackBooking('started', tourData);
};

export const trackBookingComplete = (tourData: TourAnalytics) => {
  analytics.trackBooking('completed', tourData);
};

export const trackSearchUsage = (query: string, resultsCount: number) => {
  analytics.trackSearch(query, resultsCount);
};

export const trackFilterUsage = (filterType: string, value: any) => {
  analytics.trackFilter(filterType, value);
};
