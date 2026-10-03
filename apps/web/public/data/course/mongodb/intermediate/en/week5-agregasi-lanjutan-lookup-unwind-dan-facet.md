# Advanced Aggregation: $lookup, $unwind & $facet

> **Kategori:** MongoDB | **Level:** Advanced Aggregation, Replication & Sharding Scalability | **Minggu 5:** Advanced Aggregation: $lookup, $unwind & $facet

## Learning Objectives

- Master cross-collection joins utilizing $lookup with sub-pipelines (let clauses and $expr)
- Flatten and destructure embedded array elements into distinct documents with $unwind
- Execute parallel multi-faceted reporting in a single database pass using $facet
- Categorize numeric distributions into bucketed frequency histograms using $bucket

---

## Program: Multi-Collection Joins with $lookup Pipelines and Multi-Faceted Analytics via $facet

```javascript
// MongoDB Shell (mongosh)
use telemetry_db;

// Multi-Collection Join using modern $lookup with custom pipeline
const complexPipeline = [
  // Match active industrial facilities
  { $match: { _id: "FAC-JKT-01" } },

  // Stage: Correlated $lookup joining telemetry readings
  {
    $lookup: {
      from: "telemetries",
      let: { facility_id: "$_id" },
      pipeline: [
        // Sub-pipeline inside the joined collection
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$type", "TEMP"] },
                { $gte: ["$value", 25.0] } // Alerting threshold
              ]
            }
          }
        },
        { $sort: { timestamp: -1 } },
        { $limit: 3 }
      ],
      as: "criticalReadings"
    }
  },

  // Stage: $unwind array to process emergency contacts individually
  { $unwind: "$emergencyContacts" },

  // Stage: Multi-Faceted Analytics ($facet allows multiple independent pipelines in one pass!)
  {
    $facet: {
      // Facet A: Contact Distribution by Role
      "contactsByRole": [
        {
          $group: {
            _id: "$emergencyContacts.role",
            count: { $sum: 1 },
            contactNames: { $push: "$emergencyContacts.name" }
          }
        }
      ],
      // Facet B: Overall Facility Incident Summary
      "incidentOverview": [
        {
          $project: {
            facilityName: "$name",
            highTempAlertsCount: { $size: "$criticalReadings" },
            hasEmergencyLead: {
              $cond: {
                if: { $regexMatch: { input: "$emergencyContacts.role", regex: /Manager/i } },
                then: true,
                else: false
              }
            }
          }
        }
      ]
    }
  }
];

const facetedReport = db.facilities.aggregate(complexPipeline).toArray();
printjson(facetedReport);
```

---

## Key Concepts

### Expressive $lookup with Sub-Pipelines
In legacy MongoDB releases, `$lookup` merely executed basic equality matches between `localField` and `foreignField`. Modern MongoDB introduces expressive `$lookup` pipelines pairing `let` bindings with nested `pipeline` arrays. This allows filtering, sorting, and slicing foreign collection records *prior* to joining them to the root document, preventing in-memory memory bloat.

### Destructuring Arrays via $unwind
When a document contains an array `emergencyContacts: [A, B, C]`, executing `$unwind: "$emergencyContacts"` emits three distinct clone documents, each holding one isolated contact item. This unlocks the ability to perform deep `$group` aggregations and mathematical operations across array elements.

### Multi-Faceted Analysis with $facet
Modern search and analytics dashboards simultaneously render disparate faceted panels: category breakdowns, price distribution histograms, and customer rating distributions. Executing separate queries generates network churn and multiple disk scans. The `$facet` stage executes multiple parallel aggregation sub-pipelines within a single unified pass over the working dataset.

---

---

## Beginner Friendly Explanation

Imagine shopping at an online shoe store.
$lookup is like sending a stock clerk to the back warehouse to fetch matching shoeboxes.
$unwind is like taking a multi-pack bundle containing 3 pairs of socks and laying them out side-by-side on the table.
$facet is like glancing at the storefront window once and simultaneously counting three distinct metrics: 'How many red shoes exist, how many cost under $50, and how many are manufactured by Nike'.

## Experiments

- Incorporate preserveNullAndEmptyArrays: true inside $unwind and observe documents holding empty arrays
- Apply the $bucketAuto stage to partition temperature readings into 4 automatic percentile buckets
- Utilize the $size operator on $lookup results to count joined elements without requiring an unwind pass
- Trigger the 100MB aggregation memory ceiling and verify resolution using allowDiskUse: true

---

## Challenge

Build a production faceted product search pipeline: take a search query, and use `$facet` to output (1) the top 10 paginated products, (2) brand distribution with item counts, and (3) global min-max price ranges.

---

## Summary

You have mastered advanced MongoDB aggregation: expressive cross-collection $lookup sub-pipelines, array destructuring with $unwind, and parallel multi-dimensional analytics via $facet.
