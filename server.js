import express from 'express';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postsRoutes.js';
import commentRoutes from './routes/commentsRoutes.js';
import config from './db/config.js';
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

// Routes
userRoutes(app);
postRoutes(app);
commentRoutes(app);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(config.port, () =>{
    console.log(`Server is running on ${config.url}`);
})