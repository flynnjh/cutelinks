import { NextResponse } from "next/server";

export async function middleware(req) {

  // this is sinful, i know. may god forgive me.
  if (req.nextUrl.pathname.startsWith('/create') || req.nextUrl.pathname.startsWith('/delete') || req.nextUrl.pathname.startsWith('/api') || req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.pathname.startsWith('/favicon.ico')) {
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();
  const data = await (
    await fetch(`${req.nextUrl.origin}/api/${slug}`)
  ).json();

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

}