import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { tourId: string } }
) {
  try {
    const body = await request.json()
    
    console.log('📊 Tracking event:', {
      tourId: params.tourId,
      eventType: body.eventType,
      data: body
    })
    
    // Try different endpoint formats that might work
    const endpoints = [
      `https://stride-platform.vercel.app/api/tours/${params.tourId}/events`,
      `https://stride-platform.vercel.app/api/events`,
      `https://stride-platform.vercel.app/api/analytics/track`
    ]
    
    for (const endpoint of endpoints) {
      try {
        console.log('📊 Trying endpoint:', endpoint)
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tourId: params.tourId,
            eventType: body.eventType,
            stepId: body.stepId,
            timestamp: new Date().toISOString()
          })
        })
        
        console.log('📊 Response:', response.status, response.statusText)
        
        if (response.ok) {
          console.log('📊 Success with endpoint:', endpoint)
          break
        } else {
          const errorText = await response.text()
          console.log('📊 Error response:', errorText)
        }
      } catch (err) {
        console.log('📊 Endpoint failed:', endpoint, err instanceof Error ? err.message : 'Unknown error')
      }
    }
    
    return NextResponse.json({ success: true }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('📊 Proxy error:', error)
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
