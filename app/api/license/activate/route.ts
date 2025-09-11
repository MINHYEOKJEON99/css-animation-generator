import { NextRequest, NextResponse } from 'next/server'

// License activation API
export async function POST(request: NextRequest) {
  try {
    const { licenseKey, email } = await request.json()

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

    // Verify license and activate
    const isValid = await validateAndActivateLicense(licenseKey, email)

    if (isValid) {
      // Record activation
      await recordActivation(licenseKey, request.headers.get('x-forwarded-for'))

      return NextResponse.json({
        success: true,
        email: 'user@example.com',
        purchaseDate: '2024-01-01',
        features: {
          presets: 'all',
          export: true,
          keyframeEditor: true,
          teamLicense: false,
        },
        message: 'License activated successfully',
      })
    }

    return NextResponse.json(
      { error: 'License activation failed' },
      { status: 401 }
    )
  } catch (error) {
    console.error('License activation failed:', error)
    return NextResponse.json(
      { error: 'Activation failed' },
      { status: 500 }
    )
  }
}

// Mock license validation and activation
async function validateAndActivateLicense(
  licenseKey: string,
  email?: string
): Promise<boolean> {
  // For development - accept TEST licenses
  if (licenseKey.startsWith('TEST')) {
    return true
  }

  // In production, validate against database and activate
  // const license = await db.license.findUnique({
  //   where: { key: licenseKey }
  // })
  
  // if (license && !license.activated) {
  //   await db.license.update({
  //     where: { key: licenseKey },
  //     data: { 
  //       activated: true,
  //       activatedAt: new Date(),
  //       activatedEmail: email
  //     }
  //   })
  //   return true
  // }

  return false
}

// Record activation for analytics
async function recordActivation(licenseKey: string, ip: string | null) {
  try {
    // In production, record activation details
    console.log(`License ${licenseKey} activated from IP: ${ip}`)
  } catch (error) {
    console.error('Failed to record activation:', error)
  }
}