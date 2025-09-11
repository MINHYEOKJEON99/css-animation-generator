import { AnimationState } from '@/lib/store/useAnimationStore'

export interface Preset {
  id: string
  name: string
  category: PresetCategory
  description?: string
  isPro: boolean
  preview?: string // GIF URL
  tags: string[]
  properties: Partial<AnimationState>
  keyframes?: any[]
  css?: string // Custom CSS
  popularity?: number
}

export enum PresetCategory {
  ATTENTION = 'attention',
  ENTRANCE = 'entrance',
  EXIT = 'exit',
  BACKGROUND = 'background',
  TEXT = 'text',
  LOADING = 'loading',
  HOVER = 'hover',
  MORPHING = 'morphing',
  ADVANCED = 'advanced',
  SEASONAL = 'seasonal',
  CUSTOM = 'custom',
}

// Free presets (10)
export const freePresets: Preset[] = [
  {
    id: 'bounce',
    name: 'Bounce',
    category: PresetCategory.ATTENTION,
    description: 'Bouncing effect',
    isPro: false,
    tags: ['attention', 'fun', 'basic'],
    properties: {
      duration: 1,
      timingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      iterationCount: 'infinite',
      direction: 'alternate',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { translateY: 0 } },
      { offset: 50, properties: { translateY: -30 } },
      { offset: 100, properties: { translateY: 0 } },
    ],
  },
  {
    id: 'fade-in',
    name: 'Fade In',
    category: PresetCategory.ENTRANCE,
    description: 'Smooth fade in',
    isPro: false,
    tags: ['entrance', 'smooth', 'basic'],
    properties: {
      duration: 0.5,
      timingFunction: 'ease-in',
      fillMode: 'both',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { opacity: 0 } },
      { offset: 100, properties: { opacity: 1 } },
    ],
  },
  {
    id: 'slide-in-left',
    name: 'Slide In Left',
    category: PresetCategory.ENTRANCE,
    description: 'Slide from left',
    isPro: false,
    tags: ['entrance', 'slide', 'basic'],
    properties: {
      duration: 0.5,
      timingFunction: 'ease-out',
      fillMode: 'both',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { translateX: -100, opacity: 0 } },
      { offset: 100, properties: { translateX: 0, opacity: 1 } },
    ],
  },
  {
    id: 'rotate',
    name: 'Rotate',
    category: PresetCategory.ATTENTION,
    description: '360° rotation',
    isPro: false,
    tags: ['rotate', 'dynamic', 'basic'],
    properties: {
      duration: 1,
      timingFunction: 'linear',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { rotate: 0 } },
      { offset: 100, properties: { rotate: 360 } },
    ],
  },
  {
    id: 'pulse',
    name: 'Pulse',
    category: PresetCategory.ATTENTION,
    description: 'Pulsing scale effect',
    isPro: false,
    tags: ['attention', 'smooth', 'basic'],
    properties: {
      duration: 1,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { scale: 1 } },
      { offset: 50, properties: { scale: 1.05 } },
      { offset: 100, properties: { scale: 1 } },
    ],
  },
  {
    id: 'shake',
    name: 'Shake',
    category: PresetCategory.ATTENTION,
    description: 'Quick shake',
    isPro: false,
    tags: ['attention', 'error', 'basic'],
    properties: {
      duration: 0.5,
      timingFunction: 'ease-in-out',
      iterationCount: '1',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { translateX: 0 } },
      { offset: 10, properties: { translateX: -10 } },
      { offset: 20, properties: { translateX: 10 } },
      { offset: 30, properties: { translateX: -10 } },
      { offset: 40, properties: { translateX: 10 } },
      { offset: 50, properties: { translateX: -10 } },
      { offset: 60, properties: { translateX: 10 } },
      { offset: 70, properties: { translateX: -10 } },
      { offset: 80, properties: { translateX: 10 } },
      { offset: 90, properties: { translateX: -10 } },
      { offset: 100, properties: { translateX: 0 } },
    ],
  },
  {
    id: 'zoom-in',
    name: 'Zoom In',
    category: PresetCategory.ENTRANCE,
    description: 'Zoom in effect',
    isPro: false,
    tags: ['entrance', 'zoom', 'basic'],
    properties: {
      duration: 0.5,
      timingFunction: 'ease-out',
      fillMode: 'both',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { scale: 0, opacity: 0 } },
      { offset: 100, properties: { scale: 1, opacity: 1 } },
    ],
  },
  {
    id: 'loading-spinner',
    name: 'Loading Spinner',
    category: PresetCategory.LOADING,
    description: 'Basic loading animation',
    isPro: false,
    tags: ['loading', 'rotate', 'basic'],
    properties: {
      duration: 1,
      timingFunction: 'linear',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { rotate: 0 } },
      { offset: 100, properties: { rotate: 360 } },
    ],
  },
  {
    id: 'flip',
    name: 'Flip',
    category: PresetCategory.ATTENTION,
    description: '3D Y-axis flip',
    isPro: false,
    tags: ['3D', 'flip', 'basic'],
    properties: {
      duration: 0.6,
      timingFunction: 'ease-in-out',
      fillMode: 'both',
      rotateY: 180,
    },
  },
  {
    id: 'fade-out',
    name: 'Fade Out',
    category: PresetCategory.EXIT,
    description: 'Smooth fade out',
    isPro: false,
    tags: ['exit', 'smooth', 'basic'],
    properties: {
      duration: 0.5,
      timingFunction: 'ease-out',
      fillMode: 'both',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { opacity: 1 } },
      { offset: 100, properties: { opacity: 0 } },
    ],
  },
]

