FROM node:18.12.1 as node
WORKDIR /usr/src/app
COPY . .
RUN npm install -g npm@9.1.3

# RUN npm install -g @angular/cli@latest

COPY . ./ 
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /usr/src/app/dist/gig-admin-client-app /usr/share/nginx/html