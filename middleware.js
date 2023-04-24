import { NextResponse } from "next/server";

export default function middleware(req) {
 
    let token = req.cookies.get('access_key')?.value
    //====================for token expire time will be added later ========================================
    // const tokenPayload = token.split('.')[1];
    // const decodedTokenPayload = Buffer.from(tokenPayload, 'base64').toString('utf-8');
    // const { exp } = JSON.parse(decodedTokenPayload);
    // const currentTime = Math.floor(Date.now() / 1000);
    // if (currentTime < exp) {
    //     console.log(exp)
    // }
    //===========================================================================
    const path = req.nextUrl.pathname;
    const arr = ["/student", "/notices", "/teacher","/subject", "/student/studentSignup" ]
    const isLogin = path.startsWith
    if((path == '/' || path.startsWith('/student') || path.startsWith('/notices') || path.startsWith('/teacher') ||path.startsWith('/subject') )&& path!='/student/studentSignup' && token === undefined){
       return NextResponse.redirect(new URL('/login', req.url))
    }
    if(token != undefined && path == '/login'){
        return NextResponse.redirect(new URL('/', req.url))
    } 
    
     
}
