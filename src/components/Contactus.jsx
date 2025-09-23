import { useState } from 'react';
import './Contactus.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    feedback: '' 
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmissionStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        feedback: ''
      });
    }, 1000);
  };

  return (
    <div className="contact-us-container">
      <div className="contact-overlay"></div> {/* For background overlay */}
      
      <div className="contact-content-wrapper">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We value your feedback! Share your experience with us.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>123 Grocery Street, Foodville, 56789</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>support@onlinegrocerystore.com</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>Working Hours</h3>
                <p>24/7</p>
               
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Share Your Feedback</h2>
            {submissionStatus === 'success' ? (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <p>Thank you for your feedback! We appreciate your time.</p>
                <button onClick={() => setSubmissionStatus(null)}>Submit more feedback</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="delivery">Delivery Feedback</option>
                    <option value="product">Product Feedback</option>
                    <option value="service">Service Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="feedback">Your Feedback</label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows="5"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Share your experience with us..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit Feedback</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="footer">
        <p className="legal-text">
              ALL RIGHTS ARE UNDER RESERVED © DINESH KARTHIK ALLA
            </p>
      </div>
    </div>
  );
};

export default ContactUs;
