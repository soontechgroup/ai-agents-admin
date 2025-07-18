"use client";

import React from 'react';
import { Breadcrumb } from '@/components/dashboard/Breadcrumb';
import { ChartGrid } from '@/components/dashboard/ChartGrid';
import { StatsGrid } from '@/components/dashboard/StatsGrid';

export default function AnalyticsPage() {
  const breadcrumbItems = [
    { label: '首页', href: '/dashboard' },
    { label: '数据分析', current: true }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="dashboard-header">
        <h1 className="page-title">数据分析</h1>
        <p className="page-subtitle">查看详细的数据统计和分析报告</p>
      </div>

      <StatsGrid />
      <ChartGrid />
      
      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">用户行为分析</h3>
            <div className="chart-actions">
              <button className="chart-btn active">今日</button>
              <button className="chart-btn">本周</button>
              <button className="chart-btn">本月</button>
            </div>
          </div>
          <div className="chart-placeholder">
            <span>📊 用户行为分析图表</span>
          </div>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">系统性能监控</h3>
            <div className="chart-actions">
              <button className="chart-btn">实时监控</button>
            </div>
          </div>
          <div className="chart-placeholder">
            <span>📈 系统性能监控图表</span>
          </div>
        </div>
      </div>
    </>
  );
}