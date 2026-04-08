import React from 'react';

const DeviceSelector = ({ onSelect }) => {
  return (
    <div className="device-selector-screen">
      <div className="selector-content">
        <h1>Выберите устройство</h1>
        <div className="device-options">
          <button className="device-btn" onClick={() => onSelect('mobile')}>
            📱 Мобильный
          </button>
          <button className="device-btn" onClick={() => onSelect('desktop')}>
            💻 Десктоп
          </button>
        </div>
        <p>Выберите платформу для оптимального отображения</p>
      </div>
    </div>
  );
};

export default DeviceSelector;