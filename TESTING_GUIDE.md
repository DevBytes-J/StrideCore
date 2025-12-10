# 🧪 StrideCore Testing Guide

## Quick Start

### 1. Start StrideCore
```bash
cd StrideCore
npm run dev
```

Server should start at `http://localhost:3003`

### 2. Open Test Page

Open `test-integration.html` in your browser:
```
file:///path/to/StrideCore/test-integration.html
```

Or serve it locally:
```bash
npx serve .
```

### 3. Run Tests

The test page has 3 test sections:

#### Test 1: API Connection
- Click "Test API Connection" - should return success
- Click "Create Test Widget" - creates a widget and returns widget ID
- Click "Fetch Widget" - retrieves the created widget

#### Test 2: Inline Config
- Automatically loads when page opens
- Look for a purple button in bottom-right corner
- Click it to see the tour configuration

#### Test 3: Load from API
- First create a widget in Test 1
- Then click "Load Widget from API"
- Should fetch and display the widget

## Integration with StridePlatform

### Method 1: Inline Configuration (Quick Test)

Add to your StridePlatform HTML:

```html
<script>
  window.TourGuideConfig = {
    tourId: "welcome-tour",
    name: "Welcome Tour",
    steps: [
      {
        id: "step-1",
        target: "#your-element-id",
        title: "Welcome!",
        content: "This is your first step",
        position: "bottom"
      }
    ]
  };
</script>
<script src="http://localhost:3003/embed.js"></script>
```

### Method 2: Fetch from API (Production)

```javascript
// In your StridePlatform code
async function loadStrideTour(widgetId) {
  try {
    const response = await fetch(`http://localhost:3003/api/widgets?id=${widgetId}`);
    const result = await response.json();
    
    if (result.success) {
      window.TourGuideConfig = result.data;
      
      // Load embed script
      const script = document.createElement('script');
      script.src = 'http://localhost:3003/embed.js';
      document.body.appendChild(script);
    }
  } catch (error) {
    console.error('Failed to load tour:', error);
  }
}

// Call on page load
loadStrideTour('widget-1234567890');
```

### Method 3: Direct Embed with data-tour-id

```html
<script 
  src="http://localhost:3000/embed.js" 
  data-tour-id="widget-1234567890"
  data-api-url="http://localhost:3003">
</script>
```

## API Endpoints

### GET /api/widgets
Get all widgets
```bash
curl http://localhost:3003/api/widgets
```

### GET /api/widgets?id={widgetId}
Get specific widget
```bash
curl http://localhost:3003/api/widgets?id=widget-1234567890
```

### POST /api/widgets
Create new widget
```bash
curl -X POST http://localhost:3003/api/widgets \
  -H "Content-Type: application/json" \
  -d '{
    "tourId": "my-tour",
    "name": "My Tour",
    "steps": [
      {
        "id": "step-1",
        "target": "#button",
        "title": "Click Here",
        "content": "This is a button",
        "position": "bottom"
      }
    ]
  }'
```

## Troubleshooting

### Widget not appearing?
1. Check browser console (F12) for errors
2. Verify StrideCore is running on port 3000
3. Check that target elements exist on the page
4. Look for CORS errors (should be fixed now)

### API not responding?
1. Ensure `npm run dev` is running
2. Check `http://localhost:3003` loads
3. Verify no port conflicts

### CORS errors?
- Already fixed! API now includes CORS headers
- If still seeing errors, check browser console

## Next Steps

1. ✅ Test locally with test-integration.html
2. ✅ Verify API endpoints work
3. ✅ Test embed script loads
4. 🔄 Deploy StrideCore to get public URL
5. 🔄 Update StridePlatform to use deployed URL
6. 🔄 Test on live StridePlatform

## Deployment

When ready to deploy:

1. Set environment variable:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

2. Update embed URLs in StridePlatform from:
```
http://localhost:3003/embed.js
```
to:
```
https://your-domain.com/embed.js
```

3. Deploy to Vercel/Netlify/etc.
