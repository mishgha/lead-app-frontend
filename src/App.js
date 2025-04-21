import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';
import { getLeads } from './services/api';
import './App.css';

/**
 * App component is the main entry point for the lead capture application.
 * It fetches leads from the server, handles displaying the form to add leads,
 * and displays the list of existing leads. It also integrates with react-toastify
 * to show notifications for various events like fetching or submitting leads.
 * 
 */
function App() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const response = await getLeads();
      setLeads(response.data.leadDtoList);
    } catch (error) {
      toast.error('Failed to fetch leads.');      
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="app-container">
      <h1 className="heading">Lead Capture Form</h1>
      <LeadForm setLeads={setLeads} />
      <hr style={{ margin: "40px 0" }} />
      <LeadList leads={leads} setLeads={setLeads} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;