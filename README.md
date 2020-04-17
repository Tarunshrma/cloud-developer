# Udagram Microservice App

[![Build Status](https://travis-ci.org/github/Tarunshrma/cloud-developer?branch=develop-microservice-project-03)](https://travis-ci.org/github/Tarunshrma/cloud-developer)

> Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to    register and log into a web client, post photos to the feed, and process photos using an image filtering microservice. Microservices are deployed to AWS EKS to manage microservices containers.


- Technical Specifications
  - Tools & Technologies
  - Design Architecture
  - Environment Setup and Instllation
  - Project Detail 
- Run Locally Using Docker Compose
- Run On Cloud Using AWS EKS

# Technical Specifications
### Tools & Technologies
* Ionic - Frontend
* node.js - Backend
* Postgres - Database
* AWS S3 - Media Storage for images
* NGINX - Reverse Proxy
* Docker - Build docker images.
* Kubernets - Container Orchestration tool.
* AWS EKS - AWS Service to manage K8s cluster.

### Design Architecture

![Udagram Deisgn](https://github.com/Tarunshrma/cloud-developer/blob/develop-microservice-project-03/course-03/Screenshots/Udagram%20Design.png)

### Instllation

Test that your installation was Successful with the following commands:  
`docker --version`  
`aws --version`  
`eksctl version`  
`kubectl version --short --client`  

### Setup Environment Variables
Open your bash profile to store your application variables at OS level to use them within and across applications: 
```
open ~/.profile
```

Copy and Paste the bash scripts bellow with your values:
```
export POSTGRES_USERNAME=your postgress username;
export POSTGRES_PASSWORD=your postgress password;
export POSTGRES_DB_NAME=your postgress database;
export POSTGRESS_HOST=your postgress host;
export AWS_REGION=your aws region;
export AWS_PROFILE=your aws profile;
export AWS_BUCKET=your aws bucket name;
export JWT_SIGNED_TOKEN=your jwt secret;
```
Source your .profile to execute your bash scripts automatically whenever a new interactive shell is started:
```
source ~/.profile
```  

### Setup Docker Enviroment
Navigate to deployment project [udacity-c3-deployment] and build the images : 
`docker-compose -f docker-compose-build.yaml build --parallel`  

![BuildImages](https://github.com/Tarunshrma/cloud-developer/blob/develop-microservice-project-03/course-03/Screenshots/Docker_Compose.png)  
  
List your docker images to check if they have been built:
`docker images`  

![ListImages](https://github.com/Tarunshrma/cloud-developer/blob/develop-microservice-project-03/course-03/Screenshots/Docker_Images.png)  

Run your docker containers: 
`docker-compose up`  

Check your running docker containers: 
`docker container ls`  

![RunContainers](https://github.com/Tarunshrma/cloud-developer/blob/develop-microservice-project-03/course-03/Screenshots/Docker_Containers.png)  

To exit run `control + C`

Push your docker images:
Check your Docker Hub, if the images reach on there:

![DockerHub](https://github.com/Tarunshrma/cloud-developer/blob/develop-microservice-project-03/course-03/Screenshots/Docker%20Images.png)  


#### Kubernetes + AWS EKS
Copy and Paste the bash scripts bellow with your cluster name and configration variables:

```
eksctl create cluster \ 
--name "ClusterName" \
--version 1.14 \
--nodegroup-name standard-workers \
--node-type t3.medium \
--nodes 3 \
--nodes-min 1 \
--nodes-max 4 \
--node-ami auto
```

![EKSCluster](https://github.com/Tarunshrma/cloud-developer/blob/develop-microservice-project-03/course-03/Screenshots/AWS_EKS_Cluster.png) 


 ### Create Kubernetes Components (Configmaps and Secrets)

Encrypt your database username and password using base64 using the following commands:
- `echo POSTGRESS_PASSWORD | base64`  
- `echo POSTGRESS_USERNAME | base64`  

Encrypt your aws file using base64 using the following commands:
- `cat ~/.aws/credentials | base64`  

Add these values in the appropriate places in your `env-secret.yaml`, `aws-secret.yaml`, and `env-config.yaml`.

 ### Setup Kubernetes Environment

Load secret files:
- `kubectl apply -f aws-secret.yaml`
- `kubectl apply -f env-secret.yaml`
- `kubectl apply -f env-config.yaml`  

Apply all other yaml files:
- `kubectl apply -f .`

### Check your Pods Status

`kubectl get all`  

![PodsStatus](https://github.com/Tarunshrma/cloud-developer/blob/develop-microservice-project-03/course-03/Screenshots/Kubernetes%20Cluster.png) 

### Running Application on AWS EKS
![Udagram](https://github.com/Tarunshrma/cloud-developer/blob/develop-microservice-project-03/course-03/Screenshots/Application-Screenshot.png)

### CI/CD with TravisCL
- Sign up for [TravisCL](https://travis-ci.com) and connect your Github application repository to TrivisCL.
- Add `.travis.yml` file to the root of the application.
- Copy and paste the following code into your `.travis.yml` file:
```
language: minimal

services: docker

env:
  - DOCKER_COMPOSE_VERSION=1.23.2

before_install:
  - docker -v && docker-compose -v
  - sudo rm /usr/local/bin/docker-compose
  - curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > docker-compose
  - chmod +x docker-compose
  - sudo mv docker-compose /usr/local/bin
  - curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
  - chmod +x ./kubectl
  - sudo mv ./kubectl /usr/local/bin/kubectl

install:
  - docker-compose -f udacity-c3-deployment/docker/docker-compose-build.yaml build --parallel 
```  
- Add your environment variables to the project repository in [TravisCL](https://travis-ci.com) by selecting the setting option.

- Commit and Push your changes to trigger a Travis CI build.
> Travis only runs builds on the commits you push after you’ve added a `.travis.yml` file.

- Check the build status page to see if your build passes or fails according to the return status of the build command by visiting [TravisCL](https://travis-ci.com) and selecting your repository.

![TravisCL](https://github.com/Tarunshrma/cloud-developer/blob/develop-microservice-project-03/course-03/Screenshots/Travis%20Build.png)
