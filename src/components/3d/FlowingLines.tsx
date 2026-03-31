'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import React from 'react'

interface FlowingLinesProps {
  scrollProgress: number
}

export const FlowingLines = ({ scrollProgress }: FlowingLinesProps) => {
  const linesRef = useRef<THREE.Group>(null)
  const curveRefs = useRef<Array<THREE.Mesh | null>>([])

  // Create flowing curves
  const curves = useMemo(() => {
    const curveData = []
    const numCurves = 15

    for (let i = 0; i < numCurves; i++) {
      const points = []
      const numPoints = 50
      const startX = (Math.random() - 0.5) * 40
      const startY = -scrollProgress * 15 + (Math.random() - 0.5) * 20
      const startZ = (Math.random() - 0.5) * 10

      for (let j = 0; j < numPoints; j++) {
        const t = j / numPoints
        const x = startX + Math.sin(t * Math.PI * 2 + i) * 5
        const y = startY + t * 2
        const z = startZ + Math.cos(t * Math.PI * 2 + i * 0.5) * 3

        points.push(new THREE.Vector3(x, y, z))
      }

      const curve = new THREE.CatmullRomCurve3(points)
      curveData.push({
        curve,
        color: new THREE.Color().setHSL(0.6 + (i / numCurves) * 0.2, 0.8, 0.6),
        width: 0.02 + Math.random() * 0.03,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      })
    }

    return curveData
  }, [scrollProgress])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(time * 0.2) * 0.1
      linesRef.current.position.y = -scrollProgress * 5
    }

    // Animate each curve
    curveRefs.current.forEach((mesh, index) => {
      if (!mesh) return

      const curveInfo = curves[index]
      const material = mesh.material as THREE.ShaderMaterial
      material.uniforms.time.value = time * curveInfo.speed + curveInfo.offset
      material.uniforms.scrollProgress.value = THREE.MathUtils.lerp(
        material.uniforms.scrollProgress.value,
        scrollProgress,
        0.05
      )
    })
  })

  return (
    <group ref={linesRef}>
      {curves.map((curveInfo, index) => (
        <FlowingCurve
          key={index}
          ref={(el) => { if (el) curveRefs.current[index] = el }}
          curve={curveInfo.curve}
          color={curveInfo.color}
          width={curveInfo.width}
        />
      ))}
    </group>
  )
}

interface FlowingCurveProps {
  curve: THREE.CatmullRomCurve3
  color: THREE.Color
  width: number
}

const FlowingCurve = React.forwardRef<THREE.Mesh, FlowingCurveProps>(
  ({ curve, color, width }, ref) => {
    const geometry = useMemo(() => {
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, width, 8, false)
      return tubeGeometry
    }, [curve, width])

    const material = useMemo(() => {
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: color },
          scrollProgress: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vElevation = position.y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float time;
          uniform float scrollProgress;
          
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float flow = sin(vUv.x * 20.0 - time * 2.0) * 0.5 + 0.5;
            float glow = sin(vUv.y * 10.0 + time) * 0.5 + 0.5;
            
            float alpha = 0.3 + flow * 0.4 + glow * 0.3;
            alpha *= 1.0 - scrollProgress * 0.3;
            
            vec3 finalColor = color * (1.0 + flow * 0.5);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    }, [color])

    return <mesh ref={ref} geometry={geometry} material={material} />
  }
)

FlowingCurve.displayName = 'FlowingCurve'
