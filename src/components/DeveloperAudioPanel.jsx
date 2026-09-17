import React, { useState, useEffect, useRef } from 'react';
import audioConfig from '../config/audioConfig.json';
import { audioEngine } from '../utils/audioEngine';

const DeveloperAudioPanel = () => {
  const [config, setConfig] = useState(audioConfig);
  const [selectedSlide, setSelectedSlide] = useState(config.slides[0]?.slide || 1);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const activeConfig = config.slides.find(s => s.slide === selectedSlide);
  const activeIndex = config.slides.findIndex(s => s.slide === selectedSlide);

  // Update current time display
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTime(audioEngine.getCurrentTime());
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleUpdateActive = (field, value) => {
    const newConfig = { ...config };
    newConfig.slides[activeIndex][field] = value;
    setConfig(newConfig);
  };

  const handleSetStartTime = () => {
    handleUpdateActive('startTime', Math.floor(currentTime));
  };

  const handleSetEndTime = () => {
    handleUpdateActive('endTime', Math.floor(currentTime));
  };

  const handlePreview = () => {
    if (!activeConfig) return;
    
    // Bypass the global slide index lock for preview
    // Ensure the engine's mute state is off
    audioEngine.setGlobalVolume(1, false);
    audioEngine.playTrack(activeConfig);
    setIsPlaying(true);
  };
  
  const handlePause = () => {
    audioEngine.pause();
    setIsPlaying(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/save-audio-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        alert("Configuration saved successfully to audioConfig.json!");
      } else {
        alert("Failed to save configuration.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving configuration. Make sure Vite is running and the plugin is active.");
    }
  };

  if (!activeConfig) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-96 bg-black/80 backdrop-blur-xl border border-white/20 p-4 rounded-xl text-white shadow-2xl font-mono text-sm">
      <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
        <h3 className="font-bold text-lg text-wrap-yellow">Audio Dev Panel</h3>
        <button onClick={handleSave} className="bg-wrap-pink px-3 py-1 rounded text-white font-bold hover:bg-white hover:text-wrap-pink transition-colors">
          SAVE
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 mb-1">Select Slide Mapping</label>
        <select 
          className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white"
          value={selectedSlide}
          onChange={(e) => setSelectedSlide(Number(e.target.value))}
        >
          {config.slides.map(s => (
            <option key={s.slide} value={s.slide}>Slide {s.slide} ({s.track})</option>
          ))}
        </select>
      </div>

      <div className="bg-gray-900 p-3 rounded mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Current Time:</span>
          <span className="text-xl font-bold text-wrap-blue">{formatTime(currentTime)}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={isPlaying ? handlePause : handlePreview} 
            className="flex-1 bg-white/10 hover:bg-white/20 p-2 rounded text-center transition-colors font-bold"
          >
            {isPlaying ? "Pause Preview" : "Play Preview"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label className="w-24 text-gray-400">Start Time:</label>
          <input 
            type="number" 
            value={activeConfig.startTime} 
            onChange={(e) => handleUpdateActive('startTime', Number(e.target.value))}
            className="w-20 bg-gray-900 border border-gray-700 p-1 rounded text-center"
          />
          <button onClick={handleSetStartTime} className="flex-1 bg-white/10 hover:bg-white/20 p-1 rounded text-xs">Set to Current</button>
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24 text-gray-400">End Time:</label>
          <input 
            type="number" 
            value={activeConfig.endTime} 
            onChange={(e) => handleUpdateActive('endTime', Number(e.target.value))}
            className="w-20 bg-gray-900 border border-gray-700 p-1 rounded text-center"
          />
          <button onClick={handleSetEndTime} className="flex-1 bg-white/10 hover:bg-white/20 p-1 rounded text-xs">Set to Current</button>
        </div>
      </div>
      
      <p className="text-gray-500 text-xs mt-4 italic">
        * Note: Audio previews will start from 'Start Time'. 
        Changes are local only until you click Save.
      </p>
    </div>
  );
};

export default DeveloperAudioPanel;
