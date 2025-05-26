import React, { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import "../styles/ApprovedEvents.css";

const ApprovedEvents = () => {
  const {
    approvedEvents,
    editApprovedEvent,
    removeEvent,
  } = useContext(EventContext);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
  });

  const handleEditClick = (event) => {
    setEditId(event.id);
    setFormData({ ...event });
  };

 const handleSaveClick = () => {
  if (!formData.title || !formData.date || !formData.description) {
    alert("Please fill in all required fields.");
    return;
  }
  editApprovedEvent({
    ...formData,
    id: editId, 
  });
  setEditId(null);
  setFormData({
    title: "",
    category: "",
    date: "",
    description: "",
  });
};

  return (
    <div className="approved-events-container">
      <h2>Approved Events</h2>
      {approvedEvents.length === 0 ? (
        <p>No approved events.</p>
      ) : (
        <div className="event-list">
          {approvedEvents.map((event) =>
            editId === event.id ? (
              <div className="event-card" key={event.id}>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <button onClick={handleSaveClick}>Save</button>
              </div>
            ) : (
              <div className="event-card" key={event.id}>
                <h3>{event.title}</h3>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p>{event.description}</p>
                <div className="card-actions">
                  <button onClick={() => handleEditClick(event)}>Edit</button>
                  <button onClick={() => removeEvent(event.id)} className="delete-btn">
                    Remove
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ApprovedEvents;
