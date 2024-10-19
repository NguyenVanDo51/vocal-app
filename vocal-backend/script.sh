set -e

echo ">> pull code"
git pull origin main

chmod +x script.sh

echo ">> build docker image"
docker build -t vocal:v1 .

echo ">> stop current image"
docker stop vocal

echo ">> delete current image"
docker rm vocal

docker run -p 3016:3016 --net host -d   --name vocal --restart always vocal:v1

docker logs vocal