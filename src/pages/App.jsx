import React, { useState, useEffect } from 'react';
import Clicker from '../components/Clicker';
import Upgrades from '../components/Upgrades';
import Stats from '../components/Stats';
import Settings from '../components/Settings';
import AudioPlayer from '../components/AudioPlayer';
import Welcome from '../components/Welcome';
import DeviceSelector from '../components/DeviceSelector';


function App() {
  const [points, setPoints] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [criticalChance, setCriticalChance] = useState(0.05);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showDeviceSelector, setShowDeviceSelector] = useState(false);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    // Проверяем, был ли уже показан экран приветствия
    const hasSeenIntro = localStorage.getItem('spidi-has-seen-intro');
    if (hasSeenIntro) {
      // Если уже прошел введение, сразу загружаем основное приложение
      const savedDevice = localStorage.getItem('spidi-device');
      if (savedDevice) {
        setDevice(savedDevice);
        document.body.classList.add('animated-bg');
      } else {
        // Если устройство не выбрано, но введение уже было — показываем выбор устройства
        setShowDeviceSelector(true);
      }
    } else {
      // Показываем приветствие в первый раз
      setShowWelcome(true);
      localStorage.setItem('spidi-has-seen-intro', 'true');
    }
  }, []);

  const handleStart = () => {
    setShowWelcome(false);
    setTimeout(() => setShowDeviceSelector(true), 300);
  };

  const handleDeviceSelect = (deviceType) => {
    setDevice(deviceType);
    localStorage.setItem('spidi-device', deviceType);
    setShowDeviceSelector(false);
    document.body.classList.add('animated-bg');
  };

  // Авто-клик
  useEffect(() => {
    if (autoClickers > 0) {
      const interval = setInterval(() => {
        const earned = autoClickers * clickPower;
        setPoints(prev => prev + earned);
        setTotalEarned(prev => prev + earned);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickers, clickPower]);

  // Сохранение
  useEffect(() => {
    const saved = localStorage.getItem('spidi-clicker');
    if (saved) {
      const data = JSON.parse(saved);
      setPoints(data.points || 0);
      setClickPower(data.clickPower || 1);
      setAutoClickers(data.autoClickers || 0);
      setCriticalChance(data.criticalChance || 0.05);
      setTotalClicks(data.totalClicks || 0);
      setTotalEarned(data.totalEarned || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('spidi-clicker', JSON.stringify({
      points, clickPower, autoClickers, criticalChance, totalClicks, totalEarned
    }));
  }, [points, clickPower, autoClickers, criticalChance, totalClicks, totalEarned]);

  const handleClick = () => {
    let earned = clickPower;
    if (Math.random() < criticalChance) earned *= 3; // x3 на крит

    setPoints(prev => prev + earned);
    setTotalEarned(prev => prev + earned);
    setTotalClicks(prev => prev + 1);
  };

  if (showWelcome) {
    return <Welcome onStart={handleStart} />;
  }

  if (showDeviceSelector) {
    return <DeviceSelector onSelect={handleDeviceSelect} />;
  }

  return (
    <div className="app">
      <AudioPlayer />
      <header className="header">
        <h1>Spidi Clicker</h1>
        <p>{points.toLocaleString()} <img src="https://imgfy.ru/ib/cM6e9y89ckXWZYi_1775668474.webp" alt="Coin" style="width: 20px; height: 20px; vertical-align: middle; margin-left: 5px;" /></p>
      </header>
      <main>
        <Clicker onClick={handleClick} />
        <Upgrades
          points={points}
          setPoints={setPoints}
          clickPower={clickPower}
          setClickPower={setClickPower}
          autoClickers={autoClickers}
          setAutoClickers={setAutoClickers}
          criticalChance={criticalChance}
          setCriticalChance={setCriticalChance}
        />
        <Stats totalClicks={totalClicks} totalEarned={totalEarned} />
        <Settings />
      </main>
      <footer className="footer">
        <small>Spidi Clicker © Wintozo Corporation</small>
      </footer>
    </div>
  );
}

export default App;