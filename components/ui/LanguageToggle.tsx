'use client'

import { useTranslation } from 'react-i18next'
import { Button } from './Button'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ko' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('preferredLanguage', newLang)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-8 px-2 flex items-center gap-1"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium">
        {i18n.language === 'en' ? 'EN' : 'KO'}
      </span>
    </Button>
  )
}