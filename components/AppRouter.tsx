'use client'

import { useState } from 'react'

type RouteKey = 'home' | 'layout' | 'about' | 'blog' | 'post'

const routeMap: Record<RouteKey, { path: string; desc: string; treeId: string | null }> = {
  home:   { path: '/',         desc: 'app/page.tsx · Home page',                 treeId: 'ftr-home' },
  layout: { path: 'layout.tsx', desc: 'Wraps ALL pages · shared UI like navbar',  treeId: null },
  about:  { path: '/about',    desc: 'app/about/page.tsx',                        treeId: 'ftr-about' },
  blog:   { path: '/blog',     desc: 'app/blog/page.tsx · Blog list',             treeId: 'ftr-blog' },
  post:   { path: '/blog/:id', desc: 'app/blog/[id]/page.tsx · Dynamic!',         treeId: 'ftr-post' },
}

export default function AppRouter() {
  const [selected, setSelected] = useState<RouteKey>('home')

  return (
    <div className="router-demo">
      {/* File Tree */}
      <div>
        <div className="file-tree">
          <div className="ft-head">📁 Project Files</div>
          <div className="ft-line" onClick={() => setSelected('home')}>
            <span className="ft-icon">📁</span><span className="ft-name ft-folder">app/</span>
          </div>
          <div className="ft-indent">
            <div className={`ft-line${selected === 'home' ? ' ft-active' : ''}`} onClick={() => setSelected('home')}>
              <span className="ft-icon">📄</span><span className="ft-name ft-route">page.tsx</span><span className="ft-rbadge">/ route</span>
            </div>
            <div className={`ft-line${selected === 'layout' ? ' ft-active' : ''}`} onClick={() => setSelected('layout')}>
              <span className="ft-icon">📄</span><span className="ft-name ft-special">layout.tsx</span>
            </div>
            <div className="ft-line" onClick={() => setSelected('about')}>
              <span className="ft-icon">📁</span><span className="ft-name ft-folder">about/</span>
            </div>
            <div className="ft-indent">
              <div className={`ft-line${selected === 'about' ? ' ft-active' : ''}`} onClick={() => setSelected('about')}>
                <span className="ft-icon">📄</span><span className="ft-name ft-route">page.tsx</span><span className="ft-rbadge">/about</span>
              </div>
            </div>
            <div className="ft-line" onClick={() => setSelected('blog')}>
              <span className="ft-icon">📁</span><span className="ft-name ft-folder">blog/</span>
            </div>
            <div className="ft-indent">
              <div className={`ft-line${selected === 'blog' ? ' ft-active' : ''}`} onClick={() => setSelected('blog')}>
                <span className="ft-icon">📄</span><span className="ft-name ft-route">page.tsx</span><span className="ft-rbadge">/blog</span>
              </div>
              <div className="ft-line" onClick={() => setSelected('post')}>
                <span className="ft-icon">📁</span><span className="ft-name ft-folder">[id]/</span>
              </div>
              <div className="ft-indent">
                <div className={`ft-line${selected === 'post' ? ' ft-active' : ''}`} onClick={() => setSelected('post')}>
                  <span className="ft-icon">📄</span><span className="ft-name ft-route">page.tsx</span><span className="ft-rbadge">/blog/:id</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '8px', fontSize: '10px', color: 'var(--muted)', textAlign: 'center', fontFamily: 'var(--font-mono), monospace' }}>↑ Click files to explore</div>
      </div>

      {/* Route Map */}
      <div className="route-map">
        <h3>Route Map</h3>
        {(Object.keys(routeMap) as RouteKey[]).map((key) => (
          <div
            key={key}
            className={`ri${selected === key ? ' ri-sel' : ''}`}
            onClick={() => setSelected(key)}
          >
            <div className="ri-path" style={key === 'layout' ? { color: 'var(--purple-l)' } : {}}>
              {routeMap[key].path}
            </div>
            <div className="ri-arr">→</div>
            <div className="ri-desc">{routeMap[key].desc}</div>
          </div>
        ))}
        <div className="rule-box">
          <span style={{ fontSize: '14px' }}>💡</span>
          <p>
            <strong style={{ color: 'var(--amber-l)' }}>Simple Rule:</strong> Folder name = URL address. Put a{' '}
            <code style={{ color: 'var(--green-l)', fontFamily: 'var(--font-mono), monospace', fontSize: '10px' }}>page.tsx</code>{' '}
            inside the folder = anyone can visit that page. No{' '}
            <code style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: 'var(--red-l)' }}>page.tsx</code>{' '}
            = page not found (404 error).
          </p>
        </div>
      </div>
    </div>
  )
}
