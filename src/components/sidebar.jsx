import React from 'react'
import '../styles/sidebar.css'
import { NavLink } from 'react-router-dom'
const sidebar = () => {
  return (
    <div className='sidebar'>
      <h2 className='logo'>VeriPhi</h2>

      <nav className='navlinks'>
      <NavLink to={'/admin/dashboard'} activeClassName='active'>Dashboard</NavLink>
      <NavLink to={'/admin/approve-event'} activeClassName='active'>Approval Request</NavLink>
      <NavLink to={'/admin/approved-events'} activeClassName='active'>Approved Events</NavLink>
      <NavLink to="/admin/bulk-requests" activeClassName="active">Bulk Requests</NavLink>
      <NavLink to="/admin/add-event" activeClassName="active">Add/Published Event</NavLink>
      </nav>
     
    </div>
  )
}

export default sidebar
