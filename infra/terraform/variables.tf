variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  default     = "production"
}

variable "app_name" {
  description = "Application name"
  default     = "jvm-explorer"
}

variable "db_password" {
  description = "RDS PostgreSQL password"
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT signing secret"
  sensitive   = true
}

variable "domain_name" {
  description = "Domain name for the application"
  default     = ""
}
