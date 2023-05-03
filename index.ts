import express from "express";
import cors from "cors";
import { runEachMin } from "./rsi";

const app = express();

app.use(cors());
app.use(express.json());

runEachMin();

app.listen(3333, () => {
  console.log("Server started on port 3303");
});
