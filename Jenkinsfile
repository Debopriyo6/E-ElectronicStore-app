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
            echo 'Build successful! Deploying to Tomcat...'
            withCredentials([usernamePassword(credentialsId: 'tomcat_deployer', usernameVariable: 'deployer', passwordVariable: 'debo6')]) {
                sh '''
                    echo "Looking for WAR file..."
                    WAR_FILE=$(find backend/target -name "*.war" | head -n 1)

                    if [ -f "$WAR_FILE" ]; then
                        echo "Deploying $WAR_FILE to Tomcat..."
                        curl --upload-file "$WAR_FILE" "52.66.238.164:8080/manager/text/deploy?path=/store&update=true" \
                            --user "$TOMCAT_USER:$TOMCAT_PASS"
                    else
                        echo "WAR file not found!"
                        exit 1
                    fi
                '''
            }
        }

        failure {
            echo 'Build failed.'
}
    }
}