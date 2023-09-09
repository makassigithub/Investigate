import React from 'react';
import './styles.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function StripePayment({ onSendToken }) {
  return (
    <div className='payment-image'>
      <div className='product'>
        <div className='product-info'>
          <h3 className='product-title'>Add $5 for 5 credits</h3>
        </div>
        <img
          src='survey.jpeg'
          alt='laptop'
          style={{ width: '100%', height: 'auto' }}
        />
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm onSendToken={onSendToken} />
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default StripePayment;
