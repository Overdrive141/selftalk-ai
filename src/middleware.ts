// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  // Clone the request headers so that we don't modify the original headers object
  const requestHeaders = new Headers(request.headers);
  // console.log("Midleware", requestHeaders);

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Dont remember why I added this
  res.headers.set("x-middleware-cache", "no-cache"); // Disables middleware caching

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(user);

  console.log("Session ", session);

  // if user is signed in and the current path is / redirect the user to /account
  if (user && request.nextUrl.pathname.split("/")[1] !== "app") {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if the hosting platform provides the client's IP address and store it in a variable
  const ip = request.ip || "";

  // Add the client's IP address to the request headers using the 'x-forwarded-for' field
  requestHeaders.set("x-forwarded-for", ip);

  // Return a new request object with the updated headers using NextResponse.next()
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/app/:path*",
    "/login",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
