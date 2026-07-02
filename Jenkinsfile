//  Jenkinsfile for Task-2
pipeline {
    
    agent any

    environment {
        IMAGE_NAME = 'task-2'
        CONTAINER_NAME = 'task-2-container'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
                echo 'Source code checked out successfully.'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                echo 'Dependencies installed successfully.'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
                echo 'Tests executed successfully.'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker rmi ${IMAGE_NAME}:latest || true
                    docker build -t ${IMAGE_NAME}:latest -t ${IMAGE_NAME}:v${BUILD_NUMBER} .
                """
                echo 'Docker image built successfully.'
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh """
                  docker stop ${CONTAINER_NAME} || true
                  docker rm ${CONTAINER_NAME} || true
                  docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:latest
                  docker image prune -f
                """
                echo 'Application deployed on EC2 successfully.'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed.'
        }

        always {
            echo 'Task-2 pipeline execution finished.'
        }
    }
}