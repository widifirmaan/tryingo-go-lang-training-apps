# Window Functions, Partitioning & Ranking Analytics

> **Kategori:** PostgreSQL | **Level:** Relational Foundations & Advanced SQL | **Minggu 3:** Window Functions, Partitioning & Ranking Analytics

## Learning Objectives

- Understand the architectural distinction between Window Functions (OVER clause) and GROUP BY
- Implement ranking functions: ROW_NUMBER(), RANK(), and DENSE_RANK()
- Calculate time-series delta comparisons using LAG(), LEAD(), and cumulative running totals
- Configure custom analytical window frames: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW

---

## Program: Running Total Calculation, Product Ranking, and Month-over-Month (MoM) Growth

```sql
-- Window Functions: Calculate partitions without collapsing individual rows
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', created_at)::DATE AS sales_month,
        SUM(total_amount) AS monthly_revenue
    FROM orders
    WHERE status = 'PAID'
    GROUP BY DATE_TRUNC('month', created_at)
)
SELECT 
    sales_month,
    monthly_revenue,
    -- 1. Running total over time
    SUM(monthly_revenue) OVER (
        ORDER BY sales_month ASC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_revenue,
    
    -- 2. Previous month revenue using LAG
    LAG(monthly_revenue, 1) OVER (ORDER BY sales_month ASC) AS prev_month_revenue,
    
    -- 3. Month-over-month growth rate percentage
    ROUND(
        (monthly_revenue - LAG(monthly_revenue, 1) OVER (ORDER BY sales_month ASC)) 
        / NULLIF(LAG(monthly_revenue, 1) OVER (ORDER BY sales_month ASC), 0) * 100, 
        2
    ) AS mom_growth_pct
FROM monthly_sales;

-- Product ranking within category partitions
SELECT 
    p.title,
    p.price,
    p.attributes->>'brand' AS brand,
    -- Row number guarantees unique sequential numbering
    ROW_NUMBER() OVER (PARTITION BY p.attributes->>'brand' ORDER BY p.price DESC) AS row_num,
    -- Dense rank handles ties without skipping rank numbers
    DENSE_RANK() OVER (PARTITION BY p.attributes->>'brand' ORDER BY p.price DESC) AS price_rank,
    -- Calculate difference from average price of that specific brand
    ROUND(p.price - AVG(p.price) OVER (PARTITION BY p.attributes->>'brand'), 2) AS diff_from_brand_avg
FROM products p;
```

---

## Key Concepts

### Window Functions vs Conventional GROUP BY
The core limitation of `GROUP BY` is row collapse: multiple source rows are condensed into a single aggregated record, erasing individual item granularity. **Window Functions** compute aggregate values, running statistics, or ranking across a defined subset of rows (the *window*) while strictly preserving every single input row in the result set.

### Deconstructing the OVER Clause
The `OVER (...)` clause governs how the analytical engine partitions and sorts data:
- `PARTITION BY`: Divides the dataset into distinct subsets (e.g. ranking products independently per manufacturer brand).
- `ORDER BY`: Dictates the sequencing order applied to rows within that specific partition.

### Ranking Distinctions: ROW_NUMBER vs RANK vs DENSE_RANK
- `ROW_NUMBER()`: Assigns a strict sequential identifier (1, 2, 3, 4...) with arbitrary tie-breaking.
- `RANK()`: Assigns identical rankings to tied values, skipping subsequent ranks (e.g. 1, 2, 2, 4).
- `DENSE_RANK()`: Assigns identical rankings to ties without skipping subsequent numbers (e.g. 1, 2, 2, 3).

### Temporal Time-Travel with LAG and LEAD
`LAG(column, offset)` accesses values from prior rows within the partition window, while `LEAD(column, offset)` inspects future rows. These primitives form the foundation of financial time-series analysis, calculating Month-over-Month (MoM) growth rates and running moving averages.

---

---

## Beginner Friendly Explanation

Imagine watching a marathon race. If you run a `GROUP BY`, you only get a single flattened metric: 'The average runner finished in 3 hours'. You lose the identity of individual athletes.

With Window Functions, every single runner stays clearly visible on the track, but floating above each runner is a personalized digital leaderboard: 'You rank #1 in the under-30 category, and you are currently 15 seconds ahead of the runner behind you'.

## Experiments

- Replace ROWS BETWEEN UNBOUNDED PRECEDING with 2 PRECEDING AND CURRENT ROW to produce a 3-month moving average
- Experiment with FIRST_VALUE() and LAST_VALUE() to display the top priced item across each category
- Use NTILE(4) OVER (ORDER BY price) to bucket products into four pricing quartiles (Budget, Mid, Premium, Luxury)
- Apply LEAD to determine the day delta interval between successive orders for each customer

---

## Challenge

Write an e-commerce inventory query computing running ledger balance per product SKU: stock reception transactions add to the balance while customer fulfillment subtracts, ordered strictly by transaction timestamp.

---

## Summary

You have mastered PostgreSQL Window Functions: OVER, PARTITION BY, running totals, temporal delta tracking with LAG/LEAD, and multi-tier ranking with ROW_NUMBER and DENSE_RANK.
