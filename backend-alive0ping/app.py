# app.py
import os
import time
import json
import logging
import threading
from datetime import datetime
import requests
from flask import Flask, jsonify

# ----- config from env -----
URL = os.getenv("PING_URL")
METHOD = os.getenv("PING_METHOD", "GET").upper()
HEADERS_JSON = os.getenv("PING_HEADERS_JSON", "")
INTERVAL_MIN = int(os.getenv("PING_INTERVAL_MIN", "5"))  # minutes
TIMEOUT = int(os.getenv("PING_TIMEOUT", "10"))
RETRIES = int(os.getenv("PING_RETRIES", "2"))
RETRY_BACKOFF = float(os.getenv("PING_RETRY_BACKOFF", "2"))
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# ----- logging -----
logging.basicConfig(level=LOG_LEVEL, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("pinger")

def load_headers():
    if not HEADERS_JSON:
        return {}
    try:
        return json.loads(HEADERS_JSON)
    except Exception:
        logger.exception("Failed to parse PING_HEADERS_JSON, ignoring.")
        return {}

HEADERS = load_headers()

# basic health info
_health = {
    "last_ping": None,
    "last_status": None,
    "total_pings": 0,
    "last_error": None,
}

def do_request():
    for attempt in range(1, RETRIES + 2):
        try:
            resp = requests.request(METHOD, URL, headers=HEADERS, timeout=TIMEOUT)
            logger.info("Ping %s %s -> %s (%d)", METHOD, URL, resp.reason, resp.status_code)
            _health["last_ping"] = datetime.utcnow().isoformat() + "Z"
            _health["last_status"] = resp.status_code
            _health["last_error"] = None
            _health["total_pings"] += 1
            return True
        except Exception as e:
            logger.warning("Ping attempt %d failed: %s", attempt, e)
            _health["last_error"] = str(e)
            if attempt <= RETRIES:
                sleep_for = (RETRY_BACKOFF ** (attempt - 1)) * 2
                logger.info("Retrying in %.1fs...", sleep_for)
                time.sleep(sleep_for)
    logger.error("All ping attempts failed.")
    _health["total_pings"] += 1
    return False

def pinger_loop():
    if not URL:
        logger.error("PING_URL not set — exiting pinger loop")
        return
    interval_seconds = INTERVAL_MIN * 60
    logger.info("Starting pinger -> %s every %d minutes", URL, INTERVAL_MIN)
    while True:
        start = datetime.utcnow()
        try:
            do_request()
        except Exception as e:
            logger.exception("Unhandled error in pinger loop: %s", e)
        elapsed = (datetime.utcnow() - start).total_seconds()
        to_sleep = max(0, interval_seconds - elapsed)
        logger.debug("Sleeping %.1f seconds", to_sleep)
        time.sleep(to_sleep)

# ----- Flask app -----
app = Flask(__name__)

@app.route("/", methods=["GET"])
def root():
    return jsonify({"status": "ok", "service": "pinger", "health": _health})

@app.route("/health", methods=["GET"])
def health():
    # simple health response
    return jsonify(_health)

if __name__ == "__main__":
    # start background thread
    t = threading.Thread(target=pinger_loop, daemon=True)
    t.start()

    # use port from env (Render sets PORT)
    port = int(os.getenv("PORT", "5000"))
    logger.info("Starting web server on port %d", port)
    # Use Flask built-in server for simplicity (Render will run via gunicorn if you prefer)
    app.run(host="0.0.0.0", port=port)
