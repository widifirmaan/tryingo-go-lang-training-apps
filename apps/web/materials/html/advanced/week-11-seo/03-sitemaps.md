# Sitemaps and robots.txt

## XML Sitemaps

An XML sitemap lists all important URLs on your site for search engines.

### Basic Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-07-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2026-06-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/products</loc>
    <lastmod>2026-07-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://example.com/products/headphones</loc>
    <lastmod>2026-07-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://example.com/blog</loc>
    <lastmod>2026-07-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/contact</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### Image Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://example.com/products/headphones</loc>
    <image:image>
      <image:loc>https://example.com/images/soundpro-x2.jpg</image:loc>
      <image:caption>SoundPro X2 Wireless Headphones - Black</image:caption>
      <image:title>SoundPro X2 Black Edition</image:title>
      <image:geo_location>San Francisco, California</image:geo_location>
      <image:license>https://example.com/license</image:license>
    </image:image>
    <image:image>
      <image:loc>https://example.com/images/soundpro-x2-white.jpg</image:loc>
      <image:caption>SoundPro X2 Wireless Headphones - White</image:caption>
    </image:image>
  </url>
</urlset>
```

### Video Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://example.com/videos/soundpro-review</loc>
    <video:video>
      <video:thumbnail_loc>https://example.com/thumbs/review.jpg</video:thumbnail_loc>
      <video:title>SoundPro X2 Review</video:title>
      <video:description>In-depth review of SoundPro X2 headphones</video:description>
      <video:content_loc>https://example.com/videos/review.mp4</video:content_loc>
      <video:duration>600</video:duration>
      <video:expiration_date>2027-07-20</video:expiration_date>
      <video:rating>4.8</video:rating>
      <video:view_count>15000</video:view_count>
      <video:publication_date>2026-07-01</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:restriction relationship="allow">US CA GB</video:restriction>
      <video:price currency="USD">2.99</video:price>
      <video:requires_subscription>no</video:requires_subscription>
      <video:uploader>
        <video:name>TechReview Channel</video:name>
        <video:url>https://example.com/channel/techreview</video:url>
      </video:uploader>
    </video:video>
  </url>
</urlset>
```

### Sitemap Index

For large sites (over 50,000 URLs or 50MB):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemaps/pages.xml</loc>
    <lastmod>2026-07-20</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemaps/products.xml</loc>
    <lastmod>2026-07-19</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemaps/blog.xml</loc>
    <lastmod>2026-07-20</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemaps/images.xml</loc>
    <lastmod>2026-07-18</lastmod>
  </sitemap>
</sitemapindex>
```

## robots.txt

Controls which parts of your site search engines can crawl.

```txt
# robots.txt for example.com
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /tmp/
Disallow: /*.pdf$
Disallow: /search?
Disallow: /cart
Disallow: /checkout

# Crawl delay for polite crawling
Crawl-delay: 10

# Sitemap location
Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemaps/images.xml
Sitemap: https://example.com/sitemaps/video.xml

# Specific search engines
User-agent: Googlebot
Disallow: /admin/
Allow: /admin/public/

User-agent: Googlebot-Image
Allow: /images/
Allow: /*.jpg$
Allow: /*.png$

User-agent: Googlebot-Video
Allow: /videos/
Allow: /*.mp4$

User-agent: Bingbot
Disallow: /admin/
Disallow: /private/

User-agent: Twitterbot
Allow: /images/
Allow: /og-images/

User-agent: ia_archiver  # Alexa
Disallow: /
```

### robots.txt Tester

```html
<!-- Check: https://support.google.com/webmasters/answer/6062598 -->
```

## Common robots.txt Patterns

```txt
# Block all bots from entire site
User-agent: *
Disallow: /

# Block specific directory from all bots
User-agent: *
Disallow: /private/

# Allow one bot, block others
User-agent: Googlebot
Allow: /

User-agent: *
Disallow: /

# Block specific file types
User-agent: *
Disallow: /*.pdf$
Disallow: /*.doc$
Disallow: /*.zip$

# Allow all bots (default)
User-agent: *
Disallow:
```

## Submitting Sitemaps

### Google Search Console

```html
<!-- Submit via Search Console UI or API -->
<!-- https://search.google.com/search-console -->
```

### robots.txt Reference in HTML

```html
<head>
  <link rel="sitemap" type="application/xml"
        href="https://example.com/sitemap.xml">
</head>
```

### Dynamic Sitemap Generation (Node.js)

```js
const express = require('express');
const app = express();

app.get('/sitemap.xml', async (req, res) => {
  const pages = await getPagesFromDatabase();
  const products = await getProductsFromDatabase();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach(page => {
    xml += `
  <url>
    <loc>https://example.com${page.slug}</loc>
    <lastmod>${page.updatedAt}</lastmod>
    <changefreq>${page.frequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  products.forEach(product => {
    xml += `
  <url>
    <loc>https://example.com/products/${product.slug}</loc>
    <lastmod>${product.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += '\n</urlset>';

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});
```

## Practice

1. Create a sitemap for a 50-page website (pages, products, blog posts, categories).
2. Write a robots.txt that blocks /admin/, /api/, /search, and /user/profile but allows everything else.
3. Create a sitemap index with separate sitemaps for pages (500 URLs), products (2000 URLs), and images.
4. Implement a dynamic sitemap generator in your preferred backend language.
