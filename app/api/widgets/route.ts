import { NextResponse } from 'next/server'

// In-memory storage (replace with database in production)
const widgets = new Map()

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const widgetId = `widget-${Date.now()}`
    
    widgets.set(widgetId, {
      id: widgetId,
      ...data,
      createdAt: new Date().toISOString()
    })
    
    return NextResponse.json({
      success: true,
      widgetId,
      embedUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/embed.js`,
      data: widgets.get(widgetId)
    }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create widget' },
      { status: 500, headers: corsHeaders }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const widgetId = searchParams.get('id')
  
  if (widgetId) {
    const widget = widgets.get(widgetId)
    if (widget) {
      return NextResponse.json({ success: true, data: widget }, { headers: corsHeaders })
    }
    return NextResponse.json(
      { success: false, error: 'Widget not found' },
      { status: 404, headers: corsHeaders }
    )
  }
  
  // Return all widgets
  return NextResponse.json({
    success: true,
    data: Array.from(widgets.values())
  }, { headers: corsHeaders })
}
