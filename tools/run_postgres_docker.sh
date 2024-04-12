#!/bin/bash

container_id=$(docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=pass postgres)
echo $container_id

check_db_ready() {
  docker exec $container_id psql -U postgres -c "SELECT 1;" >/dev/null 2>&1
}

sync_db() {
  cd server
  npx prisma migrate dev
  cd ..
}

echo "Waiting for postgres to be ready ..."
until check_db_ready; do
  echo -n "."
done

echo ""
echo "Postgres is ready"

sync_db
