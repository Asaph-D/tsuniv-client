import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { toast, Toaster } from 'sonner'

function App() {
  const [count, setCount] = useState(0)

  function showToast() {
    setCount(count + 1);
    // Show a toast notification
    toast.success('Count incremented!', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#4CAF50',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
      icon: '✅'
    });
    // Show a toast with custom styles
    toast('Tailwindcss fonctionne correctement, pas besoin de l\' installer a nouveau', {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#333',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
      icon: '🔔'
        })  
        }

  return (
    <>
      <div className="flex items-center justify-center gap-4 mb-8 shadow-lg">
        <a className='text-sm cursor-pointer' href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className='text-sm cursor-pointer' href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='text-2xl'>Vite + React</h1>
      <div className=" card">
        <button className='btn btn-primary' onClick={() => showToast()}>
          count is {count}
        </button>
        <p className='text-lg'>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-lg">
        Click on the Vite and React logos to learn more
      </p>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
        }}
      />
    </>
  )
}

export default App
