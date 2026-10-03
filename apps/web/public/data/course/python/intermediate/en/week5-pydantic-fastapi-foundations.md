# FastAPI & Pydantic v2: High-Performance Validation & Async REST APIs

> **Kategori:** Python Backend & Automation | **Level:** Intermediate | **Minggu 5:** FastAPI & Pydantic v2: High-Performance Validation & Async REST APIs
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Pydantic v2 advantages powered by the Rust core (`pydantic-core`) for 5-10x faster parsing.
- Use `Field`, `Annotated`, and `@field_validator` for payload validation and sanitization.
- Build asynchronous non-blocking REST APIs with FastAPI.
- Generate interactive OpenAPI documentation (Swagger & Redoc) automatically.

---

## Program: Financial Market Sentiment Ingestion API with Pydantic v2 Validation

```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field, field_validator
from decimal import Decimal
from datetime import datetime, timezone
from typing import Annotated

app = FastAPI(
    title="Financial Market Sentiment API",
    version="1.0.0",
    description="Engine ingesti dan validasi sentimen pasar real-time"
)

# Pydantic v2 Model (Didukung oleh Rust Core pydantic-core untuk kecepatan maksimal)
class SentimentScorePayload(BaseModel):
    ticker: Annotated[str, Field(min_length=2, max_length=12, examples=["AAPL", "BTC-USD"])]
    sentiment_score: Annotated[float, Field(ge=-1.0, le=1.0, description="Skor sentimen antara -1.0 (sangat bearish) hingga +1.0 (sangat bullish)")]
    source_outlet: str = Field(..., min_length=3)
    headline_text: str = Field(..., max_length=280)
    confidence: float = Field(default=0.85, ge=0.0, le=1.0)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @field_validator("ticker")
    @classmethod
    def normalize_ticker(cls, v: str) -> str:
        return v.strip().upper()

class SentimentResponse(BaseModel):
    id: str
    ticker: str
    classification: str
    processed_at: datetime

# In-Memory Storage untuk demonstrasi
db_records: dict[str, SentimentScorePayload] = {}

@app.post("/api/v1/sentiments", response_model=SentimentResponse, status_code=status.HTTP_201_CREATED)
async def ingest_sentiment(payload: SentimentScorePayload):
    classification = "BULLISH" if payload.sentiment_score > 0.2 else ("BEARISH" if payload.sentiment_score < -0.2 else "NEUTRAL")
    
    record_id = f"SENT-{len(db_records) + 1:04d}"
    db_records[record_id] = payload

    return SentimentResponse(
        id=record_id,
        ticker=payload.ticker,
        classification=classification,
        processed_at=datetime.now(timezone.utc)
    )

@app.get("/api/v1/sentiments/{record_id}", response_model=SentimentScorePayload)
async def get_sentiment(record_id: str):
    if record_id not in db_records:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Record sentimen dengan ID '{record_id}' tidak ditemukan."
        )
    return db_records[record_id]
```

---

## Key Concepts

FastAPI has surged as the premier Python backend framework for AI, data science, and high-performance microservices, leveraging native asyncio architecture and deep Pydantic integration.

### Pydantic v2 & The Rust Engine
Pydantic v2 rebuilt its entire core parsing engine in Rust (`pydantic-core`). Consequently, JSON deserialization and schema validation execute 5 to 20 times faster than v1, rivaling compiled languages like Go and Java.

### Declarative Schema Rules via Annotated Fields
Leveraging `Annotated[T, Field(...)]`, engineers define constraints directly on types (e.g., constraining sentiment scores between `-1.0` and `1.0`). If clients transmit out-of-bound payloads, FastAPI automatically yields standardized `HTTP 422 Unprocessable Entity` responses without boilerplate manual checks.

### Native OpenAPI Documentation
Every FastAPI route registers automatically into the OpenAPI 3.1 specification. Developers navigate to `/docs` in their browser to inspect endpoints interactively via Swagger UI.


---

---

## Beginner Friendly Explanation

Imagine an automated biometric immigration gate at an international terminal. The optical scanner (Pydantic v2) verifies your credentials in 0.1 seconds. If your passport is expired or smudged, the gate turns red and prints instructions without requiring manual officer intervention.

## Experiments

- Submit a POST payload containing `sentiment_score: 1.5` and inspect the HTTP 422 error response.
- Submit a lowercase ticker `aapl` and verify `@field_validator` sanitizes it to `AAPL`.
- Access the interactive Swagger UI documentation at `http://localhost:8000/docs`.

---

## Challenge

Add a `GET /api/v1/sentiments/aggregate?ticker=AAPL` endpoint computing the weighted average sentiment score factoring confidence ratings.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
```


---

## Common Pitfalls & Debugging Tips

### 1. Mutable Default Arguments
- **Symptom / Issue:** Default list or dict parameters persist modifications across successive function calls.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Assign `None` as default: `def fn(items=None): if items is None: items = []`.

### 2. Accidental Variable Scope Errors
- **Symptom / Issue:** Throws `UnboundLocalError: local variable referenced before assignment`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Pass variables explicitly through arguments and return values rather than mutating globals.

### 3. Catch-All `except:` Clauses
- **Symptom / Issue:** Suppresses critical syntax errors, interrupts, and crashes silently.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always catch explicit exceptions: `except ValueError as err:`.

---

## Summary

You have mastered FastAPI, Pydantic v2, and high-performance validation. Next week we connect lightning-fast embedded analytics with DuckDB.
