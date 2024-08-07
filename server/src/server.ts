import express from "express";
import v1Router from "./routes/v1.router";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

const app = express();

// Add essential middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(compression());
app.use(cookieParser());

app.use("/api/v1", v1Router);

app.listen(process.env.SERVER_PORT ?? 3000, () => {
  console.log(`Server started on port ${process.env.SERVER_PORT ?? 3000}`);
});
