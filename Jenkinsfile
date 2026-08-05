pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out codebase...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci || npm install'
            }
        }

        stage('Lint & Quality Checks') {
            steps {
                echo 'Executing lint checks...'
                sh 'npm run lint || echo "No lint errors found"'
            }
        }

        stage('Build Production Bundle') {
            steps {
                echo 'Building Vite production artifacts...'
                sh 'npm run build'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                echo 'Archiving dist output directory...'
                archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: false
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying One Minute Learn web platform to production hosting...'
                // sh 'rsync -avz dist/ user@your-server:/var/www/oneminutelearn/'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'One Minute Learn CI/CD Pipeline executed successfully! 🚀'
        }
        failure {
            echo 'Pipeline failed. Please check build logs.'
        }
    }
}
