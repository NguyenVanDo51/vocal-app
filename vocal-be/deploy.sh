git pull origin main

pm2 stop vocabapi

pm2 delete vocabapi

npm run start:pm2