import React, { useContext } from "react";
import { CorporateContext } from "../context/CorporateContext";
import "../styles/CorporateRequests.css";

const CorporateRequests = () => {
  const {
    corporateRequests,
    approveCorporateRequest,
    rejectCorporateRequest,
    markRequestUnderVerification,
  } = useContext(CorporateContext);

  return (
    <div className="corporate-requests-container">
      <h2>Corporate Bulk Booking Requests</h2>
      {corporateRequests.length === 0 ? (
        <p>No corporate requests yet.</p>
      ) : (
        <div className="request-list">
          {corporateRequests.map((request) => (
            <div className="request-card" key={request.id}>
              <h3>{request.companyName}</h3>
              <p><strong>Email:</strong> {request.email}</p>
              <p><strong>Contact:</strong> {request.contact}</p>
              <p><strong>Event:</strong> {request.eventTitle}</p>
              <p><strong>Tickets Requested:</strong> {request.ticketsRequested}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${request.status}`}>
                  {request.status.replace("_", " ")}
                </span>
              </p>

              {request.status === "pending" && (
                <button
                  onClick={() => markRequestUnderVerification(request.id)}
                  className="verify-btn"
                >
                  Mark as Under Verification
                </button>
              )}

              {request.status === "on_verification" && (
                <>
                  <p className="verification-note">This request is under manual verification.</p>
                  <button
                    onClick={() => approveCorporateRequest(request.id)}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectCorporateRequest(request.id)}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CorporateRequests;
