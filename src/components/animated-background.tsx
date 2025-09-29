"use client";

import type React from "react";

import { Dithering } from "@paper-design/shaders-react";

interface AnimatedBackgroundProps {
  /**
   * Background color (default: "#000000")
   */
  backgroundColor?: string;
  /**
   * Front color for the dithering effect (default: "#614B00")
   */
  colorFront?: string;
  /**
   * Back color for the dithering effect (default: "#00000000" - transparent)
   */
  colorBack?: string;
  /**
   * Animation speed (default: 0.43)
   */
  speed?: number;
  /**
   * Dithering shape (default: "wave")
   */
  shape?: "wave" | "simplex" | "warp" | "dots" | "ripple" | "swirl" | "sphere";
  /**
   * Dithering type/pattern (default: "4x4")
   */
  type?: "2x2" | "4x4" | "8x8";
  /**
   * Pixel size for the dithering effect (default: 3)
   */
  pxSize?: number;
  /**
   * Scale of the pattern (default: 1.13)
   */
  scale?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Children to render on top of the background
   */
  children?: React.ReactNode;
}

export function AnimatedBackground({
  backgroundColor = "#000000",
  colorFront = "#614B00",
  colorBack = "#00000000",
  speed = 0.43,
  shape = "wave",
  type = "4x4",
  pxSize = 3,
  scale = 1.13,
  className = "",
  children,
}: AnimatedBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Fixed background layer */}
      <div className="fixed inset-0 z-0">
        <Dithering
          colorBack={colorBack}
          colorFront={colorFront}
          speed={speed}
          shape={shape}
          type={type}
          pxSize={pxSize}
          scale={scale}
          style={{
            backgroundColor,
            height: "100vh",
            width: "100vw",
          }}
        />
      </div>

      {/* Content layer */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
