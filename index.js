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

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
async function connect() {
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
        });
}
connect();


/* DATABASE */
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})