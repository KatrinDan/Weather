import { useState, useEffect } from "react";
import axios from "axios";
import Todoinput from "./components/Todoinput";
import TodoList from "./components/TodoList";

export type Task = {
  id: number;
  text: string;
  done: boolean;
  category?: string; // Optional category field
  dueDate?: string; // Optional due date field
};

function App() {
  const [dark, setDark] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !task.done
        : task.done;
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.done));
  };

 useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
  const newTask: Task = {
    id: Date.now(),
    text,
    done: false,
  };
      setTasks([...tasks, newTask]);
  };
  useEffect(() => {
axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5").then((response) => {
  const fetchedTasks = response.data.map((item: any) => ({
    id: item.id,
    text: item.title,
    done: item.completed,
  }));
  setTasks(fetchedTasks);
})
.catch((error) => {
  console.error("Error fetching tasks:", error);
});
  }, []);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => task.id === id ? {...task, done: !task.done} : task
    )
    );
  };

;

   useState<Task[]>(() => {
    const key = "tasks";
    const initialValue: Task[] = [];
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”:", error);
      return initialValue;
    }
  });


const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <h1>Todo App</h1>

      <div >
        <button onClick={() => setFilter("all")} >All</button>
        <button onClick={() => setFilter("active")}> Active</button>
        <button onClick={() => setFilter("done")}>Done</button>
        <button onClick={clearCompleted}>Clear Completed</button>
        <button onClick={() => setDark(!dark)}>Toggle Dark Mode</button>
      </div>
      <input type="text" className="search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Todoinput addTask={addTask} />
      <TodoList tasks={filteredTasks}
       ToggleTask={toggleTask}
        deleteTask={deleteTask}
         />
      <p>Tasks: {tasks.length}</p>
    </div>
  );
}

export default App;
