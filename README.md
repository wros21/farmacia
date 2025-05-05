# farmacia

Instalar Node.js:

curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

Clonar el proyecto y instalar dependencias:

git clone https://github.com/wros21/farmacia.git
cd farmacia
npm install

Ejecutar el proyecto:
npm start

Para producción, usar PM2:

sudo npm install -g pm2
pm2 start app.js --name farmacia
pm2 save
pm2 startup
