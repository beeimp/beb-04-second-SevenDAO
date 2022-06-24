pipeline {
  agent any
  stages{
    stage('Lagacy Remove') {
      steps{
        script{
          try {
            sh 'docker rmi -f sdao-project:latest'
          } catch (err) {
            echo 'sdao-project:latest is not defined'
          }
        }
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t sdao-project ./'
      }
    }
    stage('Run') {
      steps {
        sh 'docker run -d --name sdao-project -p 3000:3000 sdao-project:latest'
      }
    }
  }
}