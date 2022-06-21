pipeline {
  agent any
  stages{
    stage('Build') {
      steps {
        sh 'docker build -t beeimp/sdao-front'
      }
    }
    stage('Run') {
      steps {
        sh 'docker run -d --name sdao-front-end -p 3000:3000 beeimp/sdao-front:latest'
      }
    }
  }
}