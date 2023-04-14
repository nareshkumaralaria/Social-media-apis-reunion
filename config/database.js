import mongoose from 'mongoose'
import "dotenv/config";
// Local database connection
// mongoose.connect('mongodb://localhost:27017/SocialMediaApisReunion', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


mongoose.connect(`mongodb+srv://${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}@cluster0.eajyqxd.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
