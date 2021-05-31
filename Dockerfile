### STAGE 1: Build ###

FROM node:10.15-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


### STAGE 2: Run ###

FROM nginx
# nginx conf file
ADD nginx/default.conf /etc/nginx/conf.d/default.conf
# copy application
COPY --from=build --chown=root:www-data /usr/src/app/build/ /usr/share/nginx/html/
# change files permissions
RUN chmod -R a+rx /usr/share/nginx/html
