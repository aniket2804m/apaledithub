import React, { useEffect, useRef } from "react";

export const MovingBlocksBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking for interactive block wave
    let mouseX = width / 2;
    let mouseY = height / 3;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Isometric grid configuration
    const tileW = 54;
    const tileH = 27; // 2:1 isometric ratio
    const cols = Math.ceil(width / tileW) + 16;
    const rows = Math.ceil(height / tileH) + 24;

    interface Block {
      col: number;
      row: number;
      baseHeight: number;
      currentHeight: number;
      targetHeight: number;
      phase: number;
      speed: number;
      colorGlow: number;
    }

    const blocks: Block[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Randomly select 35% of tiles to be elevated moving 3D blocks
        const isBlock = (c + r * 3) % 4 === 0 || (c * 7 + r * 5) % 11 === 0;
        blocks.push({
          col: c - 8,
          row: r - 8,
          baseHeight: isBlock ? Math.random() * 18 + 6 : 0,
          currentHeight: 0,
          targetHeight: 0,
          phase: Math.random() * Math.PI * 2,
          speed: 0.015 + Math.random() * 0.02,
          colorGlow: Math.random() > 0.85 ? 1 : 0,
        });
      }
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Deep obsidian black background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Golden ambient radial glow from top-center / hero
      const radialGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        50,
        width * 0.5,
        height * 0.4,
        width * 0.65
      );
      radialGlow.addColorStop(0, "rgba(255, 184, 0, 0.12)");
      radialGlow.addColorStop(0.4, "rgba(255, 150, 0, 0.035)");
      radialGlow.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Render isometric diagonal grid and 3D moving blocks
      const originX = width / 2;
      const originY = 60;

      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        // Isometric coordinate conversion
        const screenX = originX + (b.col - b.row) * (tileW / 2);
        const screenY = originY + (b.col + b.row) * (tileH / 2);

        // Cull blocks off screen
        if (
          screenX < -tileW * 2 ||
          screenX > width + tileW * 2 ||
          screenY < -tileH * 3 ||
          screenY > height + tileH * 3
        ) {
          continue;
        }

        // Distance to mouse for interactive displacement
        const dx = screenX - mouseX;
        const dy = screenY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseEffect = Math.max(0, 1 - dist / 320);

        // Oscillating height with traveling wave
        const wave = Math.sin(time * 1.5 + (b.col * 0.3 + b.row * 0.3) + b.phase);
        b.targetHeight = b.baseHeight > 0
          ? b.baseHeight + wave * 8 + mouseEffect * 22
          : mouseEffect * 14;

        b.currentHeight += (b.targetHeight - b.currentHeight) * 0.1;
        const h = b.currentHeight;

        // Top polygon points
        const topY = screenY - h;
        const p1x = screenX;
        const p1y = topY;
        const p2x = screenX + tileW / 2;
        const p2y = topY + tileH / 2;
        const p3x = screenX;
        const p3y = topY + tileH;
        const p4x = screenX - tileW / 2;
        const p4y = topY + tileH / 2;

        // Draw sides if elevated
        if (h > 1) {
          // Left Side (Darker Charcoal)
          ctx.beginPath();
          ctx.moveTo(p4x, p4y);
          ctx.lineTo(p3x, p3y);
          ctx.lineTo(p3x, screenY + tileH);
          ctx.lineTo(p4x, screenY + tileH / 2);
          ctx.closePath();
          ctx.fillStyle = "#0c0d10";
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Right Side (Mid Charcoal with subtle reflection)
          ctx.beginPath();
          ctx.moveTo(p3x, p3y);
          ctx.lineTo(p2x, p2y);
          ctx.lineTo(p2x, screenY + tileH / 2);
          ctx.lineTo(p3x, screenY + tileH);
          ctx.closePath();
          ctx.fillStyle = "#121419";
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw Top Face
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.lineTo(p3x, p3y);
        ctx.lineTo(p4x, p4y);
        ctx.closePath();

        // Shading based on elevation and mouse effect
        if (h > 6 || b.colorGlow === 1 || mouseEffect > 0.2) {
          const intensity = Math.min(1, (h / 35) + (mouseEffect * 0.6));
          if (b.colorGlow === 1 || mouseEffect > 0.4) {
            ctx.fillStyle = `rgba(255, 184, 0, ${0.08 + intensity * 0.15})`;
            ctx.strokeStyle = `rgba(255, 184, 0, ${0.25 + intensity * 0.4})`;
          } else {
            ctx.fillStyle = `rgba(24, 26, 32, ${0.8 + intensity * 0.2})`;
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 + intensity * 0.12})`;
          }
        } else {
          ctx.fillStyle = "rgba(11, 12, 15, 0.75)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
        }
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      }

      // Dark vignette overlay at borders to guarantee crisp text readability
      const vignette = ctx.createLinearGradient(0, height * 0.65, 0, height);
      vignette.addColorStop(0, "rgba(5, 5, 5, 0)");
      vignette.addColorStop(1, "#050505");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, height * 0.65, width, height * 0.35);

      // Top soft vignette
      const topVignette = ctx.createLinearGradient(0, 0, 0, 150);
      topVignette.addColorStop(0, "rgba(5, 5, 5, 0.85)");
      topVignette.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = topVignette;
      ctx.fillRect(0, 0, width, 150);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: 0.95 }}
      />
      {/* Subtle diagonal grid overlay */}
      <div className="absolute inset-0 diagonal-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
