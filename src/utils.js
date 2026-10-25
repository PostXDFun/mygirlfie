// Helper to prefix asset paths with Vite's base URL
// In dev: base = '/', in production (GitHub Pages): base = '/mygirlfie/'
export function asset(path) {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
