# StrideCore - TourGuide Widget Integration Guide

## 🎯 Overview

StrideCore is a widget creation platform that allows you to build interactive product tours. This guide explains how to connect it with your StridePlatform.

## 📁 Project Structure

```
StrideCore/
├── app/
│   ├── page.tsx              # Landing page
│   ├── create/page.tsx       # Widget creator interface
│   ├── docs/page.tsx         # Documentation
│   ├── api/widgets/route.ts  # API for saving widgets
│   └── globals.css           # Global styles
├── components/
│   ├── TourWidget.tsx        # Main widget component
│   ├── Tooltip.tsx           # Tooltip component
│   └── Spotlight.tsx         # Spotlight overlay
├── public/
│   └── widget.js             # Embeddable widget script
└── lib/
    └── widget-script.ts      # Widget utilities
```

## 🚀 Getting Started

### 1. Run StrideCore

```bash
cd StrideCore
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

### 2. Create a Widget

1. Go to `/create` page
2. Enter a tour name
3. Add steps with:
   - Target element (CSS selector)
   - Title
   - Content
   - Tooltip position
4. Click "Generate Widget Code"
5. Copy the embed code

### 3. Install in Your Platform

Add the generated code to your HTML before the closing `</body>` tag:

```html
<script>
  window.TourGuideConfig = {
    tourId: "your-tour-id",
    name: "Welcome Tour",
    steps: [
      {
        id: "step-1",
        target: "#signup-button",
        title: "Create Account",
        content: "Click here to get started",
        position: "bottom"
      }
    ]
  };
</script>
<script src="http://localhost:3000/widget.js"></script>
```

## 🔗 Connecting to StridePlatform

### What You Need from StridePlatform:

1. **API Endpoint**: URL to save widget configurations
   - Example: `https://your-platform.com/api/widgets`

2. **Authentication**: API token or key
   - Add to request headers: `Authorization: Bearer YOUR_TOKEN`

3. **User/Project ID**: To associate widgets with users
   - Include in widget metadata

4. **Webhook URL** (Optional): For analytics callbacks
   - Receive events when tours complete

### Integration Example:

```typescript
// In StrideCore/app/create/page.tsx
async function saveToStridePlatform(widgetData) {
  const response = await fetch('https://your-platform.com/api/widgets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'X-User-ID': 'user-123'
    },
    body: JSON.stringify({
      tourId: widgetData.tourId,
      name: widgetData.name,
      steps: widgetData.steps,
      createdAt: new Date().toISOString()
    })
  });
  
  return response.json();
}
```

## 📊 Widget Features

### Current Features:
- ✅ Visual widget builder
- ✅ Step-by-step tour creation
- ✅ Customizable tooltip positions
- ✅ Spotlight overlay
- ✅ Progress indicators
- ✅ Navigation controls
- ✅ Embed code generation

### Coming Soon:
- 🔄 Analytics dashboard
- 🔄 A/B testing
- 🔄 Custom styling
- 🔄 Multi-language support

## 🎨 Customization

### Widget Configuration Options:

```javascript
window.TourGuideConfig = {
  tourId: "string",           // Unique identifier
  name: "string",             // Tour name
  autoStart: true,            // Auto-start on load
  steps: [...],               // Array of steps
  onComplete: function() {},  // Completion callback
}
```

### Step Configuration:

```javascript
{
  id: "string",               // Unique step ID
  target: "string",           // CSS selector
  title: "string",            // Step title
  content: "string",          // Step description
  position: "top|bottom|left|right"  // Tooltip position
}
```

## 🔧 JavaScript API

The widget exposes a global API:

```javascript
// Start tour manually
window.TourGuide.start();

// End tour
window.TourGuide.end();

// Navigate
window.TourGuide.next();
window.TourGuide.previous();
```

## 📝 Example Usage

### Basic Tour:

```html
<!DOCTYPE html>
<html>
<body>
  <button id="btn-1">Button 1</button>
  <button id="btn-2">Button 2</button>
  
  <script>
    window.TourGuideConfig = {
      tourId: "demo-tour",
      name: "Demo Tour",
      steps: [
        {
          id: "step-1",
          target: "#btn-1",
          title: "First Button",
          content: "This is the first button",
          position: "bottom"
        },
        {
          id: "step-2",
          target: "#btn-2",
          title: "Second Button",
          content: "This is the second button",
          position: "bottom"
        }
      ]
    };
  </script>
  <script src="http://localhost:3000/widget.js"></script>
</body>
</html>
```

## 🔐 Security Considerations

1. **CORS**: Configure CORS headers for widget.js
2. **API Authentication**: Use secure tokens
3. **Input Validation**: Sanitize user inputs
4. **Rate Limiting**: Implement on API endpoints

## 📦 Deployment

### Production Checklist:

- [ ] Update widget.js URL in generated code
- [ ] Set up CORS for widget.js
- [ ] Configure environment variables
- [ ] Set up database for widget storage
- [ ] Implement analytics tracking
- [ ] Add error logging
- [ ] Set up CDN for widget.js

### Environment Variables:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
PLATFORM_API_URL=https://your-platform.com/api
PLATFORM_API_KEY=your-api-key
```

## 🐛 Troubleshooting

### Widget not appearing?
- Check console for errors
- Verify target elements exist
- Ensure widget.js is loaded

### Tooltip positioning issues?
- Try different position values
- Check for CSS conflicts
- Verify element visibility

### Tour not starting?
- Check TourGuideConfig is set
- Verify autoStart setting
- Check for JavaScript errors

## 📚 Resources

- Landing Page: `http://localhost:3000`
- Widget Creator: `http://localhost:3000/create`
- Documentation: `http://localhost:3000/docs`
- API Endpoint: `http://localhost:3000/api/widgets`

## 🤝 Support

For issues or questions:
1. Check the documentation at `/docs`
2. Review example code
3. Contact the development team

---

**Next Steps:**
1. Create your first widget at `/create`
2. Test it on your platform
3. Connect to StridePlatform API
4. Deploy to production
