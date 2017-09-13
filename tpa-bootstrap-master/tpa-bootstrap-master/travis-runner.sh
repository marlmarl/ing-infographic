#!/bin/bash -e
set -o pipefail

if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]  && [ "$TRAVIS_NODE_VERSION" = "4.2" ]
then
  git config --global user.email "andrew.james.bowen@gmail.com"
  git config --global user.name "auto deployer"

  # Stamp index.html with the date and time of PSK's deploying
  date_value=`date`
  sed -i.tmp1 "s/This is another card./This is another card. PSK Deployed on: $date_value/" app/index.html

  deploy_ghpages () {
    # Deploying to GitHub Pages! (http://ING-Group.github.io/tpa-bootstrap)
    echo Deploying to GitHub Pages
    # sed -i.tmp1 "s/\/\/ app.baseUrl = '\/tpa-bootstrap/app.baseUrl = '\/tpa-bootstrap/" app/scripts/app.js    
    sed -i.tmp1 "s#// app.apiBase = '/tpa-bootstrap/api#app.apiBase = '$GH_PAGES_API#" app/scripts/app.js                 
    sed -i.tmp2 "s/<\/head>/\  \<script>'https:'!==window.location.protocol\&\&(window.location.protocol='https')<\/script>&/g" app/index.html
        
    gulp build-deploy-gh-pages    
    cp app/scripts/app.js.tmp1 app/scripts/app.js    
    rm app/scripts/app.js.tmp1
    cp app/index.html.tmp2 app/index.html
    rm app/index.html.tmp2        
  }

  deploy_firebase () {
    # Deploying to Firebase! (https://tpa-bootstrap.firebaseapp.com)
    echo Deploying to Firebase
    # Making Changes to PSK for Firebase
    sed -i.tmp 's/<!-- Chrome for Android theme color -->/<base href="\/">\'$'\n<!-- Chrome for Android theme color -->/g' app/index.html
    sed -i.tmp "s/hashbang: true/hashbang: false/" app/elements/routing.html
    cp docs/firebase.json firebase.json
    # Starting Build Process for Firebase Changes
    gulp
    # Starting Deploy Process to Firebaseapp.com Server -- tpa-bootstrap.firebaseapp.com
    firebase deploy --token "$FIREBASE_TOKEN" -m "Auto Deployed by Travis CI"
    # Undoing Changes to PSK for Firebase
    cp app/index.html.tmp app/index.html
    cp app/elements/routing.html.tmp app/elements/routing.html
    rm app/elements/routing.html.tmp
    rm app/index.html.tmp
    rm firebase.json
  }

  deploy_ghpages
  # We haven't setup Firebase yet
  #deploy_firebase

  # Revert to orginal index.html and delete temp file
  cp app/index.html.tmp1 app/index.html
  rm app/index.html.tmp1
elif [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]  && [ "$TRAVIS_NODE_VERSION" != "4.2" ]
then
  echo "Do Nothing, only deploy with Node 4.2"
else
  npm test
fi
