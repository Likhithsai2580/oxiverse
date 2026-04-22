'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Spinner, Input, Skeleton } from '@/components/ui';
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
            className="pl-10 h-10"
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
            <Button variant="outline" className="glass h-10 px-6" disabled={isUploading}>
              {isUploading ? <Spinner size="sm" /> : (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload New
                </span>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden border border-white/5 bg-dark-900/40 p-2">
                <Skeleton className="w-full h-full rounded-lg" />
            </div>
          ))
        ) : filteredAssets.length === 0 ? (
          <div className="col-span-full py-20 text-center text-dark-500 italic font-medium">No assets found matching your search.</div>
        ) : (
          filteredAssets.map(asset => (
            <div 
              key={asset.id} 
              onClick={() => onSelect?.(asset.url)}
              className={`group relative aspect-square rounded-xl overflow-hidden bg-dark-900/60 border border-white/5 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-primary-500/10 ${
                onSelect ? 'hover:border-primary-500/50 hover:scale-[1.02]' : ''
              }`}
            >
              <img 
                src={asset.url} 
                alt={asset.fileName} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3">
                <p className="text-[10px] text-white truncate font-bold mb-1">{asset.fileName}</p>
                <div className="flex justify-between items-center">
                   <span className="text-[8px] text-dark-400 font-bold uppercase tracking-wider">{(asset.size / 1024).toFixed(1)} KB</span>
                   <button 
                    onClick={(e) => handleDelete(asset.id, e)}
                    className="p-1.5 bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all"
                   >
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                   </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
