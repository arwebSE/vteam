echo -e "ENV='dev'\nAPIKEY='BOI-API-KEY'" > ./backend/.env
npm install --prefix ./frontend/scooter
npm install --prefix ./backend
docker-compose up -d frontend
docker-compose up -d backend
