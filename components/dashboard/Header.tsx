"use client";

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/auth-context';

interface HeaderProps {
  user: User | null;
  onMobileMenuToggle: () => void;
}

export function Header({ user, onMobileMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserInitials = () => {
    if (user?.full_name) {
      return getInitials(user.full_name);
    }
    if (user?.username) {
      return getInitials(user.username);
    }
    return 'U';
  };

  return (
    <header className="admin-header">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={onMobileMenuToggle}
        aria-label="Toggle mobile menu"
      >
        <span>☰</span>
      </button>

      {/* Search */}
      <div className="header-search">
        <form onSubmit={handleSearch}>
          <svg 
            className="search-icon" 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
              clipRule="evenodd" 
            />
          </svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="搜索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right Side */}
      <div className="header-right">
        {/* Notifications */}
        <button className="header-btn" title="通知">
          <span>🔔</span>
          <span className="notification-badge"></span>
        </button>

        {/* Fullscreen */}
        <button 
          className="header-btn" 
          onClick={toggleFullscreen}
          title="全屏"
        >
          <span>⛶</span>
        </button>

        {/* User Menu */}
        <div className="user-menu" onClick={() => setShowUserMenu(!showUserMenu)}>
          <div className="user-avatar">
            {getUserInitials()}
          </div>
          <div className="user-info">
            <span className="user-name">
              {user?.full_name || user?.username || 'User'}
            </span>
            <span className="user-role">管理员</span>
          </div>
          <span style={{ marginLeft: '0.5rem' }}>▼</span>
        </div>

        {/* User Menu Dropdown */}
        {showUserMenu && (
          <div 
            className="user-dropdown"
            style={{
              position: 'absolute',
              top: '100%',
              right: '1.5rem',
              marginTop: '0.5rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px',
              padding: '0.5rem 0',
              minWidth: '160px',
              zIndex: 1000,
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <button
              className="dropdown-item"
              onClick={() => {
                setShowUserMenu(false);
                router.push('/dashboard/profile');
              }}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all var(--duration-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              个人资料
            </button>
            <button
              className="dropdown-item"
              onClick={() => {
                setShowUserMenu(false);
                router.push('/dashboard/settings');
              }}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all var(--duration-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              设置
            </button>
            <div style={{ height: '1px', background: 'var(--border-light)', margin: '0.5rem 0' }} />
            <button
              className="dropdown-item"
              onClick={() => {
                setShowUserMenu(false);
                handleLogout();
              }}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--error)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all var(--duration-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--state-danger-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              退出登录
            </button>
          </div>
        )}
      </div>

      {/* Overlay for mobile dropdown */}
      {showUserMenu && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}