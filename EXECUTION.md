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
*Note: Ensure your EC2 Security Group allows Inbound Traffic on ports 3000 (Frontend) and 4000 (Backend).*
