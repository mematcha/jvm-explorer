# Production Runbook

## Overview

JVM Explorer production deployment on AWS ECS Fargate with RDS PostgreSQL.

## Architecture

- **Frontend**: React SPA served via nginx on ECS Fargate (2 instances)
- **Backend**: Spring Boot on ECS Fargate (2 instances)
- **Database**: RDS PostgreSQL 16 (db.t4g.micro, 20GB)
- **Load Balancer**: ALB with HTTPS (ACM certificate)
- **Monitoring**: CloudWatch dashboards and alarms

## Deployment

### Prerequisites
- AWS CLI configured
- Terraform >= 1.5
- Docker

### Initial Setup

```bash
cd infra/terraform
terraform init
terraform plan -var="db_password=..." -var="jwt_secret=..."
terraform apply -var="db_password=..." -var="jwt_secret=..."
```

### CI/CD
GitHub Actions automatically:
1. Builds Docker images
2. Pushes to ECR
3. Updates ECS services

Manual deploy:
```bash
aws ecs update-service --cluster jvm-explorer-production --service jvm-explorer-backend --force-new-deployment
```

## Backups

### RDS
- Automated daily backups (7-day retention)
- Final snapshot on stack deletion
- Manual backup: `aws rds create-db-snapshot --db-instance-identifier jvm-explorer-production --db-snapshot-identifier manual-$(date +%Y-%m-%d)`

### Restore
```bash
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier jvm-explorer-restored \
  --db-snapshot-identifier <snapshot-id> \
  --vpc-security-group-ids <sg-id> \
  --db-subnet-group-name <subnet-group>
```

## Monitoring

### CloudWatch Dashboards
- **jvm-explorer-production**: ECS CPU/Memory, RDS connections/latency

### Alarms
- Backend CPU > 80% for 2+ minutes
- Backend Memory > 80% for 2+ minutes

### Logs
- Backend: `/ecs/jvm-explorer/backend` (30-day retention)
- Frontend: `/ecs/jvm-explorer/frontend` (30-day retention)

## Scaling

### ECS
- Increase `desired_count` in Terraform
- Update `cpu`/`memory` in task definition
- `terraform apply` after changes

### RDS
- Modify `instance_class` in Terraform
- Expected downtime: ~5 minutes during modification

## Disaster Recovery

### Recovery Points
- RDS automated backups: up to 7 days
- Source code: GitHub (always current)
- Docker images: ECR (immutable tags by commit SHA)

### Recovery Steps
1. `terraform apply` to rebuild infrastructure
2. Restore RDS from latest snapshot
3. GitHub Actions deploys latest images
4. Update DNS to point to new ALB

### Security
- JWT secrets stored in SSM Parameter Store (SecureString)
- Database password in SSM Parameter Store (SecureString)
- All traffic encrypted via HTTPS (TLS 1.3)
- Security groups limit ingress to ALB only
- RDS in private subnets (no public access)

## Costs (Estimated)

| Service | Estimated Monthly |
|---------|------------------|
| ECS Fargate (2 backend + 2 frontend) | ~$60 |
| RDS db.t4g.micro | ~$15 |
| ALB | ~$20 |
| NAT Gateway | ~$35 |
| Total | ~$130 |

## Troubleshooting

### Backend not starting
Check logs: `aws logs get-log-events --log-group-name /ecs/jvm-explorer/backend --log-stream-name <stream>`

### High CPU/Memory
- Check CloudWatch alarms
- Scale up task CPU/memory in Terraform
- Add more desired count

### Database connection issues
- Verify RDS is accessible from backend security group
- Check RDS Connection pool in CloudWatch
- Verify credentials in SSM Parameter Store
