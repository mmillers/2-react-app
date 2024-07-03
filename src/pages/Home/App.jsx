import { useRef, useState } from "react";
import { Task } from "../../components/Task";

let nextId = 1;
export function App() {
  const [titlePage, setTitlePage] = useState("New Task");
  const [isNew, setIsNew] = useState(true);
  const [tasks, setTasks] = useState([
    {
      id: nextId,
      title: "Task 1",
      isCompleted: false,
    },
  ]);
  const [selectedTaskToEditId, setSelectedTaskToEditId] = useState(0);

  const inputTaskTitle = useRef();

  function updateStatusTask(id, checked) {
    const copy = [...tasks];
    const task = copy.find((task) => task.id === id);
    task.isCompleted = checked;
    setTasks(copy);
  }

  function addTask() {
    setTasks([
      ...tasks,
      {
        id: ++nextId,
        title: inputTaskTitle.current.value,
        isCompleted: false,
      },
    ]);
    inputTaskTitle.current.value = "";
  }

  function removeTask(id) {
    const copy = [...tasks];
    const index = copy.indexOf((task) => task.id === id);
    copy.splice(index, 1);
    setTasks(copy);
  }

  function editTask(id) {
    setSelectedTaskToEditId(id);
    const copy = [...tasks];
    const task = copy.find((task) => task.id === id);
    inputTaskTitle.current.value = task.title;
    setTitlePage("Edit Task");
    setIsNew(false);
  }

  function saveEdit() {
    const copy = [...tasks];
    const task = copy.find((task) => task.id === selectedTaskToEditId);
    task.title = inputTaskTitle.current.value;
    setTasks(copy);
    setTitlePage("New Task");
    setIsNew(true);
    inputTaskTitle.current.value = "";
  }

  return (
    <main>
      <h2>{titlePage}</h2>
      <input type="text" placeholder="Nome da tarefa..." ref={inputTaskTitle} />
      <button type="button" className="handle-btn" onClick={isNew ? addTask : saveEdit}>
        {isNew ? "Add" : "Edit"}
      </button>

      <Task
        tasks={tasks}
        onToggle={updateStatusTask}
        onRemove={removeTask}
        onEdit={editTask}
      />

      {!tasks.length && <p>Nenhum task adicionada</p>}
    </main>
  );
}
