FROM node:16
WORKDIR /
COPY ./bidder/package.json ./bidder/package.json
COPY ./auctioneer/package.json ./auctioneer/package.json
RUN npm install --prefix ./bidder
RUN npm install --prefix ./auctioneer
COPY . .