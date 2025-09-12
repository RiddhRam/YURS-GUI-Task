// Each item being displayed within the list
export function TaskListItem({ name, description, date, completed, onDelete, onComplete }: {
  name: string
  description: string
  date: Date
  completed: boolean
  onDelete: () => void
  onComplete: () => void
}) {
  return (
    <li >
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ margin: 0 }}>{name}</h3>
        <span style={{ color: 'rgba(134, 134, 254, 1)' }}>{date.toUTCString().substring(0, date.toUTCString().length - 7)}</span>
      </div>
      <p style={{ marginTop: '8px' }}>{description}</p>

      <div className="button-container">
        <button onClick={onComplete} className="complete-button" disabled={completed}>
          {completed ? "Completed" : "Complete"}
        </button>
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
      </div>
      
    </li>
  );
}