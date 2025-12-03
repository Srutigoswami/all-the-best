# BugSage Production Runbook

## Overview
- ECS Fargate deployment with ALB, CloudWatch, Secrets Manager
- Frontend and backend containers, autoscaling, secure secrets

## Deployment Steps
1. Build and push Docker images to ECR
2. Apply Terraform infra (`infra/deploy.sh`)
3. Confirm ALB DNS is public and healthy
4. Check CloudWatch logs and dashboards
5. Rotate secrets as needed

## Troubleshooting
- Check ALB health checks (`/health`)
- Review CloudWatch logs for errors
- Confirm ECS service status
- For SSL/domain, update ACM cert and Route53

## Monitoring
- CloudWatch dashboard: CPU, memory, latency, error rate
- Alarms for high error rate, task failures

## Cost Estimation
- ECS Fargate: ~$50-100/month (light usage)
- ALB: ~$20/month
- CloudWatch: ~$10/month
- Secrets Manager: ~$0.40/month per secret
- ECR: ~$0.10/GB/month
- Total: ~$80-130/month (estimate)

## Contact & Handover
- See `handover.md` for commands, contacts, next steps
