FROM node:lts
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN npm install --production --silent
CMD ["npm", "run", "sub"]
