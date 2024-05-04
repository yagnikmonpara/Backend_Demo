import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cors from 'cors'

// configure dotenv
dotenv.config()

// database connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/auth/',authRoutes);

// rest api
app.get('/', (req, res) => {
    res.send({
        auth:true,
        message:'Welcome to social media app'
    })
});

// PORT 
const PORT = process.env.PORT || 8080;

// server listen
app.listen(PORT, () => {
    console.log(`server running on port number ${PORT}`.bgBlue.white);
})