// import React, { useEffect, useState } from 'react';
// import '../styles/ApproveEvents.css';

// const ApproveEvents = () => {
//   const [pendingEvents, setPendingEvents] = useState([]);

//   const fetchPendingEvents = async () => {
//     try {
//       const response = await fetch('/api/events/pending');
//       const data = await response.json();
//       setPendingEvents(data);
//     } catch (error) {
//       console.error('Error fetching pending events:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPendingEvents();
//   }, []);

//   const handleApproval = async (id, action) => {
//     try {
//       const url = `/api/events/${action}/${id}`;
//       const response = await fetch(url, {
//         method: 'POST',
//       });

//       if (response.ok) {
//         // Remove the event from the list after approval/rejection
//         setPendingEvents(pendingEvents.filter(event => event.id !== id));
//       }
//     } catch (error) {
//       console.error(`Error during ${action}:`, error);
//     }
//   };

//   return (
//     <div className="approve-event">
//       <h2>Pending Event Approvals</h2>
//       {pendingEvents.length === 0 ? (
//         <p>No pending events to approve.</p>
//       ) : (
//         <div className="event-list">
//           {pendingEvents.map(event => (
//             <div className="event-card" key={event.id}>
//               <h3>{event.title}</h3>
//               <p><strong>Date:</strong> {event.date}</p>
//               <p><strong>Location:</strong> {event.location}</p>
//               <p>{event.description}</p>
//               <div className="buttons">
//                 <button onClick={() => handleApproval(event.id, 'approve')} className="approve">Approve</button>
//                 <button onClick={() => handleApproval(event.id, 'reject')} className="reject">Reject</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApproveEvents;


// import React, { useEffect, useState } from 'react';
// import '../styles/ApproveEvents.css';

// const dummyEvents = [
//   {
//     id: 1,
//     title: "Arijit Singh Live Concert",
//     date: "2025-06-20",
//     location: "Mumbai, Maharashtra",
//     description: "Experience the soulful voice of Arijit Singh live in concert. An unforgettable musical night."
//   },
//   {
//     id: 2,
//     title: "IPL Match: MI vs CSK",
//     date: "2025-07-02",
//     location: "Wankhede Stadium, Mumbai",
//     description: "Witness the thrilling encounter between Mumbai Indians and Chennai Super Kings."
//   },
//   {
//     id: 3,
//     title: "Tech Expo 2025",
//     date: "2025-07-15",
//     location: "Bangalore, Karnataka",
//     description: "Explore the latest innovations in AI, Blockchain, and IoT at India's biggest tech expo."
//   },
//   {
//     id: 4,
//     title: "Comedy Night with Zakir Khan",
//     date: "2025-06-28",
//     location: "Indore, Madhya Pradesh",
//     description: "Enjoy an evening full of laughter with Zakir Khan’s hilarious stand-up show."
//   },
//   {
//     id: 5,
//     title: "National Theatre Fest",
//     date: "2025-08-10",
//     location: "Delhi Auditorium, New Delhi",
//     description: "A cultural showcase of traditional and modern plays from across India."
//   },
//   {
//     id: 6,
//     title: "Startup Bootcamp: Build Your MVP",
//     date: "2025-08-20",
//     location: "Hyderabad, Telangana",
//     description: "A 2-day intensive workshop for aspiring entrepreneurs to build and pitch their MVP."
//   }
// ];


// const ApproveEvent = () => {
//   const [pendingEvents, setPendingEvents] = useState([]);

//   useEffect(() => {
//     // Simulate fetching data
//     setPendingEvents(dummyEvents);
//   }, []);

//   const handleApproval = (id, action) => {
//     console.log(`Event ${id} ${action}d`);
//     setPendingEvents(prev => prev.filter(event => event.id !== id));
//   };

//   return (
//     <div className="approve-event">
//       <h2>Pending Event Approvals</h2>
//       {pendingEvents.length === 0 ? (
//         <p>No pending events to approve.</p>
//       ) : (
//         <div className="event-list">
//           {pendingEvents.map(event => (
//             <div className="event-card" key={event.id}>
//               <h3>{event.title}</h3>
//               <p><strong>Date:</strong> {event.date}</p>
//               <p><strong>Location:</strong> {event.location}</p>
//               <p>{event.description}</p>
//               <div className="buttons">
//                 <button onClick={() => handleApproval(event.id, 'approve')} className="approve">Approve</button>
//                 <button onClick={() => handleApproval(event.id, 'reject')} className="reject">Reject</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApproveEvent;

// import React, { useContext } from 'react';
// import { EventContext } from '../context/EventContext';
// import '../styles/ApproveEvents.css';

// const ApproveEvent = () => {
//   const { pendingEvents, approveEvent, rejectEvent } = useContext(EventContext);

//   return (
//     <div className="approve_event">
//       <h2>Pending Event Approvals</h2>
//       {pendingEvents.length === 0 ? (
//         <p>No pending events to approve.</p>
//       ) : (
//         <div className="event_list">
//           {pendingEvents.map(event => (
//             <div className="event_card" key={event.id}>
//               <h3>{event.title}</h3>
//               <p><strong>Category:</strong>{event.category}</p>
//               <p><strong>Date:</strong> {event.date}</p>
//               <p><strong>Location:</strong> {event.location}</p>
//               <p>{event.description}</p>
//               <div className="buttonss">
//                 <button onClick={() => approveEvent(event)} className="approve">Approve</button>
//                 <button onClick={() => rejectEvent(event.id)} className="reject">Reject</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApproveEvent;


import React, { useEffect, useState } from "react";
import "../styles/ApproveEvents.css";
const API_BASE = process.env.REACT_APP_API_URL;

const ApproveEvents = () => {
  const [pendingEvents, setPendingEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/event/list?approved=false`)
      .then((res) => res.json())
      .then((data) => setPendingEvents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleApprove = async (event) => {
    try {
      const response = await fetch(
        `${API_BASE}/event/updateApproval?eventId=${event.eventId}&status=true`,
        { method: "PUT" } // ✅ correct HTTP verb
      );
      if (response.ok) {
        setPendingEvents(pendingEvents.filter((e) => e.eventId !== event.eventId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/event/delete?eventId=${id}`, {
        method: "DELETE", // ✅ correct HTTP verb
      });
      if (response.ok) {
        setPendingEvents(pendingEvents.filter((e) => e.eventId !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="approve_event">
      <h2>Pending Event Approvals</h2>
      {pendingEvents.length === 0 ? (
        <p>No pending events to approve.</p>
      ) : (
        pendingEvents.map((event) => (
          <div className="event_card" key={event.eventId}>
            <h3>{event.name}</h3>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Artist:</strong> {event.artist}</p>
            <p>{event.description}</p>
            <div className="buttonss">
              <button onClick={() => handleApprove(event)}>Approve</button>
              <button onClick={() => handleReject(event.eventId)}>Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ApproveEvents;

