import logo from './logo.svg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApproveEvent from './pages/ApproveEvents';
import ApprovedEvents from './pages/ApprovedEvents';
import AddEvent from './pages/AddEvents';
import RemoveEvent from './pages/RemoveEvents';
import AdminLayout from './components/adminlayout';
import { EventProvider } from './context/EventContext';

import BulkRequestsPage from './pages/BulkRequestsPage';

function App() {
  return (
    <Router>
      <EventProvider>
        
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login/>}></Route>

       <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="approve-event" element={<ApproveEvent />} />
          <Route path="approved-events" element={<ApprovedEvents />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="bulk-requests" element={<BulkRequestsPage />} />
          
        </Route>

      </Routes>
       
      </EventProvider>
    </Router>
  );
}

export default App;
