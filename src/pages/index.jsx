import React from 'react'
import { DashboardBox } from './Dashboard/dashboardBox'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  // const pathname=usePathname()
const navLinks=[
  {
    title:'Dashboard',
    href:"/",
  },
  {
    title:'Getting started',
    href:"/",
  },
  {
    title:'Recent Activity',
    href:"/",
  },
  {
    title:'Recent Update',
    href:"/",
  }
]
  return (
<>
<nav className='sticky mt-5 pt-3 ml-4  flex space-x-4 border-b-2 border-slate-300'>
  {
    navLinks.map((items,index) => {
return(
  <Link key={index} href={items.href} className='py-1  border-b-2 border-blue-500 text-slate-950'>{items.title}</Link>
)
    }
  )
  }
</nav>
<div className='right-content w-100'>
  
    <div className='row dashboardBoxWrapperRow'>
      <div className='col-md-8'>
      <div className='dashboardBoxWrapper d-flex'>
<DashboardBox color={["#0af60d","#0be8ba"]}/>
<DashboardBox color={["#85bbf6","#5793a4"]} />
<DashboardBox color={["#e9d03a","#27943f"]}/>
<DashboardBox color={["#e4561e","#3b660b"]}/>

      </div>



    </div>

    <div className='col-md-4 pl-0'>
      <div className='box'></div>
    </div>
  </div>
</div>
</>
  )
}
