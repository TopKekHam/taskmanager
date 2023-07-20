import { ITask } from "../types";
import { useState } from "react";

export default function Task({task, onSave, onClick} : {task : ITask, onSave : (task : ITask) => any, onClick : (task: ITask) => void}) {
  const [edited, setEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.title);

  return (
    <div className="row">
      {edited ? (
        <>
          <input type="text" min={1} value={editedTitle} onInput={(e) => setEditedTitle(prev => e.target.value)}/>
          <button onClick={() => {onSave({...task, title: editedTitle}); setEdited(false);}}>Save</button>
        </>
      ) : (
        <>
          <h4 className="task-title" onClick={() => onClick(task)}>{task.title}</h4>
          <button onClick={() => setEdited(true)}>Edit</button>
        </>
      )}
    </div>
  );
}
