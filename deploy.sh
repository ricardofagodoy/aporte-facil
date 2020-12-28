#!/bin/bash

ng build --prod
gcloud app deploy
rm -rf dist
