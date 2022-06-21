pipeline {
  agent{
      label 'nextjs'
      dockerfile true
  }
  stages{
      stage('Test') {
        steps {
          sh 'node --version'
        }
      }
  }
}