import { Link, useLocation } from 'react-router-dom';

const routes = [
  {
    title: 'Contacts',
    path: '/contacts',
  },
  {
    title: 'Charts and Maps',
    path: '/charts-and-maps',
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-between bg-light-secondary min-w-[300px] h-[94vh] py-5">
      <div className="flex flex-col">
        {routes.map((r, i) => (
          <Link
            className={`font-semilight py-2 transition-all hover:text-primary duration-200 border-l-4 border-l-transparent hover:border-l-primary px-9 ml-1 rounded-sm ${
              location.pathname.startsWith(r.path) ? 'text-primary' : 'text-dark-secondary'
            }`}
            to={r.path}
            key={i}
          >
            {r.title}
          </Link>
        ))}
      </div>
      <a
        target="_blank"
        href="https://github.com"
        className="font-semilight text-dark-secondary py-2 transition-all hover:text-primary duration-200 border-l-4 border-l-transparent hover:border-l-primary px-9 ml-1 rounded-sm"
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
  );
}
