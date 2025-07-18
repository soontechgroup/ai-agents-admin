"use client";

import React from 'react';

interface StatItem {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: string;
  iconType: 'info' | 'success' | 'warning' | 'danger';
}

const statsData: StatItem[] = [
  {
    id: 'users',
    title: '总用户数',
    value: '2,549',
    change: '12.5%',
    changeType: 'up',
    icon: '👥',
    iconType: 'info'
  },
  {
    id: 'visits',
    title: '今日访问',
    value: '1,253',
    change: '8.3%',
    changeType: 'up',
    icon: '📈',
    iconType: 'success'
  },
  {
    id: 'conversations',
    title: 'AI对话数',
    value: '845',
    change: '3.2%',
    changeType: 'down',
    icon: '💬',
    iconType: 'warning'
  },
  {
    id: 'stability',
    title: '系统稳定性',
    value: '98.5%',
    change: '0.5%',
    changeType: 'up',
    icon: '⚡',
    iconType: 'danger'
  }
];

export function StatsGrid() {
  return (
    <div className="stats-grid">
      {statsData.map((stat) => (
        <div key={stat.id} className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.title}</div>
              <div className={`stat-trend ${stat.changeType}`}>
                <span>{stat.changeType === 'up' ? '↑' : '↓'}</span>
                <span>{stat.change}</span>
              </div>
            </div>
            <div className={`stat-icon ${stat.iconType}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}