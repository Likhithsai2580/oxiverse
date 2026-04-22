'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button, Skeleton } from '@/components/ui';
import { useToastContext } from '@/lib/providers/ToastProvider';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: string | null;
  link: string | null;
  createdAt: string;
}

export default function AdminEcosystemPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { success, error } = useToastContext();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/ecosystem');
      if (res.ok) {
        setProjects(await res.json());
      } else {
        error('Failed to load projects');
      }
    } catch (err) {
      error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;

    try {
      const res = await fetch(`/api/admin/ecosystem/${id}`, { method: 'DELETE' });
      if (res.ok) {
        success('Project deleted');
        setProjects(projects.filter(p => p.id !== id));
      } else {
        error('Failed to delete project');
      }
    } catch (err) {
      error('An error occurred');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-display">Ecosystem Projects</h1>
          <p className="text-dark-400">Manage the nodes of the oxiverse ecosystem</p>
        </div>
        <Link href="/admin/ecosystem/new">
          <Button variant="primary" className="shadow-lg shadow-primary-500/20">Add Project</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-dark-900/40 border-white/5 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-2">
                  <Skeleton className="h-7 w-12" />
                  <Skeleton className="h-7 w-12" />
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            </Card>
          ))
        ) : projects.length === 0 ? (
          <div className="col-span-full py-12 text-center text-dark-500 italic">
            No projects found. Add your first ecosystem node.
          </div>
        ) : (
          projects.map((project) => (
            <Card key={project.id} variant="glass" className="group relative overflow-hidden bg-dark-900/40 border-white/5 hover:border-primary-500/30 transition-all duration-300 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs text-dark-500 mt-1 font-mono uppercase tracking-tighter">
                    {project.slug}
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'current' ? 'bg-green-500/10 text-green-400' :
                    project.status === 'upcoming' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-blue-500/10 text-blue-400'
                  }`}>
                  {project.status || 'Planned'}
                </span>
              </div>

              <p className="text-sm text-dark-400 line-clamp-3 mb-6 min-h-[60px]">
                {project.description || 'No description provided.'}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-2">
                  <Link href={`/admin/ecosystem/${project.id}`}>
                    <Button size="sm" variant="ghost" className="text-xs h-7">Edit</Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 text-red-400 hover:text-red-300 hover:bg-red-500/5"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </div>
                {project.link && (
                  <Link href={project.link} target="_blank">
                    <svg className="w-4 h-4 text-dark-500 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
