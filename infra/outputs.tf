output "alb_dns_name" {
  value = aws_lb.bugsage.dns_name
}
output "cloudwatch_log_group_backend" {
  value = aws_cloudwatch_log_group.backend.name
}
output "cloudwatch_log_group_frontend" {
  value = aws_cloudwatch_log_group.frontend.name
}
output "secrets_manager_gemini_api_key" {
  value = aws_secretsmanager_secret.gemini_api_key.arn
}
