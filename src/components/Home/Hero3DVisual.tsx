import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Hero3DVisual: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all core 3D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Inner Core - Golden Icosahedron with Wireframe & Glow
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111115,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Golden Wireframe Shell
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffb800,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.setScalar(1.02);
    mainGroup.add(wireMesh);

    // Orbiting Golden Rings (Torus)
    const ringGeo1 = new THREE.TorusGeometry(1.7, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xffb800,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0xff9900,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.95, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xffd54f,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xffb800,
      emissiveIntensity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // Floating Golden Particle Cloud
    const particleCount = 280;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.8 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xffb800,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particlePoints);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const goldLight1 = new THREE.PointLight(0xffb800, 3.5, 20);
    goldLight1.position.set(4, 3, 4);
    scene.add(goldLight1);

    const goldLight2 = new THREE.PointLight(0xff7700, 2.5, 20);
    goldLight2.position.set(-4, -3, -2);
    scene.add(goldLight2);

    // Mouse Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotY = x * 0.6;
      targetRotX = -y * 0.6;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 480;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;

      // Continuous autonomous rotation
      coreMesh.rotation.y += 0.005;
      wireMesh.rotation.y -= 0.007;
      wireMesh.rotation.x += 0.003;

      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.25;
      particlePoints.rotation.y = elapsedTime * 0.08;

      // Breathing scale pulse
      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
      coreMesh.scale.set(pulse, pulse, pulse);
      wireMesh.scale.set(pulse * 1.02, pulse * 1.02, pulse * 1.02);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center">
      {/* Background radial gold aura */}
      <div className="absolute w-72 h-72 rounded-full bg-[#FFB800]/15 blur-[90px] pointer-events-none -z-10 animate-pulse" />
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Floating Futuristic HUD Tech Tags */}
      <div className="absolute top-6 right-2 sm:right-6 px-3 py-1.5 rounded-full bg-[#121216]/90 border border-[#FFB800]/40 backdrop-blur-md text-[11px] font-semibold text-[#FFB800] tracking-wider uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(255,184,0,0.25)]">
        <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-ping" />
        AI Engine Active
      </div>

      <div className="absolute bottom-8 left-2 sm:left-4 px-3 py-1.5 rounded-full bg-[#121216]/90 border border-white/10 backdrop-blur-md text-[11px] font-semibold text-white/90 tracking-wider uppercase flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        <span className="text-[#FFB800]">✦</span>
        Proprietary Framework
      </div>
    </div>
  );
};
