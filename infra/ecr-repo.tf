resource "aws_ecr_repository" "bugsage" {
  name = var.ecr_repo_name
}
variable "ecr_repo_name" {
  type    = string
  default = "bugsage"
}
