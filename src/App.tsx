import { useState } from 'react'
import type { TaskListData } from './types.tsx';
import { TaskList } from './components/TaskList.tsx'
import './App.css'

// PLACEHOLDER TODO List
export let toDoTasks: TaskListData[] = [
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
];

function App() {
  const [viewToDoScreen, setViewToDoScreen] = useState(true)

  return (
    <div style={{justifyContent: 'center'}}>
      <h1>Task List 📋</h1>
      <div className="button-container">
        <button onClick={() => setViewToDoScreen(true)} className={viewToDoScreen ? 'active' : ''}>
          TODO ⏳
        </button>
        <button onClick={() => setViewToDoScreen(false)} className={!viewToDoScreen ? 'active' : ''}>
          Completed ✅
        </button>
      </div>
      
      <TaskList viewToDoScreen={viewToDoScreen}></TaskList>
    </div>
  )
}

export default App
