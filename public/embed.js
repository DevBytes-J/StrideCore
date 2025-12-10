(function() {
  'use strict';
  
  console.log('StrideCore Widget Loading...');
  
  // Check if config is provided inline
  if (window.TourGuideConfig) {
    console.log('TourGuideConfig found:', window.TourGuideConfig);
    initializeTour(window.TourGuideConfig);
    return;
  }
  
  // Otherwise, check for data-tour-id attribute
  const currentScript = document.currentScript;
  const tourId = currentScript?.getAttribute('data-tour-id');
  const apiUrl = currentScript?.getAttribute('data-api-url') || 'http://localhost:3003';
  
  if (!tourId) {
    console.warn('StrideCore: No tour configuration found. Provide window.TourGuideConfig or data-tour-id attribute.');
    return;
  }

  console.log('Fetching tour from API:', tourId);
  
  // Fetch tour data from StrideCore API
  fetch(`${apiUrl}/api/widgets?id=${tourId}`)
    .then(res => res.json())
    .then(result => {
      if (result.success && result.data) {
        console.log('Tour Data loaded:', result.data);
        initializeTour(result.data);
      } else {
        console.error('Failed to load tour:', result.error);
      }
    })
    .catch(err => console.error('Failed to fetch tour:', err));
  
  function initializeTour(config) {
    console.log('Initializing tour:', config.name || config.tourId);
    
    // Create a simple visual indicator that the widget loaded
    const indicator = document.createElement('div');
    indicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #4F46E5;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 10000;
      font-family: system-ui, -apple-system, sans-serif;
      cursor: pointer;
    `;
    indicator.textContent = `🎯 Start Tour: ${config.name || 'Product Tour'}`;
    indicator.onclick = function() {
      alert('Tour would start here! Steps: ' + (config.steps?.length || 0));
      console.log('Tour steps:', config.steps);
    };
    
    document.body.appendChild(indicator);
    
    // Store config globally for access
    window.StrideCore = {
      config: config,
      start: function() {
        console.log('Starting tour...');
        alert('Tour starting with ' + config.steps.length + ' steps');
      },
      end: function() {
        console.log('Ending tour...');
      }
    };
    
    console.log('✅ StrideCore Widget Ready! Click the button to start the tour.');
  }
})();