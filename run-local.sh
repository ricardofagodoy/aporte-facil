#!/bin/bash

ng serve --proxy-config proxy.conf.json \
    --ssl true \
    --ssl-cert "ssl/localhost.pem" \
    --ssl-key "ssl/localhost-key.pem"