'use client';

import { useState, useEffect } from 'react';
import ProfileManager from './components/ProfileManager';

const styles = {
  container: {
    maxWidth: '900px',
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
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.h2}>Loading...</h2>
        </section>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <h2 style={styles.h2}>Profile Manager</h2>
        <p>
          Manage your profiles with photos. Images are stored in your browser's local storage.
        </p>
      </section>

      <ProfileManager />
    </div>
  );
}
