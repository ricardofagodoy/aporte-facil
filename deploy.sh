#!/bin/bash

ng build --prod
gcloud app deploy -q
rm -rf dist
