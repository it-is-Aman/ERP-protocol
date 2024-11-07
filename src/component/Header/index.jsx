import React from 'react'
import Button from '@mui/material/Button';
import { IoIosNotifications } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
export const Header =() =>{
  return(
    <header className='fixed top-0 right-0 bg-white py-2 z-[100] flex -tems-center justify-between px-4 '>
        <div className='searchBox w-[300px] h-[40px] relative '>
        <FaSearch className='absolute top-2 left-3 z-[10]' />
            <input type="text "className='w-[100%]h-[100%] px-9 cursor:pointer' placeholder='Search here...'/>
        </div>
<div className='ml-auto part2'>

    <ul className='flex gap-3'>
        <li>
            <Button>
            <IoIosNotifications />
            </Button>
        </li>
        <li>
            <Button>
            <MdEmail />
            </Button>
        </li>  <li>
            <Button>
            <CgProfile />
            </Button>
        </li>
    </ul>
</div>

    </header>
  )
}