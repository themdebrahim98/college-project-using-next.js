import { NextResponse } from "next/server";

export default function middleware(req) {
    const token = req.cookies.access_key;
    if(req.url != '/login' && token == undefined && token == null && req.url != '/student/studentSignup' ){
        return NextResponse.redirect("/login")
    }

    if(token != undefined && req.url == '/login'){
            return NextResponse.redirect("/") 
    }   
}
