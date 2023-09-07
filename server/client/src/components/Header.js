import { Link } from 'react-router-dom';
import classNames from 'classnames';

function getHeaderElements(user) {
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
      return (
        <li>
          <a href='/api/logout'>Logout</a>
        </li>
      );
  }
}

function Header({ user }) {
  return (
    <nav className='flex flex-row justify-between text-white bg-red-400 h-20 items-center px-5'>
      <div className='hover:bg-red-200 text-4xl'>
        <Link to={user ? '/surveys' : '/'}>Investigate</Link>
      </div>
      <div className='hover:bg-red-200 text-xl'>
        <ul>{getHeaderElements(user)}</ul>
      </div>
    </nav>
  );
}

export default Header;
