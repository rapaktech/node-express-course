require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;

const connectDB = () => {
    return mongoose
        .connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => console.log('Database Connection Is Successful'))
        .catch((err) => console.log(err))
    ;
}

module.exports = connectDB;