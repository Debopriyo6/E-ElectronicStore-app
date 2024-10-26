pipeline{
  agent any 
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
