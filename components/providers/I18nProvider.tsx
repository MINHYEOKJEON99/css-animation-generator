'use client'

import { ReactNode, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n/config'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang && (savedLang === 'en' || savedLang === 'ko')) {
      i18n.changeLanguage(savedLang)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}