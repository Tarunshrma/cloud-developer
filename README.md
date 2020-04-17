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