// Server Component
const features = [
  { icon: '🗺️', title: 'Routing', desc: 'Just create a file and Next.js makes it a page automatically. No extra setup.' },
  { icon: '🖥️', title: 'Rendering', desc: 'You can choose — build the page on the server, or in the browser. Your call.' },
  { icon: '📡', title: 'Data Fetching', desc: "Easily load data from APIs or databases. It even saves the result so you don't fetch it again and again." },
  { icon: '🧩', title: 'Server Components', desc: "Some parts of your page run on the server only. No JavaScript is sent to the user's browser for those parts." },
  { icon: '⚡', title: 'Optimisation', desc: "Images load faster, fonts don't flash, scripts don't slow you down — Next.js handles it all." },
  { icon: '🔍', title: 'SEO Friendly', desc: 'Google can read your page content properly because the HTML is ready before the browser even runs JavaScript.' },
]

export default function FeaturesGrid() {
  return (
    <div className="feat-grid">
      {features.map((f, i) => (
        <div key={f.title} className="feat-card fi" style={{ transitionDelay: `${i * 60}ms` }}>
          <div className="feat-icon">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  )
}
