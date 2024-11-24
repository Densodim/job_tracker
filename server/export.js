import mongoose from "mongoose";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.MONGO_URL;

mongoose.connect(dbUri).then(async () => {
    const jobs = await mongoose.connection.db.collection("jobs").find().toArray();
    fs.writeFileSync("jobs_backup.json", JSON.stringify(jobs, null, 2));
    console.log("База данных выгружена!");
    mongoose.disconnect();
});