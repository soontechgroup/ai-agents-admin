import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginClient />
        </Suspense>
      </div>
    </div>
  );
}
