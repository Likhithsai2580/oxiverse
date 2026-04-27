'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, Button, Input, Textarea, Skeleton } from '@/components/ui';
import { useToastContext } from '@/lib/providers/ToastProvider';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function AdminSettingsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories');
  const { success, error } = useToastContext();

  const [newCat, setNewCat] = useState({ name: '', slug: '', description: '' });
  const [newTag, setNewTag] = useState({ name: '', slug: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [catRes, tagRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/tags'),
      ]);
      if (catRes.ok && tagRes.ok) {
        setCategories(await catRes.json());
        setTags(await tagRes.json());
      }
    } catch (err) {
      error('Failed to load settings data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
      });
      if (res.ok) {
        success('Category added');
        const data = await res.json();
        setCategories(prev => [...prev, data]);
        setNewCat({ name: '', slug: '', description: '' });
      }
    } catch (err) {
      error('Failed to add category');
    }
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTag),
      });
      if (res.ok) {
        success('Tag added');
        const data = await res.json();
        setTags(prev => [...prev, data]);
        setNewTag({ name: '', slug: '' });
      }
    } catch (err) {
      error('Failed to add tag');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        success('Category deleted');
        setCategories(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      error('Delete failed');
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm('Delete this tag?')) return;
    try {
      const res = await fetch(`/api/admin/tags?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        success('Tag deleted');
        setTags(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      error('Delete failed');
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2 font-display tracking-tight">System Core</h1>
        <p className="text-dark-400">Configure taxonomy and global ecosystem parameters.</p>
      </div>

      <div className="flex gap-2 mb-10 p-1 bg-dark-900/60 backdrop-blur-xl border border-white/5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-6 py-2.5 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-xl ${
            activeTab === 'categories' 
              ? 'bg-primary-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)]' 
              : 'text-dark-500 hover:text-white'
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('tags')}
          className={`px-6 py-2.5 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-xl ${
            activeTab === 'tags' 
              ? 'bg-primary-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)]' 
              : 'text-dark-500 hover:text-white'
          }`}
        >
          Tags
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Management Form */}
        <div className="lg:col-span-4">
          <Card variant="glass" className="bg-dark-900/40 border-white/5 p-8 sticky top-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary-500 rounded-full" />
                Initialize {activeTab === 'categories' ? 'Category' : 'Tag'}
            </h3>
            {activeTab === 'categories' ? (
              <form onSubmit={handleAddCategory} className="space-y-6">
                <Input
                  label="Display Name"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  placeholder="e.g. Quantum Computing"
                  required
                />
                <Input
                  label="URL Slug"
                  value={newCat.slug}
                  onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                  placeholder="quantum-computing"
                  required
                />
                <Textarea
                  label="System Description"
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  placeholder="Technical papers regarding quantum state..."
                  rows={4}
                />
                <Button type="submit" variant="primary" className="w-full shadow-lg shadow-primary-500/20">Commit Category</Button>
              </form>
            ) : (
              <form onSubmit={handleAddTag} className="space-y-6">
                <Input
                  label="Identifier"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  placeholder="e.g. artificial-intelligence"
                  required
                />
                <Input
                  label="Index Slug"
                  value={newTag.slug}
                  onChange={(e) => setNewTag({ ...newTag, slug: e.target.value })}
                  placeholder="ai"
                  required
                />
                <Button type="submit" variant="primary" className="w-full shadow-lg shadow-primary-500/20">Register Tag</Button>
              </form>
            )}
          </Card>
        </div>

        {/* Display Table */}
        <div className="lg:col-span-8">
          <Card variant="glass" className="overflow-hidden p-0 border-white/5 bg-dark-900/40">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
               <h3 className="text-xl font-bold text-white">Active {activeTab === 'categories' ? 'Taxonomy' : 'Index'}</h3>
               <span className="text-[10px] font-black text-primary-400 bg-primary-500/10 px-2 py-1 rounded uppercase tracking-widest border border-primary-500/20">
                {activeTab === 'categories' ? categories.length : tags.length} Nodes
               </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-dark-950/40 text-[10px] font-black uppercase tracking-[0.2em] text-dark-500 border-b border-white/5">
                  <tr>
                    <th className="px-8 py-5">System Name</th>
                    <th className="px-8 py-5">Routing Identifier</th>
                    <th className="px-8 py-5 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-8 py-6"><Skeleton className="h-5 w-32" /></td>
                        <td className="px-8 py-6"><Skeleton className="h-5 w-24" /></td>
                        <td className="px-8 py-6 text-right"><Skeleton className="h-8 w-16 ml-auto" /></td>
                      </tr>
                    ))
                  ) : (
                    (activeTab === 'categories' ? categories : tags).map((item: any) => (
                      <tr key={item.id} className="hover:bg-white/[0.03] transition-colors group">
                        <td className="px-8 py-6 text-white font-bold">{item.name}</td>
                        <td className="px-8 py-6 text-dark-400 font-mono text-xs">{item.slug}</td>
                        <td className="px-8 py-6 text-right">
                          <button 
                            onClick={() => activeTab === 'categories' ? handleDeleteCategory(item.id) : handleDeleteTag(item.id)}
                            className="text-[10px] font-black uppercase tracking-widest text-dark-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                          >
                            Purge
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

