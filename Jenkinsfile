pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('deploy-prod') {
            steps {
                 sh 'npm install'
                 sh 'pm2 list all'
            }
        }        
    }
}
