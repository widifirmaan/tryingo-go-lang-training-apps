# Mental Model: A Container Is a Process

> Docker | Foundations | Lesson 2

## Learning Objectives

- Build the mental model: a container is a Linux process with an isolated view
- Understand why a container stops when its main process exits
- Distinguish VMs (virtual machines) and containers (processes)
- Practice the container lifecycle: run, ps, stop, rm

---

## Program: Mental Model: A Container Is a Process

```docker
# Container = PROSES, bukan VM kecil!
# Proses selesai -> container selesai (berhenti)
docker run alpine echo "Halo dari dalam container!"

# Proses berjalan lama -> jalankan di background
docker run -d --name web1 -p 8080:80 nginx:alpine
docker ps

# Container adalah proses dengan view terisolasi
docker exec web1 whoami
docker exec web1 cat /etc/hostname

# Container sekali pakai: stop, lalu rm
docker stop web1
docker rm web1
docker ps -a
```

---

## Explanation

## Containers Are Not Small VMs
The most common and most damaging misconception: containers are treated as mini VMs - "small computers" you can SSH into, install debug tools on, and live inside. In reality a container is just a regular process running on the host kernel with a restricted view: its own filesystem (mount namespaces), its own network stack (network namespaces), and its own process tree (PID namespaces). That is why containers start in seconds - no new OS is booted.
## Lifecycle: Born and Die
A container lives as long as its main process lives. Run docker run alpine echo "hi": the echo process finishes in a blink and the container stops instantly. Run nginx (a long-running server): the container stays Up. Stopping a container sends a stop signal to the main process.
## Consequences of This Model
Once this clicks, everything follows: do not "log into" containers and install stuff inside - containers are throwaway objects you recreate. Why must data live in volumes? Because the container filesystem dies with it. Why is running 2 processes in one container an antipattern? Because ONE main process is what keeps the container alive.
## Thought Exercise: VM vs Container
VM: a hypervisor partitions hardware, every VM carries its own OS (gigabytes, minutes to boot). Container: the host kernel is shared, only app + runtime are packaged (megabytes, seconds to boot). A container is not "a smaller VM" - it is a different category entirely.

---

## Experiments

1. **Containers Are Not Small VMs**
2. **Lifecycle: Born and Die**
3. **Consequences of This Model**
4. **Thought Exercise: VM vs Container**

---

## Challenge

Run the script, then try it yourself: docker run alpine echo "test" - notice the container exits immediately. Then docker run -d --name coba2 nginx:alpine, stop it, rm it. Write two sentences: (1) what decides whether a container lives or dies, (2) why we should not install debug tools inside a container.

---

## Summary

A container is a Linux process with an isolated view (namespaces), alive as long as its main process runs. Not a VM: no new OS, no slow boot. Containers are throwaway. Next: Docker architecture under the hood.
