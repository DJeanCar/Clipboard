FROM node:17.3

WORKDIR /home/app

COPY package.json /home/app/
RUN npm install

COPY . /home/app/

CMD ["npm", "start"]
