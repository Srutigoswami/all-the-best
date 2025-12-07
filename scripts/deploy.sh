#!/bin/bash

# BugSage - EC2 Deployment Script

set -e

echo "========================================"
echo "   BugSage - EC2 Auto Deployment"
echo "========================================"

# 1. Update System
echo "[1/4] Updating system..."
sudo apt-get update && sudo apt-get upgrade -y

# 2. Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "[2/4] Installing Docker..."
    sudo apt-get install -y ca-certificates curl gnupg
    
    # Add Docker's official GPG key:
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    # Add the repository to Apt sources:
    echo \
      "deb [arch=\"$(dpkg --print-architecture)\" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
else
    echo "[2/4] Docker already installed."
fi

# Ensure current user can run docker
if ! groups $USER | grep &>/dev/null 'docker'; then
    echo "Adding $USER to docker group..."
    sudo usermod -aG docker $USER
    echo "You may need to log out and back in for this to take effect."
    echo "Ref: 'newgrp docker'"
fi

# 3. Check for .env
echo "[3/4] Checking Configuration..."
if [ ! -f .env ]; then
    echo "Creating .env file from example or prompts..."
    read -p "Enter GEMINI_API_KEY: " API_KEY
    echo "GEMINI_API_KEY=$API_KEY" > .env
else
    echo ".env file found."
fi

# 4. Start Application
echo "[4/4] Starting Application..."
# Using docker compose (modern syntax with plugin)
sudo docker compose up -d --build

echo ""
echo "========================================"
echo "   Deployment Complete!"
echo "========================================"
echo "App running on port 3000 (Frontend) and 4000 (Backend)"
echo "Use 'docker compose logs -f' to view logs."
