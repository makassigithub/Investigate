import { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from './stripe';
import { useHandleStripePaymentMutation } from '../store';

import Modal from './Modal';
import Button from './Button';

function Header({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [sendToken, { isError, isLoading, data }] =
    useHandleStripePaymentMutation();

  const onSendToken = (stripeToken) => {
    sendToken(stripeToken);
    handleClose();
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const actionBar = (
    <div>
      <Button warning className='rounded' onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <CheckoutForm onSendToken={onSendToken} />
    </Modal>
  );

  const getHeaderElements = () => {
    switch (user) {
      case undefined:
        return;
      case null:
        return (
          <li>
            <a href='/auth/google'>Login with google</a>
          </li>
        );
      default:
        return [
          <li key='1'>
            <button
              className='bg-green-400 px-3 py-2 rounded-lg hover:bg-green-300'
              onClick={handleClick}
            >
              Add credit
            </button>
          </li>,
          <li key='3' className='mx-5'>
            Credits :{isLoading ? '...' : data?.credits || user.credits}
          </li>,
          <li key='2'>
            <a href='/api/logout'>Logout</a>
          </li>,
        ];
    }
  };

  return (
    <nav className='flex flex-row justify-between items-center text-white bg-red-400 h-20 px-5'>
      <div className='hover:bg-red-200 text-4xl'>
        <Link to={user ? '/surveys' : '/'}>Investigate</Link>
      </div>
      <div className='text-xl flex'>
        <ul className='flex items-center'>{getHeaderElements(user)}</ul>
      </div>
      {showModal && modal}
    </nav>
  );
}

export default Header;
