docker build -t fruits-api:1.0.0 --build-arg app_version=1 . --no-cache
docker build -t fruits-api:2.0.0 --build-arg app_version=2 . --no-cache
docker run -d -p 3000:3000 fruits-api:1.0.0
docker run -d -p 3001:3000 fruits-api:2.0.0