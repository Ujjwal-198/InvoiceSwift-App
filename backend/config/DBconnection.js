import mongoose from "mongoose";

export default async function DBconnection(url) {
    try {
        await mongoose.connect(url)
            .then(() => console.log('Database connected successfully'))
            .catch(() => console.log('Database connection Failed'));
    } catch (error) {
        console.log('Internal Server error, Database connection failed');
    }
}