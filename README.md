# Running Application Using Docker

    Step 1: Install Docker
    Step 2: Start docker
    Step 3: Create images and run the containers using below command:
            ( To be done on root directory)
            Run file "start-application.bat"
                    OR
            "docker-compose -d"
    Step 4: Verify all docker containers are running.
            "docker ps" : This should be showing the 4 running containers
    Step 5: Initialize a database.
            a. Open pg-admin at "http://localhost:5050/"
            b. Use these credentials:
                email - admin@domain.com, password - password
            c. Create a server with below configurations.
                hostname: db-service
                username: postgres
                password: postgres
            d. Create a database named "epurchase"
    Step 6: Insert the Dummy data using the below url:
            "http://localhost:3000/setupdb"
    Step 7: Open the application at:
            "http://localhost:4100/"

# Docker commands

## Start all containers using docker-compose:
    docker-compose up -d --build
        --build: used to save image before running the container
        --detatch: to run in detatch mode

## Build docker image:
    docker build . -t <image_name>

## Run Docker image:
    docker run -e CONFIG=<env_name> -p 3000:3000 -d --name <container_name> <image_name>

## Run docker image in debug mode:
    NOTE: Used to get inside a docker container run shell in container.
    docker run -it <image_name> sh

## Stop docker image:
    docker stop <container_name>

