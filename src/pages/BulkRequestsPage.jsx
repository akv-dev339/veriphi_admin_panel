import React, { useEffect, useState } from "react";
import "../styles/bulkRequests.css";

const BulkRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Live backend URL
  const API_URL = "https://veriphi-backend.onrender.com";
  const toProperCase = (str) => {
    if (!str) return '';
    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  // ✅ Fetch all bulk bookings
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/booking/getAllGroupPending`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Bulk Booking Data:", data);
        setRequests(data || []);
      } else {
        console.error("❌ Failed to fetch bulk requests:", response.status);
      }
    } catch (error) {
      console.error("🚨 Error fetching bulk requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Approve / Reject actions
  const handleDecision = async (bookingId, decision) => {
    const confirmed = window.confirm(`Are you sure you want to ${decision} this booking?`);
    if (!confirmed) return;

    const approvalValue = toProperCase(decision); // APPROVED or REJECTED
    console.log(`➡ Updating booking ${bookingId} with status: ${approvalValue}`);

    try {
      const response = await fetch(
        `${API_URL}/booking/updateGroupApproval?bookingId=${bookingId}&approval=${approvalValue}`,
        { method: "PUT" }
      );

      if (response.ok) {
        alert(`Booking ${decision} successfully!`);
        fetchRequests(); // Refresh the list
      } else {
        const errorText = await response.text();
        console.error(`❌ Failed to update booking. Status: ${response.status}`, errorText);
        alert("Failed to update booking status. Check console for details.");
      }
    } catch (error) {
      console.error("🚨 Network/CORS error while updating booking:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <div className="loading">Loading bulk requests...</div>;
  }

  if (requests.length === 0) {
    return <div className="no-data">No bulk booking requests found.</div>;
  }

  return (
    <div className="bulk-requests-container">
      <h2>Bulk Booking Requests</h2>
      <table className="bulk-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Entity Name</th>
            <th>User Email</th>
            <th>Booking Date</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Event Time</th>
            <th>Venue</th>
            <th>Seat Category</th>
            <th>Tickets</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => {
            const status = req.bookingStatus?.toLowerCase() || "pending";
            const isPending = !["approved", "rejected"].includes(status);

            return (
              <tr key={index}>
                <td>{req.groupBookingId}</td>
                <td>{req.entityName}</td>
                <td>{req.userEmail}</td>
                <td>{new Date(req.bookingDate).toLocaleString()}</td>
                <td>{req.eventName}</td>
                <td>{req.eventDate}</td>
                <td>{req.eventTime}</td>
                <td>{req.venue}</td>
                <td>{req.seatCategory}</td>
                <td>{req.numberOfTickets}</td>
                <td className={`status-${status}`}>{req.bookingStatus}</td>
                <td>
                  {isPending ? (
                    <div className="action-buttons">
                      <button
                        className="approve-btn"
                        onClick={() => handleDecision(req.groupBookingId, "approved")}
                      >
                        ✅ Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleDecision(req.groupBookingId, "rejected")}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  ) : (
                    <span className={`action-status-${status}`}>
                      {req.bookingStatus?.toUpperCase()}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BulkRequestsPage;
