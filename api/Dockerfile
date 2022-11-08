FROM node:16-alpine

WORKDIR /

# Install Dependencies
COPY package*.json /
RUN npm install

# Copy app source code
COPY . .

EXPOSE 8000