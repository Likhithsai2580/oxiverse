'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/admin/ui'
import { Activity, Server, Cpu, Database, CheckCircle2, Wifi } from 'lucide-react'

interface NodeStatus {
  id: string
  name: string
  region: string
  latency: number
  status: 'online' | 'warning' | 'offline'
  load: number
}

const nodes: NodeStatus[] = [
  { id: '1', name: 'EU-CENTRAL-1', region: 'Frankfurt, DE', latency: 14, status: 'online', load: 32 },
  { id: '2', name: 'US-WEST-2', region: 'Oregon, US', latency: 42, status: 'online', load: 48 },
  { id: '3', name: 'AP-SOUTHEAST-1', region: 'Singapore, SG', latency: 26, status: 'online', load: 19 },
  { id: '4', name: 'AP-NORTHEAST-1', region: 'Tokyo, JP', latency: 31, status: 'online', load: 27 },
]

const coreServices = [
  { name: 'Intent Engine', status: 'Healthy', latency: '< 5ms', icon: Cpu },
  { name: 'Database (Prisma/PostgreSQL)', status: 'Connected', latency: '12ms', icon: Database },
  { name: 'Supabase Storage', status: 'Synced', latency: '48ms', icon: Server },
  { name: 'Edge CDN', status: 'Active (Global)', latency: '8ms', icon: Wifi },
]

export default function SystemMonitor() {
  return (
    <Card className="mb-8 border-zinc-800/80 bg-zinc-950/70">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-800/60">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm">Network Diagnostics & Edge Telemetry</CardTitle>
            <p className="text-[11px] text-zinc-400">Live operational status across global distribution nodes</p>
          </div>
        </div>
        <Badge variant="success" dot>
          All Systems Nominal
        </Badge>
      </CardHeader>

      <CardContent className="pt-5 space-y-5">
        {/* Global Regional Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-3.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-white">{node.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80" />
              </div>
              <p className="text-[11px] text-zinc-400 mb-3">{node.region}</p>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-zinc-800/60 font-mono">
                <span className="text-zinc-500">Ping: <strong className="text-sky-400">{node.latency}ms</strong></span>
                <span className="text-zinc-500">Load: <strong className="text-zinc-300">{node.load}%</strong></span>
              </div>
            </div>
          ))}
        </div>

        {/* Core Subsystem Health Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {coreServices.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.name}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-900/30 border border-zinc-800/40"
              >
                <div className="p-1.5 rounded bg-zinc-800 text-zinc-300">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-200 truncate">{service.name}</p>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 inline" /> {service.status} ({service.latency})
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}