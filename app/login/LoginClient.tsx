"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import LoginInfoPanel from "@/components/LoginInfoPanel";
import Notification from "@/components/Notification";

export default function LoginClient() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'info';
    message: string;
  }>({
    show: false,
    type: 'error',
    message: ''
  });

  const { login, error, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 移除注册相关的useEffect

  useEffect(() => {
    if (error) {
      setNotification({
        show: true,
        type: 'error',
        message: error
      });
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setNotification({
        show: true,
        type: 'success',
        message: '登录成功！正在跳转...'
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch {
      // Error is handled in the auth context and useEffect
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const closeNotification = () => {
    setNotification({ ...notification, show: false });
  };

  // 输入框聚焦处理器
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'var(--accent-primary)';
    e.target.style.boxShadow = 'var(--glow-sm)';
    e.target.style.background = 'var(--bg-tertiary)';
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'var(--border-default)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'var(--bg-secondary)';
  };

  // 按钮悬停处理器
  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 184, 217, 0.3)';
    }
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  // 辅助按钮悬停处理器
  const handleSecondaryButtonHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'var(--bg-tertiary)';
    e.currentTarget.style.borderColor = 'var(--accent-primary)';
    e.currentTarget.style.color = 'var(--text-primary)';
  };

  const handleSecondaryButtonLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'var(--bg-secondary)';
    e.currentTarget.style.borderColor = 'var(--border-default)';
    e.currentTarget.style.color = 'var(--text-secondary)';
  };

  // 切换按钮悬停处理器
  const handleToggleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = 'var(--text-secondary)';
  };

  const handleToggleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = 'var(--text-muted)';
  };

  return (
    <>
      {/* 左侧信息面板 */}
      <LoginInfoPanel />
      
      {/* 右侧登录表单 */}
      <div 
        className="w-full lg:w-[480px] flex flex-col justify-center p-12 relative"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="w-full max-w-[360px] mx-auto">
          {/* 表单头部 */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              欢迎回来
            </h2>
            <p 
              className="text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              请登录您的管理员账户
            </p>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 用户名输入 */}
            <div>
              <label 
                htmlFor="username"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                用户名
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg input-icon">
                  👤
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="请输入用户名或邮箱"
                  className="input-field w-full pl-12 pr-4 py-3 rounded-lg text-sm"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div>
              <label 
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                密码
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg input-icon">
                  🔒
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="请输入密码"
                  className="input-field w-full pl-12 pr-12 py-3 rounded-lg text-sm"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 toggle-btn"
                  onMouseEnter={handleToggleHover}
                  onMouseLeave={handleToggleLeave}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    {showPassword ? (
                      <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" />
                    ) : (
                      <>
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* 表单选项 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-[18px] h-[18px] cursor-pointer"
                  style={{ accentColor: 'var(--accent-primary)' }}
                />
                <label 
                  htmlFor="remember"
                  className="text-sm cursor-pointer"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  记住我
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm link-primary"
              >
                忘记密码？
              </Link>
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="btn-ripple btn-primary w-full py-3.5 rounded-lg text-base cursor-pointer relative overflow-hidden"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div 
                    className="w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin"
                  />
                  <span>登录中...</span>
                </div>
              ) : (
                '登录'
              )}
            </button>
          </form>

          {/* 分割线 */}
          <div className="flex items-center gap-4 my-8">
            <div 
              className="flex-1 h-px"
              style={{ background: 'var(--border-light)' }}
            />
            <span 
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              其他登录方式
            </span>
            <div 
              className="flex-1 h-px"
              style={{ background: 'var(--border-light)' }}
            />
          </div>

          {/* 其他登录方式 */}
          <div className="flex gap-4">
            <Link
              href="/login/phone"
              className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm"
              onMouseEnter={handleSecondaryButtonHover}
              onMouseLeave={handleSecondaryButtonLeave}
            >
              <span>📱</span>
              <span>手机号登录</span>
            </Link>
            <Link
              href="/login/sso"
              className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm"
              onMouseEnter={handleSecondaryButtonHover}
              onMouseLeave={handleSecondaryButtonLeave}
            >
              <span>🔑</span>
              <span>SSO登录</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 通知提示 */}
      <Notification
        type={notification.type}
        message={notification.message}
        show={notification.show}
        onClose={closeNotification}
      />
    </>
  );
}