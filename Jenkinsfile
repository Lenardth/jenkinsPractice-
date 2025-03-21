pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
    }
    stages {
        // Remove the Clone Repository stage since Jenkins
        // automatically checks out code when using Jenkinsfile from SCM
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Run Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'npm test'
                }
            }
        }
        stage('Deploy to Server') {
            steps {
                sh 'pm2 restart server.js || pm2 start server.js'
            }
        }
    }
}