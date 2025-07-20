import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <div className="login-page relative">
      {/* 背景装饰 */}
      <div className="grid-bg"></div>
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>
      
      {/* 登录容器 */}
      <div className="flex w-full h-screen relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-white">Loading...</div>
          </div>
        }>
          <LoginClient />
        </Suspense>
      </div>
    </div>
  );
}
