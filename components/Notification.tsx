"use client";

import { useEffect, useState } from 'react';

interface NotificationProps {
  type: 'success' | 'error' | 'info';
  message: string;
  show: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Notification({ 
  type, 
  message, 
  show, 
  onClose, 
  autoClose = true, 
  duration = 3000 
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      if (autoClose) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClose, 300); // 等待动画结束
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [show, autoClose, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '❌';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      case 'info':
        return 'border-blue-500';
      default:
        return 'border-red-500';
    }
  };

  if (!show) return null;

  return (
    <div 
      className={`
        fixed top-8 right-8 z-50
        flex items-center gap-3
        px-6 py-4
        border ${getTypeClass()}
        rounded-lg shadow-xl
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-x-0' : 'translate-x-full'}
      `}
      style={{
        background: 'var(--bg-tertiary)',
        borderColor: type === 'error' ? 'var(--error)' : 
                    type === 'success' ? 'var(--success)' : 'var(--info)',
      }}
    >
      <span className="text-xl">{getIcon()}</span>
      <span 
        className="text-sm font-medium"
        style={{ color: 'var(--text-primary)' }}
      >
        {message}
      </span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 text-gray-400 hover:text-gray-200 transition-colors"
      >
        ×
      </button>
    </div>
  );
} 