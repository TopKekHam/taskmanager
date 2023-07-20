import {ObjectId, Schema, connect, model } from "mongoose";

const connectionString = "mongodb+srv://rizdaniel15:57b1J82gCvRKTwCw@cluster0.n4qsryz.mongodb.net/?retryWrites=true&w=majority"

export interface ITask {
	title: String,
}

export interface ISubTask {
	taskId: ObjectId 
	title: String,
}

const taskScheme = new Schema<ITask>({
	title: {type: String, required : true}
}, { timestamps: true });

const subTaskScheme = new Schema<ISubTask>({
	taskId: {type: Schema.Types.ObjectId, required : true},
	title: {type: String, required : true}
}, { timestamps: true });

export default async function connecDb() {
	await connect(connectionString);
}

export const Task = model<ITask>("Task", taskScheme);
export const SubTask = model<ITask>("SubTask", subTaskScheme);
