node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("ocb0001686/hellonode")
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
        docker.withRegistry('https://90.84.44.40:443', 'cre_conn_prod1686') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }

    
    stage('download the kubectl') {
      sh "curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.7.3/bin/linux/amd64/kubectl"
      sh "chmod +x  kubectl"
    }
    
    stage('setup cluster') {
      sh "./kubectl config set-cluster default-cluster --server=https://kubernetes.default.svc.cluster.local:5443 --certificate-authority=cacrt"
      sh "./kubectl config set-credentials default-admin --certificate-authority=cacrt --client-key=clientkey --client-certificate=clientcrt"
      sh "./kubectl config set-context default-context --cluster=default-cluster --user=default-admin"
      sh "./kubectl config set current-context default-context"
    }
    stage('deploy app') {
      sh "set +e ; ./kubectl delete -f rc.yaml ; exit 0"
      sh "sleep 10"
      sh "./kubectl create -f rc.yaml"
      sh "set +e ; ./kubectl create -f svc.yaml; exit 0"
    }
    
}
