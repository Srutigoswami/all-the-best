# Security & Secrets Management

## Secrets Rotation
- Use AWS Secrets Manager rotation policies for GEMINI_API_KEY
- Rotate keys regularly and update ECS Task Definitions

## IAM Policies
- ECS tasks use least privilege IAM roles
- Only allow access to required resources (ECR, Secrets Manager, CloudWatch)
- Do not allow wildcard permissions

## Best Practices
- Never commit secrets to repo
- Use `.env.example` for local dev, document secret storage for prod
