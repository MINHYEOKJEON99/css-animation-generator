"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useAnimationStore } from "@/lib/store/useAnimationStore";
import BasicControls from "./controls/BasicControls";
import TransformControls from "./controls/TransformControls";
import FilterControls from "./controls/FilterControls";
import { Settings, Move, Filter, Key, Sparkles } from "lucide-react";

export default function ControlPanel() {
  const [activeTab, setActiveTab] = useState("basic");
  const { useKeyframes } = useAnimationStore();

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 glass-strong">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 text-balance">Animation Controls</h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 text-balance">
          Customize your animation properties and effects
        </p>
      </div>

      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-700/50">
          <TabsList className="w-full justify-start gap-2  rounded-modern p-1">
            <TabsTrigger
              value="presets"
              className="gap-2 rounded-modern transition-smooth data-[state=active]:bg-white data-[state=active]:shadow-modern-sm dark:data-[state=active]:bg-slate-700"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Presets</span>
            </TabsTrigger>
            <TabsTrigger
              value="basic"
              className="gap-2 rounded-modern transition-smooth data-[state=active]:bg-white data-[state=active]:shadow-modern-sm dark:data-[state=active]:bg-slate-700"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Basic</span>
            </TabsTrigger>
            <TabsTrigger
              value="transform"
              className="gap-2 rounded-modern transition-smooth data-[state=active]:bg-white data-[state=active]:shadow-modern-sm dark:data-[state=active]:bg-slate-700"
            >
              <Move className="w-4 h-4" />
              <span className="text-sm font-medium">Transform</span>
            </TabsTrigger>
            <TabsTrigger
              value="filter"
              className="gap-2 rounded-modern transition-smooth data-[state=active]:bg-white data-[state=active]:shadow-modern-sm dark:data-[state=active]:bg-slate-700"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </TabsTrigger>
            {useKeyframes && (
              <TabsTrigger
                value="keyframes"
                className="gap-2 rounded-modern transition-smooth data-[state=active]:bg-white data-[state=active]:shadow-modern-sm dark:data-[state=active]:bg-slate-700"
              >
                <Key className="w-4 h-4" />
                <span className="text-sm font-medium">Keyframes</span>
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="presets" className="mt-0 p-6">
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm">Preset library coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="basic" className="mt-0 p-6">
            <BasicControls />
          </TabsContent>

          <TabsContent value="transform" className="mt-0 p-6">
            <TransformControls />
          </TabsContent>

          <TabsContent value="filter" className="mt-0 p-6">
            <FilterControls />
          </TabsContent>

          {useKeyframes && (
            <TabsContent value="keyframes" className="mt-0 p-6">
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm">Keyframe editor coming soon...</p>
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>

      {/* 푸터 액션 */}
      <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50 space-y-3 bg-slate-50/30 dark:bg-slate-900/30">
        <button
          onClick={() => useAnimationStore.getState().reset()}
          className="w-full px-4 py-3 text-sm font-medium bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300/80 dark:hover:bg-slate-600/80 rounded-modern transition-smooth shadow-modern-sm hover:shadow-modern"
        >
          Reset All Settings
        </button>
        <button
          onClick={() => {
            const name = prompt("Enter preset name:");
            if (name) useAnimationStore.getState().saveAsPreset(name);
          }}
          className="w-full px-4 py-3 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 rounded-modern transition-smooth shadow-modern hover:shadow-modern-lg"
        >
          Save as Preset
        </button>
      </div>
    </div>
  );
}
