import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'usr-101',
  name: 'Ananya Deshmukh',
  email: 'ananya@oneminutelearn.com',
  role: 'user', // 'guest', 'user', 'admin'
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  bio: 'Neuroscientist & micro-learning enthusiast passionate about accessible knowledge.',
  streak: 5,
  lastReadDate: '2026-08-04',
  readingHistory: [],
  joinedDate: '2026-01-15'
};

const DEFAULT_ADMIN = {
  id: 'adm-001',
  name: 'Rohan Verma (Admin)',
  email: 'admin@oneminutelearn.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  bio: 'Lead Platform Moderator & Systems Administrator.',
  streak: 14,
  lastReadDate: '2026-08-05',
  readingHistory: [],
  joinedDate: '2025-11-01'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('oml_user');
    return saved ? JSON.parse(saved) : null; // Guest mode by default on 1st visit
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
    const newUser = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      bio: 'New One Minute Learner',
      streak: 1,
      lastReadDate: new Date().toISOString().split('T')[0],
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
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: 'Enthusiastic micro-learner.',
      streak: 1,
      lastReadDate: new Date().toISOString().split('T')[0],
      readingHistory: [],
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null); // Switch to Guest mode
  };

  // Streak & Reading History tracker
  const recordReadArticle = (articleId, articleTitle) => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    
    let newStreak = user.streak || 0;
    if (user.lastReadDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (user.lastReadDate === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

    const updatedHistory = [
      { articleId, title: articleTitle, readAt: new Date().toISOString() },
      ...(user.readingHistory || []).filter(h => h.articleId !== articleId)
    ];

    const updatedUser = {
      ...user,
      streak: newStreak,
      lastReadDate: today,
      readingHistory: updatedHistory
    };

    setUser(updatedUser);
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