// Pro presets (sample)
export const proPresets: Preset[] = [
  {
    id: 'morphing-blob',
    name: 'Morphing Blob',
    category: PresetCategory.MORPHING,
    description: 'Organic shape morphing',
    isPro: true,
    tags: ['morphing', 'organic', 'advanced'],
    properties: {
      duration: 3,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'alternate',
      useKeyframes: true,
    },
    css: `
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    `,
    keyframes: [
      {
        offset: 0,
        properties: {
          rotate: 0,
          scale: 1,
        },
      },
      {
        offset: 33,
        properties: {
          rotate: 120,
          scale: 1.1,
        },
      },
      {
        offset: 66,
        properties: {
          rotate: 240,
          scale: 0.9,
        },
      },
      {
        offset: 100,
        properties: {
          rotate: 360,
          scale: 1,
        },
      },
    ],
  },
  {
    id: 'glitch',
    name: 'Glitch',
    category: PresetCategory.ADVANCED,
    description: 'Digital noise effect',
    isPro: true,
    tags: ['glitch', 'digital', 'advanced'],
    properties: {
      duration: 0.5,
      timingFunction: 'steps(2, end)',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { translateX: 0, translateY: 0 } },
      { offset: 10, properties: { translateX: -2, translateY: 2 } },
      { offset: 20, properties: { translateX: 2, translateY: -2 } },
      { offset: 30, properties: { translateX: -2, translateY: 2 } },
      { offset: 40, properties: { translateX: 2, translateY: -2 } },
      { offset: 50, properties: { translateX: -2, translateY: 2 } },
      { offset: 60, properties: { translateX: 0, translateY: 0 } },
      { offset: 100, properties: { translateX: 0, translateY: 0 } },
    ],
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: PresetCategory.TEXT,
    description: 'Neon sign flicker',
    isPro: true,
    tags: ['neon', 'light', 'text'],
    properties: {
      duration: 1.5,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      text-shadow: 
        0 0 10px #fff,
        0 0 20px #fff,
        0 0 30px #e60073,
        0 0 40px #e60073,
        0 0 50px #e60073,
        0 0 60px #e60073,
        0 0 70px #e60073;
    `,
    keyframes: [
      { offset: 0, properties: { opacity: 1 } },
      { offset: 4, properties: { opacity: 1 } },
      { offset: 6, properties: { opacity: 0.5 } },
      { offset: 8, properties: { opacity: 1 } },
      { offset: 10, properties: { opacity: 0.5 } },
      { offset: 12, properties: { opacity: 1 } },
      { offset: 100, properties: { opacity: 1 } },
    ],
  },
]

// Search presets function
export function searchPresets(
  query: string,
  category?: PresetCategory,
  proOnly?: boolean
): Preset[] {
  const allPresets = [...freePresets, ...proPresets]

  return allPresets.filter((preset) => {
    const matchesQuery =
      !query ||
      preset.name.toLowerCase().includes(query.toLowerCase()) ||
      preset.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

    const matchesCategory = !category || preset.category === category
    const matchesPro = proOnly === undefined || preset.isPro === proOnly

    return matchesQuery && matchesCategory && matchesPro
  })
}