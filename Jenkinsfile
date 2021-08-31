pipeline {
    agent any

    environment {
        dockerImage_books = ""
        dockerImage_users = ""
        dockerImage_library = ""
        BOOK_REGISTRY = "737971166371.dkr.ecr.us-east-1.amazonaws.com/books"
        USER_REGISTRY = "737971166371.dkr.ecr.us-east-1.amazonaws.com/users"
        LIBRARY_REGISTRY = "737971166371.dkr.ecr.us-east-1.amazonaws.com/library"
        PROFILE = 'deploy'
        AWS_REGION = 'us-east-1'
        REGISTRY_CREDENTIALS = 'AWS-Access'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '30'))
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    parameters {
        string (name: 'LB_DOMAIN_NAME', defaultValue: 'a9fdea6df74814f8790f5fcb5f62f00a-434091433.us-east-1.elb.amazonaws.com', description: "Domain Name for the Ingress LoadBalancer.")
    }

    stages {
       stage('Set Environment Variable'){
            steps {
                script {
                    env.LB_DOMAIN_NAME = "${params.LB_DOMAIN_NAME}"

                }
            }
        }
        stage('Checkout & Environment Prep'){
            steps{
                script {
                    wrap([$class: 'AnsiColorBuildWrapper', colorMapName: 'xterm']){
                        withCredentials([
                            [ $class: 'AmazonWebServicesCredentialsBinding',
                                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                                credentialsId: 'AWS-Access',

                            ]])
                        {
                            try {
                                    echo "Setting Up Jump Instance."
                                    sh ("""
                                            aws configure --profile ${PROFILE} set aws_access_key_id ${AWS_ACCESS_KEY_ID}
                                            aws configure --profile ${PROFILE} set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}
                                            aws configure --profile ${PROFILE} set region ${AWS_REGION}
                                            export AWS_PROFILE=${PROFILE}
                                    """)
                            } catch (ex) {
                                echo 'Err: Build Failed with Error: ' + ex.toString()
                                currentBuild.result = "UNSTABLE"
                            }
                        }
                        
                    }
                }
            }
        }
        stage ('Docker Build'){
            parallel {
                stage("Build Book Application"){
                    steps {
                        script {
                            dir("application-one") {
                                dockerImage_users =  docker.build("${USER_REGISTRY}" + ":${env.BUILD_NUMBER}")
                            }
                        }
                    }
                }
                stage("Build User Application"){
                    steps {
                        script {
                            dir("application-two") {
                                dockerImage_books =  docker.build("${BOOK_REGISTRY}" + ":${env.BUILD_NUMBER}")
                            }
                        }
                    }
                }
                stage("Build Library Application"){
                    steps {
                        script {
                            dir("application-three") {
                                dockerImage_library =  docker.build("${LIBRARY_REGISTRY}" + ":${env.BUILD_NUMBER}")
                            }
                        }
                    }
                }
            }
        }
        stage ("Docker Push") {
            parallel {
                stage("Push Library Application"){
                    steps {
                        script {
                            docker.withRegistry("https://" + "${LIBRARY_REGISTRY}", "ecr:us-east-1:" + "${REGISTRY_CREDENTIALS}") {
                                dockerImage_library.push()
                            }
                        }
                    }
                }
                stage("Push Book Application"){
                    steps {
                        script {
                            docker.withRegistry("https://" + "${BOOK_REGISTRY}", "ecr:us-east-1:" + "${REGISTRY_CREDENTIALS}") {
                                dockerImage_books.push()
                            }
                        }
                    }
                }
                stage("Push User Application"){
                    steps {
                        script {
                            docker.withRegistry("https://" + "${USER_REGISTRY}", "ecr:us-east-1:" + "${REGISTRY_CREDENTIALS}") {
                                dockerImage_users.push()
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy Image to Kubernetes'){
            steps {
                script{
                    wrap([$class: 'AnsiColorBuildWrapper', colorMapName: 'xterm']){
                        withCredentials([
                            [ $class: 'AmazonWebServicesCredentialsBinding',
                                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                                credentialsId: 'AWS-Access',
                            ]]) {
                                dir("k8s"){
                                    sh("""
                                    export USER_REGISTRY=$USER_REGISTRY
                                    export BOOK_REGISTRY=$BOOK_REGISTRY
                                    export LIBRARY_REGISTRY=$LIBRARY_REGISTRY
                                    export IMAGE_TAG=${env.BUILD_NUMBER}
                                    export DOMAIN_NAME=$LB_DOMAIN_NAME
                                    kubectl apply -f namespace.yaml
                                    envsubst < ./gateway.yaml | kubectl apply -f -
                                    envsubst < ./deployment.yaml | kubectl apply -f -
                                    envsubst < ./service.yaml | kubectl apply -f -
                                    """)
                                }
                            }
                    }
                }
            }
        } 
    }
}