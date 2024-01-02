echo "ENV='simulation'" > ./backend/.env
npm install --prefix ./simulation/sim
npm install --prefix ./backend
docker-compose up -d simulation
docker-compose up -d backend