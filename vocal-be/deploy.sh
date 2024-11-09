git pull origin main

npm install

pm2 stop vocabapi

pm2 delete vocabapi

npm run start:pm2