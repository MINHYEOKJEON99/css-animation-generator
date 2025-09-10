import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Keyframe {
  offset: number // 0-100
  properties: {
    translateX?: number
    translateY?: number
    rotate?: number
    scale?: number
    opacity?: number
    blur?: number
  }
}

export interface AnimationState {
  // 기본 애니메이션 속성
  name: string
  duration: number
  delay: number
  timingFunction: string
  iterationCount: string
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode: 'none' | 'forwards' | 'backwards' | 'both'
  playState: 'running' | 'paused'
  
  // 변형 속성
  translateX: number
  translateY: number
  translateZ: number
  rotate: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
  scaleX: number
  scaleY: number
  skewX: number
  skewY: number
  
  // 스타일 속성
  opacity: number
  blur: number
  brightness: number
  contrast: number
  grayscale: number
  hueRotate: number
  invert: number
  saturate: number
  sepia: number
  dropShadow: {
    x: number
    y: number
    blur: number
    color: string
  }
  
  // 키프레임
  keyframes: Keyframe[]
  useKeyframes: boolean
  
  // 프리셋
  currentPreset: string | null
  customPresets: any[]
  
  // 액션
  updateProperty: (property: string, value: any) => void
  updateMultipleProperties: (properties: Partial<AnimationState>) => void
  addKeyframe: (keyframe: Keyframe) => void
  removeKeyframe: (index: number) => void
  updateKeyframe: (index: number, keyframe: Keyframe) => void
  loadPreset: (preset: any) => void
  saveAsPreset: (name: string) => void
  reset: () => void
  generateCSS: () => string
  generateKeyframesCSS: () => string
  exportAsJSON: () => string
  importFromJSON: (json: string) => void
}

const initialState = {
  name: 'custom-animation',
  duration: 1,
  delay: 0,
  timingFunction: 'ease',
  iterationCount: 'infinite',
  direction: 'normal' as const,
  fillMode: 'both' as const,
  playState: 'running' as const,
  translateX: 0,
  translateY: 0,
  translateZ: 0,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  opacity: 1,
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  saturate: 100,
  sepia: 0,
  dropShadow: {
    x: 0,
    y: 0,
    blur: 0,
    color: '#000000'
  },
  keyframes: [],
  useKeyframes: false,
  currentPreset: null,
  customPresets: []
}

