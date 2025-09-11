'use client'

import { useEffect, useState } from 'react'
import { Preset, PresetCategory } from '@/lib/animations/presets'

interface PresetPreviewProps {
  preset: Preset
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function PresetPreview({ preset, className = '', size = 'md' }: PresetPreviewProps) {
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    // 각 프리셋에 맞는 미리보기 애니메이션 설정
    let previewAnimation = ''
    
    switch (preset.id) {
      case 'energy-pulse':
        previewAnimation = 'animate-pulse'
        break
      case 'neon-glow':
        previewAnimation = 'animate-pulse'
        break
      case 'bubble-pop':
        previewAnimation = 'animate-bounce'
        break
      case 'bounce':
        previewAnimation = 'animate-bounce'
        break
      case 'pulse':
        previewAnimation = 'animate-pulse'
        break
      case 'rotate':
      case 'loading-spinner':
        previewAnimation = 'animate-spin'
        break
      case 'shake':
        previewAnimation = 'animate-pulse' // Tailwind에 shake가 없으므로 pulse 사용
        break
      case 'float':
        previewAnimation = 'animate-bounce'
        break
      case 'heartbeat':
        previewAnimation = 'animate-pulse'
        break
      default:
        previewAnimation = 'animate-pulse'
    }

    const timer = setTimeout(() => {
      setAnimationClass(previewAnimation)
    }, 100)

    return () => clearTimeout(timer)
  }, [preset.id])

  // 크기 설정
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  // 프리셋에 따른 색상 설정
  const getPresetColors = () => {
    switch (preset.id) {
      case 'energy-pulse':
        return 'from-cyan-400 to-blue-500'
      case 'neon-glow':
        return 'from-pink-500 to-purple-500'
      case 'bubble-pop':
        return 'from-blue-300 to-cyan-300'
      case 'fire-breathing':
        return 'from-orange-500 to-red-500'
      case 'quantum-tunnel':
        return 'from-purple-500 to-indigo-500'
      case 'galaxy-swirl':
        return 'from-purple-600 to-black'
      case 'rainbow-wave':
        return 'from-red-500 via-yellow-500 to-blue-500'
      case 'thunder-strike':
        return 'from-blue-200 to-blue-600'
      case 'christmas-sparkle':
        return 'from-red-500 to-green-500'
      case 'lava-lamp':
        return 'from-orange-400 to-red-600'
      default:
        return 'from-blue-500 to-purple-500'
    }
  }

  // 프리셋에 따른 아이콘/모양
  const getPresetIcon = () => {
    switch (preset.category) {
      case PresetCategory.TEXT:
        return <div className="text-white text-xs font-bold">Aa</div>
      case PresetCategory.LOADING:
        return <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
      case PresetCategory.MORPHING:
        return <div className="w-2 h-2 bg-white transform rotate-45" />
      default:
        return <div className="w-2 h-2 bg-white/80 rounded-full" />
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* 미리보기 요소 */}
      <div
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br ${getPresetColors()}
          rounded-lg flex items-center justify-center
          ${animationClass}
          shadow-lg hover:shadow-xl transition-shadow
          ${className}
        `}
      >
        {/* 미리보기 아이콘/내용 */}
        {getPresetIcon()}
      </div>

      {/* 재시작 버튼 (호버 시 표시) */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setAnimationClass('')
          setTimeout(() => {
            switch (preset.id) {
              case 'energy-pulse':
              case 'neon-glow':
              case 'pulse':
              case 'heartbeat':
                setAnimationClass('animate-pulse')
                break
              case 'bubble-pop':
              case 'bounce':
              case 'float':
                setAnimationClass('animate-bounce')
                break
              case 'rotate':
              case 'loading-spinner':
                setAnimationClass('animate-spin')
                break
              default:
                setAnimationClass('animate-pulse')
            }
          }, 50)
        }}
        className="absolute -top-1 -right-1 w-4 h-4 bg-white/20 hover:bg-white/40 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
      </button>
    </div>
  )
}