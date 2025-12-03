import React, { useEffect, useState } from 'react';

const ThemeSwitcher: React.FC = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <button className="p-2 rounded bg-gray-200 dark:bg-gray-700" onClick={() => setDark(d => !d)}>
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};
export default ThemeSwitcher;
