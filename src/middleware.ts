import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

const isProtectedRoute = createRouteMatcher(["/create", "/edit"]);

export const middleware = clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
