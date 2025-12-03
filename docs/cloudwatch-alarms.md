# CloudWatch Alarms & Monitoring

## Alarms
- High error rate (ALB 5XX): triggers SNS notification
- ECS task failure: triggers SNS notification
- High CPU utilization: triggers SNS notification

## Setup
- Use AWS Console or Terraform to create alarms on metrics:
  - `AWS/ApplicationELB/HTTPCode_Target_5XX_Count`
  - `AWS/ECS/CPUUtilization`
  - `AWS/ECS/ServiceTaskFailures`
- Configure SNS topic and subscriptions for alerting.

## Log Retention
- CloudWatch log groups set to 7 days by default (see infra/main.tf)
- Can be adjusted in Terraform.
