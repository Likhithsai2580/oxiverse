'use client'

import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial, Line, Preload, Html } from '@react-three/drei'
import { useScroll } from 'framer-motion'
import * as THREE from 'three'

interface SatelliteProps {
  radius: number
  speed: number
  size: number
  color: string
  yOffset: number
  xRotation: number
  label: string
}

function Satellite({ radius, speed, size, color, yOffset, xRotation, label }: SatelliteProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return pts
  }, [radius])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * 0.005
    }
  })

  return (
    <group rotation={[xRotation, 0, 0]}>
      <Line points={points} color={color} opacity={hovered ? 0.3 : 0.15} transparent lineWidth={1} />
      <group ref={groupRef}>
        <mesh 
          position={[radius, yOffset, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[size * (hovered ? 1.5 : 1), 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 4 : 2} 
            toneMapped={false} 
          />
          {hovered && (
            <Html distanceFactor={10}>
              <div className="whitespace-nowrap px-3 py-1.5 bg-dark-900/90 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none">{label}</span>
              </div>
            </Html>
          )}
        </mesh>
      </group>
    </group>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const { scrollYProgress } = useScroll()
  const targetPos = useRef(new THREE.Vector3(0, 0, 12))

  useFrame((state, delta) => {
    const progress = scrollYProgress.get()
    
    // Zoom in and Pan down as user scrolls
    const targetZ = 12 - progress * 4
    const targetY = -progress * 15
    const targetX = Math.sin(progress * Math.PI) * 2
    
    targetPos.current.set(targetX, targetY, targetZ)
    camera.position.lerp(targetPos.current, delta * 1.5)
    camera.lookAt(0, targetY, 0)
  })

  return null
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = (pointer.x * 2)
      const targetY = (pointer.y * 2)
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * delta * 2
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * delta * 2

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
  const materialRef = useRef<any>(null)
  const { scrollYProgress } = useScroll()

  const particles = useMemo(() => {
    const count = 1200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 15
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
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 1.5 + scrollYProgress.get() * 5.5
    }
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={coreRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            ref={materialRef}
            color="#3b82f6"
            emissive="#1e40af"
            emissiveIntensity={1.5}
            speed={2}
            distort={0.4}
            radius={1}
            toneMapped={false}
          />
        </Sphere>
      </Float>

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

      <Sphere ref={outerRef} args={[1.8, 32, 32]}>
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      <pointLight color="#3b82f6" intensity={5} distance={20} />
      <pointLight color="#a855f7" intensity={2} distance={20} position={[2, 2, 2]} />
    </group>
  )
}

export default function OxiverseScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 block">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 45 }} 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#60a5fa" />
        
        <CameraRig />
        <ParallaxGroup>
          <Core />
          
          <Satellite radius={4} speed={1.5} size={0.15} color="#60a5fa" yOffset={0} xRotation={0.2} label="Core Protocol" />
          <Satellite radius={5.5} speed={-1} size={0.2} color="#8b5cf6" yOffset={0.5} xRotation={-0.3} label="Active Nodes" />
          <Satellite radius={7} speed={0.8} size={0.12} color="#2ef5ff" yOffset={-0.5} xRotation={0.1} label="Dev Workspace" />
          <Satellite radius={8.5} speed={-0.5} size={0.18} color="#c084fc" yOffset={0} xRotation={-0.15} label="Ecosystem" />
        </ParallaxGroup>

        <Preload all />
      </Canvas>
    </div>
  )
}


