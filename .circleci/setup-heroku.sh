#!/bin/bash
readonly HEROKU_CLI_VERSION=v6.16.12-04b3626

wget https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-linux-x64.tar.gz -O heroku.tar.gz
sudo tar -xvzf heroku.tar.gz
sudo mkdir -p /usr/local/lib /usr/local/bin
sudo mv heroku-cli-$HEROKU_CLI_VERSION-linux-x64 /usr/local/lib/heroku
sudo ln -s /usr/local/lib/heroku/bin/heroku /usr/local/bin/heroku

cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_API_KEY
EOF

cat >> ~/.ssh/config << EOF
VerifyHostKeyDNS yes
StrictHostKeyChecking no
EOF
