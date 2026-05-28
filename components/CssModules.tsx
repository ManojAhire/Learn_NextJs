// Server Component
export default function CssModules() {
  return (
    <div className="css-split">
      {/* Without CSS Modules */}
      <div className="css-card">
        <h4>
          <span style={{ color: 'var(--red-l)' }}>❌</span> Without CSS Modules{' '}
          <span className="s-tag" style={{ background: 'rgba(239,68,68,0.14)', color: 'var(--red-l)', border: '1px solid rgba(239,68,68,0.28)' }}>GLOBAL</span>
        </h4>
        <div className="code-wrap" style={{ margin: 0 }}>
          <div className="code-head">
            <div className="c-dots">
              <div className="c-dot" style={{ background: '#ff5f57' }} />
              <div className="c-dot" style={{ background: '#febc2e' }} />
            </div>
            <div className="c-file">styles.css</div>
          </div>
          <pre style={{ fontSize: '11.5px', padding: '14px' }}>
            <span className="cm">{'/* Applies EVERYWHERE */'}</span>{'\n'}
            <span className="fn">.btn</span>{' { background: blue; }\n\n'}
            <span className="cm">{"/* Another component's .btn */"}</span>{'\n'}
            <span className="fn">.btn</span>{' { background: red; '}<span className="cm">{'/* 💥 CONFLICT! */'}</span>{' }'}
          </pre>
        </div>
        <div className="warn-box" style={{ color: 'var(--red-l)', background: 'rgba(239,68,68,0.07)', borderColor: 'rgba(239,68,68,0.2)' }}>
          ⚠️ The <code style={{ fontFamily: 'var(--font-mono), monospace' }}>.btn</code> style applies to the whole app — any component that uses{' '}
          <code style={{ fontFamily: 'var(--font-mono), monospace' }}>.btn</code> gets affected, even if you didn&apos;t want that
        </div>
      </div>

      {/* With CSS Modules */}
      <div className="css-card">
        <h4>
          <span style={{ color: 'var(--green-l)' }}>✅</span> With CSS Modules{' '}
          <span className="s-tag" style={{ background: 'rgba(16,185,129,0.14)', color: 'var(--green-l)', border: '1px solid rgba(16,185,129,0.28)' }}>SCOPED</span>
        </h4>
        <div className="code-wrap" style={{ margin: 0 }}>
          <div className="code-head">
            <div className="c-dots">
              <div className="c-dot" style={{ background: '#ff5f57' }} />
              <div className="c-dot" style={{ background: '#febc2e' }} />
            </div>
            <div className="c-file">Button.module.css + Button.tsx</div>
          </div>
          <pre style={{ fontSize: '11.5px', padding: '14px' }}>
            <span className="cm">{'/* Button.module.css */'}</span>{'\n'}
            <span className="fn">.btn</span>{' { background: blue; }\n\n'}
            <span className="kw">import</span>{' styles '}<span className="kw">from</span>{' '}<span className="str">{'\'./Button.module.css\''}</span>{'\n'}
            <span className="kw">export function</span>{' '}<span className="fn">Button</span>{'() {\n  '}<span className="kw">return</span>{' <'}<span className="tg">button</span>{' '}<span className="at">className</span>{'={styles.btn}>Click!</'}<span className="tg">button</span>{'>\n}'}
          </pre>
        </div>
        <div className="warn-box" style={{ color: 'var(--green-l)', background: 'rgba(16,185,129,0.07)', borderColor: 'rgba(16,185,129,0.2)' }}>
          ✅ Next.js secretly renames <code style={{ fontFamily: 'var(--font-mono), monospace' }}>.btn</code> to something like{' '}
          <code style={{ fontFamily: 'var(--font-mono), monospace' }}>.btn_x7a3k</code> so it only applies to <em>this</em> component — never anyone else&apos;s
        </div>
      </div>
    </div>
  )
}
