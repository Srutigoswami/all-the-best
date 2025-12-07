# BugSage - EC2 Execution Guide

This file contains the exact steps to deploy BugSage on an AWS EC2 instance (Ubuntu).

## 1. Connect to EC2
SSH into your Ubuntu instance:
```bash
ssh -i "your-key.pem" ubuntu@your-ec2-ip
```

## 2. Clone Repository
Get the project code:
```bash
git clone https://github.com/Adityism/BugSage-AI.git
cd BugSage-AI
```

## 3. Run Deployment Script
We have a unified script that installs Docker, configures the environment, and starts the app.

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Run it
./scripts/deploy.sh
```

**What happens next?**
1. System updates.
2. Docker & Docker Compose installation (if missing).
3. Prompts for your `GEMINI_API_KEY`.
4. Builds and starts the application.

## 4. Verify & Access
Check functionality:

```bash
# Check containers
docker ps

# View logs
docker-compose logs -f
```

Access in your browser:  
**`http://YOUR_EC2_IP:3000`**

---
---

## 5. Updating the App (Redeploy)
If you have pushed new code (like the recent fixes):

```bash
# 1. Pull changes
git pull origin main

# 2. Rebuild and Restart
docker-compose down
docker-compose up -d --build
```
*Note: The recent "Reverse Proxy" fix requires a rebuild. This resolves API connection issues on EC2.*

## 6. Troubleshooting
**"Connection Refused" or API issues?**
- We now use a **Reverse Proxy**. The Frontend connects to `/api/`, which Nginx forwards to the Backend.
- If you see errors, ensure you have run `docker-compose up -d --build` to update the Nginx configuration.

