# Meta Tags

## Essential Meta Tags

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO -->
  <title>Premium Wireless Headphones | SoundPro</title>
  <meta name="description"
        content="Experience crystal-clear audio with SoundPro wireless headphones. 30hr battery, noise cancellation, and comfortable fit. Free shipping.">
  <meta name="keywords" content="wireless headphones, noise cancelling, bluetooth audio">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://example.com/products/headphones">
</head>
```

### Title Tag Best Practices

```html
<!-- Good: unique, descriptive, within 60 chars -->
<title>Noise Cancelling Headphones | SoundPro</title>

<!-- Bad: too long, not descriptive -->
<title>Home | Products | About | Blog | Contact | More | SoundPro Company Inc.</title>

<!-- Page-level specificity -->
<title>Product Comparison: AirPods Pro vs SoundPro X2 (2026)</title>
```

### Meta Description

```html
<!-- Good: compelling, includes CTA, 150-160 chars -->
<meta name="description"
      content="Compare the top wireless earbuds of 2026. Read our in-depth review of battery life, sound quality, and noise cancellation. Find your perfect pair.">

<!-- Bad: too short, no value -->
<meta name="description" content="Product page">
```

## Open Graph (Social Media)

```html
<!-- Facebook / LinkedIn -->
<meta property="og:title" content="SoundPro X2 - Best Wireless Headphones">
<meta property="og:description"
      content="30-hour battery life, active noise cancellation, and premium comfort.">
<meta property="og:image" content="https://example.com/images/soundpro-x2.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://example.com/products/soundpro-x2">
<meta property="og:type" content="product">
<meta property="og:site_name" content="SoundPro Audio">
<meta property="og:locale" content="en_US">
```

### Twitter Cards

```html
<!-- Twitter summary card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@soundpro">
<meta name="twitter:creator" content="@soundpro">
<meta name="twitter:title" content="SoundPro X2 - Review">
<meta name="twitter:description"
      content="30-hour battery life, active noise cancellation, premium comfort.">
<meta name="twitter:image" content="https://example.com/images/soundpro-x2-twitter.jpg">
```

## Additional Meta Tags

```html
<!-- Author and copyright -->
<meta name="author" content="SoundPro Team">
<meta name="copyright" content="SoundPro Audio LLC">

<!-- Theme color for mobile browsers -->
<meta name="theme-color" content="#1a73e8">

<!-- iOS-specific -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="SoundPro">

<!-- Prevent content sniffing -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">

<!-- Refresh/redirect (use sparingly, hurts SEO) -->
<meta http-equiv="refresh" content="30;url=https://example.com/new-page">

<!-- Language targeting -->
<link rel="alternate" href="https://example.com/de/produkte"
      hreflang="de" />
<link rel="alternate" href="https://example.com/fr/produits"
      hreflang="fr" />
<link rel="alternate" href="https://example.com/products"
      hreflang="x-default" />
```

## Robots Meta Tags

```html
<!-- Index and follow links (default) -->
<meta name="robots" content="index, follow">

<!-- No index this page -->
<meta name="robots" content="noindex, follow">

<!-- Don't follow links on this page -->
<meta name="robots" content="index, nofollow">

<!-- No archive/cache -->
<meta name="robots" content="noarchive">

<!-- No snippet in search results -->
<meta name="robots" content="nosnippet">

<!-- Max snippet length -->
<meta name="robots" content="max-snippet:150">

<!-- Max image preview -->
<meta name="robots" content="max-image-preview:large">

<!-- Per search engine -->
<meta name="googlebot" content="noindex, nofollow">
<meta name="bingbot" content="noindex, nofollow">
```

## Complete Header Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complete SEO Guide 2026 | WebDev Pro</title>
  <meta name="description"
        content="Learn complete SEO in 2026: meta tags, structured data, sitemaps, core web vitals, and technical SEO best practices.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://webdevpro.com/guides/seo-2026">

  <meta property="og:type" content="article">
  <meta property="og:title" content="Complete SEO Guide 2026">
  <meta property="og:description"
        content="Learn complete SEO in 2026: meta tags, structured data, sitemaps, core web vitals.">
  <meta property="og:url" content="https://webdevpro.com/guides/seo-2026">
  <meta property="og:image"
        content="https://webdevpro.com/images/seo-guide-2026.jpg">
  <meta property="og:site_name" content="WebDev Pro">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:creator" content="@webdevpro">

  <link rel="alternate" href="https://webdevpro.com/guides/seo-2026"
        hreflang="x-default">
  <link rel="alternate" href="https://webdevpro.com/es/guias/seo-2026"
        hreflang="es">
</head>
```

## Practice

1. Write meta tags for a recipe blog post including Open Graph and Twitter Card tags for a "Chocolate Chip Cookies" recipe.
2. Create a blog homepage with proper SEO meta tags and a paginated structure with `rel="prev"` and `rel="next"`.
3. Set up hreflang tags for a multilingual website (English, Spanish, French, German).
4. Write a robots meta tag configuration for: a login page, a search results page, a thank-you page, and a sitemap page.
