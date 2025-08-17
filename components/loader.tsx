"use client"

import { useEffect, useState } from "react"
// Removed framer-motion imports

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 500);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Removed mask logic

  return (
    isVisible && (
      <div
        className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center z-[9999]"
        style={{ transition: 'opacity 0.5s', opacity }}
      >
        <div className="select-none flex items-center justify-center">
          <div
            style={{
              width: "clamp(4rem,12vw,8rem)",
              height: "auto",
              overflow: "hidden",
              userSelect: "none",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-auto"
              draggable="false"
            />
          </div>
        </div>
      </div>
    )
  );
}
