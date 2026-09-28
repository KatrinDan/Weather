import type { Task } from "../App"
import Todoitem from "./Todoitem";

type Props = {
  tasks: Task[];
  ToggleTask: (id:number) => void;
  deleteTask: (id:number) => void;
};

function TodoList({ tasks, ToggleTask, deleteTask }: Props) {
    return (
      <ul className="todo-list">
        {tasks.map((task) => (
          <Todoitem
            key={task.id}
            task={task}
            ToggleTask={ToggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    );
}

export default TodoList;