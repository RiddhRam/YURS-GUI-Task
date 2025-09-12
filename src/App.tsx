import { useState } from 'react'
import { TaskList } from './components/TaskList.tsx'
import './App.css'

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
