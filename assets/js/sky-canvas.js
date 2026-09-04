/**
 * 🌌 THE SKY CANVAS PARTICLE ENGINE
 * Renders pitch-black starry sky, breathing electric-blue sparks,
 * floating golden-orange diyas with written prayer ribbons, and interactive touch/click spawner.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('night-sky-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  const stars = [];
  const diyas = [];
  const sparkles = [];

  const STAR_COUNT = 120;
  const MAX_AMBIENT_DIYAS = 18;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  // Electric-Blue Twinkling Star
  class Star {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 1.5 + 0.6;
      this.speed = Math.random() * 0.012 + 0.004;
      const blues = ['#38bdf8', '#60a5fa', '#818cf8', '#00f0ff', '#bae6fd'];
      this.color = blues[Math.floor(Math.random() * blues.length)];
      this.breathAngle = initial ? Math.random() * Math.PI * 2 : 0;
      this.alpha = 0.2;
    }

    update() {
      this.breathAngle += this.speed;
      this.alpha = 0.2 + (Math.sin(this.breathAngle) * 0.5 + 0.5) * 0.75;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.shadowBlur = this.radius * 6;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  // Warm Floating Diya
  class Diya {
    constructor(x, y, custom = false, label = "") {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : height + Math.random() * 80 + 20;
      this.speedY = custom ? (Math.random() * 0.45 + 0.3) : (Math.random() * 0.65 + 0.35);
      this.swingSpeed = Math.random() * 0.014 + 0.008;
      this.swingAngle = Math.random() * Math.PI * 2;
      this.scale = custom ? (label ? 1.05 : 0.95) : (Math.random() * 0.35 + 0.65);
      this.opacity = custom ? 1 : Math.random() * 0.3 + 0.7;
      this.isCustom = custom;
      this.label = label;
    }

    update() {
      this.y -= this.speedY;
      this.swingAngle += this.swingSpeed;
      this.x += Math.sin(this.swingAngle) * 0.55;

      // Emit soft sparkles from flame
      if (Math.random() < 0.06) {
        sparkles.push(new Sparkle(this.x, this.y - 14 * this.scale));
      }

      if (this.y < 120) {
        this.opacity -= 0.007;
      }
    }

    draw() {
      if (this.opacity <= 0) return;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);

      // 1. Ambient Golden Halo Glow
      const haloGrad = ctx.createRadialGradient(0, -6, 2, 0, -6, 46);
      haloGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
      haloGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.2)');
      haloGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(0, -6, 46, 0, Math.PI * 2);
      ctx.fill();

      // 2. Terracotta Clay Diya Bowl
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.quadraticCurveTo(0, 18, 18, 0);
      ctx.quadraticCurveTo(0, 6, -18, 0);
      ctx.fillStyle = '#b45309';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#f59e0b';
      ctx.fill();

      // Golden Rim
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.quadraticCurveTo(0, 5, 18, 0);
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // 3. Flickering Flame
      const flameFlicker = (Math.sin(Date.now() * 0.01 + this.swingAngle) * 0.15);
      const flameH = 21 + flameFlicker * 4;

      const flameGrad = ctx.createRadialGradient(0, -6, 1, 0, -8, flameH);
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.3, '#fef08a');
      flameGrad.addColorStop(0.7, '#f59e0b');
      flameGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');

      ctx.beginPath();
      ctx.moveTo(-7, -2);
      ctx.quadraticCurveTo(-8, -11, 0, -flameH);
      ctx.quadraticCurveTo(8, -11, 7, -2);
      ctx.closePath();
      ctx.fillStyle = flameGrad;
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();

      // 4. Written Prayer / Worry Ribbon (Rendered below the floating diya)
      if (this.label) {
        ctx.save();
        ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
        const displayLabel = this.label.length > 55 ? this.label.substring(0, 52) + '...' : this.label;
        const textMetrics = ctx.measureText(displayLabel);
        const paddingX = 14;
        const pillWidth = Math.max(70, textMetrics.width + paddingX * 2);
        const pillHeight = 26;
        const pillY = 18;

        // Frosted Glass Ribbon Backdrop
        ctx.beginPath();
        const rx = -pillWidth / 2;
        const ry = pillY;
        const rw = pillWidth;
        const rh = pillHeight;
        const radius = 13;
        ctx.roundRect ? ctx.roundRect(rx, ry, rw, rh, radius) : ctx.rect(rx, ry, rw, rh);
        ctx.fillStyle = 'rgba(10, 16, 30, 0.88)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(251, 191, 36, 0.4)';
        ctx.stroke();

        // Golden Text
        ctx.fillStyle = '#fef08a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#000000';
        ctx.fillText(displayLabel, 0, pillY + pillHeight / 2);
        ctx.restore();
      }

      ctx.restore();
    }
  }

  // Gold / Starlight Sparkle
  class Sparkle {
    constructor(x, y) {
      this.x = x + (Math.random() - 0.5) * 8;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -(Math.random() * 1.3 + 0.6);
      this.alpha = 1;
      this.size = Math.random() * 2 + 1;
      this.color = Math.random() > 0.3 ? '#fbbf24' : '#38bdf8';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.02;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function initSky() {
    stars.length = 0;
    diyas.length = 0;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star());
    }

    for (let i = 0; i < 14; i++) {
      diyas.push(new Diya(Math.random() * width, Math.random() * height));
    }
  }

  function animateSky() {
    ctx.clearRect(0, 0, width, height);

    // Stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
    }

    // Sparkles
    for (let i = sparkles.length - 1; i >= 0; i--) {
      sparkles[i].update();
      sparkles[i].draw();
      if (sparkles[i].alpha <= 0) {
        sparkles.splice(i, 1);
      }
    }

    // Diyas
    for (let i = diyas.length - 1; i >= 0; i--) {
      const d = diyas[i];
      d.update();
      d.draw();

      if (d.y < -70 || d.opacity <= 0) {
        diyas.splice(i, 1);
        if (diyas.length < MAX_AMBIENT_DIYAS) {
          diyas.push(new Diya());
        }
      }
    }

    if (diyas.length < 12) {
      diyas.push(new Diya());
    }

    requestAnimationFrame(animateSky);
  }

  // Global helper to spawn diya with custom text label
  window.spawnSanctuaryDiya = function(x, y, label = "") {
    diyas.push(new Diya(x, y, true, label));
    for (let s = 0; s < 18; s++) {
      sparkles.push(new Sparkle(x, y));
    }
  };

  // Toast Helper
  let toastTimer = null;
  window.showSanctuaryToast = function(msg) {
    let toast = document.getElementById('sanctuary-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sanctuary-toast';
      toast.className = 'sanctuary-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // Click & Touch anywhere interaction
  function setupInteraction() {
    window.addEventListener('click', (e) => {
      if (e.target.closest('#sound-widget') || e.target.closest('button') || e.target.closest('input') || e.target.closest('a') || e.target.closest('select')) {
        return;
      }
      window.spawnSanctuaryDiya(e.clientX, e.clientY);
      window.showSanctuaryToast("🪔 A glowing diya has been lit in your name...");
    });

    window.addEventListener('touchstart', (e) => {
      if (e.target.closest('#sound-widget') || e.target.closest('button') || e.target.closest('input') || e.target.closest('a') || e.target.closest('select')) {
        return;
      }
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        window.spawnSanctuaryDiya(touch.clientX, touch.clientY);
      }
    }, { passive: true });
  }

  window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    initSky();
    animateSky();
    setupInteraction();
  });

})();
