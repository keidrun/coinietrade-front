#!/bin/bash

if [ $# -ne 4 ]; then
  echo "The number of parameters is $#." 1>&2
  echo "4 parameters required." 1>&2
  echo "1 - HEROKU_APP" 1>&2
  echo "2 - HEROKU_PROCESS_TYPE" 1>&2
  echo "3 - TAG (release version)" 1>&2
  echo "4 - HEROKU_API_KEY" 1>&2
  exit 1
fi

readonly HEROKU_APP=$1
readonly HEROKU_PROCESS_TYPE=$2
readonly TAG=$3
readonly HEROKU_API_KEY=$4

imageId=$(docker inspect registry.heroku.com/$HEROKU_APP/$HEROKU_PROCESS_TYPE:$TAG --format={{.Id}})
payload='{"updates":[{"type":"web","docker_image":"'"$imageId"'"}]}'
curl -n -X PATCH https://api.heroku.com/apps/$HEROKU_APP/formation \
-d "$payload" \
-H "Content-Type: application/json" \
-H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
-H "Authorization: Bearer $HEROKU_API_KEY"
