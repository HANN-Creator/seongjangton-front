import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/back.png';

export default function Header({ showBack = false }) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between p-4 bg-[#F8FDFC]">
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="focus:outline-none"
        >
          <img
            src={backIcon}
            alt="뒤로가기"
            className="w-6 h-6"
          />
        </button>
      ) : (
        <div className="w-6 h-6" />
      )}

    </header>
  );
}