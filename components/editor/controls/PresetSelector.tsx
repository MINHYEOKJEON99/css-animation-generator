'use client'

import { useState, useEffect } from 'react'
import { useAnimationStore } from '@/lib/store/useAnimationStore'
import { useLicenseStore } from '@/lib/store/useLicenseStore'
import { freePresets, proPresets, PresetCategory, searchPresets, getFeaturedPresets } from '@/lib/animations/presets'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Search, Lock, Star, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PresetPreview } from '@/components/ui/PresetPreview'

export default function PresetSelector() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<PresetCategory | 'all'>('all')
  const [showProModal, setShowProModal] = useState(false)
  const { loadPreset, currentPreset } = useAnimationStore()
  const { isPro, checkLicense } = useLicenseStore()
  const { t } = useTranslation('common')

  useEffect(() => {
    checkLicense()
  }, [])

  const categories = [
    { value: 'all', label: t('presets.category.all') },
    { value: PresetCategory.ATTENTION, label: t('presets.category.attention') },
    { value: PresetCategory.ENTRANCE, label: t('presets.category.entrance') },
    { value: PresetCategory.EXIT, label: t('presets.category.exit') },
    { value: PresetCategory.BACKGROUND, label: t('presets.category.background') },
    { value: PresetCategory.TEXT, label: t('presets.category.text') },
    { value: PresetCategory.LOADING, label: t('presets.category.loading') },
    { value: PresetCategory.HOVER, label: t('presets.category.hover') },
    { value: PresetCategory.MORPHING, label: t('presets.category.morphing') },
    { value: PresetCategory.ADVANCED, label: t('presets.category.advanced') },
    { value: PresetCategory.SEASONAL, label: t('presets.category.seasonal') },
    { value: PresetCategory.CUSTOM, label: t('presets.category.custom') },
  ]

  const filteredPresets = searchPresets(
    searchQuery,
    selectedCategory === 'all' ? undefined : (selectedCategory as PresetCategory)
  )

  const featuredPresets = getFeaturedPresets()

  const handlePresetClick = (preset: any) => {
    if (preset.isPro && !isPro) {
      setShowProModal(true)
      return
    }

    // Load preset with keyframes
    const presetData = {
      ...preset.properties,
      keyframes: preset.keyframes || [],
    }
    
    loadPreset(presetData)
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t('presets.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value as PresetCategory | 'all')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Presets */}
      {searchQuery === '' && selectedCategory === 'all' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold text-lg">Featured Pro Effects</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {featuredPresets.map((preset) => (
              <div
                key={preset.id}
                className={`
                  relative p-4 cursor-pointer transition-all hover:shadow-xl rounded-lg
                  border border-yellow-200 dark:border-yellow-700 bg-gradient-to-br from-yellow-50/50 to-orange-50/50
                  dark:from-yellow-900/20 dark:to-orange-900/20 hover:from-yellow-100/60 hover:to-orange-100/60
                  ${currentPreset === preset.id ? 'ring-2 ring-yellow-500' : ''}
                  ${!isPro ? 'opacity-75' : ''}
                `}
                onClick={() => handlePresetClick(preset)}
              >
                <div className="absolute top-2 right-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
                
                {/* 미리보기 애니메이션 */}
                <div className="flex justify-center mb-3">
                  <PresetPreview preset={preset} size="md" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm pr-4">{preset.name}</h4>
                    {!isPro && <Lock className="w-3 h-3 text-gray-400" />}
                  </div>
                  {preset.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {preset.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {preset.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro Banner */}
      {!isPro && (
        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-semibold">{t('presets.pro.upgrade')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('presets.pro.description')}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => window.open('https://gumroad.com/l/css-animator-pro', '_blank')}
            >
              {t('presets.pro.price')}
            </Button>
          </div>
        </div>
      )}

      {/* All Presets Section */}
      {(searchQuery !== '' || selectedCategory !== 'all') && (
        <div className="flex items-center gap-2 mt-6">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold">
            {searchQuery ? `Search Results (${filteredPresets.length})` : `${categories.find(c => c.value === selectedCategory)?.label} Presets`}
          </h3>
        </div>
      )}
      
      {searchQuery === '' && selectedCategory === 'all' && (
        <div className="flex items-center gap-2 mt-6">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold">All Animation Presets ({filteredPresets.length})</h3>
        </div>
      )}

      {/* Preset Grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence>
          {filteredPresets.map((preset, index) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.02 }}
            >
              <div
                className={`
                  relative p-3 cursor-pointer transition-all hover:shadow-lg rounded-lg
                  border border-gray-200 dark:border-gray-700
                  ${currentPreset === preset.id ? 'ring-2 ring-blue-500' : ''}
                  ${preset.isPro && !isPro ? 'opacity-75' : ''}
                `}
                onClick={() => handlePresetClick(preset)}
              >
                {/* Preset Info */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{preset.name}</h4>
                    {preset.isPro && (
                      <div className="text-xs">
                        {isPro ? (
                          <Star className="w-3 h-3 text-yellow-500" />
                        ) : (
                          <Lock className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>

                  {preset.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {preset.description}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {preset.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-lg" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pro Modal */}
      {showProModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">{t('presets.pro.upgrade')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('presets.pro.description')}
            </p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() => window.open('https://gumroad.com/l/css-animator-pro', '_blank')}
              >
                {t('presets.pro.price')}
              </Button>
              <Button variant="ghost" onClick={() => setShowProModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}