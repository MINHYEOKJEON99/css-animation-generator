import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LicenseState {
  isPro: boolean
  licenseKey: string | null
  email: string | null
  purchaseDate: string | null
  features: {
    presets: 'basic' | 'all'
    export: boolean
    keyframeEditor: boolean
    teamLicense: boolean
  }
  checkLicense: () => Promise<void>
  activateLicense: (key: string) => Promise<boolean>
  clearLicense: () => void
  validateLicense: (key: string) => Promise<boolean>
}

export const useLicenseStore = create<LicenseState>()(
  persist(
    (set, get) => ({
      isPro: false,
      licenseKey: null,
      email: null,
      purchaseDate: null,
      features: {
        presets: 'basic',
        export: false,
        keyframeEditor: false,
        teamLicense: false,
      },

      checkLicense: async () => {
        const { licenseKey } = get()
        if (!licenseKey) {
          set({ isPro: false })
          return
        }

        try {
          const response = await fetch('/api/license/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ licenseKey }),
          })

          if (response.ok) {
            const data = await response.json()
            set({
              isPro: true,
              email: data.email,
              purchaseDate: data.purchaseDate,
              features: data.features || {
                presets: 'all',
                export: true,
                keyframeEditor: true,
                teamLicense: false,
              },
            })
          } else {
            set({ isPro: false })
          }
        } catch (error) {
          console.error('License verification failed:', error)
          set({ isPro: false })
        }
      },

      activateLicense: async (key: string) => {
        try {
          const response = await fetch('/api/license/activate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ licenseKey: key }),
          })

          if (response.ok) {
            const data = await response.json()
            set({
              isPro: true,
              licenseKey: key,
              email: data.email,
              purchaseDate: data.purchaseDate,
              features: data.features || {
                presets: 'all',
                export: true,
                keyframeEditor: true,
                teamLicense: false,
              },
            })
            return true
          }
          return false
        } catch (error) {
          console.error('License activation failed:', error)
          return false
        }
      },

      validateLicense: async (key: string) => {
        // Basic license format validation
        const licensePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/
        if (!licensePattern.test(key)) {
          return false
        }

        try {
          const response = await fetch('/api/license/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ licenseKey: key }),
          })

          return response.ok
        } catch (error) {
          console.error('License validation failed:', error)
          return false
        }
      },

      clearLicense: () => {
        set({
          isPro: false,
          licenseKey: null,
          email: null,
          purchaseDate: null,
          features: {
            presets: 'basic',
            export: false,
            keyframeEditor: false,
            teamLicense: false,
          },
        })
      },
    }),
    {
      name: 'license-storage',
    }
  )
)