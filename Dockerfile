FROM node:20-alpine

WORKDIR /app

# Set environment variables
ENV VITE_BACKEND_URI="https://api.rekrutgenai.com/v1"

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]