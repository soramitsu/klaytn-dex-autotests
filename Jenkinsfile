@Library('jenkins-library')

String agentImage            = 'node:16-pnpm7'
String registryUrl           = 'https://docker.soramitsu.co.jp'
String registryCredentialsId = 'bot-build-tools-ro'

pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        disableConcurrentBuilds()
    }
    agent any
    stages {
        stage('Run tests') {
            steps {
                script {
                    docker.withRegistry( registryUrl, registryCredentialsId ){
                        docker.image( "docker.soramitsu.co.jp/build-tools/" + agentImage ).inside(){
                            sh '''
                                pnpm i
                                npx codeceptjs run --plugins allure
                            '''
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                allure report: 'allure_reports', results: [[path: 'allure-results']]
            }
        }
        cleanup {
            script {
                cleanWs()
            }
        }
    }
}
