set -e

echo ">> pull code"
git pull origin main

chmod +x script.sh

echo ">> build docker image"
npm install --production

echo ">> stop current image"
NODE_ENV=production npm run build

echo ">> delete current image"
npm run start:pm2
