import { Link } from 'react-router-dom';
import AikoLogo from '../assets/img/aiko.png';

function Header() {
  return (
    <div className="flex items-center justify-between px-9 py-5 bg-tertiary border-b-[1px] border-secondary">
      <div>
        <Link to="/">
          <img
            src={AikoLogo}
            alt="Aiko Logo"
            className="h-12"
            style={{ minWidth: '97px' }}
          />
        </Link>
      </div>
      <div className="flex gap-5">
        <Link
          to="/"
          className="text-white border border-primary bg-primary rounded-lg py-1.5 px-3.5 hover:bg-secondary hover:rounded-xl hover:shadow-md"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default Header;
