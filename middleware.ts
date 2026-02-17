import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RESTRICTED_AUTHOR = 'restricted-author';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const booksDetailMatch = pathname.match(/^\/books\/(.+)$/);

  if(booksDetailMatch){
    const id = booksDetailMatch[1];


    try{
      const res = await fetch(`${request.nextUrl.origin}/api/books/${id}`);

      if(res.ok){
        const book = await res.json();
        if(book.author === RESTRICTED_AUTHOR){
          return NextResponse.redirect(new URL('/books', request.url));
        }
      }


    } catch(error){
      return NextResponse.next();
    };
    
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/books/:path*'],
};
