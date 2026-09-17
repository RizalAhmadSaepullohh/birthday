import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SlideContainer from './components/SlideContainer';
import Navigation from './components/Navigation';
import AudioPlayer from './components/AudioPlayer';
import DeveloperAudioPanel from './components/DeveloperAudioPanel';

// Import all slides
import Slide01_Intro from './slides/Slide01_Intro';
import Slide02_Soundtrack from './slides/Slide02_Soundtrack';
import Slide03_TopArtist from './slides/Slide03_TopArtist';
import Slide04_IconicPhotos from './slides/Slide04_IconicPhotos';
import Slide05_PhotoReveal from './slides/Slide05_PhotoReveal';
import Slide06_TopMood from './slides/Slide06_TopMood';
import Slide07_LanyEra from './slides/Slide07_LanyEra';
import Slide08_PhotoMontage from './slides/Slide08_PhotoMontage';
import Slide09_MainCharacterStats from './slides/Slide09_MainCharacterStats';
import Slide10_MessageIntro from './slides/Slide10_MessageIntro';
import Slide11_HappyBirthday from './slides/Slide11_HappyBirthday';
import Slide_Bouquet from './slides/Slide_Bouquet';
import Slide12_Outro from './slides/Slide12_Outro';

const slides = [
  Slide01_Intro,
  Slide02_Soundtrack,
  Slide03_TopArtist,
  Slide04_IconicPhotos,
  Slide05_PhotoReveal,
  Slide06_TopMood,
  Slide07_LanyEra,
  Slide08_PhotoMontage,
  Slide09_MainCharacterStats,
  Slide10_MessageIntro,
  Slide11_HappyBirthday,
  Slide_Bouquet,
  Slide12_Outro
];

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const startExperience = () => {
    setHasStarted(true);
    setIsAudioPlaying(true);
    handleNext();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!hasStarted) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, currentSlideIndex]);

  const CurrentSlideComponent = slides[currentSlideIndex];

  // Check if debug mode is on
  const isDebug = typeof window !== 'undefined' && window.location.search.includes('debug=true');

  return (
    <div className="relative w-full h-screen h-[100dvh] max-h-[100dvh] bg-black overflow-hidden select-none">
      
      {/* Audio Player */}
      <AudioPlayer 
        currentSlideIndex={currentSlideIndex}
        isPlaying={isAudioPlaying}
        setIsPlaying={setIsAudioPlaying}
      />

      {/* Main Slide Area */}
      <AnimatePresence mode="wait">
        <SlideContainer key={currentSlideIndex}>
          <CurrentSlideComponent 
            onStart={startExperience} 
            hasStarted={hasStarted} 
          />
        </SlideContainer>
      </AnimatePresence>

      {/* Navigation Layer */}
      {hasStarted && (
        <Navigation 
          currentSlide={currentSlideIndex} 
          totalSlides={slides.length}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      
      {/* Developer Tools */}
      {isDebug && <DeveloperAudioPanel />}
    </div>
  );
}

export default App;
