'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { InteractiveParticles } from './InteractiveParticles'
import { FlowingLines } from './FlowingLines'
import * as THREE from 'three'

// Camera rig that follows scroll with smooth transitions
const CameraRig = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10))

  useFrame((state, delta) => {
    // Calculate target camera position based on scroll
    const newTargetY = -scrollProgress * 8
    const newTargetZ = 10 + scrollProgress * 5
    const newTargetX = Math.sin(scrollProgress * Math.PI) * 5

    targetPosition.current.set(newTargetX, newTargetY, newTargetZ)

    // Smooth camera movement with lerp
    camera.position.lerp(targetPosition.current, delta * 0.5)
    camera.lookAt(0, -scrollProgress * 8, 0)
  })

  return null
}

// Animated color zones that change based on scroll
const ColorZones = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (meshRef.current) {
      meshRef.current.rotation.z = time * 0.05
      meshRef.current.scale.setScalar(1 + scrollProgress * 0.3)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -scrollProgress * 8, -5]}>
      <sphereGeometry args={[15, 32, 32]} />
      <meshBasicMaterial
        color={new THREE.Color().setHSL(0.6 + scrollProgress * 0.1, 0.5, 0.1)}
        transparent
        opacity={0.3 + scrollProgress * 0.2}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

interface ScrollReactiveSceneProps {
  scrollProgress: number
}

const SceneContent = ({ scrollProgress }: ScrollReactiveSceneProps) => {
  return (
    <>
      <CameraRig scrollProgress={scrollProgress} />
      <ColorZones scrollProgress={scrollProgress} />
      <InteractiveParticles scrollProgress={scrollProgress} />
      <FlowingLines scrollProgress={scrollProgress} />
      
      {/* Post-processing effects */}
      <EffectComposer enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0.5}
          mipmapBlur
          intensity={1.5 + scrollProgress * 0.5}
          radius={0.8}
        />
        <Noise opacity={0.05} />
      </EffectComposer>

      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
    </>
  )
}

export const ScrollReactiveScene = ({ scrollProgress }: ScrollReactiveSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <SceneContent scrollProgress={scrollProgress} />
    </Canvas>
  )
}
