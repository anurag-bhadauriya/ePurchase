# Docker commands

## Build docker image:
    docker build . -t <image_name>

## Run Docker image:
    docker run -e CONFIG=<env_name> -p 3000:3000 -d --name <container_name> <image_name>

## Run docker image in debug mode:
    NOTE: Used to get inside a docker container run shell in container.
    docker run -it <image_name> sh

## Stop docker image:
    docker stop <container_name>

