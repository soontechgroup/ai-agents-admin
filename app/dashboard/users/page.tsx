"use client";

import React from 'react';
import { Breadcrumb } from '@/components/dashboard/Breadcrumb';

export default function UsersPage() {
  const breadcrumbItems = [
    { label: '首页', href: '/dashboard' },
    { label: '用户管理', current: true }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="dashboard-header">
        <h1 className="page-title">用户管理</h1>
        <p className="page-subtitle">管理系统用户和权限</p>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">用户列表</h3>
          <button className="chart-btn">添加用户</button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>用户名</th>
                <th>邮箱</th>
                <th>角色</th>
                <th>状态</th>
                <th>最后登录</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>管理员</td>
                <td>admin@example.com</td>
                <td>超级管理员</td>
                <td>
                  <span className="table-status active">
                    <span className="status-dot"></span>
                    <span>活跃</span>
                  </span>
                </td>
                <td>2025-01-13 10:30</td>
                <td>
                  <button className="chart-btn">编辑</button>
                </td>
              </tr>
              <tr>
                <td>用户1</td>
                <td>user1@example.com</td>
                <td>普通用户</td>
                <td>
                  <span className="table-status active">
                    <span className="status-dot"></span>
                    <span>活跃</span>
                  </span>
                </td>
                <td>2025-01-13 09:45</td>
                <td>
                  <button className="chart-btn">编辑</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}