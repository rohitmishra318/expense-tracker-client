import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-indigo-600 text-white p-4 flex justify-between">
    <Link to="/" className="font-bold text-lg">ExpenseTracker</Link>
    <div>
      <Link to="/" className="mx-2">Home</Link>
      <Link to="/about" className="mx-2">About Us</Link>
      <Link to="/login" className="mx-2">Login</Link>
      <Link to="/register" className="mx-2">Sign Up</Link>
      <Link to="/tracker" className="mx-2">Dashboard</Link>
      <Link to="/lentborrow" className="mx-2">Lent/Borrowed</Link>
      <Link to="/profile" className="mx-2">Profile</Link>
    </div>
  </nav>
);
export default Navbar;
