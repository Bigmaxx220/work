#!/bin/bash

echo "Hello Student!"

read -p "Please enter your name: " name

echo "Welcome to terminal, $name!"

mkdir /tmp/test

current_time=$(date +"%H:%M:%S")
echo $current_time > /tmp/test/mydate.txt

echo "Saving data..."
count=1
while [ $count -le 10 ]
do
  echo $count
  sleep 0.5
  count=$((count+1))
done
echo "Data saved. Please continue."

df -h >> /tmp/test/mydate.txt

mkdir -p /opt/210223_morning/
cp /tmp/test/mydate.txt /opt/210223_morning/mynewdate.txt
