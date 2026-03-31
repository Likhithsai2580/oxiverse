'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Stars } from '@react-three/drei'
import { OxiverseCore, EcosystemNode } from './OxiverseCore'
import { Suspense, useMemo, useEffect, useRef } from 'react'
import * as THREE from 'three'

// Component to add ambient light
const AmbientLightHelper = () => {
  const { scene } = useThree()
  
  useEffect(() => {
    const light = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(light)
    return () => {
      scene.remove(light)
    }
  }, [scene])
  
  return null
}

// Component to create a scaled group
const ScaledGroup = ({ children, scale }: { children: React.ReactNode, scale: number }) => {
  const groupRef = useRef<THREE.Group>(null)
  
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale)
    }
  }, [scale])
  
  // @ts-ignore - Three.js JSX elements
  return <group ref={groupRef}>{children}</group>
}

export const Experience = ({ children }: { children?: React.ReactNode }) => {
  const nodes = useMemo(() => [
    { position: [3, 1, -1] as [number, number, number], label: 'Research', color: '#8b5cf6' },
    { position: [-2.5, 2, 2] as [number, number, number], label: 'Docs', color: '#3b82f6' },
    { position: [1.5, -2.5, 3] as [number, number, number], label: 'Ecosystem', color: '#06b6d4' },
    { position: [-4, -1, -2] as [number, number, number], label: 'Protocol', color: '#ec4899' },
    { position: [4, -2, -4] as [number, number, number], label: 'Analytics', color: '#8b5cf6' },
  ], [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-screen w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <AmbientLightHelper />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ScaledGroup scale={1.5}>
            <OxiverseCore />
            {nodes.map((node, i) => (
              <EcosystemNode key={i} position={node.position} label={node.label} color={node.color} />
            ))}
          </ScaledGroup>
          
          {/* Subtle Parallax Movement */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableDamping 
            autoRotate 
            autoRotateSpeed={0.5} 
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
