pipeline {
  agent any
  stages {
    stage('master') {
      agent any
      steps {
        sh 'npm run prod'
      }
    }
  }
}