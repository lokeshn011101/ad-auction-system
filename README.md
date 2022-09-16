# AD Request Auction System

This repo contains both the dockerized bidder and auctioneer servers.

For storing the URLs of the bidders, Redis is used where the key is the auctioneer's id and the field being the bidder's id and the value being the bidder's URL.

# How to run

## Prerequisites

1. Create a user-defined bridge using `docker network create <bridge_name>` for both the bidder and auctioneer containers to communicate with each other in a medium.
2. Add the `bridge_name` to the `.env` files in both the `./bidder` and `./auctioneer` folders.

## Auctioneer

1. Modify the `.env` file inside `./auctioneer` to configure a container.
2. Run `sudo docker-compose run -p <port>:<port> --use-aliases auctioneer` where `port` is the port number specified in the `.env` file.

## Bidder

1. Modify the `.env` file inside `./bidder` to configure a container.
2. Run `sudo docker-compose run -p <port>:<port> bidder` where `port` is the port number specified in the `.env` file.
