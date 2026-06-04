'use client'

import { useState } from 'react'

type RouteNode = 'home' | 'users' | 'profiles' | 'settings' | 'layout'

interface RouteInfo {
  path: string
  filePath: string
  title: string
  content: React.ReactNode
}

const routes: Record<RouteNode, RouteInfo> = {
  home: {
    path: '/',
    filePath: 'app/page.tsx',
    title: 'Home Page',
    content: (
      <div className="p-4 flex flex-col gap-2">
        <h4 className="text-sm font-bold text-white">🏠 Dashboard Home</h4>
        <p className="text-xs text-slate-300">Welcome to our application. This content is rendered by app/page.tsx.</p>
        <div className="h-16 bg-slate-800/50 rounded border border-slate-700/50 flex items-center justify-center text-slate-400 text-[10px]">
          [Featured Content Area]
        </div>
      </div>
    )
  },
  users: {
    path: '/users',
    filePath: 'app/users/page.tsx',
    title: 'Users List',
    content: (
      <div className="p-4 flex flex-col gap-2">
        <h4 className="text-sm font-bold text-emerald-400">👥 Users Index</h4>
        <div className="flex flex-col gap-1.5">
          {['Alice Smith', 'Bob Johnson', 'Carol White'].map((name, i) => (
            <div key={i} className="flex justify-between items-center bg-slate-800/80 p-1.5 rounded border border-slate-700/50 text-[10px]">
              <span className="text-white font-medium">{name}</span>
              <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-1 rounded">Active</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  profiles: {
    path: '/users/profiles',
    filePath: 'app/users/profiles/page.tsx',
    title: 'User Profiles',
    content: (
      <div className="p-4 flex flex-col gap-2">
        <h4 className="text-sm font-bold text-cyan-400">👤 Profiles Section</h4>
        <p className="text-[10px] text-slate-300">Detailed user bios and configuration options are rendered here.</p>
        <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700/50 flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-xs">👤</div>
          <div>
            <div className="text-white font-bold text-[10px]">Alice Smith</div>
            <div className="text-slate-400 text-[8px]">Software Engineer · San Francisco</div>
          </div>
        </div>
      </div>
    )
  },
  settings: {
    path: '/settings',
    filePath: 'app/settings/page.tsx',
    title: 'Settings Page',
    content: (
      <div className="p-4 flex flex-col gap-2">
        <h4 className="text-sm font-bold text-purple-400">⚙️ Settings Dashboard</h4>
        <div className="flex flex-col gap-2 text-[10px]">
          <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
            <span className="text-slate-300">Enable Notifications</span>
            <div className="w-6 h-3.5 bg-purple-500 rounded-full p-0.5 cursor-pointer flex justify-end"><div className="w-2.5 h-2.5 bg-white rounded-full" /></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Dark Mode Override</span>
            <div className="w-6 h-3.5 bg-purple-500 rounded-full p-0.5 cursor-pointer flex justify-end"><div className="w-2.5 h-2.5 bg-white rounded-full" /></div>
          </div>
        </div>
      </div>
    )
  },
  layout: {
    path: '(Shared Layout Framework)',
    filePath: 'app/layout.tsx',
    title: 'Root Layout Template',
    content: (
      <div className="p-4 flex flex-col gap-2">
        <h4 className="text-sm font-bold text-amber-400">📐 Root Layout Active</h4>
        <p className="text-xs text-slate-300">Layouts wrap around pages. They do not re-render when switching pages, making them perfect for headers, navigation, or persistent sidebars.</p>
        <div className="p-2 border border-dashed border-amber-500/40 rounded bg-amber-500/5 text-[9px] text-amber-300">
          Note: This layout is currently wrapping the home page rendering area!
        </div>
      </div>
    )
  }
}

export default function AppRouterMapping() {
  const [activeNode, setActiveNode] = useState<RouteNode>('home')

  const activeInfo = routes[activeNode]

  return (
    <div className="router-demo">
      {/* File Tree Column */}
      <div>
        <div className="file-tree">
          <div className="ft-head">📁 Folder Structure</div>
          
          {/* app root */}
          <div className="ft-line pointer-events-none">
            <span className="ft-icon">📁</span>
            <span className="ft-name ft-folder font-bold">app/</span>
          </div>

          {/* app/layout.tsx */}
          <div className="ft-indent">
            <div 
              className={`ft-line ${activeNode === 'layout' ? 'ft-active' : ''}`}
              onClick={() => setActiveNode('layout')}
            >
              <span className="ft-icon">📄</span>
              <span className="ft-name ft-special">layout.tsx</span>
              <span className="ft-rbadge">shared UI</span>
            </div>

            {/* app/page.tsx */}
            <div 
              className={`ft-line ${activeNode === 'home' ? 'ft-active' : ''}`}
              onClick={() => setActiveNode('home')}
            >
              <span className="ft-icon">📄</span>
              <span className="ft-name ft-route">page.tsx</span>
              <span className="ft-rbadge">/</span>
            </div>

            {/* app/users */}
            <div 
              className={`ft-line ${activeNode === 'users' ? 'ft-active' : ''}`}
              onClick={() => setActiveNode('users')}
            >
              <span className="ft-icon">📁</span>
              <span className="ft-name ft-folder">users/</span>
            </div>

            {/* app/users/page.tsx */}
            <div className="ft-indent">
              <div 
                className={`ft-line ${activeNode === 'users' ? 'ft-active' : ''}`}
                onClick={() => setActiveNode('users')}
              >
                <span className="ft-icon">📄</span>
                <span className="ft-name ft-route">page.tsx</span>
                <span className="ft-rbadge">/users</span>
              </div>

              {/* app/users/profiles */}
              <div 
                className={`ft-line ${activeNode === 'profiles' ? 'ft-active' : ''}`}
                onClick={() => setActiveNode('profiles')}
              >
                <span className="ft-icon">📁</span>
                <span className="ft-name ft-folder">profiles/</span>
              </div>

              {/* app/users/profiles/page.tsx */}
              <div className="ft-indent">
                <div 
                  className={`ft-line ${activeNode === 'profiles' ? 'ft-active' : ''}`}
                  onClick={() => setActiveNode('profiles')}
                >
                  <span className="ft-icon">📄</span>
                  <span className="ft-name ft-route">page.tsx</span>
                  <span className="ft-rbadge">/users/profiles</span>
                </div>
              </div>
            </div>

            {/* app/settings */}
            <div 
              className={`ft-line ${activeNode === 'settings' ? 'ft-active' : ''}`}
              onClick={() => setActiveNode('settings')}
            >
              <span className="ft-icon">📁</span>
              <span className="ft-name ft-folder">settings/</span>
            </div>

            {/* app/settings/page.tsx */}
            <div className="ft-indent">
              <div 
                className={`ft-line ${activeNode === 'settings' ? 'ft-active' : ''}`}
                onClick={() => setActiveNode('settings')}
              >
                <span className="ft-icon">📄</span>
                <span className="ft-name ft-route">page.tsx</span>
                <span className="ft-rbadge">/settings</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-slate-400 text-center font-mono">
          💡 Click any file node to inspect how it maps to the router
        </p>
      </div>

      {/* Viewport Simulation Column */}
      <div className="route-map flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            Mock Browser Viewport
          </h3>
          
          {/* Browser Address Bar Frame */}
          <div className="bg-slate-900 border border-slate-700 rounded-t-lg flex items-center p-1.5 gap-2">
            {/* Dots */}
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-green-500/70" />
            </div>
            
            {/* Input Address Field */}
            <div className="flex-1 bg-slate-950 border border-slate-800 text-[10px] px-2 py-0.5 rounded text-slate-300 font-mono flex items-center gap-1">
              <span className="text-slate-500">https://myapp.com</span>
              <span className="text-emerald-400 font-semibold">{activeNode === 'layout' ? '/' : activeInfo.path}</span>
            </div>
          </div>

          {/* Browser Content Area */}
          <div className="bg-[#0b0c16] border-x border-b border-slate-700 rounded-b-lg min-h-[140px] flex flex-col">
            {/* Shared Header (simulating layout frame UI) */}
            <div className="bg-slate-900/60 border-b border-slate-800 px-3 py-2 flex justify-between items-center">
              <div className="text-[10px] font-bold text-white flex items-center gap-1">
                <span className="text-emerald-400">▲</span> NextApp
              </div>
              <div className="flex gap-2 text-[9px] text-slate-400">
                <span className={activeNode === 'home' ? 'text-white' : ''}>Home</span>
                <span className={activeNode === 'users' || activeNode === 'profiles' ? 'text-white' : ''}>Users</span>
                <span className={activeNode === 'settings' ? 'text-white' : ''}>Settings</span>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1">
              {activeInfo.content}
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="rule-box mt-3">
          <span className="text-base">💡</span>
          <p className="text-xs text-slate-300">
            <strong className="text-emerald-400">Path Segment Mapping:</strong>{' '}
            The file <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded text-[9.5px]">{activeInfo.filePath}</code> defines the page UI that resolves to the route <code className="text-emerald-300 bg-slate-950 px-1 py-0.5 rounded text-[9.5px]">{activeInfo.path}</code>.
          </p>
        </div>
      </div>
    </div>
  )
}
