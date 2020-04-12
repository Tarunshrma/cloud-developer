# cloud-developer
content for Udacity's cloud developer nanodegree

#Converrt Monolithic Prroject to Microservies.
Steps:
First make sure local monolithic application is working correcrtly. - Done
    Check environment variables and update it in config file.   - Done
    Make sure all rest-api and frontend projetcs are running succesfully - Done
    Rest-API's are as below:
    a) feed microservice : port 8080
    b) user-microservice : port 8080 
    c)image-procss-microserrvice :  port 8080
Cleanup prevoius images
    a) Cleanup previous images from local machine - Done
    b) cleanup previous images from docker hub - Done
Create Docker images for each microsoverice
    Image for Filter-Image - Done
    Image for Users - Done
    ==>>>> Known Issue : Path not working <<<<===
    Need to add .dockerignore file and add node_module to ignore bcrypt error
    Image for Feed - Done
    Image for Frontend - Done
Push Images to Doccker-Hub
    Push Image for Filter-Image - Done
    Push Image for Users - Done
    Push Image for Feed - Done
    Push Image for Frontend - Done    
Create ReverseProxy Config
        Create image for ReverseProxy
        Push image for ReverseProxy
    
    
    
    
    
    
    
    
    
    
    
    
#Commands
docker run --rm --publish 8080:8080 -v $HOME/.aws:/root/.aws --env POSTGRESS_HOST=$POSTGRESS_HOST --env POSTGRES_USERNAME=$POSTGRES_USERNAME --env POSTGRES_PASSWORD=$POSTGRES_PASSWORD --env POSTGRES_DB_NAME=$POSTGRES_DB_NAME --env AWS_REGION=$AWS_REGION --env AWS_PROFILE=$AWS_PROFILE --env AWS_BUCKET=$AWS_BUCKET --env JWT_SIGNED_TOKEN=$JWT_SIGNED_TOKEN --name <Container-Name> <Image-Name>
    



    
