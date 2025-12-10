(function() {
  // Get tour ID from script tag
  const script = document.currentScript || document.querySelector('script[data-tour-id]');
  const tourId = script?.getAttribute('data-tour-id');
  
  if (!tourId) {
    console.error('StrideCore: No tour ID found');
    return;
  }

  console.log('StrideCore: Loading tour', tourId);

  // Detect if we're in development (localhost) or production
  const isDev = script.src.includes('localhost');
  const scriptUrl = new URL(script.src);
  const baseUrl = isDev ? `http://localhost:${scriptUrl.port}/api` : 'https://stride-platform.vercel.app/api';

  console.log('StrideCore: Using API base URL:', baseUrl);

  // API functions
  async function fetchTour(id) {
    try {
      const response = await fetch(`${baseUrl}/tours/${id}`);
      if (!response.ok) throw new Error('Tour not found');
      return await response.json();
    } catch (error) {
      console.error('StrideCore: Failed to fetch tour', error);
      return null;
    }
  }

  async function trackEvent(id, eventType, data = {}) {
    try {
      await fetch(`${baseUrl}/tours/${id}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType, ...data })
      });
    } catch (error) {
      console.error('StrideCore: Failed to track event', error);
    }
  }

  // Widget state
  let tour = null;
  let currentStep = 0;
  let isVisible = false;

  // Create widget HTML
  function createWidget() {
    const widget = document.createElement('div');
    widget.id = 'stride-widget';
    widget.innerHTML = `
      <style>
        #stride-widget {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 999999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .stride-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(26, 26, 26, 0.8);
          pointer-events: all;
        }
        
        .stride-tooltip {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #F5E6D3;
          border: 2px solid #D4AF37;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(26, 26, 26, 0.3);
          max-width: 380px;
          pointer-events: all;
        }
        
        .stride-tooltip h3 {
          margin: 0 0 12px 0;
          font-size: 20px;
          font-weight: 700;
          color: #1A1A1A;
        }
        
        .stride-tooltip p {
          margin: 0 0 20px 0;
          color: #4A4A4A;
          line-height: 1.6;
          font-size: 16px;
        }
        
        .stride-hint {
          background: #F0E6D2;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          color: #4A4A4A;
        }
        
        .stride-buttons {
          display: flex;
          gap: 12px;
          justify-content: space-between;
          align-items: center;
        }
        
        .stride-btn {
          padding: 12px 20px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .stride-btn-primary {
          background: #D4AF37;
          color: #1A1A1A;
        }
        
        .stride-btn-primary:hover {
          background: #B8941F;
        }
        
        .stride-btn-secondary {
          background: transparent;
          color: #4A4A4A;
          border: 2px solid #4A4A4A;
        }
        
        .stride-btn-secondary:hover {
          background: #4A4A4A;
          color: #F5E6D3;
        }
        
        .stride-progress {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        
        .stride-progress-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #C4C4C4;
          transition: all 0.3s ease;
        }
        
        .stride-progress-dot.active {
          background: #D4AF37;
          transform: scale(1.2);
        }
      </style>
      
      <div class="stride-backdrop" onclick="skipTour()"></div>
      <div class="stride-tooltip">
        <h3 id="stride-title"></h3>
        <p id="stride-content"></p>
        <div class="stride-hint">
          💡 <strong>Step <span id="stride-step-num"></span> of <span id="stride-total"></span>:</strong> 
          <span id="stride-hint"></span>
        </div>
        <div class="stride-buttons">
          <div class="stride-progress" id="stride-progress"></div>
          <div style="display: flex; gap: 12px;">
            <button class="stride-btn stride-btn-secondary" onclick="skipTour()">Skip Tour</button>
            <button class="stride-btn stride-btn-primary" onclick="nextStep()" id="stride-next">Next Step →</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(widget);
  }

  // Update widget content
  function updateWidget() {
    if (!tour || !isVisible) return;
    
    const step = tour.steps[currentStep];
    const isLastStep = currentStep === tour.steps.length - 1;
    
    document.getElementById('stride-title').textContent = step.title;
    document.getElementById('stride-content').textContent = step.content;
    document.getElementById('stride-step-num').textContent = currentStep + 1;
    document.getElementById('stride-total').textContent = tour.steps.length;
    document.getElementById('stride-hint').textContent = step.content;
    
    // Update progress dots
    const progressContainer = document.getElementById('stride-progress');
    progressContainer.innerHTML = '';
    for (let i = 0; i < tour.steps.length; i++) {
      const dot = document.createElement('div');
      dot.className = `stride-progress-dot ${i === currentStep ? 'active' : ''}`;
      progressContainer.appendChild(dot);
    }
    
    // Update next button
    const nextBtn = document.getElementById('stride-next');
    nextBtn.textContent = isLastStep ? '✓ Complete Tour' : 'Next Step →';
  }

  // Global functions for buttons
  window.nextStep = function() {
    if (!tour) return;
    
    trackEvent(tourId, 'step_completed', { stepId: tour.steps[currentStep].id });
    
    if (currentStep < tour.steps.length - 1) {
      currentStep++;
      updateWidget();
    } else {
      isVisible = false;
      document.getElementById('stride-widget').style.display = 'none';
      trackEvent(tourId, 'tour_completed');
    }
  };

  window.skipTour = function() {
    if (!tour) return;
    
    isVisible = false;
    document.getElementById('stride-widget').style.display = 'none';
    trackEvent(tourId, 'tour_dismissed', { stepId: tour.steps[currentStep].id });
  };

  // Initialize
  async function init() {
    tour = await fetchTour(tourId);
    if (!tour) return;
    
    isVisible = true;
    createWidget();
    updateWidget();
    trackEvent(tourId, 'tour_started');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
