import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinay from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';


// initialize express 
const app = express();


// connect to db
await connectDB();
await connectCloudinay();


// middleware
// --- ✅ CORS FIX START ---
const allowedOrigins = [
  'http://localhost:5173',  // Vite frontend (adjust if needed)
  'http://localhost:5174',  // your origin from the error
  'https://your-frontend.vercel.app' // add Vercel frontend here
]

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Optional: ensure OPTIONS requests are always handled
app.options('*', cors())
// --- ✅ CORS FIX END ---
app.use(clerkMiddleware())


// Routes
app.get('/', (req,res)=>{res.send("Edemy API is working fine!")})
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter);
app.use('/api/course', express.json(), courseRouter);
app.use('/api/user', express.json(), userRouter);
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);



// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
    
})