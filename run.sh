#!/bin/bash

envsubst <  /registryfront/nginxconfig.template > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
