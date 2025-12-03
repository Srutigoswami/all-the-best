# BugSage

Monorepo for BugSage: AI-powered bug analytics and reporting platform.

## Structure
- `backend/`: Node.js + TypeScript backend (Express, Gemini AI integration)
- `frontend/`: Vite + React + TypeScript frontend (Tailwind, Framer Motion, Lottie, Recharts)
- `infra/`: Infrastructure as code and AWS scripts
- `docker-compose.yml`: Multi-service orchestration
- `.env`: Environment variables

## Milestone 4: Core Features & UI Polish

### Dashboard
- Interactive charts (Recharts) populated from `/api/analytics` (backend aggregates bugs JSON)
- Recent Bugs list with pagination

### Bug Reporting
- Form with validation
- On submit: POST to `/api/bugs` and `/api/ai/predict` to fetch predictions and update bug record
- Success Lottie animation and toast notification

### AI Playground
- Form for Title, Description, Product, Component, Priority
- Buttons for each AI function: Predict Severity, Estimate Time, Classify Type, Recommend Priority, Find Duplicates, Full Analysis
- Structured JSON response and formatted cards (severity, time estimate, category tags)
- "Copy JSON" and "Download JSON" actions

### Bug Details
- Full AI analysis and prediction history

### UI/UX Improvements
- Accessibility, responsive design, skeleton loaders, error states
- Sidebar navigation, top nav, dark mode theme switcher

### Testing
- Cypress e2e tests for key flows (Report Bug, Playground)

## How to Run

### Local Development
- See `backend/README.md` and `frontend/README.md` for setup and usage

### Containerization & Orchestration (Milestone 5)
- Multi-stage Dockerfiles for backend and frontend
- Frontend served via nginx static server
- Backend supports GEMINI_API_KEY for AI integration
- `.dockerignore` files for both services
- `docker-compose.yml` orchestrates backend and frontend
- Bind mounts for local code during development
- Pass GEMINI_API_KEY in `.env` or via docker-compose secrets
- `Makefile` for easy local stack startup:
	- `make dev` or `docker-compose up --build`

#### Example .env
```
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Example Commands
```sh
make dev
# or
docker-compose up --build
```

Both UI (http://localhost:3000) and API (http://localhost:4000) will be reachable.
AI Playground works when GEMINI_API_KEY is provided to containers.

## Milestone 7 — AWS Production Deployment (ECS Fargate, Secrets Manager, ALB)

### What Was Implemented
- Terraform templates for:
  - ECR repositories (frontend/backend)
  - ECS Cluster, Task Definitions, Services (Fargate)
  - Application Load Balancer (ALB) with HTTPS listeners and health checks
  - IAM roles for ECS tasks
  - CloudWatch log groups for backend and frontend
  - Secrets Manager for GEMINI_API_KEY (securely injected into ECS Task)
  - Autoscaling policy for backend ECS service (CPU-based)
- Scripts:
  - `infra/deploy.sh`: Authenticates to ECR, builds/pushes images, applies Terraform infra
  - `infra/destroy.sh`: Destroys all Terraform-managed infra
- Documentation:
  - `docs/aws-deploy.md`: Step-by-step AWS deployment guide
- Variables and outputs for region, VPC, subnets, ACM cert, secrets, ALB DNS, log groups

### How It Works
- On deployment, containers are built and pushed to ECR, then ECS Fargate services are created for backend and frontend.
- ALB serves the app over HTTPS, with health checks on `/health`.
- GEMINI_API_KEY is stored in Secrets Manager and injected securely.
- Logs are sent to CloudWatch.
- Autoscaling is enabled for backend service.

### Acceptance Criteria
- App is accessible via public HTTPS endpoint (ALB DNS)
- CloudWatch logs show backend logs
- ALB health check is green
- Secrets are stored in Secrets Manager
- AI Playground works when secret exists

### Files Added
- `infra/main.tf`, `infra/variables.tf`, `infra/outputs.tf`
- `infra/deploy.sh`, `infra/destroy.sh`
- `docs/aws-deploy.md`

## Milestone 8 — Observability, Testing, Docs & Handover

### What Was Implemented
- CloudWatch dashboard (docs/cloudwatch-dashboard.json) for ECS CPU, memory, ALB latency, error rate
- CloudWatch alarms (docs/cloudwatch-alarms.md) for high error rate, ECS task failures, CPU
- Centralized logs with retention policy
- k6 load test script (docs/k6-loadtest.js) for Report Bug & AI Playground
- Security docs (docs/secrets-iam.md) for secrets rotation, IAM best practices
- Architecture diagram (docs/architecture.png)
- Runbook (docs/runbook.md) with deployment, troubleshooting, cost estimation
- Handover package (handover.md) with commands, contacts, next steps
- CHANGELOG.md and RELEASE_NOTES.md for versioning and release notes

### How To Use
- Monitor metrics and alarms in CloudWatch
- Run load tests with k6 and publish results
- Follow runbook for deployment, troubleshooting, and cost estimation
- Use handover.md for access checklist and next steps
- Review security docs for secrets management and IAM policies
- See architecture diagram for system overview

### Acceptance Criteria
- Production deployment reproducible from docs
- Monitoring and alerts working
- Load test results documented
- All docs and handover package provided

### Files Added
- docs/cloudwatch-dashboard.json
- docs/cloudwatch-alarms.md
- docs/k6-loadtest.js
- docs/secrets-iam.md
- docs/architecture.png
- docs/runbook.md
- handover.md
- CHANGELOG.md
- RELEASE_NOTES.md

---
This README is updated at each milestone to reflect new features and improvements.
Milestone 8 complete. All observability, testing, docs, and handover deliverables are in place.
