'use client';

import AssetBrowser from '../components/AssetBrowser';

export default function AdminAssetsPage() {
  return (
    <div className="p-8 pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Media Library</h1>
        <p className="text-dark-400">Manage all uploaded assets across the ecosystem</p>
      </div>

      <div className="glass rounded-3xl p-8 border border-white/5">
        <AssetBrowser />
      </div>
    </div>
  );
}
