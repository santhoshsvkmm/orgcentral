
pipeline {
    agent any // You can specify a Docker agent if your Jenkins environment is set up for it: agent { docker { image 'node:20-alpine' } }

    environment {
        // Define any environment variables needed for your build
        // Example: GOOGLE_API_KEY = credentials('your-google-api-key-credential-id')
        // Ensure this credential ID is set up in Jenkins
        // For sensitive data, always use Jenkins credentials
        REGISTRY = "your-docker-registry" // Replace with your Docker registry URL (e.g., your-docker-hub-username/your-repo-name)
        IMAGE_NAME = "orgcentral-simplified"
        // BUILD_NUMBER will be provided by Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from SCM (e.g., Git)
                // Example: git 'https://your-repo-url.git'
                echo 'Checking out code...'
                // Placeholder: Replace with your actual SCM checkout command
                sh 'git version' // Example command
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                // It's good practice to use a clean workspace or ensure node_modules is not checked in
                sh 'npm ci' // 'ci' is generally preferred for CI environments for reproducible builds
            }
        }

        stage('Lint and Test') {
            steps {
                echo 'Running linters and tests...'
                sh 'npm run lint'
                // sh 'npm run test' // Uncomment if you have a test script
            }
        }

        stage('Build Next.js App') {
            steps {
                echo 'Building Next.js application...'
                // Ensure environment variables required at build time are available
                // Example: if you need GOOGLE_API_KEY during build:
                // sh 'GOOGLE_API_KEY=${GOOGLE_API_KEY} npm run build'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image ${IMAGE_NAME}:${env.BUILD_NUMBER}..."
                // If your registry requires login, you might need a withCredentials block here
                // Example for Docker Hub:
                // withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                //     sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                // }
                sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} ."
                sh "docker tag ${IMAGE_NAME}:${env.BUILD_NUMBER} ${REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
                sh "docker tag ${IMAGE_NAME}:${env.BUILD_NUMBER} ${REGISTRY}/${IMAGE_NAME}:latest"
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Pushing Docker image ${REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER} and :latest..."
                // Ensure Docker is logged in if your registry is private (see previous stage example)
                sh "docker push ${REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
                sh "docker push ${REGISTRY}/${IMAGE_NAME}:latest"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // This stage is highly dependent on your deployment environment
                // Example: Kubectl apply, SSH to a server and docker-compose up, etc.
                // sh 'kubectl apply -f k8s-deployment.yaml'
                // sh 'ssh user@your-server "cd /path/to/app && docker-compose pull && docker-compose up -d"'
                echo "Deployment steps would go here for image ${REGISTRY}/${IMAGE_NAME}:latest"
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
            // Clean up workspace or Docker images if necessary
            // Example: sh 'docker rmi ${IMAGE_NAME}:${env.BUILD_NUMBER}' // If you don't need the tagged build locally on the agent
            // sh 'docker rmi ${REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}'
            // sh 'docker rmi ${REGISTRY}/${IMAGE_NAME}:latest'
            cleanWs() // Jenkins directive to clean up the workspace
        }
        success {
            echo 'Pipeline succeeded!'
            // Optionally send a success notification
            // mail to: 'dev-team@example.com',
            //      subject: "SUCCESS: Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
            //      body: "Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER} completed successfully. View console: ${env.BUILD_URL}console"
        }
        failure {
            echo 'Pipeline failed!'
            emailext (
                subject: "FAILURE: Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """<p>Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER} failed.</p>
                         <p>Check console output: <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
                         <p>Changes:</p>
                         <verbatim>${currentBuild.changeSets.collect { it.msg + ' (' + it.author + ')' }.join('\\n')}</verbatim>""",
                to: 'your-email@example.com, another-email@example.com', // Replace with your recipient list
                mimeType: 'text/html'
            )
        }
        aborted {
            echo 'Pipeline was aborted.'
            // Optionally send a notification for aborted builds
             emailext (
                subject: "ABORTED: Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """<p>Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER} was aborted.</p>
                         <p>Check console output: <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>""",
                to: 'your-email@example.com', // Replace with your recipient list
                mimeType: 'text/html'
            )
        }
    }
}
