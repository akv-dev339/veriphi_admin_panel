// src/context/EventContext.jsx
import React, { createContext, useState } from 'react';

export const EventContext = createContext();

const initialDummyEvents = [
  {
    id: 1,
    title: "Arijit Singh Live Concert",
    category:"Music",
    date: "2025-06-20",
    location: "Mumbai, Maharashtra",
    description: "Experience the soulful voice of Arijit Singh live in concert. An unforgettable musical night."
  },
  {
    id: 2,
    title: "IPL Match: MI vs CSK",
    category:"Sports",
    date: "2025-07-02",
    location: "Wankhede Stadium, Mumbai",
    description: "Witness the thrilling encounter between Mumbai Indians and Chennai Super Kings."
  },
  {
    id: 3,
    title: "Tech Expo 2025",
    category:"Technology",
    date: "2025-07-15",
    location: "Bangalore, Karnataka",
    description: "Explore the latest innovations in AI, Blockchain, and IoT at India's biggest tech expo."
  }
];

export const EventProvider = ({ children }) => {
  const [pendingEvents, setPendingEvents] = useState(initialDummyEvents);
  const [approvedEvents, setApprovedEvents] = useState([]);

  const approveEvent = (event) => {
    setApprovedEvents(prev => [...prev, event]);
    setPendingEvents(prev => prev.filter(e => e.id !== event.id));
  };

  const rejectEvent = (id) => {
    setPendingEvents(prev => prev.filter(e => e.id !== id));
  };

  const editApprovedEvent = (updatedEvent) => {
    setApprovedEvents(prev =>
      prev.map(e => (e.id === updatedEvent.id ? updatedEvent : e))
    );
  };

  const removeEvent = (id) => {
    setApprovedEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <EventContext.Provider value={{
      pendingEvents,
      approvedEvents,
      approveEvent,
      rejectEvent,
      editApprovedEvent,
      removeEvent
    }}>
      {children}
    </EventContext.Provider>
  );
};
