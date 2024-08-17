import { MenuRounded } from '@mui/icons-material';
import React from 'react';
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
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div
      className={`flex flex-col justify-between bg-light-secondary  overflow-hidden  z-10 ${
        sidebarCollapsed ? 'w-[50px] relative' : 'w-screen absolute'
      } md:relative md:w-[300px] h-[94vh] py-5 transition-all duration-300`}
    >
      <div className="flex flex-col w-full">
        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className={`text-left py-2 ${
            sidebarCollapsed ? 'px-3 self-center' : 'px-10'
          } transition-all ease-in-out duration-300 block md:hidden`}
        >
          <MenuRounded />
        </button>
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
