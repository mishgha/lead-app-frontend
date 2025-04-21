import React from 'react';
import { toast } from 'react-toastify';
import { deleteLead } from '../services/api';
import './LeadList.css';

/**
 * LeadList component displays a list of submitted leads.
 * It allows the user to delete a lead, updating the list of leads accordingly.
 * 
 * @component
 * @example
 * const [leads, setLeads] = useState([]);
 * return <LeadList leads={leads} setLeads={setLeads} />;
 * 
 * @param {Object} props - The component props.
 * @param {Array} props.leads - The list of leads to display.
 * @param {Function} props.setLeads - Function to update the list of leads after deletion.
 */
const LeadList = ({ leads, setLeads }) => {
  const handleDelete = async (id) => {
    try {
      await deleteLead(id);
      setLeads(prev => prev.filter(lead => lead.id !== id));
      toast.success('Lead deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete lead.');
    }
  };

  return (
    <div className="table-container">
      <h2 className='heading'>Submitted Leads</h2>
      {leads.length === 0 ? (
        <p>No leads yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index}>
                <td>{lead.fullName}</td>
                <td>{lead.email}</td>
                <td>{lead.phoneNumber}</td>
                <td>{lead.companyName}</td>
                <td>{lead.notes}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeadList;