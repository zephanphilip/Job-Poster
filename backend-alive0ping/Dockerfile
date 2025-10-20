# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install runtime deps (keep minimal)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py ./

ENV PING_INTERVAL_MIN=5
ENV PORT=5000

# Run the script directly so the background thread starts (simple and reliable)
CMD ["python", "app.py"]
