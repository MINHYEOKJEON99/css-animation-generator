'use client'

import { useState } from 'react'
import { useAnimationStore } from '@/lib/store/useAnimationStore'
import { Slider } from '@/components/ui/Slider'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import { Info } from 'lucide-react'
import { Tooltip } from '@/components/ui/Tooltip'

const timingFunctions = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'ease-in', label: 'Ease In' },
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
  { value: 'cubic-bezier(0.68,-0.55,0.265,1.55)', label: 'Back' },
  { value: 'cubic-bezier(0.175,0.885,0.32,1.275)', label: 'Back Out' },
  { value: 'cubic-bezier(0.6,-0.28,0.735,0.045)', label: 'Back In' },
  { value: 'cubic-bezier(0.77,0,0.175,1)', label: 'Circ Out' },
  { value: 'cubic-bezier(0.6,0.04,0.98,0.335)', label: 'Circ In' },
  { value: 'cubic-bezier(1,0,0,1)', label: 'Expo Out' },
  { value: 'cubic-bezier(0.95,0.05,0.795,0.035)', label: 'Expo In' },
  { value: 'steps(4, end)', label: 'Steps (4)' },
  { value: 'steps(8, end)', label: 'Steps (8)' },
  { value: 'custom', label: '커스텀 큐빅 베지어' }
]

const directions = [
  { value: 'normal', label: '정방향' },
  { value: 'reverse', label: '역방향' },
  { value: 'alternate', label: '교대' },
  { value: 'alternate-reverse', label: '교대 역방향' }
]

const fillModes = [
  { value: 'none', label: '없음' },
  { value: 'forwards', label: '앞으로' },
  { value: 'backwards', label: '뒤로' },
  { value: 'both', label: '양쪽' }
]

export default function BasicControls() {
  const {
    name,
    duration,
    delay,
    timingFunction,
    iterationCount,
    direction,
    fillMode,
    playState,
    useKeyframes,
    updateProperty
  } = useAnimationStore()
  
  const [customBezier, setCustomBezier] = useState('0.42, 0, 0.58, 1')
  const [isInfinite, setIsInfinite] = useState(iterationCount === 'infinite')
  const [customIterations, setCustomIterations] = useState('1')
  
  const handleTimingFunctionChange = (value: string) => {
    if (value === 'custom') {
      const bezier = prompt('큐빅 베지어 값을 입력하세요 (예: 0.42, 0, 0.58, 1):')
      if (bezier) {
        updateProperty('timingFunction', `cubic-bezier(${bezier})`)
        setCustomBezier(bezier)
      }
    } else {
      updateProperty('timingFunction', value)
    }
  }
  
  const handleIterationChange = (infinite: boolean) => {
    setIsInfinite(infinite)
    if (infinite) {
      updateProperty('iterationCount', 'infinite')
    } else {
      updateProperty('iterationCount', customIterations)
    }
  }
  
  return (
    <div className="space-y-4">
      {/* 애니메이션 이름 */}
      <div>
        <Label htmlFor="animation-name">
          애니메이션 이름
          <Tooltip content="CSS에서 사용될 애니메이션 이름입니다">
            <Info className="inline-block w-3 h-3 ml-1" />
          </Tooltip>
        </Label>
        <Input
          id="animation-name"
          value={name}
          onChange={(e) => updateProperty('name', e.target.value)}
          placeholder="custom-animation"
          className="mt-2"
        />
      </div>
      
      {/* 지속 시간 */}
      <div>
        <Label htmlFor="duration" className="text-sm font-medium">
          지속 시간: <span className="font-mono text-blue-600 font-feature-tabular">{duration}s</span>
        </Label>
        <Slider
          id="duration"
          min={0.1}
          max={10}
          step={0.1}
          value={[duration]}
          onValueChange={([value]) => updateProperty('duration', value)}
          className="mt-1"
        />
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-1">
          <span>0.1s</span>
          <span>10s</span>
        </div>
      </div>
      
      {/* 지연 시간 */}
      <div>
        <Label htmlFor="delay" className="text-sm font-medium">
          지연 시간: <span className="font-mono text-blue-600 font-feature-tabular">{delay}s</span>
        </Label>
        <Slider
          id="delay"
          min={0}
          max={5}
          step={0.1}
          value={[delay]}
          onValueChange={([value]) => updateProperty('delay', value)}
          className="mt-1"
        />
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-1">
          <span>0s</span>
          <span>5s</span>
        </div>
      </div>
      
      {/* 타이밍 함수 */}
      <div>
        <Label htmlFor="timing-function" className="text-sm font-medium">
          타이밍 함수
          <Tooltip content="애니메이션의 속도 곡선을 결정합니다">
            <Info className="inline-block w-3 h-3 ml-1" />
          </Tooltip>
        </Label>
        <Select
          value={timingFunction}
          onValueChange={handleTimingFunctionChange}
          options={timingFunctions}
          className="mt-1"
        />
        {timingFunction.includes('cubic-bezier') && (
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
            {timingFunction}
          </div>
        )}
      </div>
      
      {/* 반복 횟수 */}
      <div>
        <Label>
          반복 횟수
          <Tooltip content="애니메이션이 반복되는 횟수입니다">
            <Info className="inline-block w-3 h-3 ml-1" />
          </Tooltip>
        </Label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isInfinite}
              onCheckedChange={handleIterationChange}
            />
            <Label className="font-normal">
              무한 반복
            </Label>
          </div>
          {!isInfinite && (
            <Input
              type="number"
              min="1"
              value={customIterations}
              onChange={(e) => {
                setCustomIterations(e.target.value)
                updateProperty('iterationCount', e.target.value)
              }}
              placeholder="반복 횟수"
            />
          )}
        </div>
      </div>
      
      {/* 방향 */}
      <div>
        <Label htmlFor="direction">
          애니메이션 방향
        </Label>
        <Select
          value={direction}
          onValueChange={(value) => updateProperty('direction', value)}
          options={directions}
          className="mt-2"
        />
      </div>
      
      {/* Fill Mode */}
      <div>
        <Label htmlFor="fill-mode">
          Fill Mode
          <Tooltip content="애니메이션 전후의 스타일 적용 방식입니다">
            <Info className="inline-block w-3 h-3 ml-1" />
          </Tooltip>
        </Label>
        <Select
          value={fillMode}
          onValueChange={(value) => updateProperty('fillMode', value)}
          options={fillModes}
          className="mt-2"
        />
      </div>
      
      {/* 재생 상태 */}
      <div>
        <Label>
          재생 상태
        </Label>
        <div className="mt-2 flex items-center space-x-2">
          <Switch
            checked={playState === 'running'}
            onCheckedChange={(checked) => 
              updateProperty('playState', checked ? 'running' : 'paused')
            }
          />
          <Label className="font-normal">
            {playState === 'running' ? '재생 중' : '일시정지'}
          </Label>
        </div>
      </div>
      
      {/* 키프레임 모드 */}
      <div>
        <Label>
          키프레임 모드
          <Tooltip content="키프레임을 사용하여 더 복잡한 애니메이션을 만들 수 있습니다">
            <Info className="inline-block w-3 h-3 ml-1" />
          </Tooltip>
        </Label>
        <div className="mt-2 flex items-center space-x-2">
          <Switch
            checked={useKeyframes}
            onCheckedChange={(checked) => updateProperty('useKeyframes', checked)}
          />
          <Label className="font-normal">
            {useKeyframes ? '키프레임 사용' : '기본 애니메이션'}
          </Label>
        </div>
      </div>
    </div>
  )
}