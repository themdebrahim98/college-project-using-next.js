import { NextResponse } from "next/server";

export default function middleware(req) {
 
    let token = req.cookies.get('access_key')?.value
    const path = req.nextUrl.pathname;
    if((path == '/' || path.startsWith('/student') || path.startsWith('/notices') || path.startsWith('/teacher') ||path.startsWith('/subject') )&& path!='/student/studentSignup' && token === undefined){
       return NextResponse.redirect(new URL('/login', req.url))
    }
    if(token != undefined && path == '/login'){
        return NextResponse.redirect(new URL('/', req.url))
    } 
    
     
}
