# Self / Life Tracker (mj-ahmad)

Plain-file tracking system: CLI + static dashboard, EN/BN, no build step.

1. Put your logo at `assets/logo.png` (a fallback badge shows until then).
2. `./run.sh` validates the data and serves http://127.0.0.1:8000
3. Add entries: `python3 life.py log "..."` or `python3 life.py add "Heading" "Description"`

Every entry gets a LIFE tracking ID, a REG registry ID, and Dhaka + UTC timestamps.
To inherit the system, copy the whole folder. Keep `data.json` and `registry.json` together.
