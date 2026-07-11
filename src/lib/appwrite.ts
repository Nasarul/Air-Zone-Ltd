import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('6a4fd121000cd5c0a762');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;

export default client;
