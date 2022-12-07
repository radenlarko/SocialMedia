# Getting Started

Social Media Project sourced from ZAINKEEPSCODE

## Server

1. cd Server
2. npm install
3. search `dotenv.config({ path: ".env.local" });` and change to `dotenv.config();`
4. setup .env
    PORT= server port
    MONGO_DB= Your mongo db url
    JWT_KEY= jwt secret key
5. npm start to start the project


## Client

1. cd SocialMedia-Frontend
2. npm install
3. setup .env
    REACT_APP_BASE_URL= server url
    REACT_APP_PUBLIC_FOLDER= public url for image access (example: http://serverurl/images/)
4. npm start to start the project
