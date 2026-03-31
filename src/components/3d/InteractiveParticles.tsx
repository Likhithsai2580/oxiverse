'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveParticlesProps {
  scrollProgress: number
}

export const InteractiveParticles = ({ scrollProgress }: InteractiveParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragVelocity = useRef({ x: 0, y: 0 })
  const { size, viewport } = useThree()

  // Create particle system
  const { positions, velocities, colors } = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorPalette = [
      new THREE.Color('#3b82f6'), // Blue
      new THREE.Color('#60a5fa'), // Light blue
      new THREE.Color('#a855f7'), // Purple
      new THREE.Color('#8b5cf6'), // Violet
      new THREE.Color('#06b6d4'), // Cyan
    ]

    for (let i = 0; i < count; i++) {
      // Spread particles across a wide area
      const x = (Math.random() - 0.5) * 30
      const y = (Math.random() - 0.5) * 30 - scrollProgress * 10
      const z = (Math.random() - 0.5) * 15

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Initial velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01

      // Assign colors from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, velocities, colors }
  }, [scrollProgress])

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / size.width) * 2 - 1
      const y = -(e.clientY / size.height) * 2 + 1
      setMousePosition({ x, y })

      if (isDragging) {
        dragVelocity.current.x = e.movementX * 0.001
        dragVelocity.current.y = -e.movementY * 0.001
      }
    }

    const handleMouseDown = () => setIsDragging(true)
    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [size, isDragging])

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()

    // Rotate entire particle system slowly
    pointsRef.current.rotation.y = time * 0.05 + scrollProgress * 0.5
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1

    // Access position attribute
    const positionAttribute = pointsRef.current.geometry.attributes.position
    const velocityArray = velocities

    // Mouse interaction - create wave effect
    const mouseWaveX = Math.sin(time * 2 + mousePosition.y * 3) * 0.5
    const mouseWaveY = Math.cos(time * 2 + mousePosition.x * 3) * 0.5

    // Apply drag velocity with decay
    if (isDragging) {
      pointsRef.current.rotation.y += dragVelocity.current.x
      pointsRef.current.rotation.x += dragVelocity.current.y
      dragVelocity.current.x *= 0.95
      dragVelocity.current.y *= 0.95
    }

    // Animate individual particles
    for (let i = 0; i < positionAttribute.count; i++) {
      const px = positionAttribute.getX(i)
      const py = positionAttribute.getY(i)
      const pz = positionAttribute.getZ(i)

      // Add subtle floating motion
      const floatOffset = Math.sin(time + px) * 0.02
      positionAttribute.setY(i, py + floatOffset * delta * 60)

      // Mouse repulsion effect
      const dx = px / 15 - mousePosition.x
      const dy = py / 15 - mousePosition.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 2) {
        const force = (2 - distance) * 0.5
        const angle = Math.atan2(dy, dx)
        const vx = Math.cos(angle) * force * 0.1
        const vy = Math.sin(angle) * force * 0.1

        positionAttribute.setX(i, px + vx)
        positionAttribute.setY(i, py + vy)
      }

      // Wrap around effect
      if (py < -20) positionAttribute.setY(i, 20)
      if (py > 20) positionAttribute.setY(i, -20)
    }

    positionAttribute.needsUpdate = true

    // Pulse particle sizes based on scroll
    const pulse = Math.sin(time * 3 + scrollProgress * 10) * 0.2 + 0.8
    pointsRef.current.scale.setScalar(pulse)
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
        vertexColors={true}
      />
    </Points>
  )
}
