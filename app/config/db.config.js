// app/config/db.config.js
import 'dotenv/config';

export default {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};