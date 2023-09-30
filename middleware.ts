import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
export function middleware({nextUrl}: NextRequest) {
    if(!nextUrl.pathname.startsWith('/_next') && nextUrl.pathname !== '/' && !nextUrl.pathname.startsWith('/?') && !nextUrl.pathname.startsWith('/api')){

        return NextResponse.redirect(`http://localhost:3000/?${nextUrl.pathname.slice(1)}`, 301);
         
    }
}