export const useAnimationStore = create<AnimationState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        updateProperty: (property, value) => {
          set((state) => ({
            ...state,
            [property]: value,
            currentPreset: null // 프로퍼티 수정 시 프리셋 해제
          }))
        },
        
        updateMultipleProperties: (properties) => {
          set((state) => ({
            ...state,
            ...properties,
            currentPreset: null
          }))
        },
        
        addKeyframe: (keyframe) => {
          set((state) => ({
            keyframes: [...state.keyframes, keyframe].sort((a, b) => a.offset - b.offset)
          }))
        },
        
        removeKeyframe: (index) => {
          set((state) => ({
            keyframes: state.keyframes.filter((_, i) => i !== index)
          }))
        },
        
        updateKeyframe: (index, keyframe) => {
          set((state) => {
            const newKeyframes = [...state.keyframes]
            newKeyframes[index] = keyframe
            return {
              keyframes: newKeyframes.sort((a, b) => a.offset - b.offset)
            }
          })
        },
        
        loadPreset: (preset) => {
          set({
            ...initialState,
            ...preset,
            currentPreset: preset.id
          })
        },
        
        saveAsPreset: (name) => {
          const state = get()
          const preset = {
            id: `custom-${Date.now()}`,
            name,
            ...state,
            customPresets: undefined,
            currentPreset: undefined
          }
          
          set((state) => ({
            customPresets: [...state.customPresets, preset]
          }))
        },
        
        reset: () => {
          set(initialState)
        },
        
        generateCSS: () => {
          const state = get()
          
          if (state.useKeyframes && state.keyframes.length > 0) {
            return state.generateKeyframesCSS()
          }
          
          const transform = []
          if (state.translateX !== 0) transform.push(`translateX(${state.translateX}px)`)
          if (state.translateY !== 0) transform.push(`translateY(${state.translateY}px)`)
          if (state.translateZ !== 0) transform.push(`translateZ(${state.translateZ}px)`)
          if (state.rotate !== 0) transform.push(`rotate(${state.rotate}deg)`)
          if (state.rotateX !== 0) transform.push(`rotateX(${state.rotateX}deg)`)
          if (state.rotateY !== 0) transform.push(`rotateY(${state.rotateY}deg)`)
          if (state.rotateZ !== 0) transform.push(`rotateZ(${state.rotateZ}deg)`)
          if (state.scale !== 1) transform.push(`scale(${state.scale})`)
          if (state.scaleX !== 1) transform.push(`scaleX(${state.scaleX})`)
          if (state.scaleY !== 1) transform.push(`scaleY(${state.scaleY})`)
          if (state.skewX !== 0) transform.push(`skewX(${state.skewX}deg)`)
          if (state.skewY !== 0) transform.push(`skewY(${state.skewY}deg)`)
          
          const filter = []
          if (state.blur !== 0) filter.push(`blur(${state.blur}px)`)
          if (state.brightness !== 100) filter.push(`brightness(${state.brightness}%)`)
          if (state.contrast !== 100) filter.push(`contrast(${state.contrast}%)`)
          if (state.grayscale !== 0) filter.push(`grayscale(${state.grayscale}%)`)
          if (state.hueRotate !== 0) filter.push(`hue-rotate(${state.hueRotate}deg)`)
          if (state.invert !== 0) filter.push(`invert(${state.invert}%)`)
          if (state.saturate !== 100) filter.push(`saturate(${state.saturate}%)`)
          if (state.sepia !== 0) filter.push(`sepia(${state.sepia}%)`)
          
          let css = `.element {\n`
          css += `  animation: ${state.name} ${state.duration}s ${state.timingFunction} ${state.delay}s ${state.iterationCount} ${state.direction} ${state.fillMode};\n`
          if (transform.length > 0) {
            css += `  transform: ${transform.join(' ')};\n`
          }
          if (state.opacity !== 1) {
            css += `  opacity: ${state.opacity};\n`
          }
          if (filter.length > 0) {
            css += `  filter: ${filter.join(' ')};\n`
          }
          css += `}\n\n`
          css += `@keyframes ${state.name} {\n`
          css += `  from {\n    transform: none;\n  }\n`
          css += `  to {\n`
          if (transform.length > 0) {
            css += `    transform: ${transform.join(' ')};\n`
          }
          if (state.opacity !== 1) {
            css += `    opacity: ${state.opacity};\n`
          }
          if (filter.length > 0) {
            css += `    filter: ${filter.join(' ')};\n`
          }
          css += `  }\n`
          css += `}`
          
          return css
        },
        
        generateKeyframesCSS: () => {
          const state = get()
          
          let css = `.element {\n`
          css += `  animation: ${state.name} ${state.duration}s ${state.timingFunction} ${state.delay}s ${state.iterationCount} ${state.direction} ${state.fillMode};\n`
          css += `}\n\n`
          css += `@keyframes ${state.name} {\n`
          
          state.keyframes.forEach((keyframe) => {
            css += `  ${keyframe.offset}% {\n`
            
            const transform = []
            if (keyframe.properties.translateX) transform.push(`translateX(${keyframe.properties.translateX}px)`)
            if (keyframe.properties.translateY) transform.push(`translateY(${keyframe.properties.translateY}px)`)
            if (keyframe.properties.rotate) transform.push(`rotate(${keyframe.properties.rotate}deg)`)
            if (keyframe.properties.scale) transform.push(`scale(${keyframe.properties.scale})`)
            
            if (transform.length > 0) {
              css += `    transform: ${transform.join(' ')};\n`
            }
            if (keyframe.properties.opacity !== undefined) {
              css += `    opacity: ${keyframe.properties.opacity};\n`
            }
            if (keyframe.properties.blur !== undefined) {
              css += `    filter: blur(${keyframe.properties.blur}px);\n`
            }
            
            css += `  }\n`
          })
          
          css += `}`
          
          return css
        },
        
        exportAsJSON: () => {
          const state = get()
          return JSON.stringify({
            name: state.name,
            duration: state.duration,
            delay: state.delay,
            timingFunction: state.timingFunction,
            iterationCount: state.iterationCount,
            direction: state.direction,
            fillMode: state.fillMode,
            keyframes: state.keyframes,
            properties: {
              translateX: state.translateX,
              translateY: state.translateY,
              rotate: state.rotate,
              scale: state.scale,
              opacity: state.opacity,
              blur: state.blur
            }
          }, null, 2)
        },
        
        importFromJSON: (json) => {
          try {
            const data = JSON.parse(json)
            set({
              ...initialState,
              ...data,
              keyframes: data.keyframes || [],
              ...data.properties
            })
          } catch (error) {
            console.error('Failed to import JSON:', error)
          }
        }
      }),
      {
        name: 'animation-storage',
        partialize: (state) => ({
          customPresets: state.customPresets
        })
      }
    )
  )
)