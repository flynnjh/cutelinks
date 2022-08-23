import { NextResponse } from "next/server";

export async function middleware(req) {
  const routes = ["/create", "/delete", "/api", "/_next", "/favicon.ico"];

  for (var i in routes) {
    if (req.nextUrl.pathname.startsWith(routes[i])) {
      return;
    }
  }

  const slug = req.nextUrl.pathname.split("/").pop();
  const data = await (await fetch(`${req.nextUrl.origin}/api/${slug}`)).json();

  if (data.url) {
    return NextResponse.redirect(data.url);
  }
}
