'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial, Line, Preload, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface SatelliteProps {
  radius: number
  speed: number
  size: number
  color: string
  yOffset: number
  xRotation: number
}

function Satellite({ radius, speed, size, color, yOffset, xRotation }: SatelliteProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Orbit path (the trail)
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return pts
  }, [radius])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * 0.005
    }
  })

  return (
    <group rotation={[xRotation, 0, 0]}>
      <Line points={points} color={color} opacity={0.15} transparent lineWidth={1} />
      <group ref={groupRef}>
        <mesh position={[radius, yOffset, 0]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={2} 
            toneMapped={false} 
          />
        </mesh>
      </group>
    </group>
  )
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = (pointer.x * 2)
      const targetY = (pointer.y * 2)
      
      // Smooth dampening for parallax
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * delta * 2
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * delta * 2

      // Gentle continuous rotation
      groupRef.current.rotation.y += delta * 0.05
      groupRef.current.rotation.x += delta * 0.02
    }
  })

  return <group ref={groupRef}>{children}</group>
}

function Core() {
  const coreRef = useRef<THREE.Mesh>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Particles for the core's atmosphere
  const particles = useMemo(() => {
    const count = 800
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2
      coreRef.current.rotation.z += delta * 0.1
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.15
      outerRef.current.rotation.x += delta * 0.05
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group>
      {/* Central Energy Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={coreRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#3b82f6"
            emissive="#1e40af"
            emissiveIntensity={1.5}
            speed={2}
            distort={0.3}
            radius={1}
            toneMapped={false}
          />
        </Sphere>
      </Float>

      {/* Atmospheric Particles */}
      <Points ref={particlesRef} positions={particles}>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Outer Shield / Glow Grid */}
      <Sphere ref={outerRef} args={[1.8, 32, 32]}>
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Inner Glow Lights */}
      <pointLight color="#3b82f6" intensity={2} distance={10} />
      <pointLight color="#a855f7" intensity={1} distance={10} position={[2, 2, 2]} />
    </group>
  )
}

export default function OxiverseScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#60a5fa" />
        
        <ParallaxGroup>
          <Core />
          
          {/* Orbiting Nodes */}
          <Satellite radius={4} speed={1.5} size={0.15} color="#60a5fa" yOffset={0} xRotation={0.2} />
          <Satellite radius={5.5} speed={-1} size={0.2} color="#8b5cf6" yOffset={0.5} xRotation={-0.3} />
          <Satellite radius={7} speed={0.8} size={0.12} color="#2ef5ff" yOffset={-0.5} xRotation={0.1} />
          <Satellite radius={8.5} speed={-0.5} size={0.18} color="#c084fc" yOffset={0} xRotation={-0.15} />
        </ParallaxGroup>

        <Preload all />
      </Canvas>
    </div>
  )
}
