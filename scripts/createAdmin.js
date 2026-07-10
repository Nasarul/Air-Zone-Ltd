import { Client, Users, ID } from 'node-appwrite';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const users = new Users(client);

async function createAdmin() {
    try {
        const user = await users.create(
            ID.unique(),
            'admin@airzoneltd.com',
            undefined, // phone
            'Admin123!', // password
            'Admin User' // name
        );
        console.log('Successfully created Admin user:', user.$id);
    } catch (error) {
        console.error('Failed to create user:', error.message);
    }
}

createAdmin();
