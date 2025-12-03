# BugSage — Super Simple Setup Guide

This guide explains every step to get BugSage running, from local dev to AWS production. No step skipped!

---

## 1. Change the Directory

cd BugSage-AI
```

---

## 2. Install Node.js and npm
- Download Node.js 20.x from [nodejs.org](https://nodejs.org/)
- Install it (follow instructions for your OS)
- Check install:
```sh
node -v
npm -v
```

---

## 3. Install Docker & Docker Compose
- Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
- Install and start Docker
- Check install:
```sh
docker --version
docker-compose --version
```

---

## 4. Set Up Environment Variables
- In the project root, create a file named `.env`
- Add your Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 5. Install Dependencies
### Backend
```sh
cd backend
npm install
```
### Frontend
```sh
cd ../frontend
npm install
```

---

## 6. Run Locally (Dev Mode)
Go to the project root:
```sh
cd .. # if you are in backend or frontend
make dev
# or
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

---

## 7. Run Tests
### Backend
```sh
cd backend
npm test
```
### Frontend
```sh
cd ../frontend
npm test
```

---

## 8. Lint Code
### Backend
```sh
cd backend
npm run lint
```
### Frontend
```sh
cd ../frontend
npm run lint
```

---

## 9. Build Docker Images Locally
Go to the project root:
```sh
cd .. # if you are in backend or frontend
docker-compose build
```

---

## 10. AWS Production Deployment
### Prerequisites
- AWS account
- AWS CLI installed and configured
- Terraform installed
- Docker installed

### Steps
1. Authenticate to ECR:
```sh
aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-ecr-url>
```
2. Build and push images:
```sh
cd frontend
DOCKER_BUILDKIT=1 docker build -t <your-ecr-url>/bugsage-frontend:latest .
docker push <your-ecr-url>/bugsage-frontend:latest
cd ../backend
DOCKER_BUILDKIT=1 docker build -t <your-ecr-url>/bugsage-backend:latest .
docker push <your-ecr-url>/bugsage-backend:latest
```
3. Deploy infra:
```sh
cd ../infra
terraform init
terraform apply -auto-approve
```
4. Check ALB DNS name in AWS Console — your app is live!

---

## 11. Monitoring & Logs
- CloudWatch dashboard: see docs/cloudwatch-dashboard.json
- Alarms: see docs/cloudwatch-alarms.md
- Logs: CloudWatch log groups for backend and frontend

---

## 12. Load Testing
- Install k6: https://k6.io/docs/getting-started/installation/
- Run load test:
```sh
k6 run docs/k6-loadtest.js -e BASE_URL=https://your-alb-url
```

---

## 13. Security & Secrets
- Never commit secrets to repo
- Use AWS Secrets Manager for GEMINI_API_KEY in production
- See docs/secrets-iam.md for best practices

---

## 14. Documentation & Handover
- Architecture diagram: docs/architecture.png
- Runbook: docs/runbook.md
- Handover: handover.md
- Changelog: CHANGELOG.md
- Release notes: RELEASE_NOTES.md

---

## 15. Troubleshooting
- If something fails, check CloudWatch logs
- Make sure .env is set
- Check ALB health checks (`/health`)
- Review runbook and docs for help

---

## 16. Cost Estimation
- See docs/runbook.md for AWS monthly cost ballpark

---

## 17. Final Checklist
- All steps above completed
- App running locally and on AWS
- Monitoring and alerts working
- Load test results documented
- All docs and handover package provided

---

**You did it! BugSage is live. If you need help, check the docs or reach out to the project owner.**
