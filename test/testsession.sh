#!/usr/bin/env bash

export sessionLength=30s
export tokenLife=15s
export renewTokenLife=15s


cd ../srt-api
npm run dev &
cd ../srt-ui

ng serve --configuration=local > npm.dev.out &

while ! grep  successfully npm.dev.out
do
  sleep 2
  echo "waiting for ng"
done

echo "ready to move on"

npm run test

./kill4200.sh
./kill4200.sh 3000

#npm run test
