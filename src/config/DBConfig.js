import { MongoClient } from "mongodb";

export default async function ConnectionDB(stringConnection) {
    let mongoClient;
    try {
        mongoClient = new MongoClient(stringConnection);
        console.log('Running connection with MongoDB');
        await mongoClient.connect();
        console.log('Sucessful connection: MongoDB');

        return mongoClient;
    } catch (error) {
        console.error('Error connecting to MongoDB');
        process.exit(1);
    };
}