import { useEffect, useRef } from 'react'

// Animated starfield + nebulas. Renders behind content.
export default function GalaxyBackground({ className = '' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  const starsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const createStars = () => {
      const count = Math.min(300, Math.floor((width * height) / 6000))
      const stars = []
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 1 + 0.2,
          r: Math.random() * 1.6 + 0.2,
          tw: Math.random() * Math.PI * 2,
        })
      }
      starsRef.current = stars
    }

    const drawNebula = () => {
      const grd = ctx.createRadialGradient(
        width * 0.7,
        height * 0.3,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      )
      grd.addColorStop(0, 'rgba(99,102,241,0.25)') // indigo-500
      grd.addColorStop(0.35, 'rgba(56,189,248,0.18)') // sky-400
      grd.addColorStop(0.7, 'rgba(168,85,247,0.12)') // violet-500
      grd.addColorStop(1, 'rgba(2,6,23,0)') // transparent
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, width, height)
    }

    const render = (t = 0) => {
      ctx.clearRect(0, 0, width, height)

      // deep space gradient background tint
      const bg = ctx.createLinearGradient(0, 0, width, height)
      bg.addColorStop(0, '#020617') // slate-950
      bg.addColorStop(1, '#0b1026')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      drawNebula()

      // starfield
      for (const s of starsRef.current) {
        const parallaxX = (mouse.current.x - width / 2) * 0.0006 * (1 / s.z)
        const parallaxY = (mouse.current.y - height / 2) * 0.0006 * (1 / s.z)
        const x = s.x + parallaxX * 80
        const y = s.y + parallaxY * 80
        const twinkle = 0.6 + Math.sin(t * 0.002 + s.tw) * 0.3
        ctx.beginPath()
        ctx.arc(x, y, s.r * twinkle, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(226,232,240,${0.7 * twinkle})`
        ctx.shadowColor = 'rgba(99,102,241,0.4)'
        ctx.shadowBlur = 8 * (1 / s.z)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // aurora sweep
      ctx.globalCompositeOperation = 'screen'
      const aur = ctx.createLinearGradient(0, 0, width, 0)
      aur.addColorStop(0, 'rgba(59,130,246,0)')
      aur.addColorStop(0.5, 'rgba(147,51,234,0.15)')
      aur.addColorStop(1, 'rgba(14,165,233,0)')
      ctx.fillStyle = aur
      const sweepY = height * 0.5 + Math.sin(t * 0.0018) * height * 0.1
      ctx.fillRect(0, sweepY, width, height * 0.3)
      ctx.globalCompositeOperation = 'source-over'

      rafRef.current = requestAnimationFrame(render)
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      createStars()
    }

    const onMouse = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    createStars()
    rafRef.current = requestAnimationFrame(render)
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div className={`absolute inset-0 -z-10 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* soft vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
    </div>
  )
}
