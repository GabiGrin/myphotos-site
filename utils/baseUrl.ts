export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://app.gphotos.site`
    : "http://localhost:3000";
}
