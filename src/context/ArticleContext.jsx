import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ARTICLES, INITIAL_CATEGORIES } from '../data/mockArticles';

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('oml_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('oml_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [drafts, setDrafts] = useState(() => {
    const saved = localStorage.getItem('oml_drafts');
    return saved ? JSON.parse(saved) : [
      {
        id: 'draft-1',
        title: 'Understanding Modern CSS Container Queries',
        category: 'Programming',
        tags: ['CSS', 'Responsive', 'WebDev'],
        content: 'Container queries allow you to style elements based on the size of their parent container rather than the viewport. This makes component-driven responsive design far more modular...',
        updatedAt: '2026-08-04T16:00:00Z'
      }
    ];
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('oml_bookmarks');
    return saved ? JSON.parse(saved) : ['art-1', 'art-3'];
  });

  const [likedArticles, setLikedArticles] = useState(() => {
    const saved = localStorage.getItem('oml_liked_articles');
    return saved ? JSON.parse(saved) : ['art-1'];
  });

  useEffect(() => {
    localStorage.setItem('oml_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('oml_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('oml_drafts', JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    localStorage.setItem('oml_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('oml_liked_articles', JSON.stringify(likedArticles));
  }, [likedArticles]);

  // Create & Publish
  const publishArticle = (articleData, author) => {
    const wordCount = articleData.content.trim().split(/\s+/).length;
    const newArticle = {
      id: 'art-' + Date.now(),
      title: articleData.title,
      slug: articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary: articleData.summary || articleData.content.substring(0, 120) + '...',
      content: articleData.content,
      category: articleData.category || 'General Knowledge',
      readTime: '1 min read',
      wordCount,
      coverImage: articleData.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      author: {
        id: author.id,
        name: author.name,
        role: author.role === 'admin' ? 'Community Admin' : 'Micro Learner',
        avatar: author.avatar
      },
      publishedAt: new Date().toISOString(),
      likes: 0,
      bookmarksCount: 0,
      tags: articleData.tags || ['MicroLearning'],
      featured: false,
      trending: false,
      comments: []
    };

    setArticles(prev => [newArticle, ...prev]);
    return newArticle;
  };

  // Draft handling
  const saveDraft = (draftData) => {
    const existingIndex = drafts.findIndex(d => d.id === draftData.id);
    const updatedDraft = {
      id: draftData.id || 'draft-' + Date.now(),
      title: draftData.title || 'Untitled Draft',
      category: draftData.category || 'General Knowledge',
      tags: draftData.tags || [],
      content: draftData.content || '',
      coverImage: draftData.coverImage || '',
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      setDrafts(prev => {
        const copy = [...prev];
        copy[existingIndex] = updatedDraft;
        return copy;
      });
    } else {
      setDrafts(prev => [updatedDraft, ...prev]);
    }
    return updatedDraft;
  };

  const deleteDraft = (draftId) => {
    setDrafts(prev => prev.filter(d => d.id !== draftId));
  };

  // Delete Article
  const deleteArticle = (articleId) => {
    setArticles(prev => prev.filter(a => a.id !== articleId));
  };

  // Update Article
  const updateArticle = (articleId, updatedFields) => {
    setArticles(prev =>
      prev.map(a => (a.id === articleId ? { ...a, ...updatedFields } : a))
    );
  };

  // Like Toggle
  const toggleLike = (articleId) => {
    const isLiked = likedArticles.includes(articleId);
    if (isLiked) {
      setLikedArticles(prev => prev.filter(id => id !== articleId));
      setArticles(prev =>
        prev.map(a => (a.id === articleId ? { ...a, likes: Math.max(0, a.likes - 1) } : a))
      );
    } else {
      setLikedArticles(prev => [...prev, articleId]);
      setArticles(prev =>
        prev.map(a => (a.id === articleId ? { ...a, likes: a.likes + 1 } : a))
      );
    }
    return !isLiked;
  };

  // Bookmark Toggle
  const toggleBookmark = (articleId) => {
    const isBookmarked = bookmarks.includes(articleId);
    if (isBookmarked) {
      setBookmarks(prev => prev.filter(id => id !== articleId));
      setArticles(prev =>
        prev.map(a => (a.id === articleId ? { ...a, bookmarksCount: Math.max(0, a.bookmarksCount - 1) } : a))
      );
    } else {
      setBookmarks(prev => [...prev, articleId]);
      setArticles(prev =>
        prev.map(a => (a.id === articleId ? { ...a, bookmarksCount: a.bookmarksCount + 1 } : a))
      );
    }
    return !isBookmarked;
  };

  // Add Comment
  const addComment = (articleId, commentText, user) => {
    const newComment = {
      id: 'c-' + Date.now(),
      userName: user.name,
      userAvatar: user.avatar,
      content: commentText,
      createdAt: new Date().toISOString()
    };

    setArticles(prev =>
      prev.map(a => {
        if (a.id === articleId) {
          return {
            ...a,
            comments: [newComment, ...(a.comments || [])]
          };
        }
        return a;
      })
    );
    return newComment;
  };

  // Delete Comment (Admin or author)
  const deleteComment = (articleId, commentId) => {
    setArticles(prev =>
      prev.map(a => {
        if (a.id === articleId) {
          return {
            ...a,
            comments: (a.comments || []).filter(c => c.id !== commentId)
          };
        }
        return a;
      })
    );
  };

  // Random Article Picker
  const getRandomArticle = () => {
    if (articles.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * articles.length);
    return articles[randomIndex];
  };

  // Admin Category Management
  const addCategory = (name, icon = 'BookOpen', color = 'from-brand-500 to-indigo-600') => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = { id, name, icon, color, count: 0 };
    setCategories(prev => [...prev, newCat]);
  };

  const deleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        categories,
        drafts,
        bookmarks,
        likedArticles,
        publishArticle,
        saveDraft,
        deleteDraft,
        deleteArticle,
        updateArticle,
        toggleLike,
        toggleBookmark,
        addComment,
        deleteComment,
        getRandomArticle,
        addCategory,
        deleteCategory
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) throw new Error('useArticles must be used within ArticleProvider');
  return context;
};
