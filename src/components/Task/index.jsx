export function Task({ tasks, onToggle, onRemove, onEdit }) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <li key={task.id} onDoubleClick={() => onEdit(task.id)}>
          <label aria-label={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={(e) => {
                onToggle(task.id, e.target.checked);
              }}
              id={task.id}
            />
            <span>{task.title}</span>
          </label>
          <button
            type="button"
            className="remove-btn"
            onClick={() => onRemove(task.id)}
          >
            <span className="glyphicon">&#xe020;</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
