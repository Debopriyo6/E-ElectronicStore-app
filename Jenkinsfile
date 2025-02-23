pipeline{

    agent any

    environment{
        NODEJS_HOME = tool name: 'NodeJS'
        JAVA_HOME = tool name: 'Java'
        MVN_HOME tool name: 'Maven'
    }

    stages{
        stage('Git checkout'){
            steps{
                git branch: 'main' , url : 'https://github.com/Debopriyo6/E-ElectronicStore-app.git'
            }
        }

        stage('Build frontend'){
            steps{
                dir('frontend'){
                    withEnv(["PATH+NODE=$NODEJS_HOME/bin"]){
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Build backend'){
            steps{
                dir('backend'){
                    withEnv(["PATH+MAVEN=$MVN_HOME/bin"]){
                        sh 'mvn clean install'
                    }
                }
            }
        }

        post{
            success{
                echo 'Build successful'
            }

            failure{
                echo 'Build failed'
            }
        }
    }
}