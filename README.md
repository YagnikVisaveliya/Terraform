# Task 3: Infrastructure as Code (IaC) with Terraform 🏗️

![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?logo=terraform)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED?logo=docker)

> Provision and manage a Docker container using Terraform as Infrastructure as Code.

---

## ⚙️ IaC Flow

terraform init
↓
Download Docker Provider
↓
terraform plan
↓
Preview Resources
↓
terraform apply
↓
Pull Image + Run Container
↓
terraform destroy
↓
Remove Container + Image

---

## 📦 Resources Managed

| Resource | Type | Description |
|---|---|---|
| `docker_image.nodejs_app` | Docker Image | Pulls image from DockerHub |
| `docker_container.nodejs_container` | Docker Container | Runs app on port 3000 |

---

## 🔧 Terraform Commands

```bash
terraform init      # Download Docker provider
terraform validate  # Validate config syntax
terraform plan      # Preview what will be created
terraform apply     # Provision container
terraform state list # Inspect managed resources
terraform destroy   # Tear down everything
```

---

## 📄 State Management

```bash
# List all resources terraform is tracking
terraform state list

# Inspect a specific resource
terraform state show docker_container.nodejs_container
```

---

**DockerHub →** [yagnik0167/nodejs-demo-app](https://hub.docker.com/r/yagnik0167/nodejs-demo-app)
**Author →** [@YagnikVisaveliya](https://github.com/YagnikVisaveliya)