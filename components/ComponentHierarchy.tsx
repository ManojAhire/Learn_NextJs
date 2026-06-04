'use client'

import { useState } from 'react'

type LayerId = 'layout' | 'template' | 'error' | 'loading' | 'page'

interface LayerInfo {
  id: LayerId
  title: string
  fileName: string
  colorClass: string
  desc: string
  wrapText: string
}

const layers: LayerInfo[] = [
  {
    id: 'layout',
    title: 'Layout',
    fileName: 'layout.tsx',
    colorClass: 'border-emerald-500 text-emerald-400 bg-emerald-500/5',
    desc: 'Shared structural UI wrapper. Persists state across route transitions, stays mounted, and does not re-render.',
    wrapText: '<Layout>'
  },
  {
    id: 'template',
    title: 'Template',
    fileName: 'template.tsx',
    colorClass: 'border-indigo-500 text-indigo-400 bg-indigo-500/5',
    desc: 'Similar to Layout, but creates a fresh instance on navigation. Good for entrance animations or state resets.',
    wrapText: '  <Template>'
  },
  {
    id: 'error',
    title: 'Error Boundary',
    fileName: 'error.tsx',
    colorClass: 'border-rose-500 text-rose-400 bg-rose-500/5',
    desc: 'React Error Boundary wrapper. Intercepts runtime exceptions in child pages and displays a fallback crash UI.',
    wrapText: '    <ErrorBoundary fallback={<ErrorUI />}>'
  },
  {
    id: 'loading',
    title: 'Suspense Boundary',
    fileName: 'loading.tsx',
    colorClass: 'border-cyan-500 text-cyan-400 bg-cyan-500/5',
    desc: 'React Suspense wrapper. Automatically renders custom fallback loading spinners while children finish async fetches.',
    wrapText: '      <Suspense fallback={<LoadingUI />}>'
  },
  {
    id: 'page',
    title: 'Page View',
    fileName: 'page.tsx',
    colorClass: 'border-amber-500 text-amber-400 bg-amber-500/5',
    desc: 'The concrete page view UI of the leaf route segment. Rendered deep within all structural wrappers.',
    wrapText: '        <Page />'
  }
]

