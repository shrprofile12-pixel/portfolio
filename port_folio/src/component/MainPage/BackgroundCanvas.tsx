"use client"

import React, { useEffect, useRef } from 'react'

export const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    let mouse = { x: width / 2, y: height / 2 }
    let cursor = { x: width / 2, y: height / 2 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      cursor.x += (mouse.x - cursor.x) * 0.06
      cursor.y += (mouse.y - cursor.y) * 0.06

      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createRadialGradient(
        cursor.x, cursor.y, 0,
        cursor.x, cursor.y, 350
      )
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className='absolute inset-0 w-full h-full pointer-events-none z-0'
    />
  )
}