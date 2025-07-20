"use client";

import React from 'react';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
  status: 'active' | 'pending' | 'inactive';
  statusText: string;
  details: string;
}

const activityData: ActivityItem[] = [
  {
    id: '1',
    user: '张三',
    action: '登录系统',
    time: '2025-01-13 09:15',
    status: 'active',
    statusText: '成功',
    details: 'IP: 192.168.1.100'
  },
  {
    id: '2',
    user: '李四',
    action: '创建文章',
    time: '2025-01-13 09:12',
    status: 'active',
    statusText: '成功',
    details: '文章ID: #1234'
  },
  {
    id: '3',
    user: '王五',
    action: '修改配置',
    time: '2025-01-13 09:08',
    status: 'pending',
    statusText: '待审核',
    details: '系统设置'
  },
  {
    id: '4',
    user: '赵六',
    action: '删除用户',
    time: '2025-01-13 09:05',
    status: 'inactive',
    statusText: '失败',
    details: '权限不足'
  }
];

export function ActivityTable() {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">最近活动</h3>
        <button className="chart-btn">查看全部</button>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>用户</th>
              <th>操作</th>
              <th>时间</th>
              <th>状态</th>
              <th>详情</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((item) => (
              <tr key={item.id}>
                <td>{item.user}</td>
                <td>{item.action}</td>
                <td>{item.time}</td>
                <td>
                  <span className={`table-status ${item.status}`}>
                    <span className="status-dot"></span>
                    <span>{item.statusText}</span>
                  </span>
                </td>
                <td>{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}