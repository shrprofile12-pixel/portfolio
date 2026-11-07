"use client";

import React, { useEffect, useRef } from "react";

export const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dots: MovingDot[] = [];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    class MovingDot {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      pulseSpeed: number;
      pulseOffset: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.35 + 0.08;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.65 + 0.25;
        this.pulseSpeed = Math.random() * 0.004 + 0.001;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width + 15) {
          this.x = -15;
          this.y = Math.random() * height;
        }

        if (this.y < 0 || this.y > height) {
          this.speedY *= -1;
        }
      }

      draw(time: number) {
        const pulse =
          0.65 +
          Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.35;

        const currentAlpha = this.alpha * pulse;

        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.shadowBlur = this.size > 1.5 ? 12 : 6;
        ctx.shadowColor = `rgba(255, 255, 255, ${currentAlpha})`;

        ctx.fill();
        ctx.restore();
      }
    }

    const createDots = () => {
      dots = [];

      const count = Math.max(120, Math.floor((width * height) / 4000));

      for (let i = 0; i < count; i++) {
        dots.push(new MovingDot());
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.update();
        dot.draw(time);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createDots();
    };

    resizeCanvas();
    createDots();
    animate(0);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
};