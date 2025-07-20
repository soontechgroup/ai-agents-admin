"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    href: '/dashboard'
  },
  {
    id: 'users',
    label: '用户管理',
    icon: '👥',
    children: [
      { id: 'user-list', label: '用户列表', icon: '•', href: '/dashboard/users' },
      { id: 'roles', label: '角色管理', icon: '•', href: '/dashboard/roles' },
      { id: 'permissions', label: '权限设置', icon: '•', href: '/dashboard/permissions' }
    ]
  },
  {
    id: 'content',
    label: '内容管理',
    icon: '📝',
    children: [
      { id: 'articles', label: '文章管理', icon: '•', href: '/dashboard/articles' },
      { id: 'categories', label: '分类管理', icon: '•', href: '/dashboard/categories' },
      { id: 'comments', label: '评论管理', icon: '•', href: '/dashboard/comments' }
    ]
  },
  {
    id: 'ai',
    label: 'AI助手',
    icon: '🤖',
    children: [
      { id: 'conversations', label: '对话管理', icon: '•', href: '/dashboard/conversations' },
      { id: 'models', label: '模型配置', icon: '•', href: '/dashboard/models' },
      { id: 'training', label: '训练记录', icon: '•', href: '/dashboard/training' }
    ]
  },
  {
    id: 'analytics',
    label: '数据分析',
    icon: '📈',
    href: '/dashboard/analytics'
  },
  {
    id: 'settings',
    label: '系统设置',
    icon: '⚙️',
    children: [
      { id: 'general', label: '基本设置', icon: '•', href: '/dashboard/settings/general' },
      { id: 'security', label: '安全设置', icon: '•', href: '/dashboard/settings/security' },
      { id: 'logs', label: '日志管理', icon: '•', href: '/dashboard/settings/logs' }
    ]
  }
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileToggle: () => void;
}

export function Sidebar({ collapsed, mobileOpen, onToggle, onMobileToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (item: MenuItem): boolean => {
    if (item.href) {
      return pathname === item.href;
    }
    return item.children?.some(child => pathname === child.href) || false;
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item);

    if (hasChildren) {
      return (
        <div key={item.id} className={`nav-item ${isExpanded ? 'expanded' : ''}`}>
          <div 
            className={`nav-link ${active ? 'active' : ''}`}
            onClick={() => toggleExpanded(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
            <span className="nav-arrow">▶</span>
          </div>
          <div className="nav-submenu">
            {item.children.map(child => (
              <Link
                key={child.id}
                href={child.href!}
                className={`nav-link ${pathname === child.href ? 'active' : ''}`}
              >
                <span className="nav-icon">{child.icon}</span>
                <span className="nav-text">{child.label}</span>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={item.id} className="nav-item">
        <Link
          href={item.href!}
          className={`nav-link ${active ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-text">{item.label}</span>
        </Link>
      </div>
    );
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">AI</div>
        <span className="logo-text">智能管理系统</span>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {menuItems.map(renderMenuItem)}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="collapse-btn" onClick={onToggle}>
          <span>{collapsed ? '▶' : '◀'}</span>
        </button>
      </div>
    </aside>
  );
}