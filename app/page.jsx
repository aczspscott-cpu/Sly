'use client';

import { useState } from 'react';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  section: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  h2: {
    marginTop: '0',
    color: '#1f2937',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '0.5rem',
  },
  counterDisplay: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#3b82f6',
    textAlign: 'center',
    margin: '1.5rem 0',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'opacity 0.2s',
  },
  buttonPrimary: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  buttonSecondary: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
  buttonTertiary: {
    backgroundColor: '#10b981',
    color: 'white',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '0.75rem 0',
    borderBottom: '1px solid #e5e7eb',
  },
  code: {
    backgroundColor: '#f3f4f6',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
  },
};

export default function Home() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={styles.container}>
      {/* Welcome Section */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Welcome to Next.js 14</h2>
        <p>
          This is a minimal Next.js 14 application using the <strong>App Router</strong>.
          Everything is configured with zero external dependencies beyond React and Next.js.
        </p>
      </section>

      {/* Counter Section */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Interactive Counter</h2>
        <p>This demonstrates client-side interactivity using the <span style={styles.code}>'use client'</span> directive and React hooks.</p>
        <div style={styles.counterDisplay}>{count}</div>
        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onClick={increment}
          >
            Increment +
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonSecondary }}
            onClick={decrement}
          >
            Decrement −
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonTertiary }}
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.section}>
        <h2 style={styles.h2}>App Features</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>✓ Next.js 14 with App Router</li>
          <li style={styles.listItem}>✓ React 18 functional components</li>
          <li style={styles.listItem}>✓ Client-side state management with hooks</li>
          <li style={styles.listItem}>✓ Root layout wrapper</li>
          <li style={styles.listItem}>✓ Inline styling (no external CSS)</li>
          <li style={styles.listItem}>✓ Zero external dependencies</li>
          <li style={styles.listItem}>✓ SEO metadata support</li>
          <li style={styles.listItem}>✓ Responsive design</li>
        </ul>
      </section>

      {/* Getting Started Section */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Getting Started</h2>
        <p>
          To run this app locally:
        </p>
        <ol>
          <li>Run <span style={styles.code}>npm install</span></li>
          <li>Run <span style={styles.code}>npm run dev</span></li>
          <li>Open <span style={styles.code}>http://localhost:3000</span> in your browser</li>
        </ol>
      </section>
    </div>
  );
}
