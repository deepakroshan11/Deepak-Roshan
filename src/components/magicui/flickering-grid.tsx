"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color,
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [resolvedColor, setResolvedColor] = useState<string>("rgb(0, 0, 0)")

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }

  const handleMouseLeave = () => {
    mouseRef.current = null
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect && e.touches[0]) {
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
  }

  const handleTouchEnd = () => {
    mouseRef.current = null
  }

  const resolveColor = useCallback((colorValue: string | undefined): string => {
    if (typeof window === "undefined") {
      return "rgb(0, 0, 0)"
    }

    const colorToResolve = colorValue || "var(--foreground)"

    if (colorToResolve.startsWith("var(")) {
      const tempEl = document.createElement("div")
      tempEl.style.color = colorToResolve
      tempEl.style.position = "absolute"
      tempEl.style.visibility = "hidden"
      document.body.appendChild(tempEl)
      const computedColor = window.getComputedStyle(tempEl).color
      document.body.removeChild(tempEl)
      return computedColor || "rgb(0, 0, 0)"
    }

    return colorToResolve
  }, [])

  useEffect(() => {
    const updateColor = () => {
      const resolved = resolveColor(color)
      setResolvedColor(resolved)
    }

    updateColor()

    const observer = new MutationObserver(() => {
      updateColor()
    })

    if (typeof window !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [color, resolveColor])

  const memoizedColor = useMemo(() => {
    const toRGBA = (colorValue: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`
      }
      const canvas = document.createElement("canvas")
      canvas.width = canvas.height = 1
      const ctx = canvas.getContext("2d")
      if (!ctx) return "rgba(255, 0, 0,"
      ctx.fillStyle = colorValue
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
      return `rgba(${r}, ${g}, ${b},`
    }
    return toRGBA(resolvedColor)
  }, [resolvedColor])

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const cols = Math.floor(width / (squareSize + gridGap))
      const rows = Math.floor(height / (squareSize + gridGap))

      const squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity
      }

      return { cols, rows, squares, dpr }
    },
    [squareSize, gridGap, maxOpacity]
  )

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity
        }
      }
    },
    [flickerChance, maxOpacity]
  )

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "transparent"
      ctx.fillRect(0, 0, width, height)

      const mouse = mouseRef.current
      const attractionRadius = 110 // in CSS pixels
      const maxAttractionShift = 14 // in CSS pixels

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseOpacity = squares[i * rows + j]
          let opacity = baseOpacity

          const defaultX = i * (squareSize + gridGap)
          const defaultY = j * (squareSize + gridGap)

          let px = defaultX
          let py = defaultY

          if (mouse) {
            const dx = mouse.x - defaultX
            const dy = mouse.y - defaultY
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < attractionRadius && dist > 0) {
              const influence = 1 - dist / attractionRadius
              const shift = influence * influence * maxAttractionShift
              px = defaultX + (dx / dist) * shift
              py = defaultY + (dy / dist) * shift
              opacity = Math.min(maxOpacity, baseOpacity + influence * 0.45)
            }
          }

          ctx.fillStyle = `${memoizedColor}${opacity})`
          ctx.fillRect(
            px * dpr,
            py * dpr,
            squareSize * dpr,
            squareSize * dpr
          )
        }
      }
    },
    [memoizedColor, squareSize, gridGap, maxOpacity]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let gridParams: ReturnType<typeof setupCanvas>

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth
      const newHeight = height || container.clientHeight
      setCanvasSize({ width: newWidth, height: newHeight })
      gridParams = setupCanvas(canvas, newWidth, newHeight)
    }

    updateCanvasSize()

    let lastTime = 0
    const animate = (time: number) => {
      if (!isInView) return

      const deltaTime = (time - lastTime) / 1000
      lastTime = time

      updateSquares(gridParams.squares, deltaTime)
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr
      )
      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })

    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    intersectionObserver.observe(canvas)

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

  return (
    <div
      ref={containerRef}
      className={cn(`h-full w-full ${className}`)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  )
}

