import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payment1.css';

const Payment1 = () => {
  const [formData, setFormData] = useState({
    method: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paypalName: '',
    paypalEmail: '',
    paypalId: '',
    city: '',
    state: '',
    postalCode: '',
    locality: '',
    amount: ''
  });

  const [message, setMessage] = useState('');
  const [payments, setPayments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { ...formData };

    if (formData.method === 'Credit Card') {
      payload.paypalName = '';
      payload.paypalEmail = '';
      payload.paypalId = '';
    } else if (formData.method === 'PayPal') {
      payload.name = '';
      payload.cardNumber = '';
      payload.expiry = '';
      payload.cvv = '';
    }

    try {
      const res = await axios.post('http://localhost:8084/payments', payload);
      setMessage(`Payment successful! ID: ${res.data.id}`);
      fetchPayments();
      setFormData({
        method: '',
        name: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        paypalName: '',
        paypalEmail: '',
        paypalId: '',
        city: '',
        state: '',
        postalCode: '',
        locality: '',
        amount: ''
      });
    } catch (error) {
      console.error(error);
      setMessage('Payment failed.');
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:8084/payments');
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const isCreditCard = formData.method === 'Credit Card';
  const isPayPal = formData.method === 'PayPal';

  return (
    <div className="payment-form-container">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Payment Method</label>
        <select name="method" value={formData.method} onChange={handleChange} required>
          <option value="">Select Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
        </select>

        {isCreditCard && (
          <>
            <input type="text" name="name" placeholder="Cardholder Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
            <input type="text" name="expiry" placeholder="Expiry (MM/YY)" value={formData.expiry} onChange={handleChange} required />
            <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />
          </>
        )}

        {isPayPal && (
          <>
            <input type="text" name="paypalName" placeholder="PayPal Name" value={formData.paypalName} onChange={handleChange} required />
            <input type="email" name="paypalEmail" placeholder="PayPal Email" value={formData.paypalEmail} onChange={handleChange} required />
            <input type="text" name="paypalId" placeholder="PayPal ID" value={formData.paypalId} onChange={handleChange} required />
          </>
        )}

        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
        <input type="text" name="locality" placeholder="Locality" value={formData.locality} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount (₹)" value={formData.amount} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h3>All Payments</h3>
      <ul>
        {payments.map((p) => (
          <li key={p.id}>
            {p.method} - ₹{p.amount} - {p.city}, {p.state}
          </li>
        ))}
      </ul>``
    </div>
  );
};

export default Payment1;
