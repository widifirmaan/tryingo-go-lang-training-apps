# Production Images: Alpine, Slim, Distroless

> Docker | Production | Lesson 14

## Learning Objectives

- Distinguish alpine, slim, distroless, and scratch
- Build a very small Go image (static binary)
- Read the layer trace of a production image
- Weigh toolchain vs runtime trade-offs in images

---

## Program: Production Images: Alpine, Slim, Distroless

```docker
# Program Go: build statis -> image tiny
docker build -t tryngo/goproj:1.0 goproj
docker images
docker history tryngo/goproj:1.0

# Jalankan binary statis
docker run --rm tryngo/goproj:1.0

# Bandingkan dengan image toolchain
docker run --rm golang:1.22-alpine ls /usr/local/go/bin
```

---

## Explanation

## The Base Image Spectrum
From large to small: full distros (ubuntu/debian), slim (debian without toolchain), alpine (musl, very small), distroless (runtime only, no shell), scratch (completely empty). Rule: use the smallest base that still runs your app. Small images = fast pulls, small attack surface.
## Go: The Ideal Case
Go compiles statically: the binary needs no runtime in the image. FROM scratch + COPY binary = an image containing only your app. docker history goproj shows it: empty base, copy binary, done. A good Go image can be ~10MB vs ~800MB ubuntu base.
## Why Not Always Scratch
Static binaries need CA certs (HTTPS), timezone data, a non-root user - all copyable as files into scratch. But if the app needs a shell (debugging, entrypoint scripts), distroless or alpine is more practical. Distroless runs apps as non-root BY DEFAULT - closing one whole class of container-escape vulnerabilities.
## Trade-offs to Remember
Alpine uses musl, not glibc - some native C libraries can misbehave. Distroless has no shell - no docker exec sh (which is good for security). Base image choice is a security AND debugging decision: document your reasoning in the README.

---

## Experiments

1. **The Base Image Spectrum**
2. **Go: The Ideal Case**
3. **Why Not Always Scratch**
4. **Trade-offs to Remember**

---

## Challenge

Run the script. Then try: change the goproj Dockerfile to use alpine (FROM alpine:3.20, add RUN apk add --no-cache ca-certificates), build it as tryngo/goproj:alpine. Compare sizes and run both. Which would you choose for production and why?

---

## Summary

Minimal bases: slim < alpine < distroless < scratch. Static Go = scratch is ideal (~10MB). Non-root by default in distroless. Every base has security/debug trade-offs. Next: registries, CI/CD, deploy.
