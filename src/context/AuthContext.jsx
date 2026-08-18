import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const SIMPLE_DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="%236366f1"/><circle cx="50" cy="38" r="18" fill="%23ffffff"/><path d="M22 82c0-15 12-26 28-26s28 11 28 26" fill="%23ffffff"/></svg>`;

const DEFAULT_USER = {
  id: 'usr-101',
  name: 'Ananya Deshmukh',
  email: 'ananya@oneminutelearn.com',
  role: 'user',
  avatar: SIMPLE_DEFAULT_AVATAR,
  bio: 'Neuroscientist & micro-learning enthusiast passionate about accessible knowledge.',
  readingHistory: [],
  joinedDate: '2026-01-15'
};

const DEFAULT_ADMIN = {
  id: 'adm-001',
  name: 'Rohan Verma (Admin)',
  email: 'admin@oneminutelearn.com',
  role: 'admin',
  avatar: SIMPLE_DEFAULT_AVATAR,
  bio: 'Lead Platform Moderator & Systems Administrator.',
  readingHistory: [],
  joinedDate: '2025-11-01'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('oml_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('oml_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('oml_user');
    }
  }, [user]);

  const login = (email, password) => {
    if (email.toLowerCase().includes('admin')) {
      setUser(DEFAULT_ADMIN);
      return DEFAULT_ADMIN;
    }
    const name = email.split('@')[0];
    const newUser = {
      id: 'usr-' + Date.now(),
      name: name,
      email,
      role: 'user',
      avatar: SIMPLE_DEFAULT_AVATAR,
      bio: 'Enthusiastic micro-learner.',
      readingHistory: [],
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    return newUser;
  };

  const loginAsDemoUser = () => {
    setUser(DEFAULT_USER);
    return DEFAULT_USER;
  };

  const loginAsAdmin = () => {
    setUser(DEFAULT_ADMIN);
    return DEFAULT_ADMIN;
  };

  const register = (name, email, password) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role: 'user',
      avatar: SIMPLE_DEFAULT_AVATAR,
      bio: 'Enthusiastic micro-learner.',
      readingHistory: [],
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const recordReadArticle = (articleId, articleTitle) => {
    if (!user) return;
    const updatedHistory = [
      { articleId, title: articleTitle, readAt: new Date().toISOString() },
      ...(user.readingHistory || []).filter(h => h.articleId !== articleId)
    ];

    setUser(prev => prev ? { ...prev, readingHistory: updatedHistory } : prev);
  };

  const updateProfile = (updatedFields) => {
    if (!user) return;
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user ? user.role : 'guest',
        login,
        loginAsDemoUser,
        loginAsAdmin,
        register,
        logout,
        recordReadArticle,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

