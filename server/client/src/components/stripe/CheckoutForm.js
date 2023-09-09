import React from 'react';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';

function CheckoutForm(props) {
  const { stripe, elements, onSendToken } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const result = await stripe.createToken(card);
    if (result.error) {
      //console.log(result.error.message);
    } else {
      onSendToken(result.token);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!stripe} className='btn-pay'>
          Buy Now
        </button>
      </form>
    </div>
  );
}

export default function InjectedCheckoutForm({ onSendToken }) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          onSendToken={onSendToken}
        />
      )}
    </ElementsConsumer>
  );
}
