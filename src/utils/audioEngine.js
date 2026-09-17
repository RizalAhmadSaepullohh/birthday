class AudioEngine {
  constructor() {
    // Only create Audio elements if in browser
    if (typeof window !== 'undefined') {
      this.players = [new Audio(), new Audio()];
      // Allow audio to be played across different origins if needed (CORS)
      this.players.forEach(p => p.crossOrigin = 'anonymous');
    }
    
    this.activePlayerIndex = 0;
    this.fadeIntervals = [null, null];
    this.monitorInterval = null;
    this.onEndCallback = null;
    this.globalVolume = 0.5;
    this.isMuted = false;
    this.currentConfig = null;
  }

  getActivePlayer() {
    return this.players ? this.players[this.activePlayerIndex] : null;
  }

  getInactivePlayer() {
    return this.players ? this.players[1 - this.activePlayerIndex] : null;
  }

  setGlobalVolume(vol, isMuted) {
    this.globalVolume = Math.max(0, Math.min(1, vol));
    this.isMuted = isMuted;
    const active = this.getActivePlayer();
    if (active && !active.paused) {
      active.volume = isMuted ? 0 : this.globalVolume;
    }
  }

  async playTrack(config) {
    if (!this.players) return;
    
    // Don't restart if it's the exact same track configuration
    if (this.currentConfig && this.currentConfig.slide === config.slide && !this.getActivePlayer().paused) {
      return; 
    }
    
    this.currentConfig = config;
    const inactive = this.getInactivePlayer();
    const active = this.getActivePlayer();

    // Prepare inactive player for the new track
    inactive.src = config.file;
    inactive.currentTime = config.startTime || 0;
    inactive.loop = false; // We handle the end time manually
    inactive.volume = 0; // Start silent for fade in

    // Swap active roles
    this.activePlayerIndex = 1 - this.activePlayerIndex;
    const newActive = inactive;
    const oldActive = active;

    try {
      await newActive.play();
    } catch (err) {
      console.warn("Audio playback prevented by browser (autoplay policy):", err);
      // Do not continue fading if it couldn't start
      return;
    }

    const fadeDuration = (config.fadeIn !== undefined ? config.fadeIn : 1) * 1000;
    const fadeOutDuration = (config.fadeOut !== undefined ? config.fadeOut : 1) * 1000;

    // Fade in the new track
    const targetVol = this.isMuted ? 0 : this.globalVolume;
    this._fade(newActive, this.activePlayerIndex, 0, targetVol, fadeDuration);
    
    // Fade out the old track if it's playing
    if (!oldActive.paused && oldActive.src) {
      this._fade(oldActive, 1 - this.activePlayerIndex, oldActive.volume, 0, fadeOutDuration, () => {
        oldActive.pause();
      });
    }

    // Monitor playback to stop at `endTime`
    if (this.monitorInterval) clearInterval(this.monitorInterval);
    
    if (config.endTime) {
      this.monitorInterval = setInterval(() => {
        // Start fading out when we reach (endTime - fadeOutDuration)
        const timeRemaining = config.endTime - newActive.currentTime;
        const fadeOutSecs = fadeOutDuration / 1000;
        
        if (timeRemaining <= fadeOutSecs && timeRemaining > 0) {
           this._fade(newActive, this.activePlayerIndex, newActive.volume, 0, fadeOutDuration, () => {
              newActive.pause();
           });
           clearInterval(this.monitorInterval);
        } else if (newActive.currentTime >= config.endTime) {
           newActive.pause();
           clearInterval(this.monitorInterval);
        }
      }, 100);
    }
  }

  _fade(player, playerIndex, startVol, endVol, durationMs, onComplete) {
    if (this.fadeIntervals[playerIndex]) {
      clearInterval(this.fadeIntervals[playerIndex]);
    }
    
    if (durationMs <= 0) {
       player.volume = Math.max(0, Math.min(1, endVol));
       if (onComplete) onComplete();
       return;
    }

    const steps = 20;
    const stepTime = durationMs / steps;
    const volStep = (endVol - startVol) / steps;
    let currentStep = 0;
    
    player.volume = Math.max(0, Math.min(1, startVol));

    this.fadeIntervals[playerIndex] = setInterval(() => {
      currentStep++;
      let nextVol = startVol + (volStep * currentStep);
      
      // Clamp volume between 0 and 1
      nextVol = Math.max(0, Math.min(1, nextVol));
      
      player.volume = nextVol;

      if (currentStep >= steps) {
        clearInterval(this.fadeIntervals[playerIndex]);
        player.volume = endVol;
        if (onComplete) onComplete();
      }
    }, stepTime);
  }

  pause() {
    const active = this.getActivePlayer();
    if (active) active.pause();
  }
  
  resume() {
    const active = this.getActivePlayer();
    if (active) {
      active.play().catch(e => console.warn("Resume failed:", e));
    }
  }

  getCurrentTime() {
    const active = this.getActivePlayer();
    return active ? active.currentTime : 0;
  }
  
  getDuration() {
    const active = this.getActivePlayer();
    return active ? active.duration : 0;
  }
}

export const audioEngine = new AudioEngine();
