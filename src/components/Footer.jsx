import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaRegCalendarAlt, FaUser } from 'react-icons/fa';

export default function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="fixed bottom-0 w-full bg-white border-t shadow-inner">
      <nav className="flex justify-around py-2">
        <Link
          to="/"
          className={`flex flex-col items-center text-xs ${pathname === '/' ? 'text-green-600' : 'text-gray-500'}`}
        >
          <FaHome className="h-6 w-6 mb-1" />
          홈
        </Link>
        <Link
          to="/routine"
          className={`flex flex-col items-center text-xs ${pathname.startsWith('/routine') ? 'text-green-600' : 'text-gray-500'}`}
        >
          <FaRegCalendarAlt className="h-6 w-6 mb-1" />
          루틴
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center text-xs ${pathname === '/profile' ? 'text-green-600' : 'text-gray-500'}`}
        >
          <FaUser className="h-6 w-6 mb-1" />
          프로필
        </Link>
      </nav>
    </footer>
  );
}