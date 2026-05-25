'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui'

interface LogEntry {
  timestamp: string
  service: string
  status: 'OK' | 'WARN' | 'INFO'
  message: string
}

interface NodeStatus {
  id: string
  name: string
  region: string
  latency: number
  status: 'online' | 'warning' | 'offline'
  load: number
}

const initialNodes: NodeStatus[] = [
  { id: '1', name: 'DE_FRA_01', region: 'Frankfurt, EU', latency: 12, status: 'online', load: 34 },
  { id: '2', name: 'US_SFO_02', region: 'San Francisco, US', latency: 45, status: 'online', load: 52 },
  { id: '3', name: 'SG_SIN_03', region: 'Singapore, AP', latency: 28, status: 'online', load: 18 },
  { id: '4', name: 'JP_NRT_04', region: 'Tokyo, JP', latency: 32, status: 'online', load: 29 },
]

const services = ['MEILISEARCH', 'PRISMA_DB', 'SUPABASE_STORAGE', 'INTENT_FORGE', 'VERCEL_EDGE']
const messages = [
  { service: 'MEILISEARCH', status: 'OK' as const, message: 'Index sync completed successfully' },
  { service: 'PRISMA_DB', status: 'OK' as const, message: 'Connection pool stable (12 active clients)' },
  { service: 'SUPABASE_STORAGE', status: 'OK' as const, message: 'Cleaned orphaned PDF artifacts' },
  { service: 'INTENT_FORGE', status: 'INFO' as const, message: 'Extracted intent pattern matching query' },
  { service: 'VERCEL_EDGE', status: 'OK' as const, message: 'ISR Cache invalidated for path: /sitemap.xml' },
  { service: 'VERCEL_EDGE', status: 'OK' as const, message: 'Cache HIT on path: /blog' },
  { service: 'PRISMA_DB', status: 'INFO' as const, message: 'Executing ScholarlyArticle query...' },
  { service: 'INTENT_FORGE', status: 'OK' as const, message: 'Self-healing index diagnostics: 100% health' },
  { service: 'MEILISEARCH', status: 'OK' as const, message: 'Rebuilding cache directory: Complete' },
]

export default function SystemMonitor() {
  const [nodes, setNodes] = useState<NodeStatus[]>(initialNodes)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [selectedNode, setSelectedNode] = useState<NodeStatus | null>(null)
  const [isPinging, setIsPinging] = useState(false)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Initialize logs
  useEffect(() => {
    const initialLogs: LogEntry[] = []
    const now = new Date()
    for (let i = 4; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 15000)
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      initialLogs.push({
        timestamp: time.toLocaleTimeString(),
        ...randomMsg,
      })
    }
    setLogs(initialLogs)
  }, [])

  // Auto-generate logs & slightly oscillate latency/load
  useEffect(() => {
    const logInterval = setInterval(() => {
      const time = new Date().toLocaleTimeString()
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      setLogs((prev) => {
        const next = [...prev, { timestamp: time, ...randomMsg }]
        if (next.length > 30) next.shift() // Limit to 30 items
        return next
      })

      // Oscillate node latency/load
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          const latChange = Math.floor(Math.random() * 7) - 3 // -3 to 3
          const loadChange = Math.floor(Math.random() * 5) - 2 // -2 to 2
          return {
            ...node,
            latency: Math.max(8, node.latency + latChange),
            load: Math.max(10, Math.min(95, node.load + loadChange)),
          }
        })
      )
    }, 4000)

    return () => clearInterval(logInterval)
  }, [])

  // Scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const triggerNodePing = (node: NodeStatus) => {
    setSelectedNode(node)
    setIsPinging(true)
    
    // Simulate ping
    setTimeout(() => {
      setIsPinging(false)
      const timestamp = new Date().toLocaleTimeString()
      setLogs((prev) => [
        ...prev,
        {
          timestamp,
          service: 'PING',
          status: 'OK',
          message: `Manual ping response from ${node.name}: latency=${node.latency}ms load=${node.load}%`,
        },
      ])
    }, 1200)
  }

  return (
    <Card className="bg-dark-900/40 border-white/5 p-6 mb-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 flex gap-1.5 opacity-30">
        <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-ping" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent-400" />
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column: Network Map & Distributed Nodes */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-500">Mainframe Core Diagnostics</span>
            <span className="h-px bg-white/5 flex-grow" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nodes.map((node) => (
              <div 
                key={node.id} 
                onClick={() => triggerNodePing(node)}
                className={`p-4 bg-dark-950/40 border rounded-xl cursor-pointer select-none transition-all duration-300 flex items-center justify-between group ${
                  selectedNode?.id === node.id && isPinging
                    ? 'border-accent-500/40 bg-accent-500/5 shadow-inner'
                    : 'border-white/5 hover:border-primary-500/20 hover:bg-white/[0.01]'
                }`}
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-500 opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono">{node.name}</h4>
                    <p className="text-[10px] text-dark-500">{node.region}</p>
                  </div>
                </div>

                <div className="text-right font-mono flex items-center gap-4">
                  <div>
                    <span className="block text-[9px] text-dark-500 leading-none mb-0.5">PING</span>
                    <span className="text-xs font-bold text-accent-300">{node.latency}ms</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-dark-500 leading-none mb-0.5">LOAD</span>
                    <span className="text-xs font-bold text-primary-400">{node.load}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core Latency Chart Simulation */}
          <div className="mt-4 p-4 bg-dark-950/20 border border-white/5 rounded-xl font-mono text-[10px] text-dark-400">
            <div className="flex justify-between mb-2">
              <span>INTENT_FORGE FLOW</span>
              <span className="text-accent-400 animate-pulse">● LIVE DISCOVERY</span>
            </div>
            <div className="h-10 flex items-end gap-1 overflow-hidden px-1 pt-2">
              {logs.slice(-25).map((log, i) => {
                const heightVal = log.service === 'PING' ? 'h-8 bg-accent-400/30' : log.status === 'OK' ? 'h-4 bg-primary-400/20' : 'h-6 bg-yellow-400/20'
                return (
                  <div 
                    key={i} 
                    className={`flex-1 min-w-[4px] rounded-t-sm transition-all duration-500 ${heightVal}`} 
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Console Log Terminal */}
        <div className="xl:w-[450px] flex-shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-500 font-mono">Telemetry stream</span>
            <button 
              onClick={() => setLogs([])}
              className="text-[9px] uppercase tracking-wider text-dark-500 hover:text-accent-400 transition-colors font-mono"
            >
              Clear Log
            </button>
          </div>

          <div className="flex-1 min-h-[160px] xl:min-h-0 xl:h-[220px] bg-dark-950 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-primary-200 overflow-y-auto relative scrollbar-thin">
            <div className="crt-scanline opacity-10 pointer-events-none" />
            <div className="space-y-1.5 relative z-10">
              {logs.length === 0 ? (
                <div className="text-dark-600 italic">Logs cleared. Waiting for event stream...</div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2 leading-relaxed">
                    <span className="text-dark-500 select-none">[{log.timestamp}]</span>
                    <span className={`font-bold select-none ${
                      log.status === 'OK' ? 'text-primary-400' : log.status === 'WARN' ? 'text-yellow-400' : 'text-accent-400'
                    }`}>
                      {log.service.padEnd(12)}
                    </span>
                    <span className="text-dark-300 break-all">{log.message}</span>
                  </div>
                ))
              )}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
