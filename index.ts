import express from "express";
import cors from "cors";
import { runEach5Sec } from "./rsi";

const app = express();

app.use(cors());
app.use(express.json());

// runEachMin();
runEach5Sec()


app.listen(3333, () => {
  console.log("Server started on port 3303");
});
