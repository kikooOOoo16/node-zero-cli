FROM node:16-alpine3.14
# set node:16-alpine as base image

RUN mkdir -p /home/app

COPY ./app /home/app

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

RUN npm install

CMD ["node", "app.js"]