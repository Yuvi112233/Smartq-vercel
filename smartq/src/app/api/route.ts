// Basic API route handler for SmartQ
// Responds to health checks and monitoring requests

import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'SmartQ API',
    timestamp: new Date().toISOString()
  })
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}