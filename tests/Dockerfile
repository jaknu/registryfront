FROM ubuntu:16.04

RUN apt update && apt -y install npm 
RUN ln -s /usr/bin/nodejs /usr/bin/node 
RUN npm install -g mocha zombie

WORKDIR /tests
CMD npm link zombie && mocha .
