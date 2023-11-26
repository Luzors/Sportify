import { IEnvironment } from "./environment.interface";

export const environment:IEnvironment = {
    production: false,
    dataApiUrl: 'http://localhost:8080',
    databaseUrl: 'mongodb://127.0.0.1:27017/sportifymdb'
}