pipeline {
    agent any

    triggers{
      pollSCM('H/1 * * * *')
    }

    environment {
        DOCKER_HUB_CREDENTIALS = '662001'  // Jenkins credential ID for Docker Hub
        DOCKER_IMAGE = 'debopriyoray662001824/e-commerce:latest'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Pull your project code
                git branch: 'main', url: 'https://github.com/Debopriyo6/E-ElectronicStore-app.git'
            }
        }

        stage('Build Project') {
            steps {
                // Run your build commands here, e.g., if you're building a React frontend or other
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Log in to Docker Hub
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    }
                    // Push image to Docker Hub
                    sh "docker push ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Deploy to Tomcat Server') {
            steps {
                script {
                    // Stop existing container if it's running
                    sh "docker stop tomcat_container || true"
                    sh "docker rm tomcat_container || true"
                    
                    // Run new container from the pushed image
                    sh "docker run -d --name tomcat_container -p 8080:8080 ${DOCKER_IMAGE}"
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images on Jenkins to save space
            sh 'docker system prune -f'
        }
        success {
            echo 'Deployment succeeded!!'
        }
        failure {
            echo 'Deployment failed!!'
        }
    }
}
