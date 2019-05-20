node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("dafurepo/hellonode")
    }

    stage('Test image') {
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */

        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('http://registry.eu-west-0.prod-cloud-ocb.orange-business.com','swr_long_credential') {
            /*app.push("${env.BUILD_NUMBER}")*/
            app.push("1")
            app.push("latest")
        }
    }
    
    stage('deploy app') {    
        withKubeConfig(caCertificate: '', credentialsId: 'kubeconfig', serverUrl: 'https://kubernetes.default.svc.cluster.local:5443') {
        // someblock
        sh 'set +e; kubectl delete -f svc.yaml; exit 0'
        sh 'set +e; kubectl delete -f rc.yaml; exit 0'        
        sh 'sleep 10'
        sh 'set +e; kubectl create -f rc.yaml;exit 0'
        sh 'set +e; kubectl create -f svc.yaml; exit 0'
        }
    }
}
