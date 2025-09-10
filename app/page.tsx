import AnimationCanvas from "@/components/editor/AnimationCanvas";

export default function Home() {
  return (
    <div className="h-screen flex">
      <div className="flex-1">
        <AnimationCanvas />
      </div>
    </div>
  );
}
