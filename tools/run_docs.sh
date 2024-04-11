#!/bin/bash

cd docs
docker build -t pulse_keeper_docs_image .
container_id=$(docker run -d --name pulse_keeper_docs_container -p 8000:8000 -v ./docs/:/docs/docs pulse_keeper_docs_image:latest)

# Display container output continuously
display_output() {
    docker logs -f "$container_id"
}

cleanup() {
  docker kill "$container_id"
  docker rm "$container_id"

  echo "Containers have been cleaned up"
  exit 0
}

# Display output in the background
display_output &

# Wait for user input to stop and remove the container
echo "-------------------------------------------------------"
echo ""
echo "--- Press Ctrl + C to stop and remove the container ---"
echo ""
echo "-------------------------------------------------------"

trap cleanup SIGINT SIGTERM

while : ; do
    read -n 1
done

# Stop and remove the container
docker stop "$container_id" >/dev/null
docker rm "$container_id" >/dev/null
