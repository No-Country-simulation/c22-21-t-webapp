import express from "express";
import helmet from "helmet";
import cors from "cors";
import { router } from "@routes/index"
import { errorHandler } from "@middlewares/errorHandler";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());

app.use('/api/v1', router);

app.use(errorHandler)

app.get('/', (_, res) => {
    res.send("Welcome to Banki!");
});
