export default function HomePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#D4AF37', marginBottom: '20px' }}>StrideCore Widget</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        Embeddable tour widget for interactive user onboarding
      </p>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        <div style={{ marginBottom: '10px', color: '#666' }}>// Embed on any website:</div>
        <div style={{ color: '#0066cc' }}>
          &lt;script src="https://your-domain.com/embed.js" data-tour-id="YOUR_TOUR_ID"&gt;&lt;/script&gt;
        </div>
      </div>
    </div>
  )
}
