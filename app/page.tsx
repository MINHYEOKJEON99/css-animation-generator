import AnimationCanvas from "@/components/editor/AnimationCanvas";
import ControlPanel from "@/components/editor/ControlPanel";
import { Play, Settings, Code2, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="h-14 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 text-balance">CSS Animation Studio</h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 text-balance">Professional animation editor</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors">
              Examples
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors">
              Docs
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm">
              Pro Version
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="h-[calc(100vh-3.5rem)] flex">
        {/* Canvas Area */}
        <div className="flex-1 relative">
          <AnimationCanvas />
        </div>
        
        {/* Control Panel */}
        <div className="w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-l border-slate-200 dark:border-slate-700 shadow-xl">
          <ControlPanel />
        </div>
      </div>
    </div>
  );
}
