pipeline{
  agent any 
  triggers{
    pollSCM('H/1 * * * *')
  }
  stages{
    stage("Fetch")
          {
            steps{
              sh 'git fetch origin'
            }
          }
    stage("Build")
    {
      steps{
        echo "Build success"
      }
    }
  }
}
