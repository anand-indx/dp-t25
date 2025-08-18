# Local Agent (optional)

This tiny local HTTP server lets the GitHub Pages site start Docker for you.

- It exposes `http://localhost:5321/` endpoints the site can call:
  - `POST /start` → runs `./start.sh` to build & start containers.
  - `GET /status` → reports whether Jupyter is reachable at `http://localhost:8888/api`.

Usage:
1. Install Python 3.9+.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run: `python server.py`.
4. Click the Local button on the website.

Security note: This runs only on localhost and does not accept cross-origin credentials. Stop it when done.
