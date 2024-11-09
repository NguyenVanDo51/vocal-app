git pull origin main

chmod +x deploy.sh

npm install

pm2 stop vocabapi

pm2 delete vocabapi

npm run start:pm2