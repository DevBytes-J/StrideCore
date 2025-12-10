export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded"></div>
            <span className="font-semibold text-gray-900">TOURGUIDE</span>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-600">Documentation</span>
          </div>
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Integration Guide</h1>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Create Your Widget</h3>
              <p className="text-gray-600 mb-2">Go to the <a href="/create" className="text-orange-500 hover:underline">Widget Creator</a> and build your tour:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Add a tour name</li>
                <li>Define steps with target elements</li>
                <li>Customize titles and content</li>
                <li>Generate embed code</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Install in Your Platform</h3>
              <p className="text-gray-600 mb-2">Copy the generated code and paste it before the closing &lt;/body&gt; tag:</p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
{`<!-- Add this to your HTML -->
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
<script src="http://localhost:3000/widget.js"></script>`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Test Your Tour</h3>
              <p className="text-gray-600">Reload your page and the tour will automatically start!</p>
            </div>
          </div>
        </section>

        {/* Configuration Options */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Options</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-semibold text-gray-900">Property</th>
                  <th className="text-left py-3 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">tourId</code></td>
                  <td className="py-3">string</td>
                  <td className="py-3">Unique identifier for your tour</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">name</code></td>
                  <td className="py-3">string</td>
                  <td className="py-3">Display name for your tour</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">steps</code></td>
                  <td className="py-3">array</td>
                  <td className="py-3">Array of step objects</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">autoStart</code></td>
                  <td className="py-3">boolean</td>
                  <td className="py-3">Auto-start tour on page load (default: true)</td>
                </tr>
                <tr>
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">onComplete</code></td>
                  <td className="py-3">function</td>
                  <td className="py-3">Callback when tour completes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step Configuration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step Configuration</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-semibold text-gray-900">Property</th>
                  <th className="text-left py-3 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">id</code></td>
                  <td className="py-3">string</td>
                  <td className="py-3">Unique identifier for the step</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">target</code></td>
                  <td className="py-3">string</td>
                  <td className="py-3">CSS selector for target element</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">title</code></td>
                  <td className="py-3">string</td>
                  <td className="py-3">Step title</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">content</code></td>
                  <td className="py-3">string</td>
                  <td className="py-3">Step description</td>
                </tr>
                <tr>
                  <td className="py-3"><code className="bg-gray-100 px-2 py-1 rounded">position</code></td>
                  <td className="py-3">string</td>
                  <td className="py-3">Tooltip position: top, bottom, left, right</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* API Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">JavaScript API</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">window.TourGuide.start()</h3>
              <p className="text-gray-600 mb-2">Manually start the tour</p>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300">
{`// Start tour manually
window.TourGuide.start();`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">window.TourGuide.end()</h3>
              <p className="text-gray-600 mb-2">End the tour programmatically</p>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300">
{`// End tour
window.TourGuide.end();`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">window.TourGuide.next()</h3>
              <p className="text-gray-600 mb-2">Move to next step</p>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300">
{`// Go to next step
window.TourGuide.next();`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">window.TourGuide.previous()</h3>
              <p className="text-gray-600 mb-2">Move to previous step</p>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300">
{`// Go to previous step
window.TourGuide.previous();`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Integration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connecting to StridePlatform</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">📋 What You Need from StridePlatform:</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-1">
                <li>API endpoint to save widget configurations</li>
                <li>Authentication token for API requests</li>
                <li>User/project ID to associate widgets</li>
                <li>Webhook URL for analytics callbacks (optional)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Example Integration:</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300">
{`// Save widget to platform
async function saveWidget(widgetData) {
  const response = await fetch('https://your-platform.com/api/widgets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_TOKEN'
    },
    body: JSON.stringify(widgetData)
  });
  
  return response.json();
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Example</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
{`<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <button id="signup-button">Sign Up</button>
  <div id="dashboard">Dashboard</div>
  
  <!-- TourGuide Widget -->
  <script>
    window.TourGuideConfig = {
      tourId: "welcome-tour",
      name: "Welcome Tour",
      autoStart: true,
      steps: [
        {
          id: "step-1",
          target: "#signup-button",
          title: "Create Your Account",
          content: "Click here to get started with our platform",
          position: "bottom"
        },
        {
          id: "step-2",
          target: "#dashboard",
          title: "Your Dashboard",
          content: "This is where you'll manage everything",
          position: "top"
        }
      ],
      onComplete: function() {
        console.log('Tour completed!');
        // Track completion in your analytics
      }
    };
  </script>
  <script src="http://localhost:3000/widget.js"></script>
</body>
</html>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
