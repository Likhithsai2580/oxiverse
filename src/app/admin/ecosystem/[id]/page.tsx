'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Input, Textarea, Card, Spinner, Modal } from '@/components/ui';
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
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden bg-dark-950">
      <div className="absolute top-0 left-1/2 -translateX-1/2 w-[800px] h-[300px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="relative z-10 p-8 pt-12">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-dark-300 mb-2 tracking-tight">
                {isEdit ? 'Edit Node' : 'New Ecosystem Node'}
              </h1>
              <p className="text-dark-400 font-medium">Configure network project parameters and structural definitions.</p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="ghost" onClick={() => router.push('/admin/ecosystem')} className="text-dark-300 hover:text-white transition-colors">
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading} className="shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] transition-all">
                {isLoading ? <Spinner size="sm" /> : (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Save Node
                  </span>
                )}
              </Button>
            </div>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="space-y-4 pt-4">
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
              />
              <Input
                label="Slug (URL Identifier)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="admatcher"
                required
              />
            </div>
          </Card>

          <Card>
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="System details and architectural specs..."
              rows={6}
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-dark-300 mb-2 block">System Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-dark-950 border border-dark-800 text-white rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-primary-500 transition-all text-sm outline-none"
                >
                  <option value="current">Current (Active)</option>
                  <option value="upcoming">Upcoming (Planned)</option>
                  <option value="future">Future (Concepts)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-dark-300 mb-2 block">Image Display Mode</label>
                <select
                  value={formData.imageDisplay}
                  onChange={(e) => setFormData({ ...formData, imageDisplay: e.target.value })}
                  className="w-full bg-dark-950 border border-dark-800 text-white rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-primary-500 transition-all text-sm outline-none"
                >
                  <option value="cover">Cover (Fills area, may crop)</option>
                  <option value="contain">Contain (Fits area, preserves aspect ratio)</option>
                  <option value="fill">Fill (Stretches to fill area)</option>
                </select>
              </div>
              <Input
                label="Resource Link (Repo/Docs)"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://codeberg.org/..."
              />
              <Input
                label="Hosted Version URL"
                value={formData.hostedUrl}
                onChange={(e) => setFormData({ ...formData, hostedUrl: e.target.value })}
                placeholder="https://app.oxiverse.com"
              />
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-white mb-4">Project Icon</h3>
            {formData.imageUrl ? (
              <div className="relative aspect-square w-full max-w-[150px] mx-auto rounded-xl overflow-hidden border border-white/10 group">
                <img src={formData.imageUrl} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                  Clear
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="relative group flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={isUploading}
                  />
                  <Button variant="outline" className="w-full glass" disabled={isUploading}>
                    {isUploading ? <Spinner size="sm" /> : 'Upload'}
                  </Button>
                </div>
                <Button 
                    type="button" 
                    variant="outline" 
                    className="glass flex-1"
                    onClick={() => setShowAssetBrowser(true)}
                  >
                    Library
                </Button>
              </div>
            )}
          </Card>

          <Card className="bg-primary-500/5 border-primary-500/10">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Architectural Hint
            </h4>
            <p className="text-xs text-dark-400 leading-relaxed">
              Ecosystem nodes are rendered on the homepage in the Ecosystem visualization. 
              Ensure slugs are unique and titles match the technical documentation.
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
