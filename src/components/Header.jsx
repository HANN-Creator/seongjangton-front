import { Link, useNavigate } from 'react-router-dom';

export default function Header({ showBack = false, title = 'RoutineApp' }) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          ← Back
        </button>
      ) : (
        <div />
      )}

      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

      <Link to="/" className="text-gray-600 hover:text-gray-800">
        Home
      </Link>
    </header>
  );
}