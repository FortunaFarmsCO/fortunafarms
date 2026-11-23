// One address for the whole site: www.fortunafarms.com -> fortunafarms.com,
// and old Wix page addresses -> the home page (also listed in _redirects).
const OLD = new Set(['/hiring-english', '/hiring', '/home', '/blank', '/about', '/contact', '/gallery', '/copy-of-home']);
export async function onRequest({ request, next }) {
  const u = new URL(request.url);
  const path = u.pathname.replace(/\/+$/, '') || '/';
  let move = false;
  if (u.hostname === 'www.fortunafarms.com') { u.hostname = 'fortunafarms.com'; move = true; }
  if (OLD.has(path.toLowerCase())) { u.pathname = '/'; u.search = ''; move = true; }
  return move ? Response.redirect(u.toString(), 301) : next();
}
