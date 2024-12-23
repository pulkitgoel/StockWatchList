import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Search', path: '/search' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Settings', path: '/settings' },
  ];

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 h-full bg-gray-800 text-white transition-all duration-300',
        isOpen ? 'w-64' : 'w-16',
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            <span className={clsx(!isOpen && 'hidden')}>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}