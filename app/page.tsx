import Timeline from '@/components/Timeline'
import FeaturesGrid from '@/components/FeaturesGrid'
import CliDemo from '@/components/CliDemo'
import AppRouter from '@/components/AppRouter'
import HydrationDiagram from '@/components/HydrationDiagram'
import CssModules from '@/components/CssModules'
import RenderingEnvironments from '@/components/RenderingEnvironments'
import ClientSideRendering from '@/components/ClientSideRendering'
import ServerSideRendering from '@/components/ServerSideRendering'
import Level1Notes from '@/components/Level1Notes'



export default function HomePage() {
  return (
    <main className="content">
      <div className="content-inner">

        {/* ── HERO ── */}
        <header className="chapter-hero" id="intro">
          <div className="ch-badge"><div className="ch-dot" /> Next.js Learning Series</div>
          <h1>From Zero<br />to Next.js</h1>
          <p>Web evolution, core concepts, rendering strategies, routing, hydration — all in one place. Visual-first, no textbook walls.</p>
        </header>

        {/* ══════════════════════════════════════
            PART 1 — WEB EVOLUTION
        ══════════════════════════════════════ */}
        <section className="section fi" id="static-web" aria-label="Web evolution timeline">
          <div className="sec-num">Part 1 · The Journey</div>
          <h2 className="sec-title">How the Web Evolved</h2>
          <p className="sec-sub">Six eras that brought us from simple HTML files to full-stack React apps. Click any card to expand.</p>
          <Timeline />
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════
            PART 2 — CORE CONCEPTS
        ══════════════════════════════════════ */}

        {/* What is Next.js */}
        <section className="section fi" id="what-is-nextjs" aria-label="What is Next.js">
          <div className="sec-num">Part 2 · 01</div>
          <h2 className="sec-title">What is Next.js?</h2>
          <p className="sec-sub">
            Think of Next.js as React with superpowers. React is great, but you have to set up a lot of things yourself.
            Next.js comes with all those things already built in — so you can just focus on building your app.
          </p>
          <FeaturesGrid />
        </section>

        <div className="divider" />

        {/* Rendering Environments */}
        <section className="section fi" id="rendering-env" aria-label="Rendering environments">
          <div className="sec-num">Part 2 · 02</div>
          <h2 className="sec-title">Rendering Environments</h2>
          <p className="sec-sub">
            To grasp the capabilities of Next.js, one must start at the core — rendering environments.
            There are two primary environments: the <strong>server</strong> and the <strong>client</strong>.
          </p>
          <RenderingEnvironments />
        </section>

        <div className="divider" />

        {/* Client-Side Rendering */}
        <section className="section fi" id="csr" aria-label="Client-Side Rendering">
          <div className="sec-num">Part 2 · 03</div>
          <h2 className="sec-title">Client-Side Rendering (CSR)</h2>
          <p className="sec-sub">
            Client-side rendering is key to modern dynamic single-page applications. The server delivers a barebones HTML file, and the client browser runs JavaScript to construct the full page and enable interactivity.
          </p>
          <ClientSideRendering />
        </section>

        <div className="divider" />

        {/* Server-Side Rendering */}
        <section className="section fi" id="ssr" aria-label="Server-Side Rendering">
          <div className="sec-num">Part 2 · 04</div>
          <h2 className="sec-title">Server-Side Rendering (SSR)</h2>
          <p className="sec-sub">
            SSR compiles dynamic pages directly on capable server infrastructure. This improves speed, SEO crawlability, and offloads rendering work from the client hardware.
          </p>
          <ServerSideRendering />
        </section>

        <div className="divider" />

        {/* create-next-app */}
        <section className="section fi" id="create-app" aria-label="Starting a new Next.js project">
          <div className="sec-num">Part 2 · 05</div>
          <h2 className="sec-title">Starting a New Project</h2>
          <p className="sec-sub">
            You don&apos;t have to set up a Next.js project from zero. Just run one command in the terminal and it asks you a few questions,
            then builds the whole project for you automatically. It&apos;s like pressing a &ldquo;new project&rdquo; button.
          </p>
          <CliDemo />
        </section>

        <div className="divider" />

        {/* App Router */}
        <section className="section fi" id="app-router" aria-label="Next.js App Router">
          <div className="sec-num">Part 2 · 06</div>
          <h2 className="sec-title">The App Router — Pages from Folders</h2>
          <p className="sec-sub">
            In Next.js, you don&apos;t need to write any code to set up your pages. Just{' '}
            <strong>create a folder with a file inside it</strong>, and that automatically becomes a page on your website.
            The folder name becomes the URL. Click on the files below to see how it maps.
          </p>
          <AppRouter />
        </section>

        <div className="divider" />

        {/* Hydration */}
        <section className="section fi" id="hydration" aria-label="Hydration explained">
          <div className="sec-num">Part 2 · 07</div>
          <h2 className="sec-title">What is Hydration?</h2>
          <p className="sec-sub">
            When SSR sends you a ready-made page, it looks good — but buttons don&apos;t work yet.{' '}
            <strong>Hydration</strong> is when JavaScript loads and makes everything clickable.
            Think of it like: the page is a statue, hydration gives it a heartbeat. Click each step below.
          </p>
          <HydrationDiagram />
        </section>

        <div className="divider" />

        {/* CSS Modules */}
        <section className="section fi" id="css-modules" aria-label="CSS Modules">
          <div className="sec-num">Part 2 · 08</div>
          <h2 className="sec-title">CSS Modules — Styling Without Mess</h2>
          <p className="sec-sub">
            Normally, if two components both have a CSS class called{' '}
            <code style={{ color: 'var(--red-l)', fontFamily: 'var(--font-mono), monospace', fontSize: '0.85em' }}>.btn</code>,
            they crash into each other and break the style. CSS Modules fix this — each component gets its own private styles
            that never mix with anyone else&apos;s. Just name your file with{' '}
            <code style={{ color: 'var(--green-l)', fontFamily: 'var(--font-mono), monospace', fontSize: '0.85em' }}>.module.css</code> at the end.
          </p>
          <CssModules />
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════
            PART 3 — LEVEL 1 APP ROUTER
        ══════════════════════════════════════ */}
        <Level1Notes />

        {/* Cheatsheet */}
        <section className="section cheatsheet fi" id="cheatsheet" aria-label="Quick cheatsheet">
          <h2>⚡ Quick Cheatsheet</h2>
          <p className="sub">Everything from Part 1 + Part 2 + Part 3 in one glance</p>
          <div className="cs-grid">
            {[
              { k: 'Static Web',   v: 'HTML files served as-is · same page for everyone' },
              { k: 'Ajax / XHR',   v: 'Update parts of page without full reload' },
              { k: 'SPA',          v: 'Load HTML once · JS renders everything client-side' },
              { k: 'React',        v: 'Component-based · Virtual DOM · declarative UI' },
              { k: 'Next.js',      v: 'React + routing + SSR + optimisation, out of the box' },
              { k: 'SSR',          v: 'Server builds HTML → fast load → then hydrates' },
              { k: 'CSR',          v: "Add 'use client' → renders in browser" },
              { k: 'Hydration',    v: 'JS attaches events to server-rendered HTML' },
              { k: 'App Router',   v: 'folder = URL · page.tsx = accessible route' },
              { k: 'CSS Modules',  v: 'Name .module.css → auto-scoped classnames' },
              { k: 'Client Nav',   v: 'Pre-fetched, instant transition without reloading browser tab' },
              { k: 'Layout vs Temp',v: 'Layouts persist state · Templates re-mount and reset state' },
              { k: 'Dynamic Routes',v: 'Bracket folders like [id] / [[...slug]] inject params' },
              { k: 'Hierarchy',    v: 'Nested wrapping layers: Layout → Template → Error → Loading → Page' },
            ].map((row) => (
              <div key={row.k} className="cs-row">
                <div className="cs-k">{row.k}</div>
                <div className="cs-v">{row.v}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '60px' }} />

      </div>
    </main>
  )
}
