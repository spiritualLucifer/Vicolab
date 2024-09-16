import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/recording',
  '/personal-room',
  '/meeting(.*)'
])

export default clerkMiddleware((auth,req)=>{
  if(protectedRoute(req))auth().protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};