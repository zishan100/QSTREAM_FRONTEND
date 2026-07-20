#!/bin/sh

echo "Generating runtime config..."

envsubst \
  < /config.js.template \
  > /usr/share/nginx/html/config.js

echo "Starting Nginx..."

exec nginx -g "daemon off;"