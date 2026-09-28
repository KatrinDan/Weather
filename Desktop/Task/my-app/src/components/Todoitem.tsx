import { useState } from "react";
import type { Task } from "../App";

type Props = {
  task: Task;
  ToggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

function Todoitem({ task, ToggleTask, deleteTask }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTask(task.id);
    }, 300);
  };

  return (
    <li className={`todo-item ${isDeleting ? "fade-out" : ""}`}>
      <div className="todo-left">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => ToggleTask(task.id)}
        />

        <span
          style={{
            textDecoration: task.done ? "line-through" : "none",
          }}
        >
          {task.text}
        </span>
      </div>

      <button className="delete-btn" onClick={handleDeleteClick} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
}

export default Todoitem;