#!/bin/bash

if ! [ "$(ls -A /root)" ]
then
    echo "/root is empty. Copying directory from tmp."
    mv -f /tmp/root/{.,}* /root
    rm -r /tmp/root
else
    echo "Skipping initialization."
fi

echo "Starting SSH"
service ssh start
/usr/sbin/sshd -D

echo "Sleeping..."
sleep infinity
