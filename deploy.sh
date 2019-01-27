#!/bin/bash

ng build --env=prod
cd dist
touch Staticfile
cf push -m 64M srt-client
