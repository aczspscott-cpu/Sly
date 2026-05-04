'use client';

import { useState, useEffect } from 'react';
import ProfileList from './ProfileList';
import ProfileForm from './ProfileForm';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem',
  },
  section: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  h3: {
    marginTop: '0',
    color: '#1f2937',
    borderBottom: '2px solid #10b981',
    paddingBottom: '0.5rem',
  },
  responsive: {
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
};

const STORAGE_KEY = 'profiles';

export default function ProfileManager() {
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Load profiles from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProfiles(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load profiles:', e);
        setProfiles([]);
      }
    }
    setMounted(true);
  }, []);

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    }
  }, [profiles, mounted]);

  const addProfile = (name, image) => {
    const newProfile = {
      id: Date.now(),
      name,
      image,
      createdAt: new Date().toLocaleString(),
    };
    setProfiles([...profiles, newProfile]);
    setEditingId(null);
  };

  const updateProfile = (id, name, image) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id
          ? { ...p, name, image, updatedAt: new Date().toLocaleString() }
          : p
      )
    );
    setEditingId(null);
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter((p) => p.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const editingProfile = profiles.find((p) => p.id === editingId);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h3 style={styles.h3}>✏️ {editingProfile ? 'Edit' : 'Create'} Profile</h3>
        <ProfileForm
          profile={editingProfile}
          onSave={(name, image) =>
            editingProfile
              ? updateProfile(editingProfile.id, name, image)
              : addProfile(name, image)
          }
          onCancel={() => setEditingId(null)}
        />
      </div>

      <div style={styles.section}>
        <h3 style={styles.h3}>👥 Your Profiles ({profiles.length})</h3>
        <ProfileList
          profiles={profiles}
          onEdit={(id) => setEditingId(id)}
          onDelete={deleteProfile}
        />
      </div>
    </div>
  );
}
