// Aerial silks particle effect
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 15 + 8;
    this.speedY = Math.random() * 0.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    
    // Fade out as it falls
    if (this.y > this.canvas.height - 100) {
      this.opacity *= 0.98;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw rescue 8 carabiner in gold
    ctx.strokeStyle = '#D4AF37'; // Golden color
    ctx.fillStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Top large loop
    ctx.beginPath();
    ctx.arc(0, -4, 5, 0, Math.PI * 2);
    ctx.stroke();
    
    // Left ear/attachment
    ctx.beginPath();
    ctx.moveTo(-4, -3);
    ctx.quadraticCurveTo(-7, -2, -6.5, 0);
    ctx.stroke();
    
    // Right ear/attachment
    ctx.beginPath();
    ctx.moveTo(4, -3);
    ctx.quadraticCurveTo(7, -2, 6.5, 0);
    ctx.stroke();
    
    // Left side of narrow middle section
    ctx.beginPath();
    ctx.moveTo(-2.5, 1);
    ctx.lineTo(-2, 4);
    ctx.stroke();
    
    // Right side of narrow middle section
    ctx.beginPath();
    ctx.moveTo(2.5, 1);
    ctx.lineTo(2, 4);
    ctx.stroke();
    
    // Middle gate/chamber (oval shape)
    ctx.beginPath();
    ctx.ellipse(0, 2.5, 2, 2, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Bottom smaller loop
    ctx.beginPath();
    ctx.arc(0, 7, 3.5, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
  }

  isOffScreen() {
    return this.y > this.canvas.height || this.opacity < 0.01;
  }
}

// Initialize particle effect
function initializeParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) {
    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'particle-canvas';
    newCanvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    `;
    document.body.insertBefore(newCanvas, document.body.firstChild);
  }
  
  const canvasElement = document.getElementById('particle-canvas');
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  
  const ctx = canvasElement.getContext('2d');
  const particles = [];
  
  // Create initial particles
  for (let i = 0; i < 15; i++) {
    particles.push(new Particle(canvasElement));
  }
  
  function animate() {
    // Clear canvas completely
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      
      if (particles[i].isOffScreen()) {
        particles.splice(i, 1);
      }
    }
    
    // Add new particles occasionally
    if (particles.length < 20 && Math.random() > 0.7) {
      particles.push(new Particle(canvasElement));
    }
    
    requestAnimationFrame(animate);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
  });
  
  animate();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeParticles);
} else {
  initializeParticles();
}
