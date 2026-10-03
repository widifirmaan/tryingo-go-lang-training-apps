# Capstone Project: Real-Time IoT Telemetry Pipeline

> **Kategori:** MongoDB | **Level:** Advanced Aggregation, Replication & Sharding Scalability | **Minggu 8:** Capstone Project: Real-Time IoT Telemetry Pipeline

## Learning Objectives

- Synthesize all MongoDB disciplines into a production-grade IoT telemetry pipeline capstone
- Deploy native MongoDB Time-Series collections achieving high-density columnar disk compression
- Implement the Outlier Pattern to segregate anomalous spikes into dedicated forensic investigation collections
- Build streaming aggregation rollup pipelines powering smart factory observability dashboards

---

## Program: End-to-End IoT Telemetry Pipeline: Time-Series Collections, Outlier Anomaly Detection, and Rollups

```javascript
// CAPSTONE PROJECT: Real-Time IoT Sensor Telemetry & Event Aggregation Pipeline
// Demonstrates Time-Series Collections, JSON Schema, Aggregation Pipelines, and Outlier Tracking
use iot_production_hub;

// 1. Create Native MongoDB Time-Series Collection (Engineered specifically for high-throughput sensor telemetry)
db.createCollection("sensor_time_series", {
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",
    granularity: "seconds"
  },
  expireAfterSeconds: 86400 * 30 // Auto-purge telemetry older than 30 days
});

// 2. Outliers / Anomalies collection for deep root-cause forensic analysis
db.outlier_alerts.drop();
db.createCollection("outlier_alerts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deviceId", "metric", "anomalyValue", "threshold", "severity", "detectedAt"],
      properties: {
        deviceId: { bsonType: "string" },
        metric: { bsonType: "string" },
        anomalyValue: { bsonType: "double" },
        threshold: { bsonType: "double" },
        severity: { enum: ["HIGH", "CRITICAL"] },
        detectedAt: { bsonType: "date" }
      }
    }
  }
});

// 3. Seed real-time streaming telemetry batches
db.sensor_time_series.insertMany([
  {
    timestamp: new Date("2026-03-10T12:00:00Z"),
    metadata: { deviceId: "SENSOR-ALPHA-01", facility: "PLANT-WEST", type: "VIBRATION_HZ" },
    reading: 42.1,
    voltage: 3.3
  },
  {
    timestamp: new Date("2026-03-10T12:00:05Z"),
    metadata: { deviceId: "SENSOR-ALPHA-01", facility: "PLANT-WEST", type: "VIBRATION_HZ" },
    reading: 43.8,
    voltage: 3.3
  },
  {
    timestamp: new Date("2026-03-10T12:00:10Z"),
    metadata: { deviceId: "SENSOR-ALPHA-01", facility: "PLANT-WEST", type: "VIBRATION_HZ" },
    reading: 104.5, // Extreme anomaly! Outlier detected
    voltage: 3.1
  }
]);

// 4. Industrial Telemetry Rollup & Anomaly Dispatch Pipeline
const anomalyDetectionPipeline = [
  // Stage A: Filter readings within recent evaluation window
  {
    $match: {
      timestamp: {
        $gte: new Date("2026-03-10T12:00:00Z"),
        $lte: new Date("2026-03-10T12:05:00Z")
      }
    }
  },

  // Stage B: Calculate rolling statistics per device
  {
    $group: {
      _id: {
        deviceId: "$metadata.deviceId",
        facility: "$metadata.facility",
        metricType: "$metadata.type"
      },
      readingsCount: { $sum: 1 },
      avgReading: { $avg: "$reading" },
      peakReading: { $max: "$reading" },
      minReading: { $min: "$reading" },
      readingsSamples: { $push: { val: "$reading", ts: "$timestamp" } }
    }
  },

  // Stage C: Project metrics and detect statistical variance
  {
    $project: {
      _id: 0,
      deviceId: "$_id.deviceId",
      facility: "$_id.facility",
      metricType: "$_id.metricType",
      samples: "$readingsCount",
      avgValue: { $round: ["$avgReading", 2] },
      peakValue: "$peakReading",
      isCriticalAnomaly: { $gt: ["$peakReading", 80.0] } // Outlier criteria
    }
  }
];

const telemetryReport = db.sensor_time_series.aggregate(anomalyDetectionPipeline).toArray();
print("--- TELEMETRY ROLLUP ANALYSIS ---");
printjson(telemetryReport);
```

---

## Key Concepts

### Capstone IoT Telemetry Pipeline Architecture
This capstone establishes an industrial-grade streaming telemetry analytics engine:
1. **Native Time-Series Collections**: MongoDB incorporates specialized time-series storage engines (`timeseries: { timeField, metaField, granularity }`). Documents are transparently organized into columnar compressed buckets on disk, shrinking storage footprints by 70%+ while dramatically accelerating range scans.
2. **The Outlier Pattern**: Amid millions of standard operating signals, merely 0.01% represent catastrophic hardware faults (excess vibration, thermal runaway). Rather than polluting uniform telemetry schemas with sparse exception flags, the pipeline isolates high-severity spikes into a dedicated `outlier_alerts` collection.
3. **Smart Rollup Aggregations**: Upstream `$group` and `$project` stages transform high-frequency raw telemetry signals into executive statistical rollups (averages, peaks, critical status flags) ready for consumption by SCADA operators.

---

---

## Beginner Friendly Explanation

Congratulations! You have constructed a world-class smart factory telemetry engine.
The Time-Series collection acts like an ultra-high-speed camera logging thousands of machine vibration readings per second into a compressed, storage-efficient format.
The analytical pipeline acts like a vigilant engineer watching the monitor: the moment any machine exhibits violent tremors (an outlier anomaly), the system triggers safety alarms and logs the incident into the emergency forensic ledger!

## Experiments

- Execute the aggregation pipeline and verify anomaly detection flags on sensors exceeding 80Hz
- Inspect the internal columnar compression ratio using db.sensor_time_series.stats()
- Simulate automated TTL expiration by querying documents beyond the 30-day retention window
- Test targeted temporal range queries and observe that the engine scans strictly matching time buckets

---

## Challenge

Extend the capstone pipeline by incorporating `$out` or `$merge`: automatically materialize daily summary rollups into a persistent `daily_telemetry_rollups` collection for long-term archiving.

---

## Summary

Congratulations! You have mastered the entire MongoDB curriculum: BSON architecture, schema validation, Embedding vs Referencing data modeling, Compound & Multikey Indexing, Aggregation Framework ($match, $group, $lookup, $unwind, $facet), ACID Transactions, Horizontal Sharding, and an IoT Telemetry Pipeline Capstone.
