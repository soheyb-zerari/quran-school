import { NextRequest, NextResponse } from "next/server";
import auth from "./app/lib/auth";

export async function middleware(request: NextRequest) {
  const user = await auth.getUser();
  if (!auth.user) {
    request.cookies.delete("appwrite-session");
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  }
  console.log("middleware running...");
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
