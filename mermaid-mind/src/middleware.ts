import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const isAuthenticated = await getToken({ req });

  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL("/api/auth/signin/google", req.nextUrl),
    );
  }
}

export const config = {
  matcher: ["/projects"],
};
