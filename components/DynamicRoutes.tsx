'use client'

import { useState } from 'react'

type RouteType = 'dynamic' | 'catchall' | 'optional'

export default function DynamicRoutes() {
  const [routeType, setRouteType] = useState<RouteType>('dynamic')
  const [singleId, setSingleId] = useState('42')
  const [slugString, setSlugString] = useState('products/shoes/sneakers')

  // Generate parsed structure based on inputs
  const getResults = () => {
    switch (routeType) {
      case 'dynamic': {
        const cleanId = encodeURIComponent(singleId.trim() || 'id')
        return {
          dir: 'app/blog/[id]/page.tsx',
          url: `/blog/${cleanId}`,
          params: { id: singleId.trim() || 'id' }
        }
      }
      case 'catchall': {
        const segments = slugString.split('/').filter(Boolean)
        const cleanUrl = segments.map(encodeURIComponent).join('/')
        return {
          dir: 'app/shop/[...slug]/page.tsx',
          url: `/shop/${cleanUrl || 'empty-error'}`,
          params: { slug: segments.length ? segments : ['slug'] },
          isError: !segments.length
        }
      }
      case 'optional': {
        const segments = slugString.split('/').filter(Boolean)
        const cleanUrl = segments.map(encodeURIComponent).join('/')
        return {
          dir: 'app/docs/[[...slug]]/page.tsx',
          url: `/docs${cleanUrl ? '/' + cleanUrl : ''}`,
          params: segments.length ? { slug: segments } : {}
        }
      }
    }
  }

  const results = getResults()

  return (
    <div className="dynamic-routes-sandbox border border-slate-800 rounded-xl p-4 bg-slate-900/30 flex flex-col gap-4">
      {/* Selector */}
      <div className="flex gap-2">
        {(['dynamic', 'catchall', 'optional'] as RouteType[]).map((type) => (
          <button
            key={type}
            onClick={() => setRouteType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              routeType === type
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {type === 'dynamic' ? 'Dynamic [id]' : type === 'catchall' ? 'Catch-all [...slug]' : 'Optional Catch-all [[...slug]]'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Input Panel */}
        <div className="flex flex-col gap-3.5 bg-[#0b0c16] border border-slate-800 p-4 rounded-xl">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Route Parameters Constructor
          </h4>

          {routeType === 'dynamic' ? (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-400 font-mono">ID Parameter (e.g. user ID or post slug):</label>
              <input
                type="text"
                value={singleId}
                onChange={(e) => setSingleId(e.target.value)}
                placeholder="42"
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-emerald-500 transition-all"
              />
              <span className="text-[9px] text-slate-500">Square brackets in folder names like <code className="text-slate-400">[id]</code> map a single segment dynamically.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-400 font-mono">Slugs (Use slash &apos;/&apos; to separate segments):</label>
              <input
                type="text"
                value={slugString}
                onChange={(e) => setSlugString(e.target.value)}
                placeholder="products/shoes/sneakers"
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-emerald-500 transition-all"
              />
              <span className="text-[9px] text-slate-500">
                {routeType === 'catchall' 
                  ? 'Catch-all [...slug] matches any deep levels (e.g. /shop/a/b/c) but fails at the root level /shop.'
                  : 'Optional Catch-all [[...slug]] matches everything, including the parent root level /docs without any segments.'}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Output Panel */}
        <div className="flex flex-col gap-2.5 bg-slate-950/60 border border-slate-850 p-4 rounded-xl">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
            Router Resolution
          </h4>

          {/* Directory Folder Name */}
          <div className="flex justify-between items-center text-[10px] border-b border-slate-900 pb-1.5">
            <span className="text-slate-500 font-mono">Folder Name:</span>
            <span className="text-cyan-400 font-mono font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              📁 {results.dir}
            </span>
          </div>

          {/* Resolved URL */}
          <div className="flex justify-between items-center text-[10px] border-b border-slate-900 pb-1.5">
            <span className="text-slate-500 font-mono">Visited URL:</span>
            <span className={`font-mono font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800 ${results.isError ? 'text-red-400' : 'text-emerald-400'}`}>
              🔗 {results.url}
            </span>
          </div>

          {/* Parsed props.params JSON Object */}
          <div className="flex flex-col gap-1 text-[10px]">
            <span className="text-slate-500 font-mono">React Component Page Props (params):</span>
            <pre className="bg-slate-950 border border-slate-900 p-2.5 rounded text-[10px] text-emerald-400 font-mono overflow-x-auto">
              {JSON.stringify({ params: results.params }, null, 2)}
            </pre>
          </div>

          {results.isError && (
            <div className="text-[9px] text-red-400/90 bg-red-950/20 border border-red-500/20 p-2 rounded">
              ⚠️ Catch-all requires at least one folder segment! Visiting /shop directly throws a 404. Use [[...slug]] to make segments optional.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
