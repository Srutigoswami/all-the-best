# AWS Production Deployment Guide (ECS Fargate)

## Prerequisites
- AWS CLI configured
- Terraform installed
- Docker installed
- AWS account with permissions for ECS, ECR, ALB, Secrets Manager, IAM, CloudWatch

## Steps

### 1. Authenticate to ECR
```
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL
```

### 2. Build and Push Docker Images
```
cd frontend
DOCKER_BUILDKIT=1 docker build -t $ECR_URL/bugsage-frontend:latest .
docker push $ECR_URL/bugsage-frontend:latest
cd ../backend
DOCKER_BUILDKIT=1 docker build -t $ECR_URL/bugsage-backend:latest .
docker push $ECR_URL/bugsage-backend:latest
```

### 3. Deploy Infrastructure
```
cd infra
terraform init
terraform apply -auto-approve
```

### 4. Confirm Services
- Go to AWS ECS console, check services are running and healthy
- ALB DNS name will serve the app over HTTPS
- Health checks: `/health` endpoint for backend

### 5. Configure Autoscaling
- ECS service autoscaling is set for backend (CPU > 50%)
- Adjust in `main.tf` as needed

### 6. Logs & Secrets
- Backend and frontend logs in CloudWatch
- GEMINI_API_KEY stored in Secrets Manager and injected into ECS Task

### 7. Destroy Infrastructure
```
cd infra
./destroy.sh
```

---

## Troubleshooting
- Check CloudWatch logs for errors
- Ensure secrets are set in Secrets Manager
- Confirm ALB health check is green
- For domain/SSL, set ACM certificate ARN and Route53 record in variables
