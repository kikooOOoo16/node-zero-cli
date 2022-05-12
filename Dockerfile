# set node:16-alpine as base image
FROM node:16-alpine3.14

# Create usergroup zerocli and add System user zerocli to avoid running with root
RUN addgroup zerocli && adduser -S -G zerocli zerocli
RUN mkdir /app && chown zerocli:zerocli /app

# Set workdir to be /app
WORKDIR /app

# Copy package.json files before copy dir files to avoid unnecessary rebuild of node_modules layer
# Give read access for package files to zerocli user so he can run npm i
COPY --chown=zerocli:zerocli /app/package*.json ./
RUN npm install
# Copy host workdir app code to container workdir
COPY ./app .

# give rwx permissions for data.json file
RUN chmod u=rwx,g=rwx,o=rwx /app/data/db/data.json

# set user to zerocli
USER zerocli

# start app
CMD ["node", "app.js"]
