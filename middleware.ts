import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
export function middleware({nextUrl}: NextRequest) {
    if(!nextUrl.pathname.startsWith('/_next') && nextUrl.pathname !== '/' && !nextUrl.pathname.startsWith('/?') && !nextUrl.pathname.startsWith('/api') && !nextUrl.pathname.startsWith('/404')){
        return NextResponse.redirect(`${process.env.BASE_URL}?${nextUrl.pathname.slice(1) + nextUrl.search}`, 301);
         
    }
}