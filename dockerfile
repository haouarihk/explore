FROM node:18-alpine

WORKDIR /frontend

RUN npx prisma generate
CMD npm start