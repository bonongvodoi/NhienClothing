pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage('deploy-prod') {
            steps {
                 sh 'npm run prod' 
            }
        }        
    }
}
