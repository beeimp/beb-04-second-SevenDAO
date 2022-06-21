pipeline {
  agent any
  stages{
    stage('Lagacy Remove') {
      steps{
        script{
          try {
            sh 'docker rm -f sdao-front-end'
          } catch (err) {
            echo 'sdao-front-end is not defined'
          }
        }
        script{
          try {
            sh 'docker rmi -f sdao-front:latest'
          } catch (err) {
            echo 'sdao-front:latest is not defined'
          }
        }
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t sdao-front ./'
      }
    }
    stage('Run') {
      steps {
        sh 'docker run -d --name sdao-front-end -p 3000:3000 sdao-front:latest'
      }
    }
  }
}