# Web Intelligence Asinkron: HTTPX (HTTP/2), Parsel & Ethical Scraping

> **Kategori:** Python Backend & Automation | **Level:** Menengah | **Minggu 7:** Web Intelligence Asinkron: HTTPX (HTTP/2), Parsel & Ethical Scraping
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai `httpx.AsyncClient` dengan dukungan protokol HTTP/2 dan connection pooling.
- Menggunakan pustaka `parsel` untuk parsing HTML berbasis CSS selector dan XPath.
- Menerapkan etika web scraping: rate limiting, identifikasi User-Agent, dan kepatuhan `robots.txt`.
- Menangani error scraping: Cloudflare anti-bot blocks, timeouts, dan retry dengan backoff.

---

## Program: Scraper Berita Finansial Asinkron dengan Rotasi Header & Politeness Delay

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

## Konsep Kunci

Membangun sistem intelijen pasar membutuhkan pasokan berita dan data alternatif dari ribuan situs media finansial. Library lama seperti `requests` bersifat synchronous dan memblokir thread, sedangkan `httpx` dirancang untuk era modern asinkron.

### Mengapa HTTPX Menggantikan Requests?
`httpx` menyediakan antarmuka API yang ramah seperti pustaka `requests`, namun memiliki dukungan penuh untuk:
1. **Async/Await**: Dapat dijalankan di dalam event loop FastAPI atau asyncio tanpa memblokir server.
2. **HTTP/2**: Mendukung multiplexing koneksi HTTP/2, memungkinkan pengiriman beberapa request melalui satu koneksi TCP yang sama tanpa koneksi ulang berulang.

### Kecepatan Parsel vs BeautifulSoup
Meskipun BeautifulSoup populer di kalangan pemula, pustaka **Parsel** (yang menjadi mesin inti framework Scrapy) jauh lebih cepat karena didukung oleh engine C `lxml`. Parsel memungkinkan penggunaan CSS selector (`article.feed-item`) dan XPath secara mulus.

### Etika dan Ketahanan Web Intelligence
Scraper profesional tidak boleh membuat server target down (Denial of Service). Kita wajib menambahkan jeda (politeness delay), menyertakan identitas User-Agent yang jelas, dan menangani kegagalan jaringan menggunakan retry logic.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda mengumpulkan kliping koran pagi dari berbagai kios majalah. Scraper synchronous seperti orang yang berjalan kaki bolak-balik membeli koran satu per satu dari kios berbeda. Scraper HTTPX asinkron seperti mengirim 10 kurir sepeda sekaligus yang berangkat bersamaan dan kembali membawa semua koran dalam hitungan menit.

## Eksperimen

- Ubah selector CSS untuk mengekstrak hanya artikel yang memuat kata "Bitcoin".
- Uji coba HTTPX AsyncClient terhadap endpoint public `https://httpbin.org/get` dengan custom headers.
- Gunakan XPath selector `item.xpath(".//h2/a/text()").get()` sebagai alternatif dari CSS selector.

---

## Tantangan

Buat scraper asinkron yang membaca RSS feed XML dari portal berita finansial dan mengembalikan daftar `NewsArticle` terurut berdasarkan waktu publikasi.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Default Parameter Bersifat Mutable (List/Dict)
- **Gejala / Masalah:** Nilai default yang diubah pada panggilan pertama akan terbawa ke panggilan fungsi berikutnya.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `None` sebagai nilai default: `def fn(items=None): if items is None: items = []`.

### 2. Salah Paham Scope Variabel Global di dalam Fungsi
- **Gejala / Masalah:** Melempar error `UnboundLocalError: local variable referenced before assignment`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan kata kunci `global` secara hati-hati atau lebih baik oper nilai sebagai parameter dan return value.

### 3. Menangkap Exception Terlalu Luas (`except:`)
- **Gejala / Masalah:** Menyembunyikan error syntax, `KeyboardInterrupt`, atau bug kritis sistem.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu sebutkan exception spesifik: `except ValueError as err:`.

---

## Ringkasan

Kamu telah menguasai async HTTPX, HTTP/2, dan HTML extraction dengan Parsel. Level 2 selesai! Di Level 3 kita mempelajari Background Workers, Pytest, dan Proyek Capstone.
