import express from 'express';
import path from 'path';
import posts from './routes/posts.js'
import logger from './middleware/logger.js';
import { errorHandler } from './middleware/error.js';
import { notFound } from './middleware/notFound.js';
const port = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // allow us to send form data

// use the logger middleware to entire requests
app.use(logger)

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

// manually getting the file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });

// Routes
app.use('/api/posts', posts);

// error handler for route no found
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));