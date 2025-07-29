import { useState } from 'react'

import { toast, Toaster } from 'sonner'

const Home = ()=> {
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

export default Home;
