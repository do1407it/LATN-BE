import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import userRoutes from "./routes/user.js";
import jwt from "jsonwebtoken";


// data import
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data/index.js";
import User from "./models/User.js";
import ProductStat from "./models/ProductStat.js";
import Product from "./models/Product.js";



/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Authen
function authenticateToken(req, res, next) {
    const authHeader = req.headers["token"];
    const token = authHeader && authHeader.replace("Bearer ", "");

    if (token == null) return res.sendStatus(401); // 401 Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403); // 403 Forbidden
        req.user = data;
        next();
    });
}
/* ROUTES */
app.use("/client", authenticateToken, clientRoutes);
app.use("/general", authenticateToken, generalRoutes);
app.use("/management", authenticateToken, managementRoutes);
app.use("/sales", authenticateToken, salesRoutes);
app.use("/user", userRoutes);
app.get("/posts", authenticateToken, (req, res) => {
    res.json({ posts: [{ title: "Post 1" }, { title: "Post 2" }] });
});

/* MONGOOSE SETUP */
async function connectMongo() {
    await mongoose.connect('mongodb+srv://dotran260:123123Do@cluster0.g584h.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Kết nối MongoDB thành công!');
            // ONLY ADD DATA ONE TIME
            // User.insertMany(dataUser);
            // Product.insertMany(dataProduct);
            // ProductStat.insertMany(dataProductStat);
        })
        .catch((err) => {
            console.error('Lỗi kết nối MongoDB:', err);
        })
}
connectMongo();


/* DATABASE */
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})