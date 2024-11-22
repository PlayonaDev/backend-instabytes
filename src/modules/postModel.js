import 'dotenv/config';
import { ObjectId } from "mongodb";
import ConnectionDB from "../config/DBConfig.js";

const connectionDB = await ConnectionDB(process.env.STRING_CONNECTION);

export async function getAllPosts() {
    const db = connectionDB.db("imersao-instabytes");
    const collection = db.collection("posts");
    return await collection.find().toArray();
};

export async function creatingPost(newPost) {
    const db = connectionDB.db("imersao-instabytes");
    const collection = db.collection("posts");
    return await collection.insertOne(newPost);
};

export async function updatingPost(id, newPost) {
    const db = connectionDB.db("imersao-instabytes");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    console.log("objectId==>", objID);
    return await collection.updateOne({ _id: new ObjectId(objID) }, { $set: newPost });
};