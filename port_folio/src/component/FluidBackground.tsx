"use client"
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FluidBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. Custom Shader Material (Liquid Ripple Distortion)
    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        varying vec2 vUv;

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          vec2 mouse = u_mouse / u_resolution.xy;
          
          // Distance from mouse for liquid ripple effect
          float dist = distance(st, mouse);
          
          // Wave distortion calculation
          float wave = sin(dist * 20.0 - u_time * 4.0) * 0.05;
          float effect = smoothstep(0.4, 0.0, dist) * wave;

          // Subtle fluid gradient styling
          vec3 color = vec3(0.05 + effect, 0.05 + effect, 0.08 + effect);
          
          gl_FragColor = vec4(color, 0.4); // Semi-transparent overlay
        }
      `,
      transparent: true,
    })

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(plane)

    // 3. Mouse Movement Listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      uniforms.u_mouse.value.x = e.clientX - rect.left
      uniforms.u_mouse.value.y = rect.height - (e.clientY - rect.top) // Flip Y for WebGL
    }
    window.addEventListener('mousemove', handleMouseMove)

    // 4. Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.u_resolution.value.set(width, height)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container) container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
}