export default function ComponentHierarchy() {
  const [selectedLayer, setSelectedLayer] = useState<LayerId>('page')

  return (
    <div className="component-hierarchy-sandbox border border-slate-800 rounded-xl p-4 bg-slate-900/30 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Left: 3D Stack Visualization */}
        <div className="flex flex-col items-center justify-center py-6 relative">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4 font-mono">
            3D Nested Component Stack
          </div>
          
          <div className="relative w-full max-w-[280px] h-[190px] flex flex-col items-center justify-center">
            {/* Layout Layer */}
            <div 
              onClick={() => setSelectedLayer('layout')}
              className={`absolute w-full border rounded-lg p-2.5 cursor-pointer transition-all duration-300 ${
                selectedLayer === 'layout' 
                  ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_8px_20px_rgba(16,185,129,0.15)] scale-[1.03] z-50' 
                  : 'border-emerald-500/40 bg-emerald-950/20 opacity-80 hover:opacity-100 z-10'
              }`}
              style={{
                transform: 'rotateX(55deg) rotateZ(-20deg) translateZ(0px)',
                top: '0px'
              }}
            >
              <div className="flex justify-between items-center text-[10px] font-bold text-emerald-400 font-mono">
                <span>📁 app/layout.tsx</span>
                <span className="text-[8px] bg-emerald-500/20 px-1 rounded">Outer</span>
              </div>
            </div>

            {/* Template Layer */}
            <div 
              onClick={() => setSelectedLayer('template')}
              className={`absolute w-[92%] border rounded-lg p-2 cursor-pointer transition-all duration-300 ${
                selectedLayer === 'template' 
                  ? 'border-indigo-400 bg-indigo-500/10 shadow-[0_8px_20px_rgba(99,102,241,0.15)] scale-[1.03] z-50' 
                  : 'border-indigo-500/40 bg-indigo-950/20 opacity-80 hover:opacity-100 z-20'
              }`}
              style={{
                transform: 'rotateX(55deg) rotateZ(-20deg) translateZ(25px)',
                top: '25px'
              }}
            >
              <div className="text-[9.5px] font-bold text-indigo-400 font-mono">
                📁 app/template.tsx
              </div>
            </div>

            {/* Error Boundary Layer */}
            <div 
              onClick={() => setSelectedLayer('error')}
              className={`absolute w-[84%] border rounded-lg p-1.5 cursor-pointer transition-all duration-300 ${
                selectedLayer === 'error' 
                  ? 'border-rose-400 bg-rose-500/10 shadow-[0_8px_20px_rgba(244,63,94,0.15)] scale-[1.03] z-50' 
                  : 'border-rose-500/40 bg-rose-950/20 opacity-80 hover:opacity-100 z-30'
              }`}
              style={{
                transform: 'rotateX(55deg) rotateZ(-20deg) translateZ(50px)',
                top: '50px'
              }}
            >
              <div className="text-[9px] font-bold text-rose-400 font-mono">
                📁 app/error.tsx
              </div>
            </div>

            {/* Suspense Boundary Layer */}
            <div 
              onClick={() => setSelectedLayer('loading')}
              className={`absolute w-[76%] border rounded-lg p-1.5 cursor-pointer transition-all duration-300 ${
                selectedLayer === 'loading' 
                  ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_8px_20px_rgba(6,182,212,0.15)] scale-[1.03] z-50' 
                  : 'border-cyan-500/40 bg-cyan-950/20 opacity-80 hover:opacity-100 z-40'
              }`}
              style={{
                transform: 'rotateX(55deg) rotateZ(-20deg) translateZ(75px)',
                top: '75px'
              }}
            >
              <div className="text-[8.5px] font-bold text-cyan-400 font-mono">
                📁 app/loading.tsx
              </div>
            </div>

            {/* Page Layer */}
            <div 
              onClick={() => setSelectedLayer('page')}
              className={`absolute w-[68%] border rounded-lg p-1.5 cursor-pointer transition-all duration-300 ${
                selectedLayer === 'page' 
                  ? 'border-amber-400 bg-amber-500/10 shadow-[0_8px_20px_rgba(245,158,11,0.15)] scale-[1.03] z-50' 
                  : 'border-amber-500/40 bg-amber-950/20 opacity-80 hover:opacity-100 z-50'
              }`}
              style={{
                transform: 'rotateX(55deg) rotateZ(-20deg) translateZ(100px)',
                top: '100px'
              }}
            >
              <div className="flex justify-between items-center text-[8px] font-bold text-amber-400 font-mono">
                <span>📄 app/page.tsx</span>
                <span className="text-[7.5px] bg-amber-500/20 px-1 rounded">Leaf</span>
              </div>
            </div>
          </div>
          
          <div className="text-[8.5px] text-slate-500 font-mono mt-2">
            Click layers inside stack to examine nesting hierarchy
          </div>
        </div>

        {/* Right: Code Nesting & Description */}
        <div className="flex flex-col gap-3">
          {/* React rendering nest code structure */}
          <div className="bg-slate-950 rounded-lg p-3 border border-slate-850 font-mono text-[9px] text-slate-400 leading-relaxed">
            {layers.map((l) => (
              <div 
                key={l.id} 
                className={`transition-colors py-0.5 px-1.5 rounded cursor-pointer ${
                  selectedLayer === l.id 
                    ? 'text-white font-bold bg-slate-900' 
                    : 'hover:text-slate-200'
                }`}
                onClick={() => setSelectedLayer(l.id)}
              >
                {l.wrapText}
              </div>
            ))}
            <div className="text-slate-600">{'      </Suspense>'}</div>
            <div className="text-slate-600">{'    </ErrorBoundary>'}</div>
            <div className="text-slate-600">{'  </Template>'}</div>
            <div className="text-slate-600">{'</Layout>'}</div>
          </div>

          {/* Description Card */}
          {(() => {
            const activeLayer = layers.find(l => l.id === selectedLayer)!
            return (
              <div className={`p-3.5 border rounded-lg transition-all ${activeLayer.colorClass}`}>
                <h5 className="text-xs font-bold font-mono mb-1 uppercase tracking-wider">
                  Reserved File: {activeLayer.fileName} ({activeLayer.title})
                </h5>
                <p className="text-[10px] leading-normal text-slate-300">
                  {activeLayer.desc}
                </p>
              </div>
            )
          })()}
        </div>

      </div>
    </div>
  )
}
