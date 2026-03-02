"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          
          // Very subtle slow movement
          float wave = sin(uv.y * 3.0 + u_time * 0.2) * 0.05;

          // Soft mouse lighting (luxury spotlight feel)
          float dist = distance(uv, u_mouse);
          float light = smoothstep(0.6, 0.0, dist) * 0.15;

          vec3 deepBlack = vec3(0.03, 0.03, 0.06);
          vec3 purpleTint = vec3(0.08, 0.05, 0.15);

          vec3 base = mix(deepBlack, purpleTint, uv.y + wave);

          vec3 finalColor = base + light;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      uniforms.u_time.value += 0.01; // slower motion
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      uniforms.u_mouse.value.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}