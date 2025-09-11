import AnimationCanvas from "@/components/editor/AnimationCanvas";
import ControlPanel from "@/components/editor/ControlPanel";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
