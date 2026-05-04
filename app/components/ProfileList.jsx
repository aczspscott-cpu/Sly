'use client';

const styles = {
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    alignItems: 'flex-start',
  },
  itemLast: {
    borderBottom: 'none',
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    margin: '0 0 0.25rem 0',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  date: {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    flexDirection: 'column',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'opacity 0.2s',
    whiteSpace: 'nowrap',
  },
  buttonEdit: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  buttonDelete: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
  empty: {
    padding: '2rem',
    textAlign: 'center',
    color: '#9ca3af',
  },
};

export default function ProfileList({ profiles, onEdit, onDelete }) {
  if (profiles.length === 0) {
    return <div style={styles.empty}>No profiles yet. Create one to get started!</div>;
  }

  return (
    <ul style={styles.list}>
      {profiles.map((profile, index) => (
        <li
          key={profile.id}
          style={{
            ...styles.item,
            ...(index === profiles.length - 1 && styles.itemLast),
          }}
        >
          <img src={profile.image} alt={profile.name} style={styles.image} />
          <div style={styles.content}>
            <h4 style={styles.name}>{profile.name}</h4>
            <p style={styles.date}>
              📅 Created: {profile.createdAt}
              {profile.updatedAt && (
                <>
                  <br />
                  Updated: {profile.updatedAt}
                </>
              )}
            </p>
          </div>
          <div style={styles.actions}>
            <button
              onClick={() => onEdit(profile.id)}
              style={{ ...styles.button, ...styles.buttonEdit }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete profile "${profile.name}"?`)) {
                  onDelete(profile.id);
                }
              }}
              style={{ ...styles.button, ...styles.buttonDelete }}
            >
              🗑️ Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
