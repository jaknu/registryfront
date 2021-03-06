# Registryfront

A minimalist web frontend for use with a [self-hosted docker registry](https://docs.docker.com/registry/). It aims to be unopinionated and simple to deploy.

It is contained in a single html file and does not require any server-side compilation. This is primarily to keep it as simple as possible to deploy. All that is required to use the registryfront is serving up `index.html` at the address of your registry. Look below for examples taking advantage of this.

Registryfront does not rely on any other backend than the docker registry itself. It does not impose restrictions on or extends the functionality of the docker registry. The only backend used is the [docker registry api](https://docs.docker.com/registry/spec/api/). This means that there is no extra metadata kept and no extra functionality that isn't present in the registry itself. It, again, also makes deployment of the registryfront simpler, since you don't have to run a server, other than the registry you are already running. It does rely on content from external cdns to help keep the code simpler.

## Using the docker image

The docker image runs [Caddy](https://caddyserver.com) to serve as a reverse proxy your registry and to serve the registryfront code.

It uses the following environment variables:
  - `RF_HOSTNAME` is the hostname used in Caddys configuration. If not set, Caddy will not fetch certificates and TLS will not be enabled.
  - `RF_REGISTRY_HOST` and `RF_REGISTRY_PORT` is the host and port where your docker registry can be reached by the proxy. These are required.

The fastest way to get going is using the image from dockerhub. For example like this:

    docker run -p 80:80 -e RF_REGISTRY_HOST=<registry host> -e RF_REGISTRY_PORT=<registry port> jaknu/registryfront

Or with a docker-compose file like this:
    
    version: '2'
    services:
      registry:
        image: registry:2
        environment:
          REGISTRY_STORAGE_DELETE_ENABLED: "true"
      front:
        image: jaknu/registryfront
        ports:
          - 80:80
        environment:
          RF_REGISTRY_HOST: registry
          RF_REGISTRY_PORT: 5000

Note that the above examples doesn't expose port 443. If you want to have [Caddy setup TLS via letsencrypt](https://caddyserver.com/docs/automatic-https), expose port 443 in addition to port 80 and pass your hostname to the registryfront container in the `RF_HOSTNAME` environment variable.

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

## Configuration

The code attempts to load `/config.json` and read your configuration from it. The following configuration keys are supported:

  - `description`: Description of the registry to display below the header. HTML is supported. By default, no description is shown.
  - `showRemove`: Boolean indicating whether or not a remove button should be shown for each manifest. By default, no button is shown. See also [the docker documentation on registry configuration](https://docs.docker.com/registry/configuration/#delete).
  - `repositoryColors`: Map of colors to use for the headers of repository panels. Keys should be regular expressions matched against repository names and values should be color values understood by CSS.

For example a `config.json` used for a registry shared by two teams could look like this:

    {
      "description": "Shared registry of the <b>foo</b> and <b>bar</b> teams.",
      "showRemove": true,
      "repositoryColors": {
        "^foo/": "#eef",
        "^bar/": "#ffe"
      }
    }

## Acknowlegements

Registryfront uses [Bootstrap css](http://getbootstrap.com/), [Vue.js](https://vuejs.org/) and [Axios](http://getbootstrap.com/).
The docker image runs [Caddy](https://caddyserver.com/) and is build on the [joshix/caddy](https://hub.docker.com/r/joshix/caddy/) image.
