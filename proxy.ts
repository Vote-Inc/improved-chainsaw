import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ['/login']

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64url').toString()
    );
    return typeof payload.exp === 'number' && payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  const token = req.cookies.get('token')?.value
  const isAuthenticated = !!token && !isTokenExpired(token)

  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (
    isPublicRoute &&
    !req.nextUrl.pathname.startsWith('/')
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
