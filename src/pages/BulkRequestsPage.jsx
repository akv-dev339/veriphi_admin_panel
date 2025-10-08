import React, { useEffect, useState } from 'react';
import '../styles/bulkRequests.css';

const BulkRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  // ✅ Fetch all pending/rejected requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/booking/getGrpPendingOrRejectByEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify('admin@veriphi.com'), // placeholder email if API expects one
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        console.error('Failed to fetch bulk requests');
      }
    } catch (error) {
      console.error('Error fetching bulk requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve or Reject a request
  const handleDecision = async (bookingId, decision) => {
    const confirmed = window.confirm(`Are you sure you want to ${decision} this booking?`);
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/booking/updateGroupApproval?bookingId=${bookingId}&approval=${decision}`,
        { method: 'PUT' }
      );

      if (response.ok) {
        alert(`Booking ${decision} successfully!`);
        fetchRequests(); // refresh the list
      } else {
        alert('Failed to update booking status.');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <div className="bulk-loader">Loading requests...</div>;
  }

  return (
    <div className="bulk-container">
      <h2>Bulk Booking Requests</h2>
      {requests.length === 0 ? (
        <p>No pending or rejected requests.</p>
      ) : (
        <table className="bulk-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Email</th>
              <th>Event ID</th>
              <th>Venue ID</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>Seat Category ID</th>
              <th>No. of Seats</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.bookingId}>
                <td>{req.bookingId}</td>
                <td>{req.userEmail}</td>
                <td>{req.eventId}</td>
                <td>{req.venueId}</td>
                <td>{req.date}</td>
                <td>{req.startTime}</td>
                <td>{req.seatCategoryId}</td>
                <td>{req.numberOfSeats}</td>
                <td className={`status-${req.approvalStatus?.toLowerCase()}`}>
                  {req.approvalStatus}
                </td>
                <td>
                  {req.approvalStatus === 'PENDING' && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleDecision(req.bookingId, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleDecision(req.bookingId, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BulkRequestsPage;
