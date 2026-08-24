'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from '@/components/admin/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'
import {
  Network,
  Plus,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  Globe,
} from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  description: string | null
  status: string | null
  link: string | null
  hostedUrl: string | null
  imageUrl: string | null
  createdAt: string
}

export default function AdminEcosystemPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const { success, error } = useToastContext()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/ecosystem')
      if (res.ok) {
        setProjects(await res.json())
      } else {
        error('Failed to load ecosystem projects')
      }
    } catch (err) {
      error('An error occurred while loading projects')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project node "${title}"?`)) return

    try {
      const res = await fetch(`/api/admin/ecosystem/${id}`, { method: 'DELETE' })
      if (res.ok) {
        success('Project node deleted')
        setProjects((prev) => prev.filter((p) => p.id !== id))
      } else {
        error('Failed to delete project')
      }
    } catch (err) {
      error('An error occurred')
    }
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      return (
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })
  }, [projects, searchQuery])

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ecosystem Projects & Nodes
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage live nodes, protocol implementations, and connected services.
          </p>
        </div>

        <Link href="/admin/ecosystem/new">
          <Button variant="default" size="sm" className="font-bold">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Project Node
          </Button>
        </Link>
      </div>

      {/* Search Filter */}
      <div className="relative bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800/80">
        <Search className="absolute left-5 top-4 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search ecosystem nodes by title, description, or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 rounded-xl bg-zinc-900/40 border border-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card className="text-center py-16 border-zinc-800/80 bg-zinc-950/40">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500 shadow-inner">
            <Network className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">No ecosystem nodes found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
            Register your first ecosystem project to display in the network map.
          </p>
          <Link href="/admin/ecosystem/new">
            <Button variant="outline" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add First Node
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="p-5 border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 hover:bg-zinc-900/30 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {project.imageUrl ? (
                      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 p-1 flex items-center justify-center flex-shrink-0">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 flex-shrink-0">
                        <Network className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-[10px] text-zinc-500">{project.slug}</p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      project.status === 'current'
                        ? 'success'
                        : project.status === 'upcoming'
                        ? 'warning'
                        : 'sky'
                    }
                    dot
                  >
                    {project.status || 'Active'}
                  </Badge>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {project.description || 'No description specified for this ecosystem node.'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link href={`/admin/ecosystem/${project.id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-[11px]">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                    onClick={() => handleDelete(project.id, project.title)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="flex items-center gap-1.5">
                  {project.hostedUrl && (
                    <Link href={project.hostedUrl} target="_blank" title="Hosted App">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Globe className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
                      </Button>
                    </Link>
                  )}
                  {project.link && (
                    <Link href={project.link} target="_blank" title="Repository / Source">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
