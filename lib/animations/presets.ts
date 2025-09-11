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
  {
    id: 'slide-up',
    name: 'Slide Up',
    category: PresetCategory.ENTRANCE,
    description: 'Slide from bottom',
    isPro: false,
    tags: ['entrance', 'slide', 'basic'],
    properties: {
      duration: 0.6,
      timingFunction: 'ease-out',
      fillMode: 'both',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { translateY: 50, opacity: 0 } },
      { offset: 100, properties: { translateY: 0, opacity: 1 } },
    ],
  },
  {
    id: 'wobble',
    name: 'Wobble',
    category: PresetCategory.ATTENTION,
    description: 'Wobbling effect',
    isPro: false,
    tags: ['attention', 'fun', 'basic'],
    properties: {
      duration: 1,
      timingFunction: 'ease-in-out',
      iterationCount: '1',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { translateX: 0, rotate: 0 } },
      { offset: 15, properties: { translateX: -25, rotate: -5 } },
      { offset: 30, properties: { translateX: 20, rotate: 3 } },
      { offset: 45, properties: { translateX: -15, rotate: -3 } },
      { offset: 60, properties: { translateX: 10, rotate: 2 } },
      { offset: 75, properties: { translateX: -5, rotate: -1 } },
      { offset: 100, properties: { translateX: 0, rotate: 0 } },
    ],
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat',
    category: PresetCategory.ATTENTION,
    description: 'Heartbeat pulse',
    isPro: false,
    tags: ['attention', 'pulse', 'health'],
    properties: {
      duration: 1.3,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { scale: 1 } },
      { offset: 14, properties: { scale: 1.3 } },
      { offset: 28, properties: { scale: 1 } },
      { offset: 42, properties: { scale: 1.3 } },
      { offset: 70, properties: { scale: 1 } },
    ],
  },
  {
    id: 'swing',
    name: 'Swing',
    category: PresetCategory.ATTENTION,
    description: 'Pendulum swing',
    isPro: false,
    tags: ['attention', 'swing', 'pendulum'],
    properties: {
      duration: 1,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'alternate',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { rotate: -15 } },
      { offset: 100, properties: { rotate: 15 } },
    ],
  },
  {
    id: 'rubber-band',
    name: 'Rubber Band',
    category: PresetCategory.ATTENTION,
    description: 'Rubber band stretch',
    isPro: false,
    tags: ['attention', 'stretch', 'elastic'],
    properties: {
      duration: 1,
      timingFunction: 'ease-out',
      iterationCount: '1',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { scaleX: 1, scaleY: 1 } },
      { offset: 30, properties: { scaleX: 1.25, scaleY: 0.75 } },
      { offset: 40, properties: { scaleX: 0.75, scaleY: 1.25 } },
      { offset: 50, properties: { scaleX: 1.15, scaleY: 0.85 } },
      { offset: 65, properties: { scaleX: 0.95, scaleY: 1.05 } },
      { offset: 75, properties: { scaleX: 1.05, scaleY: 0.95 } },
      { offset: 100, properties: { scaleX: 1, scaleY: 1 } },
    ],
  },
  {
    id: 'loading-dots',
    name: 'Loading Dots',
    category: PresetCategory.LOADING,
    description: 'Three dots loading',
    isPro: false,
    tags: ['loading', 'dots', 'basic'],
    properties: {
      duration: 1.4,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { scale: 0.8, opacity: 0.5 } },
      { offset: 40, properties: { scale: 1, opacity: 1 } },
      { offset: 100, properties: { scale: 0.8, opacity: 0.5 } },
    ],
  },
  {
    id: 'float',
    name: 'Float',
    category: PresetCategory.HOVER,
    description: 'Gentle floating motion',
    isPro: false,
    tags: ['hover', 'float', 'gentle'],
    properties: {
      duration: 3,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'alternate',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { translateY: 0 } },
      { offset: 100, properties: { translateY: -20 } },
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
    popularity: 95,
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
  {
    id: 'matrix-rain',
    name: 'Matrix Rain',
    category: PresetCategory.ADVANCED,
    description: 'Digital rain effect',
    isPro: true,
    tags: ['matrix', 'digital', 'cyber'],
    properties: {
      duration: 2,
      timingFunction: 'linear',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(0deg, transparent 0%, rgba(0,255,0,0.4) 50%, transparent 100%);
      color: #00ff00;
      font-family: 'Courier New', monospace;
    `,
    keyframes: [
      { offset: 0, properties: { translateY: -100, opacity: 0 } },
      { offset: 10, properties: { opacity: 1 } },
      { offset: 90, properties: { opacity: 1 } },
      { offset: 100, properties: { translateY: 100, opacity: 0 } },
    ],
  },
  {
    id: 'hologram',
    name: 'Hologram',
    category: PresetCategory.ADVANCED,
    description: 'Holographic projection',
    isPro: true,
    tags: ['hologram', 'futuristic', '3D'],
    properties: {
      duration: 2,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
      box-shadow: 0 0 20px rgba(0,255,255,0.5);
    `,
    keyframes: [
      { offset: 0, properties: { opacity: 0.7, scale: 1, rotateY: 0 } },
      { offset: 25, properties: { opacity: 0.9, scale: 1.02, rotateY: 90 } },
      { offset: 50, properties: { opacity: 0.6, scale: 0.98, rotateY: 180 } },
      { offset: 75, properties: { opacity: 0.8, scale: 1.01, rotateY: 270 } },
      { offset: 100, properties: { opacity: 0.7, scale: 1, rotateY: 360 } },
    ],
  },
  {
    id: 'particle-explosion',
    name: 'Particle Explosion',
    category: PresetCategory.ADVANCED,
    description: 'Explosive particle effect',
    isPro: true,
    tags: ['explosion', 'particles', 'dramatic'],
    properties: {
      duration: 1.5,
      timingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      iterationCount: '1',
      fillMode: 'both',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { scale: 0, rotate: 0, opacity: 1 } },
      { offset: 50, properties: { scale: 1.5, rotate: 180, opacity: 0.8 } },
      { offset: 100, properties: { scale: 3, rotate: 360, opacity: 0 } },
    ],
  },
  {
    id: 'typewriter',
    name: 'Typewriter',
    category: PresetCategory.TEXT,
    description: 'Typewriter text reveal',
    isPro: true,
    tags: ['text', 'typewriter', 'reveal'],
    properties: {
      duration: 3,
      timingFunction: 'steps(40, end)',
      iterationCount: '1',
      fillMode: 'both',
      useKeyframes: true,
    },
    css: `
      font-family: 'Courier New', monospace;
      border-right: 2px solid #333;
      overflow: hidden;
      white-space: nowrap;
    `,
    keyframes: [
      { offset: 0, properties: { width: '0%' } },
      { offset: 100, properties: { width: '100%' } },
    ],
  },
  {
    id: 'cyberpunk-glitch',
    name: 'Cyberpunk Glitch',
    category: PresetCategory.ADVANCED,
    description: 'Advanced cyberpunk glitch',
    isPro: true,
    tags: ['cyberpunk', 'glitch', 'neon'],
    properties: {
      duration: 1,
      timingFunction: 'steps(4, jump-end)',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(90deg, #ff006e, #fb5607, #ffbe0b, #8338ec, #3a86ff);
      color: #000;
      text-shadow: 
        2px 0 #ff006e,
        -2px 0 #3a86ff;
    `,
    keyframes: [
      { offset: 0, properties: { translateX: 0, skewX: 0 } },
      { offset: 25, properties: { translateX: -2, skewX: 5 } },
      { offset: 50, properties: { translateX: 2, skewX: -5 } },
      { offset: 75, properties: { translateX: -1, skewX: 3 } },
      { offset: 100, properties: { translateX: 0, skewX: 0 } },
    ],
  },
  {
    id: 'liquid-morph',
    name: 'Liquid Morph',
    category: PresetCategory.MORPHING,
    description: 'Fluid liquid transformation',
    isPro: true,
    tags: ['liquid', 'morph', 'fluid'],
    properties: {
      duration: 4,
      timingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      iterationCount: 'infinite',
      direction: 'alternate',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    `,
    keyframes: [
      { offset: 0, properties: { borderRadius: '50% 50% 50% 50%', scale: 1, rotate: 0 } },
      { offset: 25, properties: { borderRadius: '60% 40% 30% 70%', scale: 1.1, rotate: 90 } },
      { offset: 50, properties: { borderRadius: '30% 70% 70% 30%', scale: 0.9, rotate: 180 } },
      { offset: 75, properties: { borderRadius: '70% 30% 50% 50%', scale: 1.05, rotate: 270 } },
      { offset: 100, properties: { borderRadius: '50% 50% 50% 50%', scale: 1, rotate: 360 } },
    ],
  },
  {
    id: 'aurora-wave',
    name: 'Aurora Wave',
    category: PresetCategory.BACKGROUND,
    description: 'Northern lights wave effect',
    isPro: true,
    tags: ['aurora', 'wave', 'nature'],
    properties: {
      duration: 6,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(45deg, 
        rgba(64, 224, 208, 0.6) 0%,
        rgba(255, 0, 150, 0.6) 25%,
        rgba(0, 255, 255, 0.6) 50%,
        rgba(128, 0, 255, 0.6) 75%,
        rgba(64, 224, 208, 0.6) 100%);
      background-size: 400% 400%;
    `,
    keyframes: [
      { offset: 0, properties: { backgroundPosition: '0% 50%', opacity: 0.8 } },
      { offset: 50, properties: { backgroundPosition: '100% 50%', opacity: 1 } },
      { offset: 100, properties: { backgroundPosition: '0% 50%', opacity: 0.8 } },
    ],
  },
  {
    id: 'spring-bounce',
    name: 'Spring Bounce',
    category: PresetCategory.ENTRANCE,
    description: 'Physics-based spring bounce',
    isPro: true,
    tags: ['spring', 'physics', 'bounce'],
    properties: {
      duration: 1.5,
      timingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      iterationCount: '1',
      fillMode: 'both',
      useKeyframes: true,
    },
    keyframes: [
      { offset: 0, properties: { translateY: -500, scale: 0.3, opacity: 0 } },
      { offset: 60, properties: { translateY: 30, scale: 1.1, opacity: 1 } },
      { offset: 80, properties: { translateY: -10, scale: 0.95 } },
      { offset: 100, properties: { translateY: 0, scale: 1 } },
    ],
  },
  {
    id: 'christmas-sparkle',
    name: 'Christmas Sparkle',
    category: PresetCategory.SEASONAL,
    description: 'Festive Christmas sparkle',
    isPro: true,
    tags: ['christmas', 'sparkle', 'festive'],
    properties: {
      duration: 2,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f7b731, #5f27cd);
      background-size: 300% 300%;
      box-shadow: 
        0 0 10px rgba(255, 215, 0, 0.8),
        0 0 20px rgba(255, 215, 0, 0.6),
        0 0 30px rgba(255, 215, 0, 0.4);
    `,
    keyframes: [
      { offset: 0, properties: { rotate: 0, scale: 1, backgroundPosition: '0% 50%' } },
      { offset: 25, properties: { rotate: 90, scale: 1.1, backgroundPosition: '50% 0%' } },
      { offset: 50, properties: { rotate: 180, scale: 0.9, backgroundPosition: '100% 50%' } },
      { offset: 75, properties: { rotate: 270, scale: 1.05, backgroundPosition: '50% 100%' } },
      { offset: 100, properties: { rotate: 360, scale: 1, backgroundPosition: '0% 50%' } },
    ],
  },
  {
    id: 'magnetic-field',
    name: 'Magnetic Field',
    category: PresetCategory.ADVANCED,
    description: 'Electromagnetic field distortion',
    isPro: true,
    tags: ['magnetic', 'physics', 'distortion'],
    properties: {
      duration: 3,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'alternate',
      useKeyframes: true,
    },
    css: `
      background: radial-gradient(ellipse at center, 
        rgba(0,255,255,0.3) 0%,
        rgba(255,0,255,0.3) 50%,
        transparent 70%);
      backdrop-filter: blur(1px);
    `,
    keyframes: [
      { offset: 0, properties: { scaleX: 1, scaleY: 1, skewX: 0, skewY: 0 } },
      { offset: 33, properties: { scaleX: 1.3, scaleY: 0.7, skewX: 10, skewY: -5 } },
      { offset: 66, properties: { scaleX: 0.8, scaleY: 1.2, skewX: -8, skewY: 8 } },
      { offset: 100, properties: { scaleX: 1, scaleY: 1, skewX: 0, skewY: 0 } },
    ],
  },
  {
    id: 'fire-breathing',
    name: 'Fire Breathing',
    category: PresetCategory.ADVANCED,
    description: 'Dragon fire breathing effect',
    isPro: true,
    tags: ['fire', 'dragon', 'dramatic'],
    properties: {
      duration: 2.5,
      timingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: radial-gradient(ellipse at center, 
        rgba(255, 69, 0, 0.8) 0%,
        rgba(255, 140, 0, 0.6) 30%,
        rgba(255, 215, 0, 0.4) 60%,
        transparent 100%);
      box-shadow: 
        0 0 20px rgba(255, 69, 0, 0.6),
        0 0 40px rgba(255, 140, 0, 0.4),
        0 0 60px rgba(255, 215, 0, 0.2);
    `,
    keyframes: [
      { offset: 0, properties: { scaleX: 0.3, scaleY: 0.3, opacity: 0.8, translateX: -50 } },
      { offset: 20, properties: { scaleX: 1.5, scaleY: 0.8, opacity: 1, translateX: 0 } },
      { offset: 40, properties: { scaleX: 2.5, scaleY: 1.2, opacity: 0.9, translateX: 30 } },
      { offset: 70, properties: { scaleX: 3, scaleY: 0.6, opacity: 0.7, translateX: 80 } },
      { offset: 100, properties: { scaleX: 0.1, scaleY: 0.1, opacity: 0, translateX: 150 } },
    ],
  },
  {
    id: 'quantum-tunnel',
    name: 'Quantum Tunnel',
    category: PresetCategory.ADVANCED,
    description: 'Sci-fi quantum tunnel effect',
    isPro: true,
    tags: ['quantum', 'tunnel', 'scifi'],
    properties: {
      duration: 3,
      timingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: conic-gradient(from 0deg, 
        #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #ff006e);
      border: 3px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(2px);
    `,
    keyframes: [
      { offset: 0, properties: { rotate: 0, scale: 0.1, borderRadius: '50%', opacity: 0 } },
      { offset: 25, properties: { rotate: 90, scale: 0.8, borderRadius: '30%', opacity: 0.8 } },
      { offset: 50, properties: { rotate: 180, scale: 1.5, borderRadius: '10%', opacity: 1 } },
      { offset: 75, properties: { rotate: 270, scale: 2, borderRadius: '0%', opacity: 0.6 } },
      { offset: 100, properties: { rotate: 360, scale: 0.1, borderRadius: '50%', opacity: 0 } },
    ],
  },
  {
    id: 'energy-pulse',
    name: 'Energy Pulse',
    category: PresetCategory.ATTENTION,
    description: 'Powerful energy pulse waves',
    isPro: true,
    tags: ['energy', 'pulse', 'power'],
    popularity: 98,
    properties: {
      duration: 1.5,
      timingFunction: 'ease-out',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: radial-gradient(circle, 
        rgba(0, 255, 255, 0.8) 0%,
        rgba(0, 255, 255, 0.4) 40%,
        transparent 70%);
      box-shadow: 
        0 0 30px rgba(0, 255, 255, 0.8),
        inset 0 0 20px rgba(255, 255, 255, 0.2);
    `,
    keyframes: [
      { offset: 0, properties: { scale: 0.8, opacity: 1 } },
      { offset: 30, properties: { scale: 1.2, opacity: 0.8 } },
      { offset: 60, properties: { scale: 1.8, opacity: 0.3 } },
      { offset: 100, properties: { scale: 2.5, opacity: 0 } },
    ],
  },
  {
    id: 'morphing-crystal',
    name: 'Morphing Crystal',
    category: PresetCategory.MORPHING,
    description: 'Crystal structure morphing',
    isPro: true,
    tags: ['crystal', 'geometric', 'morph'],
    properties: {
      duration: 4,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'alternate',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(135deg, 
        rgba(147, 51, 234, 0.6), 
        rgba(59, 130, 246, 0.6), 
        rgba(16, 185, 129, 0.6));
      backdrop-filter: blur(1px);
      box-shadow: 
        0 0 20px rgba(147, 51, 234, 0.4),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
    `,
    keyframes: [
      { offset: 0, properties: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', rotate: 0 } },
      { offset: 25, properties: { clipPath: 'polygon(0% 0%, 0% 100%, 100% 50%)', rotate: 90 } },
      { offset: 50, properties: { clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', rotate: 180 } },
      { offset: 75, properties: { clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)', rotate: 270 } },
      { offset: 100, properties: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', rotate: 360 } },
    ],
  },
  {
    id: 'text-reveal-shine',
    name: 'Text Reveal Shine',
    category: PresetCategory.TEXT,
    description: 'Shining text reveal effect',
    isPro: true,
    tags: ['text', 'shine', 'reveal'],
    properties: {
      duration: 2,
      timingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
      iterationCount: '1',
      fillMode: 'both',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.8) 50%, 
        transparent 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    `,
    keyframes: [
      { offset: 0, properties: { backgroundPosition: '-200% 0%', opacity: 0 } },
      { offset: 50, properties: { backgroundPosition: '0% 0%', opacity: 1 } },
      { offset: 100, properties: { backgroundPosition: '200% 0%', opacity: 1 } },
    ],
  },
  {
    id: 'galaxy-swirl',
    name: 'Galaxy Swirl',
    category: PresetCategory.BACKGROUND,
    description: 'Cosmic galaxy swirl effect',
    isPro: true,
    tags: ['galaxy', 'cosmic', 'swirl'],
    properties: {
      duration: 8,
      timingFunction: 'linear',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: radial-gradient(ellipse at center,
        rgba(138, 43, 226, 0.8) 0%,
        rgba(30, 64, 175, 0.6) 30%,
        rgba(15, 23, 42, 0.8) 60%,
        rgba(0, 0, 0, 0.9) 100%);
      box-shadow: 
        0 0 50px rgba(138, 43, 226, 0.3),
        inset 0 0 50px rgba(30, 64, 175, 0.2);
    `,
    keyframes: [
      { offset: 0, properties: { rotate: 0, scale: 1 } },
      { offset: 100, properties: { rotate: 360, scale: 1.1 } },
    ],
  },
  {
    id: 'bubble-pop',
    name: 'Bubble Pop',
    category: PresetCategory.ENTRANCE,
    description: 'Playful bubble popping entrance',
    isPro: true,
    tags: ['bubble', 'pop', 'playful'],
    popularity: 92,
    properties: {
      duration: 1.2,
      timingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      iterationCount: '1',
      fillMode: 'both',
      useKeyframes: true,
    },
    css: `
      background: radial-gradient(circle at 30% 30%,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(135, 206, 235, 0.4) 40%,
        rgba(30, 144, 255, 0.6) 100%);
      box-shadow: 
        0 0 15px rgba(135, 206, 235, 0.5),
        inset -10px -10px 20px rgba(255, 255, 255, 0.2);
      border-radius: 50%;
    `,
    keyframes: [
      { offset: 0, properties: { scale: 0, opacity: 0, rotate: -180 } },
      { offset: 70, properties: { scale: 1.3, opacity: 0.8, rotate: 0 } },
      { offset: 85, properties: { scale: 0.9, opacity: 1 } },
      { offset: 100, properties: { scale: 1, opacity: 1 } },
    ],
  },
  {
    id: 'neon-border-scan',
    name: 'Neon Border Scan',
    category: PresetCategory.HOVER,
    description: 'Scanning neon border effect',
    isPro: true,
    tags: ['neon', 'border', 'scan'],
    properties: {
      duration: 2,
      timingFunction: 'linear',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      border: 2px solid transparent;
      background: linear-gradient(45deg, transparent, transparent) padding-box,
                  linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b) border-box;
    `,
    keyframes: [
      { offset: 0, properties: { backgroundPosition: '0% 0%' } },
      { offset: 100, properties: { backgroundPosition: '400% 400%' } },
    ],
  },
  {
    id: 'lava-lamp',
    name: 'Lava Lamp',
    category: PresetCategory.MORPHING,
    description: 'Retro lava lamp morphing',
    isPro: true,
    tags: ['lava', 'retro', 'fluid'],
    properties: {
      duration: 6,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'alternate',
      useKeyframes: true,
    },
    css: `
      background: radial-gradient(ellipse at top,
        rgba(255, 69, 0, 0.9) 0%,
        rgba(255, 140, 0, 0.7) 40%,
        rgba(255, 215, 0, 0.5) 100%);
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    `,
    keyframes: [
      { offset: 0, properties: { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', scaleY: 1 } },
      { offset: 33, properties: { borderRadius: '30% 70% 40% 60% / 40% 70% 30% 60%', scaleY: 1.2 } },
      { offset: 66, properties: { borderRadius: '70% 30% 60% 40% / 30% 60% 40% 70%', scaleY: 0.8 } },
      { offset: 100, properties: { borderRadius: '40% 60% 70% 30% / 70% 40% 60% 30%', scaleY: 1 } },
    ],
  },
  {
    id: 'digital-rain',
    name: 'Digital Rain',
    category: PresetCategory.TEXT,
    description: 'Matrix-style digital rain',
    isPro: true,
    tags: ['digital', 'matrix', 'code'],
    properties: {
      duration: 1.5,
      timingFunction: 'linear',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      font-family: 'Courier New', monospace;
      text-shadow: 0 0 5px #00ff00;
      overflow: hidden;
    `,
    keyframes: [
      { offset: 0, properties: { translateY: -100, opacity: 0 } },
      { offset: 10, properties: { opacity: 1 } },
      { offset: 90, properties: { opacity: 1 } },
      { offset: 100, properties: { translateY: 100, opacity: 0 } },
    ],
  },
  {
    id: 'thunder-strike',
    name: 'Thunder Strike',
    category: PresetCategory.ADVANCED,
    description: 'Lightning thunder strike effect',
    isPro: true,
    tags: ['thunder', 'lightning', 'electric'],
    properties: {
      duration: 0.8,
      timingFunction: 'steps(10, jump-end)',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(45deg,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(135, 206, 250, 0.7) 30%,
        rgba(70, 130, 180, 0.8) 60%,
        rgba(25, 25, 112, 0.9) 100%);
      box-shadow: 
        0 0 20px rgba(255, 255, 255, 0.8),
        0 0 40px rgba(135, 206, 250, 0.6),
        0 0 60px rgba(70, 130, 180, 0.4);
    `,
    keyframes: [
      { offset: 0, properties: { opacity: 0, scale: 1, skewX: 0 } },
      { offset: 10, properties: { opacity: 1, scale: 1.1, skewX: 5 } },
      { offset: 15, properties: { opacity: 0.3, scale: 0.95, skewX: -3 } },
      { offset: 25, properties: { opacity: 1, scale: 1.05, skewX: 2 } },
      { offset: 30, properties: { opacity: 0.2, scale: 1, skewX: 0 } },
      { offset: 100, properties: { opacity: 0, scale: 1, skewX: 0 } },
    ],
  },
  {
    id: 'rainbow-wave',
    name: 'Rainbow Wave',
    category: PresetCategory.BACKGROUND,
    description: 'Flowing rainbow wave',
    isPro: true,
    tags: ['rainbow', 'wave', 'colorful'],
    properties: {
      duration: 3,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      useKeyframes: true,
    },
    css: `
      background: linear-gradient(90deg,
        #ff0000 0%,
        #ff8000 16.66%,
        #ffff00 33.33%,
        #80ff00 50%,
        #00ffff 66.66%,
        #8000ff 83.33%,
        #ff0080 100%);
      background-size: 400% 100%;
    `,
    keyframes: [
      { offset: 0, properties: { backgroundPosition: '0% 0%' } },
      { offset: 100, properties: { backgroundPosition: '400% 0%' } },
    ],
  },
]

// Get featured/recommended presets (top 3 Pro presets by popularity)
export function getFeaturedPresets(): Preset[] {
  return proPresets
    .filter(preset => preset.popularity !== undefined)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 3)
}

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