'use client'

import { useAnimationStore } from '@/lib/store/useAnimationStore'
import { Slider } from '@/components/ui/Slider'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { RotateCcw, Move3d, Maximize, RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

export default function TransformControls() {
  const {
    translateX,
    translateY,
    translateZ,
    rotate,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    scaleX,
    scaleY,
    skewX,
    skewY,
    updateProperty,
    updateMultipleProperties
  } = useAnimationStore()
  
  // 프리셋 변형 적용
  const applyPresetTransform = (type: string) => {
    switch (type) {
      case 'slideInLeft':
        updateMultipleProperties({
          translateX: -100,
          translateY: 0,
          opacity: 0
        })
        break
      case 'slideInRight':
        updateMultipleProperties({
          translateX: 100,
          translateY: 0,
          opacity: 0
        })
        break
      case 'slideInTop':
        updateMultipleProperties({
          translateX: 0,
          translateY: -100,
          opacity: 0
        })
        break
      case 'slideInBottom':
        updateMultipleProperties({
          translateX: 0,
          translateY: 100,
          opacity: 0
        })
        break
      case 'zoomIn':
        updateMultipleProperties({
          scale: 0,
          opacity: 0
        })
        break
      case 'zoomOut':
        updateMultipleProperties({
          scale: 2,
          opacity: 0
        })
        break
      case 'rotate360':
        updateProperty('rotate', 360)
        break
      case 'flip':
        updateProperty('rotateY', 180)
        break
    }
  }
  
  // 모든 변형 초기화
  const resetTransform = () => {
    updateMultipleProperties({
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
      skewY: 0
    })
  }
  
  return (
    <div className="space-y-4">
      {/* 빠른 프리셋 */}
      <div>
        <Label className="text-sm font-medium">빠른 프리셋</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPresetTransform('slideInLeft')}
          >
            ← 왼쪽에서
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPresetTransform('slideInRight')}
          >
            오른쪽에서 →
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPresetTransform('slideInTop')}
          >
            ↓ 위에서
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPresetTransform('slideInBottom')}
          >
            아래에서 ↑
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPresetTransform('zoomIn')}
          >
            <Maximize className="w-4 h-4 mr-1" />
            확대
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPresetTransform('zoomOut')}
          >
            축소
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPresetTransform('rotate360')}
          >
            <RotateCw className="w-4 h-4 mr-1" />
            360°
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPresetTransform('flip')}
          >
            <FlipHorizontal className="w-4 h-4 mr-1" />
            뒤집기
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="translate" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="translate">이동</TabsTrigger>
          <TabsTrigger value="rotate">회전</TabsTrigger>
          <TabsTrigger value="scale">크기</TabsTrigger>
          <TabsTrigger value="skew">기울기</TabsTrigger>
        </TabsList>
        
        {/* 이동 (Translate) */}
        <TabsContent value="translate" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="translateX" className="text-sm font-medium">
              X축 이동: <span className="font-mono text-blue-600">{translateX}px</span>
            </Label>
            <Slider
              id="translateX"
              min={-200}
              max={200}
              step={1}
              value={[translateX]}
              onValueChange={([value]) => updateProperty('translateX', value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="translateY" className="text-sm font-medium">
              Y축 이동: <span className="font-mono text-blue-600">{translateY}px</span>
            </Label>
            <Slider
              id="translateY"
              min={-200}
              max={200}
              step={1}
              value={[translateY]}
              onValueChange={([value]) => updateProperty('translateY', value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="translateZ">
              Z축 이동 (3D): <span className="font-mono">{translateZ}px</span>
            </Label>
            <Slider
              id="translateZ"
              min={-200}
              max={200}
              step={1}
              value={[translateZ]}
              onValueChange={([value]) => updateProperty('translateZ', value)}
              className="mt-2"
            />
          </div>
        </TabsContent>
        
        {/* 회전 (Rotate) */}
        <TabsContent value="rotate" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="rotate">
              2D 회전: <span className="font-mono">{rotate}°</span>
            </Label>
            <Slider
              id="rotate"
              min={-360}
              max={360}
              step={1}
              value={[rotate]}
              onValueChange={([value]) => updateProperty('rotate', value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="rotateX">
              X축 회전 (3D): <span className="font-mono">{rotateX}°</span>
            </Label>
            <Slider
              id="rotateX"
              min={-180}
              max={180}
              step={1}
              value={[rotateX]}
              onValueChange={([value]) => updateProperty('rotateX', value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="rotateY">
              Y축 회전 (3D): <span className="font-mono">{rotateY}°</span>
            </Label>
            <Slider
              id="rotateY"
              min={-180}
              max={180}
              step={1}
              value={[rotateY]}
              onValueChange={([value]) => updateProperty('rotateY', value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="rotateZ">
              Z축 회전 (3D): <span className="font-mono">{rotateZ}°</span>
            </Label>
            <Slider
              id="rotateZ"
              min={-180}
              max={180}
              step={1}
              value={[rotateZ]}
              onValueChange={([value]) => updateProperty('rotateZ', value)}
              className="mt-2"
            />
          </div>
        </TabsContent>
        
        {/* 크기 (Scale) */}
        <TabsContent value="scale" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="scale">
              전체 크기: <span className="font-mono">{scale}x</span>
            </Label>
            <Slider
              id="scale"
              min={0}
              max={3}
              step={0.01}
              value={[scale]}
              onValueChange={([value]) => updateProperty('scale', value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="scaleX">
              X축 크기: <span className="font-mono">{scaleX}x</span>
            </Label>
            <Slider
              id="scaleX"
              min={0}
              max={3}
              step={0.01}
              value={[scaleX]}
              onValueChange={([value]) => updateProperty('scaleX', value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="scaleY">
              Y축 크기: <span className="font-mono">{scaleY}x</span>
            </Label>
            <Slider
              id="scaleY"
              min={0}
              max={3}
              step={0.01}
              value={[scaleY]}
              onValueChange={([value]) => updateProperty('scaleY', value)}
              className="mt-2"
            />
          </div>
        </TabsContent>
        
        {/* 기울기 (Skew) */}
        <TabsContent value="skew" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="skewX">
              X축 기울기: <span className="font-mono">{skewX}°</span>
            </Label>
            <Slider
              id="skewX"
              min={-45}
              max={45}
              step={1}
              value={[skewX]}
              onValueChange={([value]) => updateProperty('skewX', value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="skewY">
              Y축 기울기: <span className="font-mono">{skewY}°</span>
            </Label>
            <Slider
              id="skewY"
              min={-45}
              max={45}
              step={1}
              value={[skewY]}
              onValueChange={([value]) => updateProperty('skewY', value)}
              className="mt-2"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      {/* 초기화 버튼 */}
      <Button
        variant="outline"
        onClick={resetTransform}
        className="w-full"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        변형 초기화
      </Button>
    </div>
  )
}