import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

const publicRoutes = ['/login']

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    const token = (await cookies()).get('token')?.value

    if (!isPublicRoute && !token) {
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