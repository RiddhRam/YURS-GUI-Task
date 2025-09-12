import { useState } from 'react'
import type { TaskListData } from '../types.tsx';
import { TaskListItem } from "./TaskListItem"

// The list that displays all items of the current tab
export function TaskList({ viewToDoScreen }: { viewToDoScreen: boolean }) {

  const [toDoTasks, setToDoTasks] = useState<TaskListData[]>([
    {
      name: "TESTTT",
      description: "123123",
      date: new Date("2025-10-01"),
      completed: false,
    },
    {
      name: "DFMPSGSERS",
      description: "ADFDSGDSG",
      date: new Date("2025-10-03"),
      completed: true,
    },
    {
      name: "SDMPKFMPG",
      description: "HELLOOOO",
      date: new Date("2025-10-05"),
      completed: false,
    },
    {
      name: "NOSOGNSGSD",
      description: "Hello world",
      date: new Date("2025-10-01"),
      completed: true,
    },
    {
      name: "SDMFPPSGR",
      description: "DSDGDSMGSDP",
      date: new Date("2025-10-05"),
      completed: true,
    },
  ])

  const filteredTasks = toDoTasks.filter(task =>
    viewToDoScreen ? !task.completed : task.completed
  );

  // Function to delete a given task
  const handleDelete = (taskToDelete: TaskListData) => {
    setToDoTasks(prevTasks => prevTasks.filter((task => task !== taskToDelete)));
  };

  return (
    <div  style={{ height: '400px', overflowY: 'auto', paddingRight: '10px', paddingLeft: '10px'}}>
      <ul>
        {filteredTasks.map((task, index) => (
          <TaskListItem
            key={index}
            name={task.name}
            description={task.description}
            date={task.date}
            completed={task.completed}
            onDelete={() => handleDelete(task)}
          />
        ))}
      </ul>
    </div>
    
  )
}
