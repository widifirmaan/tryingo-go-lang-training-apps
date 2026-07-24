FROM docker.io/cloudflare/sandbox:0.7.0

# Install Go
RUN curl -fsSL https://go.dev/dl/go1.23.0.linux-amd64.tar.gz | tar -C /usr/local -xz
ENV PATH="/usr/local/go/bin:${PATH}"

# Install Python packages
RUN pip install --no-cache-dir requests numpy pandas

# Install Node.js global tools
RUN npm install -g typescript tsx

# Verify all runtimes
RUN go version && python3 --version && node --version && npm --version

EXPOSE 8080
