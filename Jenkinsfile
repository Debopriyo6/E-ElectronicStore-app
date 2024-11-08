pipeline {
    agent any
    
    environment {
        FRONTEND_DIR = 'frontend'  // Folder where the React app is located
        BACKEND_DIR = 'backend'    // Folder where the Spring Boot app is located
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git
                git branch: 'main', url: 'https://github.com/Debopriyo6/E-ElectronicStore-app.git'
            }
        }

        stage('Frontend - Install Dependencies') {
            steps {
                dir(FRONTEND_DIR) {
                    // Install Node.js dependencies for React frontend
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir(FRONTEND_DIR) {
                    // Build React frontend
                    sh 'npm run build'
                }
            }
        }

        stage('Backend - Build') {
            steps {
                dir(BACKEND_DIR) {
                    // Build the Spring Boot backend using Maven or Gradle
                    
                    sh './mvn clean package '  
                }
            }
        }


       

        stage('Docker Build and Push') {
            steps {
                script {
                    // Build Docker images for both frontend and backend
                    sh "docker build -t debopriyoray662001824/e-commerce:latest -f ${FRONTEND_DIR}/Dockerfile ${FRONTEND_DIR}"
                    sh "docker build -t debopriyoray662001824/e-commerce-backend:latest -f ${BACKEND_DIR}/Dockerfile ${BACKEND_DIR}"

                    // Push Docker images to Docker Hub
                    withCredentials([usernamePassword(credentialsId: '662001', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                        sh 'docker push debopriyoray662001824/e-commerce:latest'
                        sh 'docker push debopriyoray662001824/e-commerce-backend:latest'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Define your deployment steps here, e.g., Kubernetes or Docker Compose
                // For example, deploying with Kubernetes:
                sh 'kubectl apply -f k8s-frontend-deployment.yaml'
                sh 'kubectl apply -f k8s-backend-deployment.yaml'
            }
        }
    }

    post {
        always {
            // Cleanup Docker images to free up space
            sh 'docker image prune -f'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}