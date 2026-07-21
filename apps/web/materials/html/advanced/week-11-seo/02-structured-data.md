# Structured Data

## What is Structured Data?

Structured data uses a standardized format (Schema.org) to provide information about a page and classify its content. Search engines use it for **rich snippets** and **knowledge graph** integration.

## JSON-LD Format

JSON-LD is Google's recommended format for structured data.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "SoundPro X2 Wireless Headphones",
  "description": "Premium wireless headphones with active noise cancellation",
  "sku": "SP-X2-2026",
  "mpn": "SP2026X2B",
  "brand": {
    "@type": "Brand",
    "name": "SoundPro"
  },
  "image": "https://example.com/images/soundpro-x2.jpg",
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/soundpro-x2",
    "priceCurrency": "USD",
    "price": "299.99",
    "priceValidUntil": "2027-01-01",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "SoundPro Audio"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "1283",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Alex M." },
      "datePublished": "2026-06-15",
      "reviewBody": "Best headphones I've ever owned. The noise cancellation is incredible.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    }
  ]
}
</script>
```

## Common Schema Types

### Article / Blog Post

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 HTML5 Features Every Developer Should Know",
  "description": "Discover the most powerful HTML5 features for modern web development.",
  "author": {
    "@type": "Person",
    "name": "Jane Developer",
    "url": "https://example.com/authors/jane"
  },
  "publisher": {
    "@type": "Organization",
    "name": "WebDev Pro",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2026-07-01T08:00:00+00:00",
  "dateModified": "2026-07-15T14:30:00+00:00",
  "image": "https://example.com/images/html5-features.jpg",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/blog/html5-features"
  },
  "wordCount": "1500",
  "timeRequired": "PT10M"
}
</script>
```

### BreadcrumbList

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://example.com/products"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Headphones",
      "item": "https://example.com/products/headphones"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "SoundPro X2"
    }
  ]
}
</script>
```

### Local Business

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TechFix Computer Repair",
  "description": "Professional computer repair and IT services",
  "image": "https://example.com/images/storefront.jpg",
  "url": "https://techfix.example.com",
  "telephone": "+1-555-0123",
  "email": "support@techfix.example.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street, Suite 100",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94105",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "$$",
  "servesCuisine": "Not applicable"
}
</script>
```

### FAQ Page

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is structured data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Structured data is standardized format for providing information about a page and classifying its content for search engines."
      }
    },
    {
      "@type": "Question",
      "name": "What format does Google recommend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google recommends JSON-LD format for structured data."
      }
    }
  ]
}
</script>
```

### Event

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "WebDev Conference 2026",
  "description": "The premier conference for web developers featuring HTML5, CSS, and JavaScript workshops.",
  "startDate": "2026-09-15T09:00:00-07:00",
  "endDate": "2026-09-17T18:00:00-07:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
  "location": [
    {
      "@type": "Place",
      "name": "Moscone Center",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "747 Howard St",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94103",
        "addressCountry": "US"
      }
    },
    {
      "@type": "VirtualLocation",
      "url": "https://live.webdevconf.com"
    }
  ],
  "image": "https://example.com/images/webdev-conf.jpg",
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/register",
    "price": "599.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/LimitedAvailability",
    "validFrom": "2026-01-01T00:00:00-07:00"
  },
  "performer": {
    "@type": "Person",
    "name": "Kevin Powell"
  },
  "organizer": {
    "@type": "Organization",
    "name": "WebDev Pro",
    "url": "https://webdevpro.com"
  }
}
</script>
```

### Recipe

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Classic Chocolate Chip Cookies",
  "description": "Soft, chewy chocolate chip cookies that everyone loves.",
  "image": "https://example.com/images/cookies.jpg",
  "author": {
    "@type": "Person",
    "name": "Chef Maria"
  },
  "datePublished": "2026-03-15",
  "prepTime": "PT15M",
  "cookTime": "PT12M",
  "totalTime": "PT27M",
  "recipeYield": "24 cookies",
  "recipeCategory": "Dessert",
  "recipeCuisine": "American",
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "180 calories",
    "fatContent": "9g",
    "carbohydrateContent": "24g",
    "proteinContent": "2g"
  },
  "recipeIngredient": [
    "2 1/4 cups all-purpose flour",
    "1 cup butter, softened",
    "3/4 cup granulated sugar",
    "3/4 cup brown sugar",
    "2 large eggs",
    "1 tsp vanilla extract",
    "1 tsp baking soda",
    "1/2 tsp salt",
    "2 cups chocolate chips"
  ],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "text": "Preheat oven to 375°F (190°C)."
    },
    {
      "@type": "HowToStep",
      "text": "Cream together butter and sugars until fluffy."
    },
    {
      "@type": "HowToStep",
      "text": "Beat in eggs and vanilla extract."
    },
    {
      "@type": "HowToStep",
      "text": "Combine flour, baking soda, and salt. Gradually add to butter mixture."
    },
    {
      "@type": "HowToStep",
      "text": "Stir in chocolate chips."
    },
    {
      "@type": "HowToStep",
      "text": "Drop rounded tablespoons onto ungreased baking sheets."
    },
    {
      "@type": "HowToStep",
      "text": "Bake for 9-12 minutes until golden brown."
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "527"
  }
}
</script>
```

## Testing Structured Data

```bash
# Google Rich Results Test
# https://search.google.com/test/rich-results

# Schema.org Validator
# https://validator.schema.org/

# Google Search Console
# Monitor structured data errors in Search Console
```

## Practice

1. Create JSON-LD for a local restaurant with menu, opening hours, location, and reviews.
2. Add Product structured data for an e-commerce product page with variants (size, color), pricing, and stock status.
3. Implement BreadcrumbList structured data for a blog with categories and subcategories.
4. Create Event structured data for a concert series with multiple dates and ticket offers.
