docker build -t istiosuccinctly/fruits-api:1.0.0 -t istiosuccinctly/fruits-api:2.0.0 fruits-api/
docker build -t istiosuccinctly/juice-shop-api:1.0.0 juice-shop-api/
docker login
docker push istiosuccinctly/fruits-api:1.0.0
docker push istiosuccinctly/fruits-api:2.0.0
docker push istiosuccinctly/juice-shop-api:1.0.0