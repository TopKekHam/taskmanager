import express, { Request, Router } from "express";
import { SubTask, ISubTask } from "../db";
import { ObjectId } from "mongoose";

const subTaskRoute = express.Router();
export default subTaskRoute;

subTaskRoute.get(
  "/:id",
  async (req: Request<{ id: ObjectId }, {}, {}, {}>, res) => {
    try {
      const subTasks = await SubTask.find({ taskId: req.params.id });
      res.json(subTasks);
    } catch (err) {
      res.sendStatus(400);
    }
  }
);

subTaskRoute.post("/", async (req: Request<{}, {}, ISubTask, {}>, res) => {
  try {
    const newSubTask = new SubTask(req.body);
    await newSubTask.save();
    res.json(newSubTask);
  } catch (err) {
    res.sendStatus(400);
  }
});

subTaskRoute.delete("/:id", async (req, res) => {
  try {
    const dbRes = await SubTask.deleteOne({ _id: req.params.id });

    if (dbRes.deletedCount == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(400);
  }
});
