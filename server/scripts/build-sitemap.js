const fs = require('fs');
const sm = require('sitemap');

const sitemap = sm.createSitemap({
  hostname: 'https://www.coinietrade.com/',
  cacheTime: 10 * 60 * 1000, // 10 mitutes
  urls: [
    { url: '/' },
    { url: '/terms/', changefreq: 'monthly', priority: 0.5 },
    { url: '/privacy/', changefreq: 'monthly', priority: 0.5 },
  ],
});

try {
  fs.writeFileSync(
    `${__dirname}/../../client/public/sitemap.xml`,
    sitemap.toString(),
  );
  console.log('Sitemap created successfully.');
} catch (error) {
  throw error;
}
