
import mongoose from "mongoose";


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB database connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        console.log('MongoDB database connection failed');
    }
};

export default connect;
