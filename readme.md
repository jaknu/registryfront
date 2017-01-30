# Registryfront

An unopinionated web frontend for use with a [self-hosted docker registry](https://docs.docker.com/registry/).

## Using the docker image

The fastest way to get going is using the image from dockerhub. For example like this:

    docker run -p 80:80 -p 443:443 -e RF_REGISTRY_HOST=<registry host> -e RF_REGISTRY_PORT=<registry port> jaknu/registryfront

The docker image runs [Caddy](https://caddyserver.com) to serve as a reverse proxy of your registry and to serve the registryfront code.

It uses the following environment variables:
  - `RF_HOSTNAME` is the hostname used in Caddys configuration. If not set, Caddy will not fetch certificates and TLS will not be enabled.
  - `RF_REGISTRY_HOST` and `RF_REGISTRY_PORT` is the host and port where your docker registry can be reached by the proxy. These are required.
  
The [docker-compose.yaml](https://github.com/jaknu/registryfront/blob/master/docker-compose.yaml) of this project is used for development, but it also serves as an example of how to run a registry and a registryfront in docker.

## If you already have a reverse proxy for your registry

If you already have your registry behind a webserver, running yet another server just to host `index.html` is a bit overkill. Instead you might want to just have your existing webserver serve `index.html` at `/`.

For example, if you are using [Nginx](https://www.nginx.com) as a reverse proxy for your registry with something like this:

    server {
      listen 80, 443;
      server_name example.com
    
      location /v1 { proxy_pass http://127.0.0.1:5000; }
      location /v2 { proxy_pass http://127.0.0.1:5000; }
    }

Then just copy `index.html` to your server

    cd /var/www/html
    wget https://raw.githubusercontent.com/jaknu/registryfront/master/index.html

and point `/` at it by adding this location to the above server block:

	location / { root /var/www/html; }
    
You can use the Docker setup in this repository as an example of doing the same with [Caddy](https://caddyserver.com/).

## Design goals

The registry front aims to be unopinionated and simple to deploy. This has resulted in the following dogma:

1. **The registryfront code should be contained in a single html file and not require any server-side compilation**

   This is primarily to keep it as simple as possible to deploy. All that is required to use the registryfront is serving up `index.html` at the address of your registry. Look above for examples taking advantage of this.

2. **The registryfront should not rely on any other backend than the docker registry itself**

   To ensure that registryfront does not impose restrictions on or extended use of the docker registry, the only backend used is the [docker registry api](https://docs.docker.com/registry/spec/api/). This means that there is no extra metadata kept and no extra functionality that isn't present in the registry itself. It, again, also makes deployment of the registryfront simpler, since you don't have to run a server, other than the registry you are already running.

  It does rely on content from external cdns to help keep the code simpler.

## Acknowlegements

Registryfront uses [Bootstrap css](http://getbootstrap.com/), [Vue.js](https://vuejs.org/) and [Axios](http://getbootstrap.com/).
The docker image runs [Caddy](https://caddyserver.com/) and is build on the [joshix/caddy](https://hub.docker.com/r/joshix/caddy/) image.
