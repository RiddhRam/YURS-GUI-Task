import { toDoTasks } from '../App.tsx'
import { TaskListItem } from "./TaskListItem"

// The list that displays all items of the current tab
export function TaskList({ viewToDoScreen }: { viewToDoScreen: boolean }) {

  const filteredTasks = toDoTasks.filter(task =>
    viewToDoScreen ? !task.completed : task.completed
  );

  return (
    <ul>
      {filteredTasks.map((task, index) => (
        <TaskListItem
          key={index}
          name={task.name}
          description={task.description}
          date={task.date}
          completed={task.completed}
        />
      ))}
    </ul>
  )
}
