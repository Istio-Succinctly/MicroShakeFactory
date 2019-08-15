docker build -t fruits-api:1.0.0 --build-arg app_version=1 . --no-cache
docker build -t fruits-api:2.0.0 --build-arg app_version=2 . --no-cache
docker run --rm -p 3000:3000 fruits-api:1.0.0
docker run --rm -p 3000:3000 fruits-api:2.0.0