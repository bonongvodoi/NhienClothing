pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('deploy-prod') {
            steps {
                 sh 'npm run prod'
            }
        }        
    }
}
