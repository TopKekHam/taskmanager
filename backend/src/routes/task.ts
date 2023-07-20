import express, { Request, Router } from "express";
import { ITask, Task } from "../db";
import { ObjectId } from "mongoose";

const taskRoute = express.Router();
export default taskRoute;

interface TaskGetQuery {
  page?: number;
  count?: number;
}

function parseNumber(num: any, defaultValue: number): number {
  const val = parseInt(num);
  if (Number.isNaN(val)) return defaultValue;
  return val;
}

taskRoute.get("/", async (req: Request<{}, {}, {}, TaskGetQuery>, res) => {
  const count = parseNumber(req.query.count, 10);
  const page = parseNumber(req.query.page, 0);

  const tasks = await Task.find()
		.sort({createdAt: "desc"})
    .skip(page * count)
    .limit(count);

  res.json(tasks);
});

taskRoute.get("/count", async (req, res) => {
  let count = await Task.count();
  console.log(count);
  res.json({ count });
});

taskRoute.post("/", async (req: Request<{}, {}, ITask, {}>, res) => {
  try {
		console.log(req.body);
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.sendStatus(400);
  }
});

taskRoute.patch(
  "/:id",
  async (req: Request<{ id: ObjectId }, {}, { title: string }, {}>, res) => {
    if (!req.body.title) {
      console.log("title not found");
			res.sendStatus(400);
      return;
    }

    try {
      const task = await Task.findById({ _id: req.params.id });

      if (task === null) {
				
        res.sendStatus(404);
        return;
      }

      task.title = req.body.title;
      await task.save();
      res.sendStatus(200);
    } catch (err) {
			console.log("error");
			res.sendStatus(400);
    }
  }
);
