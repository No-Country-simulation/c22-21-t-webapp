import express from "express";
import helmet from "helmet";
import cors from "cors";
import { router } from "@routes/index";
import { errorHandler } from "@middlewares/errorHandler";
import "@config/cloudinary";
import session from 'express-session';
import pgSession from "connect-pg-simple";
import { Pool } from "pg";

export const app = express();

// Disable TLS verification in development environment only
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


app.use(
  session({
    store: new (pgSession(session))({
      pool,
    }),
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// CORS configuration using environment variable
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS ?? '').split(',').map(origin => origin.trim())
);
//console.log("allowedOrigins: ", allowedOrigins)
//Cors configuration
app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.has(origin)) {
      const msg = `CORS policy does not allow access from the specified origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


app.use("/api/v1", router);

app.get("/", (_, res) => {
  res.send("Welcome to Banki!");
});

// Middleware for undefined routes (404 handling)
app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);
