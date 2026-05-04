'use client';
import { useEffect, useMemo, useState } from 'react';

// ---------- Local helpers ----------
const LS_USERS = 'sl_users';
const LS_SESSION = 'sl_session';
const LS_PROFILES = 'sl_profiles';
const LS_LIKES = 'sl_likes';

function loadJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createSeedProfiles() {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 10),
    distance: Math.floor(Math.random() * 30) + 1,
    bio: "Just testing 👋",
    image: null
  }));
}

// ---------- App ----------
export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState(null); // {email}
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [profiles, setProfiles] = useState([]);
  const [index, setIndex] = useState(0);

  const [likes, setLikes] = useState({}); // { profileId: true }

  useEffect(() => {
    // hydrate local storage
    const users = loadJSON(LS_USERS, []);
    const session = loadJSON(LS_SESSION, null);
    let profs = loadJSON(LS_PROFILES, null);
    const likesMap = loadJSON(LS_LIKES, {});

    if (!profs) {
      profs = createSeedProfiles();
      saveJSON(LS_PROFILES, profs);
    }

    setUser(session);
    setProfiles(profs);
    setLikes(likesMap);
    setHydrated(true);
  }, []);

  // ---------- Auth (local only) ----------
  const signUp = () => {
    if (!email || !password) {
      alert('Enter email and password');
      return;
    }
    const users = loadJSON(LS_USERS, []);
    const exists = users.find(u => u.email === email);
    if (exists) {
      alert('User already exists, please login');
      return;
    }
    const next = [...users, { email, password }];
    saveJSON(LS_USERS, next);
    saveJSON(LS_SESSION, { email });
    setUser({ email });
  };

  const signIn = () => {
    const users = loadJSON(LS_USERS, []);
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      alert('Invalid credentials');
      return;
    }
    saveJSON(LS_SESSION, { email });
    setUser({ email });
  };

  const signOut = () => {
    localStorage.removeItem(LS_SESSION);
    setUser(null);
  };

  // ---------- Profile actions ----------
  const current = useMemo(() => profiles[index], [profiles, index]);

  const next = () => setIndex(i => i + 1);

  const handleLike = () => {
    if (!current) return;
    const updated = { ...likes, [current.id]: true };
    setLikes(updated);
    saveJSON(LS_LIKES, updated);
    next();
  };

  const handlePass = () => next();

  const upload = (e, id) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const updated = profiles.map(p => p.id === id ? { ...p, image: url } : p);
    setProfiles(updated);
    saveJSON(LS_PROFILES, updated);
  };

  // ---------- UI ----------
  if (!hydrated) return null;

  if (!user) {
    return (
      <div style={{ maxWidth: 360, margin: '120px auto', background: 'white', padding: 20, borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={input} />
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button style={btn} onClick={signIn}>Login</button>
          <button style={btn} onClick={signUp}>Sign Up</button>
        </div>
        <p style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
          Local demo only. Data is stored in your browser.
        </p>
      </div>
    );
  }

  if (!profiles.length) {
    return <h2 style={{ textAlign: 'center', marginTop: 80 }}>Loading...</h2>;
  }

  if (index >= profiles.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <h2>No more profiles</h2>
        <button style={btn} onClick={() => setIndex(0)}>Restart</button>
        <button style={btn} onClick={signOut}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: '#666' }}>Logged in as {user.email}</span>
        <button style={smallBtn} onClick={signOut}>Logout</button>
      </div>

      <div style={card}>
        {current.image ? (
          <img src={current.image} alt="profile" style={img} />
        ) : (
          <div style={placeholder}>Upload Photo</div>
        )}

        <input type="file" accept="image/*" onChange={(e) => upload(e, current.id)} style={{ margin: 10 }} />

        <div style={{ padding: 12, textAlign: 'left' }}>
          <h3 style={{ margin: 0 }}>{current.name}, {current.age}</h3>
          <p style={{ margin: '4px 0', color: '#777', fontSize: 12 }}>{current.distance} km away</p>
          <p style={{ margin: 0 }}>{current.bio}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <button style={{ ...btn, background: '#ef4444' }} onClick={handlePass}>Pass</button>
        <button style={{ ...btn, background: '#22c55e' }} onClick={handleLike}>Like</button>
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
        Liked: {Object.keys(likes).length}
      </div>
    </div>
  );
}

const input = {
  width: '100%',
  padding: 10,
  marginTop: 10,
  borderRadius: 8,
  border: '1px solid #ddd'
};

const btn = {
  flex: 1,
  padding: '10px 12px',
  borderRadius: 10,
  border: 'none',
  background: '#111',
  color: 'white',
  cursor: 'pointer'
};

const smallBtn = {
  padding: '6px 10px',
  borderRadius: 8,
  border: '1px solid #ddd',
  background: 'white',
  cursor: 'pointer'
};

const card = {
  background: 'white',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
};

const img = {
  width: '100%',
  height: 320,
  objectFit: 'cover'
};

const placeholder = {
  width: '100%',
  height: 320,
  background: '#ddd',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
