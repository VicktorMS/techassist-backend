// routes/root.route.js
import express from "express";
import { fileURLToPath } from 'url';
import path from "path";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/api", (req, res) => {
    res.json({ message: "API está funcionando!" });
});

export default router;
