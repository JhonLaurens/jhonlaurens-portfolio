export default function handler(req, res) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'https://jhonlaurens.vercel.app';

  const robots = `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /backend/
Disallow: /config/
Disallow: /deployment/
Disallow: /scripts/
Disallow: /.git/
Disallow: /node_modules/

# Allow important files
Allow: /assets/
Allow: /public/
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.webp
Allow: /*.ico

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.status(200).send(robots);
}