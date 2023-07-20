import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Components/Task";
import { ITask } from "./types";
import { fetchGet, fetchPatch, fetchPost } from "./lib";
import TaskModal from "./Components/TaskModal";
import Pagination from "./Components/Pagination";

const tasksInPage = 10;

async function loadTasks(
  page: number,
  setTasks: (tasks: ITask[]) => void
): Promise<void> {
  try {
    let fetchData = await fetchGet(`/api/task?page=${page}&count=10`);
    let json = await fetchData.json();
    setTasks(json);
  } catch (err) {
    console.log(err);
  }
}

async function getPageCount(setPageCount : (num : number) => void) {
	try {
		const fetchData = await fetchGet("/api/task/count");
		const json = await fetchData.json();
		setPageCount(Math.ceil(json.count / tasksInPage));
	} catch (err) {
		console.log(err);
	}	
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
	const [selectedTask, setSelectedTask] = useState<ITask | undefined>(undefined);

  useEffect(() => {
    loadTasks(page, setTasks);
		getPageCount(setPageCount);
  }, []);

  async function addTask(title: string): Promise<void> {
    try {
      //let fetchData = await fetchPost("api/task", {title: title});

      let fetchData = await fetchPost("/api/task", { title: title });
      let task = (await fetchData.json()) as ITask;
			
      setTasks((prevTasks) => {
				const newTasks = [...prevTasks];
				
				while(newTasks.length > tasksInPage)
				{
					newTasks.pop();
				}

				console.log(newTasks.length);
				newTasks.unshift(task);
				return newTasks;
			});

    } catch (err) {
      console.log(err);
    }
  }

  async function saveTask(task: ITask) {
    try {

      setTasks((prevState) => {
        return [...prevState].map((t) => {
          if (t._id == task._id) t.title = task.title;
          return t;
        });
      });

      const res = await fetchPatch(`/api/task/${task._id}`, {
        title: task.title,
      });

    } catch (err) {
      console.log(err);
    }
  }

	function openTaskDescription(task: ITask) : void {
		console.log(task);
		setSelectedTask(task);
	}

  return (
    <div className="column relative">
			{selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(undefined)}/>}

      <h1> Task List</h1>

      <div className="row">
        <button onClick={() => addTask("new task")}>Add Task</button>
      </div>

      <div className="column">
        {tasks.map((task) => (
          <Task key={task._id} task={task} onSave={saveTask} onClick={openTaskDescription} />
        ))}
      </div>


			<Pagination pageCount={pageCount} onPageSelected={(pageNum : number) => loadTasks(pageNum, setTasks)}/>
    </div>
  );
}

export default App;
