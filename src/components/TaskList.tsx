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

  const [showAddForm, setShowAddForm] = useState(false);

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    date: ''
  });

  // Filter for only the tasks we want to see, and then sort them by date
  const filteredTasks = toDoTasks
    .filter(task => viewToDoScreen ? !task.completed : task.completed)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Function to delete a given task
  const onDelete = (taskToDelete: TaskListData) => {
    setToDoTasks(prevTasks => prevTasks.filter((task => task !== taskToDelete)));
  };

  // Function to complete a given task
  const onComplete = (taskToComplete: TaskListData) => {
    setToDoTasks(prevTasks =>
      prevTasks.map(task =>
        task === taskToComplete ? { ...task, completed: true } : task
      )
    );
  };

  // Function to add a new task
  const handleAddTask = () => {
    // Make sure theres a name and date
    if (!newTask.name.trim() || !newTask.date) return;
    setToDoTasks(prev => [
      ...prev,
      {
        name: newTask.name,
        description: newTask.description,
        date: new Date(newTask.date),
        completed: false
      }
    ]);
    setNewTask({ name: '', description: '', date: '' });
    setShowAddForm(false);
  };

  return (
    <div style={{ height: '400px', overflowY: 'auto', paddingRight: '10px', paddingLeft: '10px'}}>
      {/* Add a task */}
      { viewToDoScreen && 
      <>
        <button className="add-button" onClick={() => setShowAddForm(prev => !prev)}>
          {showAddForm ? 'Cancel' : 'Add'}
        </button> 
        {showAddForm && (
          <div style={{ margin: '30px 0', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.name}
              onChange={e => setNewTask(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            />
            <input
              type="date"
              value={newTask.date}
              onChange={e => setNewTask(prev => ({ ...prev, date: e.target.value }))}
            />
            <button onClick={handleAddTask} className='add-task-button'>Add Task</button>
          </div>
        )}
      </>
      }
      
      {/* View tasks */}
      <ul>
        {filteredTasks.map((task, index) => (
          <TaskListItem
            key={index}
            name={task.name}
            description={task.description}
            date={task.date}
            completed={task.completed}
            onDelete={() => onDelete(task)}
            onComplete={() => onComplete(task)}
          />
        ))}
      </ul>
    </div>
    
  )
}
