'use client'

import { useAnimationStore } from '@/lib/store/useAnimationStore'
import { Slider } from '@/components/ui/Slider'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { RotateCcw, Sparkles, Eye, Droplet, Sun, Moon } from 'lucide-react'
import { ColorPicker } from '@/components/ui/ColorPicker'

export default function FilterControls() {
  const {
    opacity,
    blur,
    brightness,
    contrast,
    grayscale,
    hueRotate,
    invert,
    saturate,
    sepia,
    dropShadow,
    updateProperty,
    updateMultipleProperties
  } = useAnimationStore()
  
  // 필터 프리셋 적용
  const applyFilterPreset = (preset: string) => {
    switch (preset) {
      case 'vintage':
        updateMultipleProperties({
          sepia: 50,
          saturate: 150,
          brightness: 110,
          contrast: 90
        })
        break
      case 'blackwhite':
        updateMultipleProperties({
          grayscale: 100,
          contrast: 120
        })
        break
      case 'blur':
        updateMultipleProperties({
          blur: 5,
          opacity: 0.8
        })
        break
      case 'dramatic':
        updateMultipleProperties({
          contrast: 150,
          saturate: 120,
          brightness: 90
        })
        break
      case 'dreamy':
        updateMultipleProperties({
          blur: 2,
          brightness: 110,
          saturate: 130,
          hueRotate: 10
        })
        break
      case 'cyberpunk':
        updateMultipleProperties({
          hueRotate: 180,
          saturate: 200,
          contrast: 150,
          brightness: 110
        })
        break
    }
  }
  
  // 모든 필터 초기화
  const resetFilters = () => {
    updateMultipleProperties({
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
      }
    })
  }
  
  return (
    <div className="space-y-4">
      {/* 필터 프리셋 */}
      <div>
        <Label className="text-sm font-medium">필터 프리셋</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyFilterPreset('vintage')}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            빈티지
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyFilterPreset('blackwhite')}
          >
            <Moon className="w-4 h-4 mr-1" />
            흑백
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyFilterPreset('blur')}
          >
            <Eye className="w-4 h-4 mr-1" />
            블러
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyFilterPreset('dramatic')}
          >
            <Sun className="w-4 h-4 mr-1" />
            드라마틱
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyFilterPreset('dreamy')}
          >
            <Droplet className="w-4 h-4 mr-1" />
            몽환적
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyFilterPreset('cyberpunk')}
          >
            사이버펑크
          </Button>
        </div>
      </div>
      
      {/* 투명도 */}
      <div>
        <Label htmlFor="opacity" className="text-sm font-medium">
          투명도: <span className="font-mono text-blue-600">{(opacity * 100).toFixed(0)}%</span>
        </Label>
        <Slider
          id="opacity"
          min={0}
          max={1}
          step={0.01}
          value={[opacity]}
          onValueChange={([value]) => updateProperty('opacity', value)}
          className="mt-1"
        />
      </div>
      
      {/* 블러 */}
      <div>
        <Label htmlFor="blur" className="text-sm font-medium">
          블러: <span className="font-mono text-blue-600">{blur}px</span>
        </Label>
        <Slider
          id="blur"
          min={0}
          max={20}
          step={0.5}
          value={[blur]}
          onValueChange={([value]) => updateProperty('blur', value)}
          className="mt-1"
        />
      </div>
      
      {/* 밝기 */}
      <div>
        <Label htmlFor="brightness">
          밝기: <span className="font-mono">{brightness}%</span>
        </Label>
        <Slider
          id="brightness"
          min={0}
          max={200}
          step={1}
          value={[brightness]}
          onValueChange={([value]) => updateProperty('brightness', value)}
          className="mt-2"
        />
      </div>
      
      {/* 대비 */}
      <div>
        <Label htmlFor="contrast">
          대비: <span className="font-mono">{contrast}%</span>
        </Label>
        <Slider
          id="contrast"
          min={0}
          max={200}
          step={1}
          value={[contrast]}
          onValueChange={([value]) => updateProperty('contrast', value)}
          className="mt-2"
        />
      </div>
      
      {/* 회색조 */}
      <div>
        <Label htmlFor="grayscale">
          회색조: <span className="font-mono">{grayscale}%</span>
        </Label>
        <Slider
          id="grayscale"
          min={0}
          max={100}
          step={1}
          value={[grayscale]}
          onValueChange={([value]) => updateProperty('grayscale', value)}
          className="mt-2"
        />
      </div>
      
      {/* 색상 회전 */}
      <div>
        <Label htmlFor="hueRotate">
          색상 회전: <span className="font-mono">{hueRotate}°</span>
        </Label>
        <Slider
          id="hueRotate"
          min={0}
          max={360}
          step={1}
          value={[hueRotate]}
          onValueChange={([value]) => updateProperty('hueRotate', value)}
          className="mt-2"
        />
      </div>
      
      {/* 반전 */}
      <div>
        <Label htmlFor="invert">
          반전: <span className="font-mono">{invert}%</span>
        </Label>
        <Slider
          id="invert"
          min={0}
          max={100}
          step={1}
          value={[invert]}
          onValueChange={([value]) => updateProperty('invert', value)}
          className="mt-2"
        />
      </div>
      
      {/* 채도 */}
      <div>
        <Label htmlFor="saturate">
          채도: <span className="font-mono">{saturate}%</span>
        </Label>
        <Slider
          id="saturate"
          min={0}
          max={200}
          step={1}
          value={[saturate]}
          onValueChange={([value]) => updateProperty('saturate', value)}
          className="mt-2"
        />
      </div>
      
      {/* 세피아 */}
      <div>
        <Label htmlFor="sepia">
          세피아: <span className="font-mono">{sepia}%</span>
        </Label>
        <Slider
          id="sepia"
          min={0}
          max={100}
          step={1}
          value={[sepia]}
          onValueChange={([value]) => updateProperty('sepia', value)}
          className="mt-2"
        />
      </div>
      
      {/* 그림자 */}
      <div>
        <Label>그림자 효과</Label>
        <div className="space-y-2 mt-2">
          <div>
            <Label htmlFor="shadow-x" className="text-xs">
              X 오프셋: <span className="font-mono">{dropShadow.x}px</span>
            </Label>
            <Slider
              id="shadow-x"
              min={-20}
              max={20}
              step={1}
              value={[dropShadow.x]}
              onValueChange={([value]) => 
                updateProperty('dropShadow', { ...dropShadow, x: value })
              }
            />
          </div>
          
          <div>
            <Label htmlFor="shadow-y" className="text-xs">
              Y 오프셋: <span className="font-mono">{dropShadow.y}px</span>
            </Label>
            <Slider
              id="shadow-y"
              min={-20}
              max={20}
              step={1}
              value={[dropShadow.y]}
              onValueChange={([value]) => 
                updateProperty('dropShadow', { ...dropShadow, y: value })
              }
            />
          </div>
          
          <div>
            <Label htmlFor="shadow-blur" className="text-xs">
              블러: <span className="font-mono">{dropShadow.blur}px</span>
            </Label>
            <Slider
              id="shadow-blur"
              min={0}
              max={20}
              step={1}
              value={[dropShadow.blur]}
              onValueChange={([value]) => 
                updateProperty('dropShadow', { ...dropShadow, blur: value })
              }
            />
          </div>
          
          <div>
            <Label htmlFor="shadow-color" className="text-xs">
              색상
            </Label>
            <ColorPicker
              id="shadow-color"
              value={dropShadow.color}
              onChange={(color) => 
                updateProperty('dropShadow', { ...dropShadow, color })
              }
            />
          </div>
        </div>
      </div>
      
      {/* 초기화 버튼 */}
      <Button
        variant="outline"
        onClick={resetFilters}
        className="w-full"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        필터 초기화
      </Button>
    </div>
  )
}