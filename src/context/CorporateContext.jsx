import React, { createContext, useState } from "react";

export const CorporateContext = createContext();

const initialCorporateRequests = [
  {
    id: 1,
    companyName: "ABC Corp",
    email: "abc@example.com",
    contact: "9876543210",
    eventTitle: "Arijit Singh Live Concert",
    ticketsRequested: 50,
    status: "pending",
  },
  {
    id: 2,
    companyName: "XYZ Ltd",
    email: "xyz@example.com",
    contact: "9123456780",
    eventTitle: "Tech Expo 2025",
    ticketsRequested: 120,
    status: "pending",
  },
];

export const CorporateProvider = ({ children }) => {
  const [corporateRequests, setCorporateRequests] = useState(initialCorporateRequests);

  const addCorporateRequest = (newRequest) => {
    setCorporateRequests((prev) => [...prev, newRequest]);
  };

  const approveCorporateRequest = (id) => {
    setCorporateRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
  };

  const rejectCorporateRequest = (id) => {
    setCorporateRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const markRequestUnderVerification = (id) => {
    setCorporateRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "on_verification" } : req
      )
    );
    console.log(`Email sent to corporate email for request ID ${id} confirming verification.`);
  };

  return (
    <CorporateContext.Provider
      value={{
        corporateRequests,
        addCorporateRequest,
        approveCorporateRequest,
        rejectCorporateRequest,
        markRequestUnderVerification,
      }}
    >
      {children}
    </CorporateContext.Provider>
  );
};
