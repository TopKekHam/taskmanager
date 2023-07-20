import dotenv from "dotenv";

import bodyParser from "body-parser";
import express from "express";
import connect from "./db";

import task from "./routes/task";
import subTask from "./routes/subTask";
import auth, {login} from "./auth"

dotenv.config();

const app = express();

app.use(bodyParser.json());

// app.post("/login", login);
// app.use(auth);

app.use("/task", task);
app.use("/subtask", subTask);

app.use((req, res) => {
	console.log("not found", req.path);
	res.sendStatus(404);
})

async function main() {
  await connect();

  app.listen(8080, () => {
    console.log("Server is listening on port 8080");
  });
}

main();
