import { NextRequest, NextResponse } from 'next/server'

// Simple license validation API (format check only)
export async function POST(request: NextRequest) {
  try {
    const { licenseKey } = await request.json()

    if (!licenseKey) {
      return NextResponse.json(
        { error: 'License key is required' },
        { status: 400 }
      )
    }

    // License format validation
    const licensePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/
    if (!licensePattern.test(licenseKey)) {
      return NextResponse.json(
        { valid: false, error: 'Invalid license format' },
        { status: 400 }
      )
    }

    // Basic existence check (in production, check database)
    const exists = await checkLicenseExists(licenseKey)

    return NextResponse.json({
      valid: exists,
      format: 'valid'
    })
  } catch (error) {
    console.error('License validation failed:', error)
    return NextResponse.json(
      { error: 'Validation failed' },
      { status: 500 }
    )
  }
}

// Mock license existence check
async function checkLicenseExists(licenseKey: string): Promise<boolean> {
  // For development - TEST licenses are valid
  if (licenseKey.startsWith('TEST')) {
    return true
  }
  
  // In production, check database
  return false
}