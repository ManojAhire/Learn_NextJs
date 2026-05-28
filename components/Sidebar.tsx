// Server Component — no 'use client' needed
export default function Sidebar() {
  return (
    <>
      <button className="sidebar-toggle" id="sidebarToggle" aria-label="Toggle menu">
        ☰
      </button>

      <aside className="sidebar" id="sidebar" role="navigation" aria-label="Course navigation">
        <div className="sidebar-logo">
          <div className="brand">
            <span className="tri">▲</span> Next.js Notes
          </div>
          <div className="tagline">Interactive Learning Guide</div>
        </div>

        <div className="nav-group">
          <div className="nav-group-label">Part 1 · Background</div>
          <a className="nav-item" href="#intro"><span className="nav-icon">🌍</span> Web Evolution</a>
          <a className="nav-item" href="#static-web"><span className="nav-icon">📄</span> Static Web</a>
          <a className="nav-item" href="#dynamic"><span className="nav-icon">⚡</span> Dynamic Interactions</a>
          <a className="nav-item" href="#server-gen"><span className="nav-icon">🗄️</span> Server-Gen Content</a>
          <a className="nav-item" href="#spa"><span className="nav-icon">📱</span> Single Page Apps</a>
          <a className="nav-item" href="#react"><span className="nav-icon">⚛️</span> React</a>
          <a className="nav-item" href="#nextjs-intro"><span className="nav-icon">▲</span> Next.js Arrives</a>
        </div>

        <div className="nav-group">
          <div className="nav-group-label">Part 2 · Core Concepts</div>
          <a className="nav-item" href="#what-is-nextjs"><span className="nav-icon">📐</span> What is Next.js?</a>
          <a className="nav-item" href="#rendering"><span className="nav-icon">🖥️</span> Rendering</a>
          <a className="nav-item" href="#create-app"><span className="nav-icon">🚀</span> create-next-app</a>
          <a className="nav-item" href="#app-router"><span className="nav-icon">🗺️</span> App Router</a>
          <a className="nav-item" href="#hydration"><span className="nav-icon">💧</span> Hydration</a>
          <a className="nav-item" href="#css-modules"><span className="nav-icon">🎨</span> CSS Modules</a>
          <a className="nav-item" href="#cheatsheet">
            <span className="nav-icon">⚡</span> Cheatsheet
            <span className="nav-badge">TL;DR</span>
          </a>
        </div>
      </aside>
    </>
  )
}
