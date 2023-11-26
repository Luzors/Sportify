import { IEnvironment } from "./environment.interface";

export const environment : IEnvironment = {
    production: true,
    dataApiUrl: 'https://sportify-da.azurewebsites.net',
    databaseUrl: 'mongodb+srv://jorn:sportifydbpassword1@sportifyatlas.jgwoewq.mongodb.net/?retryWrites=true&w=majority'
}