 import React from 'react'
 import '../styles/Dashboard.css'
 const Dashboard = () => {
   return (
      <div className="dashboard">
      <h2>Welcome, Admin!</h2>
      <p>This is your dashboard where you can manage everything.</p>

      {/* Example cards */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Pending Events</h3>
          <p>12</p>
        </div>
        <div className="card">
          <h3>Approved Events</h3>
          <p>35</p>
        </div>
        <div className="card">
          <h3>Corporate Requests</h3>
          <p>5</p>
        </div>
      </div>
    </div>
   )
 }
 
 export default Dashboard
 