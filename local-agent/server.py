#!/usr/bin/env python3
import os
import subprocess
import threading
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost", "http://127.0.0.1", "https://*.github.io", "https://anand-indx.github.io"]}}, supports_credentials=False)

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
JUPYTER_API = 'http://localhost:8888/api'

_running = {
    'starting': False,
    'started_at': None,
    'error': None
}

def _run_start_sh():
    try:
        _running['starting'] = True
        _running['error'] = None
        _running['started_at'] = time.time()
        cmd = ['./start.sh']
        subprocess.check_call(cmd, cwd=ROOT)
    except subprocess.CalledProcessError as e:
        _running['error'] = f"start.sh failed: {e}"
    finally:
        _running['starting'] = False

@app.post('/start')
def start():
    if _running['starting']:
        return jsonify({'status': 'starting'}), 202
    threading.Thread(target=_run_start_sh, daemon=True).start()
    return jsonify({'status': 'started'}), 202

@app.get('/status')
def status():
    try:
        requests.get(JUPYTER_API, timeout=1)
        return jsonify({'ready': True}), 200
    except Exception:
        return jsonify({'ready': False, 'starting': _running['starting'], 'error': _running['error']}), 200

@app.get('/session')
def session_status():
    """Check if a specific notebook has an active session.
    Query param: path (relative to Jupyter root), e.g. notebooks/image-processing-tutorials/notebooks/01_load_and_visualize.ipynb
    """
    nb_path = request.args.get('path', '')
    if not nb_path:
        return jsonify({'running': False, 'reason': 'missing path'}), 400
    try:
        r = requests.get(f"{JUPYTER_API}/sessions", timeout=2)
        if r.status_code != 200:
            return jsonify({'running': False, 'reason': f'status {r.status_code}'}), 200
        sessions = r.json()
        # Each session has .path or .notebook.path depending on version
        for s in sessions:
            sp = s.get('path') or (s.get('notebook') or {}).get('path') or ''
            if sp == nb_path:
                return jsonify({'running': True}), 200
        return jsonify({'running': False}), 200
    except Exception as e:
        return jsonify({'running': False, 'error': str(e)}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5321)
