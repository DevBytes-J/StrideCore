'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Spotlight from './Spotlight';
import Backdrop from './Backdrop';
import Tooltip from './Tooltip';
import { fetchTour, trackEvent, Tour, Step } from '../lib/api-client';

export default function TourWidget({ tourId = 'abc123' }: { tourId?: string }) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!tourId) return;
    
    // Verify connectivity by fetching the tour
    fetchTour(tourId).then(data => {
      if (data) {
        setTour(data);
        setIsVisible(true);
        trackEvent(data.id, 'tour_started');
      }
    });
  }, [tourId]);

  const handleNext = () => {
    if (!tour) return;
    trackEvent(tour.id, 'step_completed', { stepId: tour.steps[currentStepIndex].id });
    
    if (currentStepIndex < tour.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsVisible(false);
      trackEvent(tour.id, 'tour_completed');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (!tour) return;
    setIsVisible(false);
    trackEvent(tour.id, 'tour_dismissed', { stepId: tour.steps[currentStepIndex].id });
  };

  if (!tour || !isVisible) return null;

  const currentStep = tour.steps[currentStepIndex];

  return (
    <>
      <div className="stride-core-widget">
        <AnimatePresence>
          {isVisible && (
            <>
              <Backdrop onClick={handleSkip} />
              <Spotlight targetSelector={currentStep.target_selector} />
              <Tooltip
                step={currentStep}
                currentStep={currentStepIndex}
                totalSteps={tour.steps.length}
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkip}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
