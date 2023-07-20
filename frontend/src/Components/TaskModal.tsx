import { useEffect, useState } from "react";
import { fetchDelete, fetchGet, fetchPost } from "../lib";
import { ISubTask, ITask } from "../types";

async function getSubTasks(taskId: string, setSubTasks : (subTasks: ISubTask[]) => void) {
	try {
		const res = await fetchGet(`/api/subtask/${taskId}`);
		const json = await res.json();
		setSubTasks(json as ISubTask[]);
	} catch(err) {
		console.log(err);
	}
}

export default function TaskModal({task, onClose} : {task : ITask, onClose : () => void}) {
	
	const [subTasks, setSubTasks] = useState<ISubTask[]>([]);
	const [newSubTaskTitle, setNewSubTaskTitle] = useState("");

	useEffect(() => {
		getSubTasks(task._id, setSubTasks);
	}, [task])

	const addSubTask = async (title : string) => {
		try {
			const res = await fetchPost("/api/subtask", {title: title, taskId: task._id});
			const json = await res.json();
			setSubTasks(prevState => [...prevState, json as ISubTask]);
		} catch(err) {
			console.log(err);
		}
	}

	const deleteSubTask = async (id: string) => {
		try {
			const res = await fetchDelete(`/api/subtask/${id}`);
			setSubTasks(prevState => prevState.filter(st => st._id !== id));
		} catch(err) {
			console.log(err);
		}
	}
	
	return <div className="modal column">
		<button onClick={onClose}>X</button>
		<h2>{task.title}</h2>
		<div className="row">
			<input type="text" onInput={(ev) => setNewSubTaskTitle(ev.target.value)}/>
			<button onClick={() => {addSubTask(newSubTaskTitle); setNewSubTaskTitle("")}}>Add</button>
		</div>

		<div className="column">
			{subTasks.map(subTask => {
				return <div className="row" key={subTask._id}>
						<button onClick={() => deleteSubTask(subTask._id)}>delete</button>
						<p>{subTask.title}</p>
					</div>
			})}
		</div>
	</div>
}