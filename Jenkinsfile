pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('deploy-prod') {
            steps {
                 sh 'npm install'
                 sh 'node_modules/.bin/pm2 list all'
            }
        }        
    }
}
