"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Maximize2, Download } from "lucide-react";
import { useAnimationStore } from "@/lib/store/useAnimationStore";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

const previewShapes = [
  { value: "square", label: "정사각형" },
  { value: "circle", label: "원형" },
  { value: "text", label: "텍스트" },
  { value: "button", label: "버튼" },
  { value: "card", label: "카드" },
];

const backgroundOptions = [
  { value: "grid", label: "그리드" },
  { value: "dots", label: "도트" },
  { value: "gradient", label: "그라디언트" },
  { value: "solid", label: "단색" },
  { value: "transparent", label: "투명" },
];

export default function AnimationCanvas() {
  const animationState = useAnimationStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedShape, setSelectedShape] = useState("square");
  const [selectedBackground, setSelectedBackground] = useState("grid");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // 애니메이션 재시작
  const restartAnimation = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 50);
  };

  // 전체화면 토글
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // GIF로 내보내기 (Pro 기능)
  const exportAsGif = async () => {
    console.log("Export as GIF - Pro feature");
  };

  // 애니메이션 스타일 생성
  const getAnimationStyle = () => {
    const { duration, delay, timingFunction, iterationCount, direction, fillMode } = animationState;

    // 기본 변형 속성 생성
    const transform = [];
    if (animationState.translateX !== 0) transform.push(`translateX(${animationState.translateX}px)`);
    if (animationState.translateY !== 0) transform.push(`translateY(${animationState.translateY}px)`);
    if (animationState.translateZ !== 0) transform.push(`translateZ(${animationState.translateZ}px)`);
    if (animationState.rotate !== 0) transform.push(`rotate(${animationState.rotate}deg)`);
    if (animationState.rotateX !== 0) transform.push(`rotateX(${animationState.rotateX}deg)`);
    if (animationState.rotateY !== 0) transform.push(`rotateY(${animationState.rotateY}deg)`);
    if (animationState.rotateZ !== 0) transform.push(`rotateZ(${animationState.rotateZ}deg)`);
    if (animationState.scale !== 1) transform.push(`scale(${animationState.scale})`);
    if (animationState.scaleX !== 1) transform.push(`scaleX(${animationState.scaleX})`);
    if (animationState.scaleY !== 1) transform.push(`scaleY(${animationState.scaleY})`);
    if (animationState.skewX !== 0) transform.push(`skewX(${animationState.skewX}deg)`);
    if (animationState.skewY !== 0) transform.push(`skewY(${animationState.skewY}deg)`);

    // 필터 속성 생성
    const filter = [];
    if (animationState.blur !== 0) filter.push(`blur(${animationState.blur}px)`);
    if (animationState.brightness !== 100) filter.push(`brightness(${animationState.brightness}%)`);
    if (animationState.contrast !== 100) filter.push(`contrast(${animationState.contrast}%)`);
    if (animationState.grayscale !== 0) filter.push(`grayscale(${animationState.grayscale}%)`);
    if (animationState.hueRotate !== 0) filter.push(`hue-rotate(${animationState.hueRotate}deg)`);
    if (animationState.invert !== 0) filter.push(`invert(${animationState.invert}%)`);
    if (animationState.saturate !== 100) filter.push(`saturate(${animationState.saturate}%)`);
    if (animationState.sepia !== 0) filter.push(`sepia(${animationState.sepia}%)`);
    
    // 드롭 섀도우 처리
    if (animationState.dropShadow.blur > 0 || animationState.dropShadow.x !== 0 || animationState.dropShadow.y !== 0) {
      filter.push(`drop-shadow(${animationState.dropShadow.x}px ${animationState.dropShadow.y}px ${animationState.dropShadow.blur}px ${animationState.dropShadow.color})`);
    }

    const baseStyle: React.CSSProperties & Record<string, any> = {
      // 애니메이션 재생 중이 아닐 때만 실시간 스타일 적용
      ...((!isPlaying || animationState.playState === 'paused') && {
        transform: transform.join(" ") || "none",
        filter: filter.join(" ") || "none",
        opacity: animationState.opacity,
      }),
      transition: (!isPlaying || animationState.playState === 'paused') ? "all 0.2s ease-out" : "none"
    };

    // 애니메이션이 재생 중일 때 애니메이션 적용
    if (isPlaying && animationState.playState === 'running') {
      if (animationState.useKeyframes && animationState.keyframes.length > 0) {
        // 키프레임 애니메이션
        baseStyle.animation = `custom-keyframe ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode}`;
      } else {
        // 기본 애니메이션 - 실제 변환 값이 있을 때만 적용
        if (transform.length > 0 || filter.length > 0 || animationState.opacity !== 1) {
          baseStyle.animation = `custom-animation ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode}`;
          baseStyle["--transform-start"] = "none";
          baseStyle["--transform-end"] = transform.join(" ") || "none";
          baseStyle["--filter-start"] = "none";
          baseStyle["--filter-end"] = filter.join(" ") || "none";
          baseStyle["--opacity-start"] = "1";
          baseStyle["--opacity-end"] = animationState.opacity.toString();
        }
      }
      baseStyle.animationPlayState = animationState.playState;
    }

    return baseStyle;
  };

  // 미리보기 요소 렌더링
  const renderPreviewElement = () => {
    const baseClasses = "relative";

    switch (selectedShape) {
      case "circle":
        return (
          <div
            className={`${baseClasses} w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full`}
            style={getAnimationStyle()}
          />
        );
      case "text":
        return (
          <span
            className={`${baseClasses} text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
            style={getAnimationStyle()}
          >
            Animated
          </span>
        );
      case "button":
        return (
          <button
            className={`${baseClasses} px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg`}
            style={getAnimationStyle()}
          >
            Click Me
          </button>
        );
      case "card":
        return (
          <div className={`${baseClasses} w-64 h-40 bg-white rounded-xl shadow-xl p-6`} style={getAnimationStyle()}>
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        );
      default:
        return (
          <div
            className={`${baseClasses} w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg`}
            style={getAnimationStyle()}
          />
        );
    }
  };

  // 배경 렌더링
  const renderBackground = () => {
    switch (selectedBackground) {
      case "grid":
        return (
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-8">
            {[...Array(96)].map((_, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700" />
            ))}
          </div>
        );
      case "dots":
        return (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        );
      case "gradient":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20" />
        );
      case "solid":
        return <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // 키프레임 CSS 주입
    if (animationState.useKeyframes && animationState.keyframes.length > 0) {
      const style = document.createElement("style");
      style.textContent = `
        @keyframes custom-keyframe {
          ${animationState.keyframes
            .map(
              (kf) => `
            ${kf.offset}% {
              transform: ${Object.entries(kf.properties)
                .filter(([key]) => key !== "opacity" && key !== "blur")
                .map(([key, value]) => {
                  if (key === "translateX" || key === "translateY") return `${key}(${value}px)`;
                  if (key === "rotate") return `${key}(${value}deg)`;
                  if (key === "scale") return `${key}(${value})`;
                  return "";
                })
                .join(" ")};
              ${kf.properties.opacity !== undefined ? `opacity: ${kf.properties.opacity};` : ""}
              ${kf.properties.blur !== undefined ? `filter: blur(${kf.properties.blur}px);` : ""}
            }
          `
            )
            .join("")}
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    } else {
      // 기본 애니메이션 CSS
      const style = document.createElement("style");
      style.textContent = `
        @keyframes custom-animation {
          from {
            transform: none;
            opacity: 1;
            filter: none;
          }
          to {
            transform: var(--transform-end);
            opacity: var(--opacity-end);
            filter: var(--filter-end);
          }
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [animationState]);

  return (
    <div className="flex flex-col h-full">
      {/* 툴바 */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Select
            value={selectedShape}
            onValueChange={setSelectedShape}
            options={previewShapes}
            placeholder="모양 선택"
          />
          <Select
            value={selectedBackground}
            onValueChange={setSelectedBackground}
            options={backgroundOptions}
            placeholder="배경 선택"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={restartAnimation}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={exportAsGif} className="relative group">
            <Download className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 text-xs bg-yellow-500 text-black px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              PRO
            </span>
          </Button>
        </div>
      </div>

      {/* 캔버스 */}
      <div ref={canvasRef} className="flex-1 relative overflow-hidden bg-white dark:bg-gray-900">
        {renderBackground()}

        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={animationRef}>{renderPreviewElement()}</div>
        </div>

        {/* 타임라인 인디케이터 */}
        {isPlaying && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: animationState.duration,
                  delay: animationState.delay,
                  repeat:
                    animationState.iterationCount === "infinite"
                      ? Infinity
                      : parseInt(animationState.iterationCount) - 1,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
