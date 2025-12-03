import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ThemeSwitcher from '../components/ThemeSwitcher';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/bugs', label: 'Bug List' },
  { to: '/report', label: 'Report Bug' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/ai', label: 'AI Playground' },
  { to: '/settings', label: 'Settings' },
];

const MainLayout: React.FC = () => (
  <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    <aside className="w-64 bg-white dark:bg-gray-800 shadow flex flex-col">
      <div className="p-4 font-bold text-xl">BugSage</div>
      <nav className="flex-1">
        {navItems.map(item => (
          <Link key={item.to} to={item.to} className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4"><ThemeSwitcher /></div>
    </aside>
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);
export default MainLayout;
