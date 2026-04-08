import React from 'react';

const ThemeSelector = ({ onSelect }) => {
  const themes = [
    { id: 'default', name: 'Стандартная', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'ocean', name: 'Океан', bg: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)' },
    { id: 'sunset', name: 'Закат', bg: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' },
    { id: 'forest', name: 'Лес', bg: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)' },
    { id: 'purple', name: 'Фиолетовая', bg: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)' }
  ];

  return (
    <div className="theme-selector-screen">
      <div className="selector-content">
        <h1>Выберите обой</h1>
        <div className="theme-grid">
          {themes.map(theme => (
            <button
              key={theme.id}
              className="theme-btn"
              style={{ background: theme.bg }}
              onClick={() => onSelect(theme.id)}
            >
              {theme.name}
            </button>
          ))}
        </div>
        <p>Нажмите, чтобы выбрать тему оформления</p>
      </div>
    </div>
  );
};

export default ThemeSelector;