import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'
  
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}