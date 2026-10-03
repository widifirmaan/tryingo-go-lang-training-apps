# Healthchecks, Restart Policies & Logging Drivers

> **Kategori:** Docker | **Level:** Multi-Container Orchestration & Production Hardening | **Minggu 6:** Healthchecks, Restart Policies & Logging Drivers

## Learning Objectives

- Fine-tune HEALTHCHECK parameters: interval, timeout, retries, and start-period
- Select appropriate restart policies: no, on-failure[:max-retries], always, and unless-stopped
- Prevent disk exhaustion disasters from unconstrained logs using Logging Driver max-size and max-file caps
- Distinguish Liveness Probes (process liveness) from Readiness Probes (traffic ingress readiness)

---

## Program: Resilient Container Configuration: Self-Healing Automation and Log Rotation

```bash
# 1. Run a self-healing container with advanced healthcheck and restart policy
docker run -d \
  --name resilient_worker \
  --restart on-failure:5 \
  --health-cmd="curl -f http://localhost:8080/live || exit 1" \
  --health-interval=10s \
  --health-timeout=3s \
  --health-retries=3 \
  --health-start-period=15s \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  my-worker-image:v1

# 2. Inspect container health transition (starting -> healthy -> unhealthy)
docker inspect --format='{{json .State.Health}}' resilient_worker | jq

# 3. Simulate process degradation / failure to trigger restart policy
# docker exec -it resilient_worker kill -9 1

# 4. View structured Docker daemon logging configuration (/etc/docker/daemon.json)
cat << 'EOF' > /tmp/daemon-sample.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "5"
  },
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 65536,
      "Soft": 65536
    }
  }
}
EOF
```

---

## Key Concepts

### The Four HEALTHCHECK Parameters Deconstructed
The `HEALTHCHECK` directive instructs Docker on assessing internal application health:
1. `--health-interval=10s`: The frequency interval between probe executions.
2. `--health-timeout=3s`: Maximum execution duration before a probe is judged timed-out.
3. `--health-retries=3`: Consecutive failure threshold required before declaring the container `unhealthy`.
4. `--health-start-period=15s`: Boot initialization grace window; probe faults during this warmup duration do not decrement retry budgets.

### The Restart Policy Spectrum
- `no`: Default behavior. Containers remain stopped upon process exit.
- `on-failure:5`: Restarts containers strictly upon non-zero exit codes (crashes), capped at 5 consecutive attempts.
- `unless-stopped`: Restarts upon crashes or daemon reboots, EXCEPT when explicitly stopped by an administrator (`docker stop`). The industry standard for production services.
- `always`: Unconditionally restarts containers under all circumstances, even manual stops, risking disruptive reboot loops.

### Neutralizing the Unconstrained Log Disk-Full Catastrophe
By default, Docker captures `stdout` and `stderr` to JSON files on the host root filesystem. Lacking bounds, verbose applications emit **50GB to 100GB** of logs, completely exhausting host disk capacity and causing kernel panic crashes.
Configuring `--log-opt max-size=10m --log-opt max-file=3` caps log segments to 10MB while rotating across a strict ceiling of 3 historical files.

---

---

## Beginner Friendly Explanation

Think of a container like an automated factory robot.
HEALTHCHECK is like a paramedic checking the robot's pulse every 10 seconds. If the robot faints three consecutive times, the paramedic sounds an alarm.

Restart Policy `unless-stopped` is like an automatic spring: if the robot stumbles, it automatically jumps back on its feet, unless the manager explicitly flips the power switch. Log rotation is like a compact shredder: once 10 pages accumulate, the oldest pages are shredded so paper never overflows across the factory floor!

## Experiments

- Deploy a container with a healthcheck probing an intentional 500 HTTP endpoint and observe it transition to (unhealthy)
- Run a container with on-failure restart policy, terminate it via kill -9, and observe automated reboot
- Run a script piping 100MB to stdout and verify physical log files remain strictly bounded by max-size
- Inspect the low-level ExitCode and RestartCount telemetry inside docker inspect

---

## Challenge

Configure the global Docker daemon (`/etc/docker/daemon.json`) so all newly launched containers inherit `max-size: 20m` and `max-file: 3` logging rules automatically.

---

## Summary

You have mastered production container resilience: four-tier HEALTHCHECK configuration, unless-stopped restart policies, and disk exhaustion defense via log rotation drivers.
