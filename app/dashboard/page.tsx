"use client";

import React from 'react';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { ChartGrid } from '@/components/dashboard/ChartGrid';
import { ActivityTable } from '@/components/dashboard/ActivityTable';
import { Breadcrumb } from '@/components/dashboard/Breadcrumb';

export default function DashboardPage() {
  const breadcrumbItems = [
    { label: '首页', href: '/dashboard' },
    { label: 'Dashboard', current: true }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">欢迎回来，这是您的系统概览</p>
      </div>

      <StatsGrid />
      <ChartGrid />
      <ActivityTable />
    </>
  );
}