'use client';

import { useState, useEffect } from 'react';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontFamily: 'inherit',
  },
  label: {
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '0.25rem',
    display: 'block',
  },
  fileInput: {
    padding: '0.5rem',
    border: '2px dashed #3b82f6',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#f0f9ff',
  },
  preview: {
    width: '100%',
    maxWidth: '200px',
    height: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '2px solid #e5e7eb',
  },
  previewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    flex: 1,
    transition: 'opacity 0.2s',
  },
  buttonPrimary: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  buttonSecondary: {
    backgroundColor: '#6b7280',
    color: 'white',
  },
  buttonDanger: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
  error: {
    color: '#dc2626',
    fontSize: '0.9rem',
    marginTop: '0.25rem',
  },
};

export default function ProfileForm({ profile, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  // Load existing profile data
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setImage(profile.image);
      setPreview(profile.image);
    } else {
      setName('');
      setImage(null);
      setPreview(null);
    }
    setError('');
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!image) {
      setError('Please upload a profile photo');
      return;
    }

    onSave(name.trim(), image);
    setName('');
    setImage(null);
    setPreview(null);
    setError('');
  };

  const handleCancel = () => {
    setName('');
    setImage(null);
    setPreview(null);
    setError('');
    onCancel();
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter profile name"
        />
      </div>

      <div>
        <label style={styles.label}>Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.fileInput}
        />
      </div>

      {preview && (
        <div>
          <label style={styles.label}>Preview</label>
          <div style={styles.previewContainer}>
            <img src={preview} alt="Preview" style={styles.preview} />
          </div>
        </div>
      )}

      {error && <div style={styles.error}>⚠️ {error}</div>}

      <div style={styles.buttonGroup}>
        <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }}>
          {profile ? '💾 Update' : '➕ Add'} Profile
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{ ...styles.button, ...styles.buttonSecondary }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
