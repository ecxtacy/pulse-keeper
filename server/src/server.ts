import express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  const x = "hi";
  res.send("pulse-keeper server is up !!!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
