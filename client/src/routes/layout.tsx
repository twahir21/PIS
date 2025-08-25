import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

// 1. Auth control
export const onGet: RequestHandler = async ({ cacheControl, url, cookie, redirect }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });

  const isPrivate = url.pathname.startsWith("/admin");

  if (isPrivate){
    if(!cookie.has("jwtToken")){
      throw redirect(302, "/auth")
    }
  }

};


// 2. Rate limiting
// const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
// const LIMIT = 10; // max requests
// const WINDOW = 60 * 1000; // 1 minute

// export const onRequest: RequestHandler = async ({ request, error }) => {
//   const ip = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || 'unknown';

//   const now = Date.now();
//   const record = rateLimitMap.get(ip) || { count: 0, timestamp: now };

//   // reset window if expired
//   if (now - record.timestamp > WINDOW) {
//     record.count = 0;
//     record.timestamp = now;
//   }

//   record.count++;
//   rateLimitMap.set(ip, record);

//   if (record.count > LIMIT) {
//     throw error(429, 'Rate limit exceeded, slow down');
//   }
// };


export default component$(() => {
  return <Slot />;
});
