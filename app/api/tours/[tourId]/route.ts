import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { tourId: string } }
) {
  try {
    const response = await fetch(`https://stride-platform.vercel.app/api/tours/${params.tourId}`)
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }
    
    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tour' }, { status: 500 })
  }
}
