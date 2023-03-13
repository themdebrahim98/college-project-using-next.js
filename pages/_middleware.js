import{NextResponse} from 'next/server'

export default function middleware(req){
    console.log(req);
    const token = req.cookies.access_key;
    if(token == 'undefined'){
        return NextResponse.redirect("/login")
    }else{

         return NextResponse.next('/');
    }
    

}