import { NextRequest, NextResponse } from 'next/server'

// License verification API
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
        { error: 'Invalid license format' },
        { status: 400 }
      )
    }

    // Mock license verification for development
    // In production, this would validate against a database
    const isValid = await verifyLicenseInDatabase(licenseKey)

    if (isValid) {
      return NextResponse.json({
        valid: true,
        email: 'user@example.com', // From database
        purchaseDate: '2024-01-01', // From database
        features: {
          presets: 'all',
          export: true,
          keyframeEditor: true,
          teamLicense: false,
        },
      })
    }

    return NextResponse.json(
      { error: 'Invalid license key' },
      { status: 401 }
    )
  } catch (error) {
    console.error('License verification failed:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}

// Mock database verification
async function verifyLicenseInDatabase(licenseKey: string): Promise<boolean> {
  // For development - accept any license that starts with 'TEST'
  if (licenseKey.startsWith('TEST')) {
    return true
  }
  
  // In production, this would query your database
  // const license = await db.license.findUnique({
  //   where: { key: licenseKey }
  // })
  // return !!license && license.active
  
  return false
}