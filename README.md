# nodejs-demo-app 🚀

![Docker Pulls](https://img.shields.io/docker/pulls/yagnik0167/nodejs-demo-app)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

> Automated CI/CD pipeline that builds, tests, and ships a Docker image to DockerHub on every push.

---

## ⚙️ CI/CD Pipeline

Every push to `main` triggers this automated flow:

## 🐳 Docker Versioning

| Tag       | Description            |
|-----------|------------------------|
| `latest`  | Always the newest build |
| `v1.0.0`  | Stable release          |
| `v2.0.0`  | Feature update          |

> Each push auto-generates a new versioned image — old versions are never deleted.

---

## 🔁 GitHub Actions Workflow

```yaml
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    steps:
      - Checkout Code
      - Install & Test        # npm test (13 tests)
      - Build Docker Image    # :latest + :vX.X.X
      - Push to DockerHub     # yagnik0167/nodejs-demo-app
```

---

# 🚀 Jenkins CI/CD Pipeline

This project uses a Jenkins CI/CD pipeline to automatically build, test, and deploy the application on an AWS EC2 instance using Docker.

## Pipeline Flow

```text
Developer pushes code to GitHub
        ↓
GitHub Webhook triggers Jenkins (EC2)
        ↓
Jenkins clones the latest code
        ↓
npm install & npm test
        ↓
Docker image is built
        ↓
Old container is stopped and removed
        ↓
New container is started
        ↓
Application is live at:
http://44.205.1.83:3000
```
<img width="1426" height="738" alt="image" src="https://github.com/user-attachments/assets/82054e8e-d20e-44b9-b101-f4d5ed2cc1b0" />


## Technologies

- Jenkins
- GitHub
- Docker
- Node.js
- AWS EC2

## Deployment

Every push to the GitHub repository automatically triggers Jenkins, which installs dependencies, runs tests, builds a new Docker image, replaces the old container, and deploys the latest version of the application.

---

**DockerHub →** [yagnik0167/nodejs-demo-app](https://hub.docker.com/r/yagnik0167/nodejs-demo-app)  
**Author →** [@yagnik0167](https://github.com/yagnik0167)
