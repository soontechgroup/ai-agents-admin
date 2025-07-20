"use client";

import React, { useState } from 'react';

interface ChartCardProps {
  title: string;
  placeholder: string;
  actions?: string[];
  onActionClick?: (action: string) => void;
}

function ChartCard({ title, placeholder, actions, onActionClick }: ChartCardProps) {
  const [activeAction, setActiveAction] = useState(actions?.[0] || '');

  const handleActionClick = (action: string) => {
    setActiveAction(action);
    onActionClick?.(action);
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        {actions && (
          <div className="chart-actions">
            {actions.map((action) => (
              <button
                key={action}
                className={`chart-btn ${activeAction === action ? 'active' : ''}`}
                onClick={() => handleActionClick(action)}
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="chart-placeholder">
        <span>📊 {placeholder}</span>
      </div>
    </div>
  );
}

export function ChartGrid() {
  const handleTrafficAction = (action: string) => {
    console.log('Traffic chart action:', action);
  };

  const handleUserAction = (action: string) => {
    console.log('User chart action:', action);
  };

  return (
    <div className="chart-grid">
      <ChartCard
        title="流量趋势"
        placeholder="流量趋势图表"
        actions={['周', '月', '年']}
        onActionClick={handleTrafficAction}
      />
      <ChartCard
        title="用户分布"
        placeholder="用户分布饼图"
        actions={['导出']}
        onActionClick={handleUserAction}
      />
    </div>
  );
}