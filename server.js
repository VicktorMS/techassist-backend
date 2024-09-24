// app.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/root.route.js"; 
import { logger } from "./middleware/logger.js";
import { getDirname } from "./utils/utils.js";
import { errorHandler } from "./middleware/erroHandler.js";
import { corsOptions } from "./config/corsOptions.js";

dotenv.config();

const app = express();

const __dirname = getDirname(import.meta.url);

// Middlewares
app.use(cors(corsOptions));
app.use(logger);
app.use(cookieParser());
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', router);

// Manipulador de 404 
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ status: 404, message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

const PORT = process.env.PORT || 3000;

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
