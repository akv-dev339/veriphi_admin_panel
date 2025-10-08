//  import React from 'react'
//  import '../styles/Dashboard.css'
//  const Dashboard = () => {
//    return (
//       <div className="dashboard">
//       <h2>Welcome, Admin!</h2>
//       <p>This is your dashboard where you can manage everything.</p>

//       {/* Example cards */}
//       <div className="dashboard-cards">
//         <div className="card">
//           <h3>Pending Events</h3>
//           <p>12</p>
//         </div>
//         <div className="card">
//           <h3>Approved Events</h3>
//           <p>35</p>
//         </div>
//         <div className="card">
//           <h3>Corporate Requests</h3>
//           <p>5</p>
//         </div>
//       </div>
//     </div>
//    )
//  }
 
//  export default Dashboard
 

import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css'
const API_BASE = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/event/list?approved=false`).then(r=>r.json()).then(data=>setPendingCount(data.length));
    fetch(`${API_BASE}/event/list?approved=true`).then(r=>r.json()).then(data=>setApprovedCount(data.length));
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, Admin!</h2>
      <p>This is your dashboard where you can manage everything.</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Pending Events</h3>
          <p>{pendingCount}</p>
        </div>
        <div className="card">
          <h3>Approved Events</h3>
          <p>{approvedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
