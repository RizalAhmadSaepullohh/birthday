import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';
import audioConfig from '../config/audioConfig.json';

const AudioPlayer = ({ currentSlideIndex, isPlaying, setIsPlaying }) => {
  // Use a ref so we can read the latest value inside the effect without stale closure
  const hasStartedRef = useRef(false);
  const lastConfigRef = useRef(null);

  // Sync volume/mute state whenever isPlaying changes
  useEffect(() => {
    audioEngine.setGlobalVolume(0.7, !isPlaying);
  }, [isPlaying]);

  // Main effect: triggered by slide change OR when audio is first started (isPlaying flips to true)
  useEffect(() => {
    // The experience hasn't started yet (user hasn't clicked Start)
    if (!isPlaying && !hasStartedRef.current) return;

    // Mark that we've had at least one user interaction (satisfies browser autoplay policy)
    if (isPlaying && !hasStartedRef.current) {
      hasStartedRef.current = true;
    }

    if (!hasStartedRef.current) return;

    // Slide 0 = intro screen, no audio
    if (currentSlideIndex === 0) {
      audioEngine.pause();
      return;
    }

    // Find the config for current slide, falling back to the nearest preceding one
    const sortedConfigs = [...audioConfig.slides].sort((a, b) => b.slide - a.slide);
    let targetConfig = null;
    for (const conf of sortedConfigs) {
      if (currentSlideIndex >= conf.slide) {
        targetConfig = conf;
        break;
      }
    }

    if (!targetConfig) return;

    // Don't restart the same track+slide unless it's paused
    const activePlayer = audioEngine.getActivePlayer();
    const isSameConfig = lastConfigRef.current && lastConfigRef.current.slide === targetConfig.slide;
    const isPaused = !activePlayer || activePlayer.paused;

    if (isSameConfig && !isPaused) return;

    lastConfigRef.current = targetConfig;
    audioEngine.playTrack(targetConfig);

  }, [currentSlideIndex, isPlaying]);

  // Handle explicit play/pause toggle (mute button)
  useEffect(() => {
    if (!hasStartedRef.current) return;
    if (isPlaying) {
      audioEngine.resume();
    } else {
      audioEngine.pause();
    }
  }, [isPlaying]);

  // Don't show the button on the intro screen
  if (currentSlideIndex === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute top-4 right-4 z-[60] pointer-events-auto"
    >
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="p-2.5 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all border border-white/20 hover:scale-110 active:scale-95"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </motion.div>
  );
};

export default AudioPlayer;
