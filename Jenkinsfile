pipeline {
    agent any
    environment {
        IMAGE_NAME = "lenardth/nodejs-app"
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Lenardth/jenkinsPractice-.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        sh "docker tag ${IMAGE_NAME} lenardth/nodejs-app"
                        sh "docker push lenardth/nodejs-app"
                    }
                }
            }
        }
        stage('Deploy and Run Container') {
            steps {
                sh "docker stop nodejs-container || true"
                sh "docker rm nodejs-container || true"
                sh "docker run -d -p 3000:3000 --name nodejs-container ${IMAGE_NAME}"
            }
        }
    }
}
