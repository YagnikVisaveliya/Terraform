terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# Pull the image
resource "docker_image" "nodejs_app" {
  name         = "yagnik0167/nodejs-demo-app:latest"
  keep_locally = false
}

# Create the container
resource "docker_container" "nodejs_container" {
  name  = "terraform-nodejs-app"
  image = docker_image.nodejs_app.image_id

  ports {
    internal = 3000
    external = 3000
  }

  restart = "always"

}