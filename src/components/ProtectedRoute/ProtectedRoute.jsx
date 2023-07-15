import { Navigate, Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

  export default function ProtectedRoute({ loggedIn, children }) {
  if (loggedIn === null) {
    return (
      <>
        <Preloader />
        <Link to='/' className='home-link'>На главную</Link>
      </>
    )
  }

  if (!loggedIn) {
    return <Navigate to='/' replace />;
  }
  return children;
}
