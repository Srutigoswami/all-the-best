# BugSage Backend

## Setup

### Local Development
```
cd backend
npm install
npm run dev
```

### Docker Build
```
docker build -t bugsage-backend ./backend
```

### Run
```
docker run -p 4000:4000 --env-file .env bugsage-backend
```

## Endpoints
### Health & Bugs
- `GET /health` — Health check
- `GET /api/bugs` — List bugs
- `POST /api/bugs` — Add bug

### AI Endpoints
- `POST /api/ai/predict` — Returns severity, estimated_time_hours, bug_type
	- Payload: `{ "title": "...", "description": "..." }`
- `POST /api/ai/summary` — Returns summary text
	- Payload: `{ "title": "...", "description": "..." }`
- `POST /api/ai/duplicates` — Returns duplicate bug list
	- Payload: `{ "title": "...", "description": "..." }`

## Gemini API
- Requires `GEMINI_API_KEY` in `.env` (see `.env.example`).
- If no key, returns mocked responses.
