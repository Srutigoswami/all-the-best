#!/bin/bash
# Usage: ./scripts/create-ecr-repo.sh <repo-name>
set -e
REPO_NAME=${1:-bugsage}
aws ecr create-repository --repository-name $REPO_NAME --region $AWS_REGION
