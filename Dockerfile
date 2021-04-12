 FROM node:15
 ENV NODE_ENV=production
 WORKDIR /app
 COPY ["package.json", "package-lock.json*", "./"]
 RUN npm install
 COPY . ./
 EXPOSE 8080
 CMD [ "npm", "run", "start"]