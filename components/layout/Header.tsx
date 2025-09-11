'use client'

import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { Button } from '@/components/ui/Button'
import { Sparkles, Settings } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const { t } = useTranslation('common')

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {t('title')}
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              {t('buttons.examples')}
            </Button>
            <Button variant="ghost" size="sm">
              {t('buttons.docs')}
            </Button>
            <Button variant="ghost" size="sm">
              {t('header.export')}
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              onClick={() => window.open('https://gumroad.com/l/css-animator-pro', '_blank')}
            >
              {t('buttons.proVersion')}
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}