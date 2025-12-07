# BugSage

![BugSage Logo](bugsage.png)

> **AI-powered bug analytics and reporting platform — built for modern teams.**

---

## 🚀 What is BugSage?
BugSage is your all-in-one solution for tracking, analyzing, and resolving bugs with the power of AI. From smart dashboards to predictive analytics, BugSage helps you ship better software, faster.

---

## 🏗️ Project Structure
- **backend/**: Node.js + TypeScript backend (Express, Gemini AI integration)
- **frontend/**: Vite + React + TypeScript frontend (Tailwind, Framer Motion, Lottie, Recharts)
- **infra/**: Infrastructure as code and AWS scripts
- **docker-compose.yml**: Multi-service orchestration
- **.env**: Environment variables
- **.github/workflows/**: CI/CD workflows
- **scripts/**: Utility scripts (e.g., create ECR repo)

---

## ✨ Features
- **Dashboard**: Interactive charts, bug analytics, recent bugs list
- **Bug Reporting**: Smart forms, instant AI predictions, success animations
- **AI Playground**: Try all AI-powered bug analysis tools in one place
- **Bug Details**: Full AI analysis and prediction history
- **UI/UX**: Responsive, accessible, dark mode, skeleton loaders, error states
- **Testing**: Cypress e2e tests for key flows
- **Containerization**: Multi-stage Dockerfiles, docker-compose, Makefile
- **CI/CD**: Automated build, test, security scan, and push to AWS ECR

---

## 🛠️ How to Set Up (Step-by-Step)

### 1. Prerequisites
- Node.js 20.x and npm
- Docker & Docker Compose
- AWS account (for ECR)
- GitHub account

### 2. Clone the Repository
```sh
git clone https://github.com/Adityism/BugSage-AI.git
cd BugSage-AI
```

### 3. Set Up Environment Variables
Create a `.env` file in the root and add your Gemini API key:
```sh
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Install Dependencies
#### Backend
```sh
```sh
cd backend
npm test
```
#### Frontend
```sh
cd ../frontend
npm test
```

### 7. Lint Code
#### Backend
```sh
cd backend
npm run lint
```
#### Frontend
```sh
cd ../frontend
npm run lint
```

### 8. Build Docker Images Locally
```sh
docker-compose build
```

### 9. Push Images to AWS ECR (CI/CD)
- GitHub Actions will build and push Docker images to ECR on push to `main`.
- Required GitHub Secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `ECR_REPOSITORY`
  - `GEMINI_API_KEY` (for CI-only tests if needed)
- Add these secrets in your repo: Settings > Secrets and variables > Actions.

### 10. Create ECR Repository (Manual or Automated)
#### Bash Script
```sh
./scripts/create-ecr-repo.sh bugsage
```
#### Terraform
Edit `infra/ecr-repo.tf` and apply with your AWS credentials.
#### CloudFormation
Use `infra/ecr-repo.yaml` in AWS Console.

### 11. Security Scan (Trivy)
- Trivy scan runs automatically in CI/CD pipeline for Docker images.

---

## ⚡ CI/CD Pipeline
- `.github/workflows/ci.yml`: Lint, test for backend & frontend on PR and push to main.
- `.github/workflows/build-and-push.yml`: Build Docker images, push to ECR, Trivy scan.

---

## 🧩 Troubleshooting
- Ensure Node.js 20.x is installed for Vite compatibility.
- If PostCSS errors occur, use `.cjs` config and install `@tailwindcss/postcss`.
- Make sure `.env` is present and GEMINI_API_KEY is set.
- For Docker issues, check Dockerfile and docker-compose.yml for correct paths and environment variables.

---

Welcome to BugSage — let’s squash bugs with AI!
