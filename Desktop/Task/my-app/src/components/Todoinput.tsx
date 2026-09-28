import { useState } from "react"

type Props = {
  addTask: (text: string) => void;
};

function Todoinput({ addTask }: Props) {
  const [text, setText] = useState("");

    const handleAdd = () => {
      if (!text) return;
        addTask(text);
        setText("");
    };

    return (
        <div className="todo-input-container">
            <input type="text" className="todo-main-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") 
                    handleAdd();
                }}
                placeholder="Enter task"
            />

            <button className="add-task-btn" onClick={handleAdd}>Add Task</button>
        </div>
      );
}

export default Todoinput;