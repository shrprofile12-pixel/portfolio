"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  offset: number;
};

export default function ParticlePhoto() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = "/selfHero.png";

    let animationFrameId: number;
    const particles: Particle[] = [];

    image.onload = () => {
      const width = 500;
      const height = 600;

      canvas.width = width;
      canvas.height = height;

      // Temporary canvas — sirf image ke pixels read karne ke liye
      const offscreenCanvas = document.createElement("canvas");
      const offscreenCtx = offscreenCanvas.getContext("2d");

      if (!offscreenCtx) return;

      offscreenCanvas.width = width;
      offscreenCanvas.height = height;
      offscreenCtx.drawImage(image, 0, 0, width, height);

      const imageData = offscreenCtx.getImageData(
        0,
        0,
        width,
        height
      );

      const pixels = imageData.data;
      const gap = 6;

      // STEP 1: Photo se particles banao
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;

          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];

          if (alpha < 100) continue;

          const brightness = (red + green + blue) / 3;

          particles.push({
            x,
            y,
            size: Math.max(0.7, brightness / 150),
            color: `rgb(${red}, ${green}, ${blue})`,
            offset: Math.random() * Math.PI * 2,
          });
        }
      }

      // STEP 2: Animation function
      const animate = (time: number) => {
        // Background ko black fill karne ki bajaye transparent clear karo
        ctx.clearRect(0, 0, width, height);

        // Har particle ko redraw karo
        particles.forEach((particle) => {
          // Subtle floating motion
          const moveX =
            Math.sin(time * 0.001 + particle.offset) * 1.5;

          const moveY =
            Math.cos(time * 0.001 + particle.offset) * 1.5;

          ctx.fillStyle = particle.color;

          ctx.beginPath();
          ctx.arc(
            particle.x + moveX,
            particle.y + moveY,
            particle.size,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animate(0);
    };

    image.onerror = () => {
      console.error("Image could not be loaded.");
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex w-full justify-center py-10">
      <canvas
        ref={canvasRef}
        className="h-auto w-full max-w-[500px]"
      />
    </div>
  );
}