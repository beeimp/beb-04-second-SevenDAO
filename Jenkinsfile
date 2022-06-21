pipeline {
  agent{
      label 'docker'
  }
  stages{
      stage('Build') {
        steps {
          sh 'docker build -f Dockerfile -t sdao-front'
        }
      }
  }
  stages{
    stage('Run') {
      steps {
        sh 'docker run -d --name sdao-front-end -p 3000:3000 sdao-front/latest'
      }
    }
  }
}