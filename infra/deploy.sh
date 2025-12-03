#!/bin/bash
set -e
# Authenticate to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL
# Build and push images
cd ../frontend
DOCKER_BUILDKIT=1 docker build -t $ECR_URL/bugsage-frontend:latest .
docker push $ECR_URL/bugsage-frontend:latest
cd ../backend
DOCKER_BUILDKIT=1 docker build -t $ECR_URL/bugsage-backend:latest .
docker push $ECR_URL/bugsage-backend:latest
# Deploy infra
cd ../infra
terraform init
terraform apply -auto-approve
