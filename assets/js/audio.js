/**
 * 🎵 THE MEDITATIVE SOUNDSCAPE ENGINE (STREAMING & AUTOPLAY ENHANCED)
 * Efficient chunked progressive streaming of Krishna.mp3 & Web Audio synthesizers (Flute, Om 432Hz, Night Rain).
 * Handles browser autoplay policies with seamless first-interaction auto-start and volume fade-in.
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isPlaying = false;
  let currentMode = "audio-file"; // default to Krishna.mp3
  let activeNodes = [];
  let masterGain = null;
  let audioElement = null;
  let autoplayUnlocked = false;

  // 1. MEMORY-EFFICIENT PROGRESSIVE STREAMING INITIALIZATION
  function initAudioElement() {
    if (!audioElement) {
      audioElement = new Audio();
      // 'metadata' ensures only audio headers are buffered initially (saves RAM and bandwidth)
      audioElement.preload = 'metadata';
      audioElement.src = 'Krishna.mp3';
      audioElement.loop = true;
      audioElement.volume = 0.45;
    }
    return audioElement;
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function stopActiveSound() {
    if (audioElement) {
      audioElement.pause();
    }

    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        activeNodes.forEach(node => {
          try { node.stop(); } catch (e) {}
          try { node.disconnect(); } catch (e) {}
        });
        activeNodes = [];
      }, 900);
    }
  }

  function startSoundscape(mode) {
    stopActiveSound();

    if (mode === 'audio-file') {
      const audio = initAudioElement();
      audio.play().then(() => {
        isPlaying = true;
        updateWidgetUI(true);
      }).catch((err) => {
        console.log("Autoplay waiting for initial user interaction:", err);
        // Fallback to flute synth if audio file fails
        startSynth('flute');
      });
      return;
    }

    startSynth(mode);
  }

  function startSynth(mode) {
    const ctx = getAudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + 2.5);
    masterGain.connect(ctx.destination);

    if (mode === 'flute') {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(460, ctx.currentTime);
      filter.Q.setValueAtTime(2.2, ctx.currentTime);

      const freqs = [138.59, 207.65, 277.18, 415.30, 554.37];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.12 + idx * 0.04, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.8, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        gain.gain.setValueAtTime(0.25 / (idx + 1), ctx.currentTime);
        osc.connect(gain);
        gain.connect(filter);
        osc.start();

        activeNodes.push(osc, gain, lfo, lfoGain);
      });

      const delay = ctx.createDelay();
      delay.delayTime.setValueAtTime(0.42, ctx.currentTime);
      const feedback = ctx.createGain();
      feedback.gain.setValueAtTime(0.38, ctx.currentTime);

      filter.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(masterGain);
      filter.connect(masterGain);

    } else if (mode === 'om') {
      const freqs = [108, 216, 432, 648, 864];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.8, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        gain.gain.setValueAtTime(0.2 / (idx + 1), ctx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();

        activeNodes.push(osc, gain, lfo, lfoGain);
      });

    } else if (mode === 'rain') {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      activeNodes.push(whiteNoise, filter);
    }

    isPlaying = true;
    updateWidgetUI(true);
  }

  function updateWidgetUI(playing) {
    const widget = document.getElementById('sound-widget');
    const icon = document.getElementById('sound-icon');
    if (widget) {
      if (playing) {
        widget.classList.add('playing');
        if (icon) icon.textContent = '❚❚';
      } else {
        widget.classList.remove('playing');
        if (icon) icon.textContent = '▶';
      }
    }
  }

  // 2. SMART AUTOPLAY WITH FIRST-TOUCH UNLOCK
  function tryAutoplay() {
    const audio = initAudioElement();
    
    // Attempt instant eager autoplay
    audio.play().then(() => {
      isPlaying = true;
      autoplayUnlocked = true;
      updateWidgetUI(true);
      if (window.showSanctuaryToast) {
        window.showSanctuaryToast("🎵 Playing: Krishna Bhajan & Flute");
      }
    }).catch(() => {
      // Browser autoplay policy blocked unprompted audio; wait for first interaction
      function unlockOnInteraction() {
        if (autoplayUnlocked) return;
        autoplayUnlocked = true;

        startSoundscape(currentMode);
        if (window.showSanctuaryToast) {
          window.showSanctuaryToast("🎵 Ambient soundscape activated");
        }

        // Clean up listeners
        window.removeEventListener('click', unlockOnInteraction);
        window.removeEventListener('touchstart', unlockOnInteraction);
        window.removeEventListener('keydown', unlockOnInteraction);
      }

      window.addEventListener('click', unlockOnInteraction, { once: true });
      window.addEventListener('touchstart', unlockOnInteraction, { once: true, passive: true });
      window.addEventListener('keydown', unlockOnInteraction, { once: true });
    });
  }

  function setupSoundWidget() {
    const widget = document.getElementById('sound-widget');
    if (!widget) return;

    const btn = document.getElementById('sound-toggle-btn');
    const select = document.getElementById('sound-mode-select');

    if (select) {
      let hasFileOpt = Array.from(select.options).some(o => o.value === 'audio-file');
      if (!hasFileOpt) {
        const opt = document.createElement('option');
        opt.value = 'audio-file';
        opt.textContent = '🎵 Krishna Bhajan & Flute';
        opt.selected = true;
        select.insertBefore(opt, select.firstChild);
      }
      currentMode = select.value;
    }

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        autoplayUnlocked = true;
        if (!isPlaying) {
          startSoundscape(currentMode);
          if (window.showSanctuaryToast) {
            window.showSanctuaryToast(`🎵 Playing: ${select ? select.options[select.selectedIndex].text : 'Soundscape'}`);
          }
        } else {
          stopActiveSound();
          isPlaying = false;
          updateWidgetUI(false);
          if (window.showSanctuaryToast) {
            window.showSanctuaryToast("🔇 Audio paused.");
          }
        }
      });
    }

    if (select) {
      select.addEventListener('change', (e) => {
        currentMode = e.target.value;
        if (isPlaying) {
          startSoundscape(currentMode);
          if (window.showSanctuaryToast) {
            window.showSanctuaryToast(`🎵 Switched to: ${select.options[select.selectedIndex].text}`);
          }
        }
      });
    }

    // Trigger smart autoplay on launch
    tryAutoplay();
  }

  window.addEventListener('DOMContentLoaded', () => {
    setupSoundWidget();
  });

})();
