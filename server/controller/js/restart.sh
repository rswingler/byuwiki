#!/bin/bash

echo "===============================" >> output.log
echo "restart.sh - restarting the server (at $(date))" >> output.log

#git stash >> output.log
#git pull --rebase origin master >> output.log
#git stash pop >> output.log
#sudo forever restart controller/js/wiki.js >> output.log
#wait
sudo forever restart wiki.js >> output.log
