import express from "express";
import v1Router from "./routes/v1.router";

const app = express();

app.get("/api/v1", v1Router);

app.listen(process.env.SERVER_PORT ?? 3000, () => {
  console.log(`Server started on port ${process.env.SERVER_PORT ?? 3000}`);
});
