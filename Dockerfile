FROM node:20-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG VITE_API_URL
ARG VITE_FRONTEND_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_FRONTEND_URL=${VITE_FRONTEND_URL}

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm i -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]