pipeline {
    agent any // Specifies that Jenkins can use any available agent to run the pipeline

    environment {
        // Define environment variables for your pipeline
        // EXAMPLE_REGISTRY = "your-docker-registry.com" // e.g., gcr.io/your-project-id
        // EXAMPLE_IMAGE_NAME = "orgcentral-simplified"
        // EXAMPLE_DOCKER_CREDENTIALS_ID = "your-docker-registry-credentials-id" // Jenkins credential ID
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from your Source Code Management (SCM)
                // This step is often configured in the Jenkins job UI or uses a default SCM plugin behavior
                // For a direct git checkout:
                // git url: 'https://your-git-repository.com/your-app.git', branch: 'main'
                echo 'Checking out code...'
                // If Jenkins handles checkout via SCM configuration, this step might just confirm.
            }
        }

        stage('Lint & Type Check') {
            steps {
                // Use a node image to ensure consistency, or ensure Node.js is on the agent
                // Example: sh 'docker run --rm -v $(pwd):/app -w /app node:20-alpine sh -c "npm install && npm run lint && npm run typecheck"'
                echo 'Running linters and type checkers...'
                sh 'npm install' // Installs devDependencies needed for linting/typechecking
                sh 'npm run lint'
                sh 'npm run typecheck'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = "orgcentral-simplified" // Or use env.EXAMPLE_IMAGE_NAME
                    def imageTag = "${env.BUILD_NUMBER ?: 'latest'}"
                    // def fullImageName = "${env.REGISTRY ? env.REGISTRY + '/' : ''}${imageName}:${imageTag}"
                    // Using a simpler name for now if no registry is configured
                    def fullImageNameWithBuildNumber = "${imageName}:${imageTag}"
                    def fullImageNameLatest = "${imageName}:latest"

                    echo "Building Docker image: ${fullImageNameWithBuildNumber} and ${fullImageNameLatest}"
                    sh "docker build -t ${fullImageNameWithBuildNumber} -t ${fullImageNameLatest} ."
                }
            }
        }

        // Optional: Stage to push image to a Docker registry
        /*
        stage('Push Docker Image') {
            // 'when' condition can be used to run this stage only for specific branches, e.g., main
            // when { branch 'main' }
            steps {
                script {
                    def imageName = env.EXAMPLE_IMAGE_NAME
                    def imageTag = env.BUILD_NUMBER
                    def registry = env.EXAMPLE_REGISTRY
                    def fullImageName = "${registry}/${imageName}:${imageTag}"
                    def latestImageName = "${registry}/${imageName}:latest"

                    // Ensure DOCKER_CREDENTIALS_ID is set up in Jenkins and in environment block
                    // docker.withRegistry("https://${registry}", DOCKER_CREDENTIALS_ID) {
                    //     sh "docker push ${fullImageName}"
                    //     sh "docker push ${latestImageName}" // Optionally push a 'latest' tag
                    // }
                    echo "Pushing Docker image ${fullImageName} and ${latestImageName}..."
                    echo "Implement actual 'docker push' commands here if a registry is configured."
                }
            }
        }
        */

        stage('Deploy') {
            // This stage is highly dependent on your deployment target (e.g., Kubernetes, ECS, Cloud Run, simple Docker host)
            steps {
                echo 'Deploying application...'
                // Placeholder: Replace with your actual deployment commands
                // Example for a simple Docker host via SSH:
                // sh "ssh user@your-server.com 'docker pull my-image:latest && docker stop my-app-container || true && docker rm my-app-container || true && docker run -d --name my-app-container -p 3000:3000 my-image:latest'"
                echo "Deployment steps need to be customized for your environment."
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
            // Clean up workspace, send notifications, etc.
            // cleanWs() // Deletes the workspace from the Jenkins agent if desired
        }
        success {
            echo 'Pipeline succeeded!'
            // Add notification steps here (e.g., email, Slack)
        }
        failure {
            echo 'Pipeline failed.'
            // Add notification steps here
        }
    }
}
