'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useAnimationStore } from '@/lib/store/useAnimationStore'
import BasicControls from './controls/BasicControls'
import TransformControls from './controls/TransformControls'
import FilterControls from './controls/FilterControls'
import { Settings, Move, Filter, Key, Sparkles } from 'lucide-react'

export default function ControlPanel() {
  const [activeTab, setActiveTab] = useState('basic')
  const { useKeyframes } = useAnimationStore()
  
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <div className="p-3 border-b bg-white dark:bg-gray-800">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">애니메이션 컨트롤</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          속성을 조정하여 애니메이션을 커스터마이징하세요
        </p>
      </div>
      
      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 border-b">
          <TabsTrigger value="presets" className="gap-2">
            <Sparkles className="w-4 h-4" />
            프리셋
          </TabsTrigger>
          <TabsTrigger value="basic" className="gap-2">
            <Settings className="w-4 h-4" />
            기본
          </TabsTrigger>
          <TabsTrigger value="transform" className="gap-2">
            <Move className="w-4 h-4" />
            변형
          </TabsTrigger>
          <TabsTrigger value="filter" className="gap-2">
            <Filter className="w-4 h-4" />
            필터
          </TabsTrigger>
          {useKeyframes && (
            <TabsTrigger value="keyframes" className="gap-2">
              <Key className="w-4 h-4" />
              키프레임
            </TabsTrigger>
          )}
        </TabsList>
        
        {/* 탭 컨텐츠 */}
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="presets" className="mt-0 p-3">
            <div className="text-center text-gray-500 py-8">
              프리셋 기능 준비 중...
            </div>
          </TabsContent>
          
          <TabsContent value="basic" className="mt-0 p-3">
            <BasicControls />
          </TabsContent>
          
          <TabsContent value="transform" className="mt-0 p-3">
            <TransformControls />
          </TabsContent>
          
          <TabsContent value="filter" className="mt-0 p-3">
            <FilterControls />
          </TabsContent>
          
          {useKeyframes && (
            <TabsContent value="keyframes" className="mt-0 p-4">
              <div className="text-center text-gray-500 py-8">
                키프레임 에디터 준비 중...
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>
      
      {/* 푸터 액션 */}
      <div className="p-4 border-t space-y-2">
        <button
          onClick={() => useAnimationStore.getState().reset()}
          className="w-full px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          초기화
        </button>
        <button
          onClick={() => {
            const name = prompt('프리셋 이름을 입력하세요:')
            if (name) useAnimationStore.getState().saveAsPreset(name)
          }}
          className="w-full px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors"
        >
          프리셋으로 저장
        </button>
      </div>
    </div>
  )
}