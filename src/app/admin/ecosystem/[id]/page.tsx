'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Input, Textarea, Card, Spinner, Modal, Skeleton } from '@/components/ui';
import { useToastContext } from '@/lib/providers/ToastProvider';
import AssetBrowser from '../../components/AssetBrowser';

export default function AdminProjectEditPage() {
  const router = useRouter();
  const params = useParams();
  const { success, error } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showAssetBrowser, setShowAssetBrowser] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    status: 'current',
    link: '',
    hostedUrl: '',
    imageUrl: '',
    imageDisplay: 'cover',
  });

  const isEdit = params.id !== 'new';

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [isEdit]);

  const fetchProject = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`/api/admin/ecosystem/${params.id}`);
      if (res.ok) {
        const project = await res.json();
        setFormData({
          title: project.title,
          slug: project.slug,
          description: project.description || '',
          status: project.status || 'current',
          link: project.link || '',
          hostedUrl: project.hostedUrl || '',
          imageUrl: project.imageUrl || '',
          imageDisplay: project.imageDisplay || 'cover',
        });
      } else {
        error('Failed to load project');
        router.push('/admin/ecosystem');
      }
    } catch (err) {
      error('Failed to load project');
      router.push('/admin/ecosystem');
    } finally {
      setIsFetching(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('type', 'ecosystem');

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: uploadFormData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
        success('Icon uploaded successfully!');
      } else {
        const data = await res.json();
        error(data.error || 'Failed to upload icon');
      }
    } catch (err) {
      error('An error occurred while uploading the icon');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isEdit ? `/api/admin/ecosystem/${params.id}` : '/api/admin/ecosystem';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        success(isEdit ? 'Project updated' : 'Project created');
        router.push('/admin/ecosystem');
      } else {
        const data = await res.json();
        error(data.error || 'Failed to save project');
      }
    } catch (err) {
      error('Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
            <div className="space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="flex gap-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card variant="glass" className="p-8 space-y-6">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </Card>
                <Card variant="glass" className="p-8">
                    <Skeleton className="h-32 w-full" />
                </Card>
            </div>
            <div className="space-y-6">
                <Card variant="glass" className="p-8 space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </Card>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden bg-dark-950/50">
      <div className="absolute top-0 left-1/2 -translateX-1/2 w-[1000px] h-[400px] bg-primary-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="relative z-10 p-8 pt-12">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight font-display">
                {isEdit ? 'Refine Node' : 'Initialize Node'}
              </h1>
              <p className="text-dark-400 font-medium italic">Configure network project parameters and structural definitions.</p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="ghost" onClick={() => router.push('/admin/ecosystem')} className="text-dark-400 hover:text-white transition-colors font-bold">
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading} className="shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all px-8">
                {isLoading ? <Spinner size="sm" /> : (
                  <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    Commit Changes
                  </span>
                )}
              </Button>
            </div>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="p-8">
            <div className="space-y-6">
              <Input
                label="Project Title"
                value={formData.title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  const newSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setFormData(prev => ({ 
                    ...prev, 
                    title: newTitle,
                    slug: prev.slug === '' || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ? newSlug : prev.slug
                  }));
                }}
                placeholder="e.g. AdMatcher Service"
                required
                className="bg-dark-950/50 border-white/10"
              />
              <Input
                label="Slug (URL Identifier)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="admatcher"
                required
                className="bg-dark-950/50 border-white/10 font-mono text-primary-400"
              />
            </div>
          </Card>

          <Card variant="glass" className="p-8">
            <Textarea
              label="System Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="System details and architectural specs..."
              rows={8}
              className="bg-dark-950/50 border-white/10 resize-none"
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="glass" className="p-8">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black text-dark-400 mb-2 block uppercase tracking-widest">System Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-dark-950/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500/50 transition-all text-sm outline-none font-bold"
                >
                  <option value="current">Current (Active)</option>
                  <option value="upcoming">Upcoming (Planned)</option>
                  <option value="future">Future (Concepts)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black text-dark-400 mb-2 block uppercase tracking-widest">Display Mode</label>
                <select
                  value={formData.imageDisplay}
                  onChange={(e) => setFormData({ ...formData, imageDisplay: e.target.value })}
                  className="w-full bg-dark-950/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500/50 transition-all text-sm outline-none font-bold"
                >
                  <option value="cover">Cover (Fill & Crop)</option>
                  <option value="contain">Contain (Fit All)</option>
                  <option value="fill">Fill (Stretch)</option>
                </select>
              </div>
              <Input
                label="Resource Link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://codeberg.org/..."
                className="bg-dark-950/50 border-white/10"
              />
              <Input
                label="Hosted URL"
                value={formData.hostedUrl}
                onChange={(e) => setFormData({ ...formData, hostedUrl: e.target.value })}
                placeholder="https://app.oxiverse.com"
                className="bg-dark-950/50 border-white/10"
              />
            </div>
          </Card>

          <Card variant="glass" className="p-8">
            <h3 className="text-xs font-black text-dark-400 mb-4 uppercase tracking-widest">Project Icon</h3>
            {formData.imageUrl ? (
              <div className="relative aspect-square w-full max-w-[200px] mx-auto rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                <img src={formData.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold backdrop-blur-sm"
                >
                  Clear Asset
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="relative group w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={isUploading}
                  />
                  <Button variant="outline" className="w-full glass py-6 border-dashed border-white/20 hover:border-primary-500/50" disabled={isUploading}>
                    {isUploading ? <Spinner size="sm" /> : (
                        <div className="flex flex-col items-center gap-1">
                            <svg className="w-6 h-6 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            <span className="text-[10px] font-black uppercase tracking-widest">Upload Icon</span>
                        </div>
                    )}
                  </Button>
                </div>
                <div className="text-center text-[10px] text-dark-500 font-bold uppercase tracking-widest py-1">OR</div>
                <Button 
                    type="button" 
                    variant="outline" 
                    className="glass w-full py-3"
                    onClick={() => setShowAssetBrowser(true)}
                  >
                    Browse Library
                </Button>
              </div>
            )}
          </Card>

          <Card variant="glass" className="bg-primary-500/5 border-primary-500/10 p-6">
            <h4 className="text-xs font-black text-white mb-3 flex items-center uppercase tracking-[0.2em]">
              <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mr-2 shadow-glow">
                <svg className="w-3 h-3 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Node Guide
            </h4>
            <p className="text-[11px] text-dark-400 leading-relaxed font-medium">
              Ecosystem nodes are rendered on the homepage in the network visualization. 
              Ensure slugs are unique and titles match technical documentation.
            </p>
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={showAssetBrowser} 
        onClose={() => setShowAssetBrowser(false)}
        title="Eco Assets"
        size="lg"
      >
        <AssetBrowser onSelect={(url) => {
            setFormData(prev => ({ ...prev, imageUrl: url }));
            setShowAssetBrowser(false);
        }} category="ecosystem" />
      </Modal>
    </form>
  </div>
</div>
  );
}
