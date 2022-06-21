pipeline {
  agent any
  stages{
    stage('Build') {
      steps {
        sh 'docker build -t sdao-front ./'
      }
    }
    stage('Lagacy Remove') {
      try {
        sh 'docker rm -f sdao-front-end'
      } catch (err) {
        echo 'sdao-front-end is not defined'
      }
    }
    stage('Run') {
      steps {
        sh 'docker run -d --name sdao-front-end -p 3000:3000 sdao-front:latest'
      }
    }
  }
}