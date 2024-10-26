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
      step{
        echo "Build success"
      }
    }
  }
}
