import AnimationCanvas from "@/components/editor/AnimationCanvas";
import ControlPanel from "@/components/editor/ControlPanel";

export default function Home() {
  return (
    <div className="h-screen flex">
      <div className="flex-1">
        <AnimationCanvas />
      </div>
      <div className="w-80 border-l">
        <ControlPanel />
      </div>
    </div>
  );
}
