variable "aws_region" { default = "us-east-1" }
variable "vpc_id" {}
variable "public_subnets" { type = list(string) }
variable "private_subnets" { type = list(string) }
variable "acm_certificate_arn" { default = "" }
variable "gemini_api_key" { default = "" }
