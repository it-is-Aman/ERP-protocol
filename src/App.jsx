import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'

import { SideBar } from './component/Sidebar'

import { Header } from './component/Header'
import { Dashboard } from './pages'




// import { Login } from './component/Login'

// import { Register } from './component/Register'
const MyContext=createContext();
function App() {
  const [count, setCount] = useState(0)

  return (
     <>
      <h1 className='text-cnenter font bold'>Welcome</h1>

     
      <section className='main flex '>
    <div className='sidebarWrapper w-[15%]'>
<SideBar/>
    </div>
    <div className='content_Right w-[85%] px-3'>
      <Header/>
      <Dashboard/>
      <div className='space'></div>
     
    <Routes>
{/* <Route path="/" element={<Login/>}/> */}
  {/* <Route path='/Register' element={<Register/>}/> */}
    
{/* </Route> */}
</Routes>
    </div>
  </section>

    





    {/* <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"background":"url('../src/assets/re.jpg')"}} > */}
    <div>


</div>
     </>
  )
}

export default App
