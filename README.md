# TrashBot v2

Telegram bot with WebGUI

![logo](./public/img/logo.jpg)

## Prerequisites

This project uses PostgreSQL as database.

1. Add `.env` file to root directory:

```shell
REACT_APP_API_URL= URL to API server
PORT= Port of the API server
```

2. Add `.env` file to `/trashBack` directory:

```shell
HOST= IP address where API server is going to be hosted
PORT= API server port
BOT_TOKEN= Telegram bot token
ACCESS_TOKEN_SECRET= Acces token secret for JWT
REFRESH_TOKEN_SECRET= Refresh token secret for JWT
DB_NAME= Database name in PostgreSQL
DB_USER= Database username
DB_PASSWORD= Database password
DB_HOST= IP addres of database
DB_PORT= Database port
```

## Scripts

## React frontend

```sh
npm run start # start react dev server
npm run build # makes build
```

## Node backend

Backend files are located in `/trashBack` folder



```sh
npm run dev # start dev server
npm run build # makes build 
npm run startserver # launches express backend server
```