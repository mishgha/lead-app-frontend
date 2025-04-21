import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createLead } from '../services/api';
import './LeadForm.css';

/**
 * LeadForm component handles the lead submission process.
 * It uses Formik for form handling, Yup for validation, and react-toastify for notifications.
 * 
 * @component
 * @example
 * const [leads, setLeads] = useState([]);
 * return <LeadForm setLeads={setLeads} />;
 */
const LeadForm = ({ setLeads }) => {
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    notes: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string(),
    companyName: Yup.string(),
    notes: Yup.string(),
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await createLead(values);
      
      setLeads(prev => [...prev, response.data]);
      toast.success('Lead submitted successfully!');
      resetForm();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        
        const errorMessage = error.response.data.errors[0]?.errorMessage || 'Failed to submit lead. Please try again.';
        toast.error(errorMessage);
      } else {
        toast.error('Failed to submit lead. Please try again.');
      }
    }
    setSubmitting(false);
  };  

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="form-container">
            <div>
              <label>Full Name *</label><br />
              <Field type="text" name="fullName" />
              <div className="error-message">
                <ErrorMessage name="fullName" component="div" />
              </div>
            </div>

            <div>
              <label>Email *</label><br />
              <Field type="email" name="email" />
              <div className="error-message">
                <ErrorMessage name="email" component="div" />
              </div>
            </div>

            <div>
              <label>Phone Number</label><br />
              <Field type="text" name="phoneNumber" />
            </div>

            <div>
              <label>Company Name</label><br />
              <Field type="text" name="companyName" />
            </div>

            <div>
              <label>Notes</label><br />
              <Field as="textarea" name="notes" rows="4" />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !isValid} 
              className="submit-button"
            >
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : (
                'Submit'
              )}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LeadForm;