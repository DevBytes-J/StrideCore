const PLATFORM_URL = 'https://stride-platform.vercel.app';

export interface Step {
  id: string;
  title: string;
  content: string;
  target_selector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export interface Tour {
  id: string;
  title: string;
  steps: Step[];
}

export async function fetchTour(tourId: string): Promise<Tour | null> {
  console.log(`Fetching tour ${tourId} from ${PLATFORM_URL}...`);
  try {
    const res = await fetch(`${PLATFORM_URL}/api/tours/${tourId}`, {
      // Add cache control if needed, or rely on defaults
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Tour ${tourId} not found`);
      } else {
        console.error(`Failed to fetch tour ${tourId}: ${res.status} ${res.statusText}`);
      }
      return null;
    }
    
    return await res.json();
  } catch (err) {
    console.error('Network error fetching tour:', err);
    return null;
  }
}

export type EventType = 
  | 'tour_started' 
  | 'step_completed' 
  | 'step_skipped' 
  | 'tour_completed' 
  | 'tour_dismissed';

export async function trackEvent(
  tourId: string, 
  eventType: EventType, 
  data?: { stepId?: string }
) {
  // Safe log for debugging
  console.log(`[Analytics] Tour ${tourId}: ${eventType}`, data);

  try {
    await fetch(`${PLATFORM_URL}/api/tours/${tourId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        eventType, 
        stepId: data?.stepId 
      }),
      // keepalive ensures the request survives if the page unloads
      keepalive: true
    });
  } catch (err) {
    console.error('Failed to track event:', err);
  }
}
