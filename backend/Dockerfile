FROM node:10.7.0-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./


ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium \
    && npm install puppeteer@1.10.0
	  
RUN npm install

COPY . .

EXPOSE 4000

# Define environment variable
ENV NODE_ENV=local-dev PORT=4000


CMD [ "npm", "run", "prod" ]