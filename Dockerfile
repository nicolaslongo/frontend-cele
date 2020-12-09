FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_BACKEND_URL http://http://35.211.141.144:42000

COPY package*.json /app/
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./
CMD ["npm", "start"]
