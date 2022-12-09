@Library('jenkins-library' ) _

def pipeline = new org.js.AppPipeline(
    steps: this,
    buildDockerImage: 'build-tools/node:16-pnpm7',
    npmRegistries: [:],
    packageManager: 'pnpm',
    disableSecretScanner: true,
    testCmds: ['npx codeceptjs run --plugins allure'],
    gitUpdateSubmodule: true)
pipeline.runPipeline()
