'use client';
import React, { useState } from 'react';

type Theme = 'cushon' | 'forest';
type Mode = 'light' | 'dark';

export default function ThemeSwitcher() {
  const [toggleOne, setToggleOne] = useState<Theme>('cushon');
  const [toggleTwo, setToggleTwo] = useState<Mode>('light');

  function updateTheme(theme: Theme, mode: Mode) {
    document.body.classList.forEach((className) =>
      document.body.classList.remove(className)
    );
    document.body.classList.add(`${theme}-${mode}`);
  }

  const handleToggleOne = (theme: Theme) => {
    const newTheme = theme === 'cushon' ? 'forest' : 'cushon';
    setToggleOne(newTheme);
    updateTheme(newTheme, toggleTwo);
  };

  const handleToggleTwo = (mode: Mode) => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setToggleTwo(newMode);
    updateTheme(toggleOne, newMode);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm">Cushon</label>
        <button
          className={`relative w-12 h-6 bg-gray-300 rounded-full cursor-pointer transition-colors ${
            toggleOne === 'forest' ? 'bg-blue-500' : ''
          }`}
          onClick={() => handleToggleOne(toggleOne)}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              toggleOne === 'forest' ? 'translate-x-6' : ''
            }`}
          />
        </button>
        <label className="text-sm">Forest</label>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm">Light</label>
        <button
          className={`relative w-12 h-6 bg-gray-300 rounded-full cursor-pointer transition-colors ${
            toggleTwo === 'dark' ? 'bg-blue-500' : ''
          }`}
          onClick={() => handleToggleTwo(toggleTwo)}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              toggleTwo === 'dark' ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>
      <label className="text-sm">Dark</label>
    </div>
  );
}
