pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'nodejs'
        JAVA_HOME = tool name: 'Java'
        MVN_HOME = tool name: 'Maven'
    }

    stages {
        stage('Git checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Debopriyo6/E-ElectronicStore-app.git'
            }
        }

        stage('Build frontend') {
            steps {
                dir('frontend') {
                    withEnv(["PATH+NODE=$NODEJS_HOME/bin"]) {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Move Frontend Build to Backend') {
            steps {
                sh 'mkdir -p backend/src/main/resources/static'
                sh 'rm -rf backend/src/main/resources/static/*'
                sh 'cp -r frontend/build/* backend/src/main/resources/static/'
            }
        }

        stage('Build backend') {
            steps {
                dir('backend') {
                    withEnv(["PATH+MAVEN=$MVN_HOME/bin"]) {
                        sh 'mvn clean install -DskipTests'
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                echo 'Build successful! Uploading WAR via SSH...'

                def remote = [
                    name: 'dockerhost', // change this to your actual SSH server ID
                    sourceFiles: 'backend/target/*.war',
                    removePrefix: 'backend/target',
                    remoteDirectory: '/home/dokeradmin',
                    execCommand: ''
                ]

                publishOverSsh(
                    publishers: [remote],
                    continueOnError: false,
                    failOnError: true,
                    alwaysPublishFromMaster: false,
                    verbose: true
                )
            }
        }

        failure {
            echo 'Build failed.'
        }
    }
}