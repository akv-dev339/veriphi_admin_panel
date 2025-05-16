import React from 'react'
import Sidebar from '../components/sidebar'
import Header from './header'
import '../styles/adminlayout.css'

import { Outlet } from 'react-router-dom'
const adminlayout = () => {
  return (
    <div className='admin_layout'>
      <Sidebar/>
      <div className="main_content">
        <Header/>
       <div className="page_content">
        <Outlet/>
        </div> 
      </div>
    </div>
  )
}

export default adminlayout
