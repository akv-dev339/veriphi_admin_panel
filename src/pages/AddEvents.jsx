import React, { useState } from "react";
import "../styles/AddEvents.css";

const AddEvents = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    price: "",
    category: "",
  });

  const handleInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // Update event
      const updated = [...events];
      updated[editingIndex] = formData;
      setEvents(updated);
    } else {
      // Add new event
      setEvents([...events, formData]);
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      price: "",
      category: "",
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(events[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const filtered = events.filter((_, i) => i !== index);
    setEvents(filtered);
  };

  return (
    <div className="event-manager-container">
      <h2>Approved Events</h2>
      <button className="add-button" onClick={() => setShowForm(true)}>
        ➕ Add Event
      </button>

      <div className="event-list">
        {events.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="event-cardd">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date} at {event.time}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Price:</strong> ₹{event.price}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <div className="event-actions">
                <button onClick={() => handleEdit(index)}>✏️ Edit</button>
                <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="form-overlay">
          <form className="event-form" onSubmit={handleAddOrUpdate}>
            <h3>{editingIndex !== null ? "Edit Event" : "Add Event"}</h3>
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={formData.name}
              onChange={handleInput}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInput}
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInput}
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInput}
              required
            />
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={formData.venue}
              onChange={handleInput}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Ticket Price"
              value={formData.price}
              onChange={handleInput}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleInput}
              required
            />

            <div className="form-actions">
              <button type="submit">
                {editingIndex !== null ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddEvents;
