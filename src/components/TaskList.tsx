import { useState } from 'react'
import type { TaskListData } from '../types.tsx';
import { TaskListItem } from "./TaskListItem"

// The list that displays all items of the current tab
export function TaskList({ viewToDoScreen }: { viewToDoScreen: boolean }) {

  const [toDoTasks, setToDoTasks] = useState<TaskListData[]>([
    {
      name: "Buy groceries",
      description: "Pick up milk and fruits from the store.",
      date: new Date("2025-10-01"),
      tags: ["Shopping", "Errands"],
      completed: false,
    },
    {
      name: "Submit project report",
      description: "Finalize and submit the project report.",
      date: new Date("2025-10-03"),
      tags: ["Homework", "School", "Urgent"],
      completed: true,
    },
    {
      name: "Complete math homework",
      description: "Finish exercises from chapters 5.",
      date: new Date("2025-10-05"),
      tags: ["Homework", "School"],
      completed: false,
    },
    {
      name: "Clean the living room",
      description: "Vacuum the carpet.",
      date: new Date("2025-10-01"),
      tags: ["Chores", "Home"],
      completed: true,
    },
    {
      name: "Car maintenance",
      description: "Get the oil changed.",
      date: new Date("2025-10-05"),
      tags: ["Car", "Maintenance"],
      completed: true,
    },
    {
      name: "Plan weekend trip",
      description: "Decide on destination and plan itinerary.",
      date: undefined,
      tags: ["Leisure", "Travel"],
      completed: false,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false);

  const [newTask, setNewTask] = useState<{
    name: string;
    description: string;
    date?: Date; // optional, can be Date or undefined
    tags: string;
  }>({
    name: '',
    description: '',
    date: undefined,
    tags: ''
  });

  // Filter for only the tasks we want to see, and then sort them by date
  const filteredTasks = toDoTasks
    .filter(task => viewToDoScreen ? !task.completed : task.completed)
    .sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : -Infinity;
      const timeB = b.date ? new Date(b.date).getTime() : -Infinity;
      return timeA - timeB;
    });

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
    // Make sure theres a name
    if (!newTask.name.trim()) return;
    setToDoTasks(prev => [
      ...prev,
      {
        name: newTask.name,
        description: newTask.description,
        date: newTask.date,
        tags: newTask.tags.split(',').slice(0, 3),
        completed: false
      }
    ]);
    setNewTask({ name: '', description: '', date: undefined, tags: '' });
    setShowAddForm(false);
  };

  // Function to add a new tag to the existing task
  const onAddTag = (tag : string, taskToModify: TaskListData) => {
    setToDoTasks(prevTasks =>
      prevTasks.map(task =>
        task === taskToModify ? { ...task, tags: [...task.tags, tag] } : task
      )
    );
  };

  return (
    <div style={{ height: '400px', overflowY: 'auto', padding: '10px', border: "5px solid #606060ff", borderRadius: "5px", borderSpacing: "10px"}}>
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
              value={newTask.date ? newTask.date.toISOString().split('T')[0] : ''}
              onChange={e => setNewTask(prev => ({ ...prev, date: e.target.value ? new Date(e.target.value) : undefined }))}
            />

            {/* Tags */}
            <input
              type="text"
              placeholder="Tags (Seperate by commas)"
              value={newTask.tags}
              onChange={e => setNewTask(prev => ({ ...prev, tags: e.target.value }))}
            />

            <button onClick={handleAddTask} className='add-item-button'>Add Task</button>
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
            tags={task.tags}
            completed={task.completed}
            onDelete={() => onDelete(task)}
            onComplete={() => onComplete(task)}
            /* Im presetting the task parameter, TaskListItem just needs to send back the tag being added now */
            onAddTag={(tag: string) => onAddTag(tag, task)}
          />
        ))}
      </ul>
    </div>
    
  )
}
