import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { store } from '@/store'
import { pushRef } from './store/reducers/main_slice';
 
export function middleware({nextUrl}: NextRequest) {
    if(!nextUrl.pathname.startsWith('/_next') && nextUrl.pathname !== '/' && !nextUrl.pathname.startsWith('/?') && !nextUrl.pathname.startsWith('/api')){

        return NextResponse.redirect(`http://localhost:3000/?${nextUrl.pathname.slice(1)}`, 301);
         
    }
}