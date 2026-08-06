# Queues & Background Jobs

> **Kategori:** Laravel | **Level:** undefined | **Minggu 10:** Queues & Background Jobs

## Learning Objectives

- Job class: ShouldQueue interface for background processing
- Dispatch: dispatch, onQueue, delay
- Queue worker: php artisan queue:work
- Failed jobs: retry, flush, forget
- Batch jobs: Bus::batch for multiple jobs

---

## Program: Job Processing

```php
<?php
echo "=== Laravel Queues ===<br><br>";

echo "=== Job Class ===<br>";
echo "class ProcessPodcast implements ShouldQueue {<br>";
echo "    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;<br>";
echo "    <br>";
echo "    public function handle(AudioProcessor $processor): void {<br>";
echo "        $processor->process($this->podcast);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Dispatch Job ===<br>";
echo "ProcessPodcast::dispatch($podcast);<br>";
echo "ProcessPodcast::dispatch($podcast)->onQueue('processing');<br>";
echo "ProcessPodcast::dispatch($podcast)->delay(now()->addMinutes(10));<br><br>";

echo "=== Job Simulation ===<br>";
$jobs = [
    ["id" => 1, "name" => "ProcessPodcast", "status" => "completed", "duration" => "2.3s"],
    ["id" => 2, "name" => "SendEmail", "status" => "completed", "duration" => "0.5s"],
    ["id" => 3, "name" => "GenerateReport", "status" => "processing", "duration" => "..."],
    ["id" => 4, "name" => "ResizeImage", "status" => "queued", "duration" => "..."],
];

echo "ID | Job | Status | Duration<br>";
echo "---|-----|--------|----------<br>";
foreach ($jobs as $job) {
    echo "{$job['id']} | {$job['name']} | {$job['status']} | {$job['duration']}<br>";
}

echo "<br>=== Queue Worker ===<br>";
echo "php artisan queue:work<br>";
echo "php artisan queue:work --queue=high,default --tries=3 --timeout=60<br><br>";

echo "=== Failed Jobs ===<br>";
echo "php artisan queue:failed — List failed jobs<br>";
echo "php artisan queue:retry 1 — Retry job<br>";
echo "php artisan queue:flush — Delete all failed<br><br>";

echo "=== Batch Jobs ===<br>";
echo "Bus::batch([<br>";
echo "    new ProcessPodcast(1),<br>";
echo "    new ProcessPodcast(2),<br>";
echo "])->then(function (Batch $batch) {<br>";
echo "    // All jobs completed<br>";
echo "})->catch(function (Batch $batch, Throwable $e) {<br>";
echo "    // First batch failure<br>";
echo "})->dispatch();<br>";
>
```

---

## Key Concepts

### Job Class
`implements ShouldQueue` — Laravel auto-queues. `handle()` executes.

### Dispatch
`Job::dispatch()`, `->onQueue()`, `->delay()`.

### Queue Worker
`php artisan queue:work` processes jobs. Specify queue, tries, timeout.

### Failed Jobs
`queue:failed` lists, `queue:retry` retries, `queue:flush` deletes.

### Batch
`Bus::batch([...])->then()->catch()->dispatch()`.

---

## Experiments

- Create Job and dispatch to queue
- Try job chaining: withChain
- Implement job batching
- Create failed job handler
- Try rate limiting with RateLimited middleware

---

## Challenge

Build an email notification system: queue email sending, retry 3x on failure, batch send to multiple recipients.

---

## Summary

Week 10 of 12: **Queues & Background Jobs** (Level: Advanced). Async processing. Next week: **REST API**.
