pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('deploy-prod') {
            steps {
                sh 'sudo systemctl stop nhien-app.service'
                sh 'npm run prod'
                sh 'sudo systemctl start nhien-app.service'
            }
        }        
    }
}
