'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Spinner, Input } from '@/components/ui';
import { useToastContext } from '@/lib/providers/ToastProvider';

interface Asset {
  id: string;
  fileName: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
}

interface AssetBrowserProps {
  onSelect?: (url: string) => void;
  category?: string;
  allowUpload?: boolean;
}

export default function AssetBrowser({ onSelect, category, allowUpload = true }: AssetBrowserProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');
  const { success, error } = useToastContext();

  useEffect(() => {
    fetchAssets();
  }, [category]);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const url = category ? `/api/admin/assets?category=${category}` : '/api/admin/assets';
      const res = await fetch(url);
      if (res.ok) {
        setAssets(await res.json());
      }
    } catch (err) {
      error('Failed to load assets');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (category) formData.append('type', category);

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        success('Asset uploaded');
        fetchAssets(); // Refresh list
      } else {
        error('Upload failed');
      }
    } catch (err) {
      error('An error occurred');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this asset?')) return;

    try {
      const res = await fetch(`/api/admin/assets?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        success('Asset deleted');
        setAssets(assets.filter(a => a.id !== id));
      }
    } catch (err) {
      error('Failed to delete asset');
    }
  };

  const filteredAssets = assets.filter(a => 
    a.fileName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Input 
            placeholder="Search assets..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <svg className="absolute left-3 top-3 w-4 h-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {allowUpload && (
          <div className="relative">
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleUpload}
              disabled={isUploading}
            />
            <Button variant="outline" className="glass" disabled={isUploading}>
              {isUploading ? <Spinner size="sm" /> : 'Upload New'}
            </Button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center"><Spinner size="lg" /></div>
      ) : filteredAssets.length === 0 ? (
        <div className="py-20 text-center text-dark-500 italic">No assets found matching your search.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map(asset => (
            <div 
              key={asset.id} 
              onClick={() => onSelect?.(asset.url)}
              className={`group relative aspect-square rounded-xl overflow-hidden bg-dark-900 border border-white/5 transition-all cursor-pointer ${
                onSelect ? 'hover:border-primary-500 hover:scale-[1.02]' : ''
              }`}
            >
              <img 
                src={asset.url} 
                alt={asset.fileName} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                <p className="text-[10px] text-white truncate font-medium mb-1">{asset.fileName}</p>
                <div className="flex justify-between items-center">
                   <span className="text-[8px] text-dark-400">{(asset.size / 1024).toFixed(1)} KB</span>
                   <button 
                    onClick={(e) => handleDelete(asset.id, e)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                   >
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
