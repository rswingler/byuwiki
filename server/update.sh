#!/bin/bash

echo "===============================" >> output.log
echo "update.sh - Pulling from github and restarting the server (at $(date))" >> output.log

#git stash >> output.log
git pull --rebase origin master >> output.log
#git stash pop >> output.log
sudo forever stop controller/js/wiki.js >> output.log
sudo forever start controller/js/wiki.js >> output.log
