#!/bin/bash
sudo docker run --name srtui -v ${PWD}:/app -v /app/node_modules -p 4200:4200 --rm srtui
