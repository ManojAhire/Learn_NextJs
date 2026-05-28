// Server Component
export default function CliDemo() {
  return (
    <div className="cli-box">
      <div className="cli-bar">
        <div className="cli-bar-dot" style={{ background: '#ff5f57' }} />
        <div className="cli-bar-dot" style={{ background: '#febc2e' }} />
        <div className="cli-bar-dot" style={{ background: '#28c840' }} />
        <span className="cli-label">Terminal — zsh</span>
      </div>
      <div className="cli-body">
        <div><span className="p">~ $</span> <span className="c">npx create-next-app@latest my-app</span></div>
        <div>&nbsp;</div>
        <div className="wn">✔ Would you like to use TypeScript? <span style={{ color: '#fff' }}>Yes</span></div>
        <div className="wn">✔ Would you like to use ESLint? <span style={{ color: '#fff' }}>Yes</span></div>
        <div className="wn">✔ Would you like to use Tailwind CSS? <span style={{ color: '#fff' }}>No</span></div>
        <div className="wn">✔ Would you like to use the App Router? <span style={{ color: '#fff' }}>Yes</span></div>
        <div>&nbsp;</div>
        <div className="ok">✅ Project created in ./my-app</div>
        <div>&nbsp;</div>
        <div><span className="p">~ $</span> <span className="c">cd my-app &amp;&amp; npm run dev</span></div>
        <div className="ok">▲ Next.js 15 · ready on http://localhost:3000</div>
      </div>
    </div>
  )
}
