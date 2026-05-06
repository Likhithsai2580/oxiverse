'use client'

import React, { useEffect, useState, useId } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'inherit',
})

export default function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('')
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart)
        setSvg(svg)
      } catch (error) {
        console.error('Mermaid render error:', error)
      }
    }
    renderChart()
  }, [chart, id])

  if (!svg) {
    return <div className="animate-pulse bg-white/5 rounded-lg h-32 w-full flex items-center justify-center text-dark-500 text-sm">Loading Diagram...</div>
  }

  return (
    <div 
      className="mermaid-diagram flex justify-center my-8 p-4 bg-white/[0.02] border border-white/5 rounded-xl overflow-x-auto" 
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  )
}
