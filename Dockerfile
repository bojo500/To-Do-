# Base image
FROM node:18 AS base

WORKDIR /usr/src/app

# Copy only package.json + yarn.lock
COPY package.json yarn.lock ./

RUN yarn install --production

# Copy all source code
COPY . .

# Production image
FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY . .

# Copy env file
COPY .env .env

CMD ["yarn", "start"]
