FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime \
    && echo "Asia/Kolkata" > /etc/timezone \
    && apk del tzdata

RUN npm install

RUN npm install -g ts-node

COPY . .

EXPOSE 8000

CMD ["npx", "ts-node", "src/index.ts"]
