# Async Web Intelligence: HTTPX (HTTP/2), Parsel & Ethical Scraping

> **Kategori:** Python Backend & Automation | **Level:** Intermediate | **Minggu 7:** Async Web Intelligence: HTTPX (HTTP/2), Parsel & Ethical Scraping

## Learning Objectives

- Master `httpx.AsyncClient` with HTTP/2 protocol support and connection pooling.
- Use the `parsel` library for high-speed CSS and XPath HTML extraction.
- Apply ethical web scraping policies: rate limiting, User-Agent declarations, and `robots.txt` compliance.
- Handle scraping challenges: anti-bot detections, timeouts, and exponential backoff.

---

## Program: Async Financial News Scraper with Header Rotation & Politeness Delays

```python
import asyncio
import httpx
from parsel import Selector
from typing import NamedTuple

class NewsArticle(NamedTuple):
    headline: str
    link: str
    published: str

# HTML Dummy untuk demonstrasi ekstraksi selector tanpa scraping situs nyata
SAMPLE_FINANCIAL_HTML = """
<html>
    <body>
        <div class="news-feed">
            <article class="feed-item">
                <h2 class="title"><a href="/news/crypto-soars">Bitcoin Tembus Rekor Baru di Awal Tahun 2026</a></h2>
                <time class="date">10 Menit Lalu</time>
            </article>
            <article class="feed-item">
                <h2 class="title"><a href="/news/fed-interest">The Fed Pertahankan Suku Bunga Acuan Stabil</a></h2>
                <time class="date">1 Jam Lalu</time>
            </article>
            <article class="feed-item">
                <h2 class="title"><a href="/news/tech-rally">Saham Sektor Semikonduktor Kembali Menguat Tajam</a></h2>
                <time class="date">2 Jam Lalu</time>
            </article>
        </div>
    </body>
</html>
"""

def parse_financial_news(html_content: str) -> list[NewsArticle]:
    # Parsel menggunakan CSS selector & XPath berkinerja tinggi
    selector = Selector(text=html_content)
    articles: list[NewsArticle] = []

    for item in selector.css("article.feed-item"):
        headline = item.css("h2.title a::text").get(default="").strip()
        link = item.css("h2.title a::attr(href)").get(default="")
        published = item.css("time.date::text").get(default="").strip()

        if headline and link:
            articles.append(NewsArticle(headline, link, published))

    return articles

async def fetch_news_feed_simulation():
    # Menggunakan HTTPX AsyncClient dengan dukungan HTTP/2 dan timeout ketat
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) TryngoIntelligenceBot/1.0",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
    }

    print("[CRAWLER] Mensimulasikan ekstraksi feed intelijen finansial...")
    # Simulasi latency client
    await asyncio.sleep(0.2)
    
    extracted = parse_financial_news(SAMPLE_FINANCIAL_HTML)
    print(f"[CRAWLER SUCCESS] Berhasil mengekstrak {len(extracted)} artikel berita:")
    for a in extracted:
        print(f" -> [{a.published}] {a.headline} ({a.link})")

if __name__ == "__main__":
    asyncio.run(fetch_news_feed_simulation())
```

---

## Key Concepts

Constructing market intelligence engines requires harvesting alternative data and breaking news feeds from thousands of financial publications. Legacy libraries like `requests` block threads synchronously, whereas `httpx` is architected for asynchronous backends.

### HTTPX vs Legacy Requests
`httpx` mirrors the intuitive ergonomics of `requests` while delivering critical modern capabilities:
1. **Async/Await Native**: Runs inside FastAPI or asyncio event loops without blocking main worker threads.
2. **HTTP/2 Multiplexing**: Reuses a single persistent TCP socket for concurrent requests, eliminating handshaking overhead.

### Parsel vs BeautifulSoup Performance
While BeautifulSoup is common among learners, **Parsel** (the parsing engine powering Scrapy) processes HTML orders of magnitude faster through underlying C-bindings (`lxml`). Parsel seamlessly pairs CSS selectors (`article.feed-item`) with expressive XPath queries.

### Ethical Web Intelligence Harvesting
Professional bots must never overwhelm publisher servers. Respecting `robots.txt`, declaring transparent User-Agent headers, and enforcing politeness delays safeguard system integrity.


---

---

## Beginner Friendly Explanation

Imagine clipping morning headlines from distributed newsstands. A synchronous scraper behaves like a pedestrian buying newspapers one by one across town. An async HTTPX scraper deploys a fleet of bicycle couriers departing simultaneously and returning with all clippings in minutes.

## Experiments

- Modify the CSS selector to isolate only articles containing the keyword "Bitcoin".
- Test HTTPX AsyncClient against public endpoints like `https://httpbin.org/get` with custom headers.
- Apply an XPath selector `item.xpath(".//h2/a/text()").get()` as an alternative to CSS queries.

---

## Challenge

Build an async scraper ingesting RSS XML feeds from financial portals, yielding a `NewsArticle` collection sorted chronologically.

---

## Summary

You have mastered async HTTPX, HTTP/2, and Parsel extraction. Level 2 complete! Level 3 takes us into Background Workers, Pytest, and our Capstone Project.
