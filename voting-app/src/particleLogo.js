const logoImage = document.getElementById('logo');
const background = document.getElementById('background');
const mainCanvas = document.getElementById('mainCanvas');
const ctxMain = mainCanvas.getContext('2d');

const rideLogos = [
  { img: document.getElementById('ride1'), xRatio: 0.38, yRatio: 0.64, widthRatio: 0.12, heightRatio: 0.12, url: 'merry-go-round.html', isHovered: false },
  { img: document.getElementById('ride2'), xRatio: 0.58, yRatio: 0.49, widthRatio: 0.11, heightRatio: 0.11, url: 'ferris_wheel.html', isHovered: false },
  { img: document.getElementById('ride3'), xRatio: 0.48, yRatio: 0.44, widthRatio: 0.11, heightRatio: 0.11, url: 'carousel.html', isHovered: false },
  { img: document.getElementById('ride4'), xRatio: 0.36, yRatio: 0.55, widthRatio: 0.11, heightRatio: 0.11, url: 'http://localhost:3000/', isHovered: false }
];

let particles = [];
let showBackground = false;

function resizeCanvas() {
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight;

  rideLogos.forEach(ride => {
    ride.x = mainCanvas.width * ride.xRatio;
    ride.y = mainCanvas.height * ride.yRatio;
    ride.width = mainCanvas.width * ride.widthRatio;
    ride.height = mainCanvas.height * ride.heightRatio;
  });
}

window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 2;
    this.originX = x;
    this.originY = y;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 15 + 2;
    this.gravity = 0.2;
    this.opacity = 1;
    this.friction = 0.92;
    this.explode = false;
  }

  update() {
    if (this.explode) {
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.opacity -= 0.02;
    }
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  particles = [];
  
  const scale = Math.min(mainCanvas.width / logoImage.width, mainCanvas.height / logoImage.height) * 0.5;
  const logoWidth = logoImage.width * scale;
  const logoHeight = logoImage.height * scale;

  const logoCanvas = document.createElement('canvas');
  logoCanvas.width = logoWidth;
  logoCanvas.height = logoHeight;
  const ctxLogo = logoCanvas.getContext('2d');
  ctxLogo.drawImage(logoImage, 0, 0, logoWidth, logoHeight);

  const imageData = ctxLogo.getImageData(0, 0, logoWidth, logoHeight);
  const data = imageData.data;

  for (let y = 0; y < logoHeight; y += 5) {
    for (let x = 0; x < logoWidth; x += 5) {
      const index = (y * logoWidth + x) * 4;
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const alpha = data[index + 3];

      if (alpha > 0) {
        const color = `${red}, ${green}, ${blue}`;
        const particleX = x + mainCanvas.width / 2 - logoWidth / 2;
        const particleY = y + mainCanvas.height / 2 - logoHeight / 2;
        particles.push(new Particle(particleX, particleY, color));
      }
    }
  }

  setTimeout(() => {
    particles.forEach(particle => particle.explode = true);
  }, 2000);
}

function drawBackground() {
  ctxMain.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  ctxMain.drawImage(background, 0, 0, mainCanvas.width, mainCanvas.height);
  
  rideLogos.forEach(ride => {
    const width = ride.isHovered ? ride.width * 1.2 : ride.width;
    const height = ride.isHovered ? ride.height * 1.2 : ride.height;
    ctxMain.drawImage(ride.img, ride.x - (width - ride.width) / 2, ride.y - (height - ride.height) / 2, width, height);
  });
}

function animate() {
  if (showBackground) {
    drawBackground();
  } else {
    ctxMain.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctxMain.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

    particles.forEach((particle, index) => {
      particle.update();
      particle.draw(ctxMain);

      if (particle.opacity <= 0) {
        particles.splice(index, 1);
      }
    });

    if (particles.length === 0) {
      showBackground = true;
    }
  }

  requestAnimationFrame(animate);
}

mainCanvas.addEventListener('mousemove', (event) => {
  if (showBackground) {
    const rect = mainCanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    rideLogos.forEach(ride => {
      ride.isHovered = mouseX > ride.x && mouseX < ride.x + ride.width &&
                       mouseY > ride.y && mouseY < ride.y + ride.height;
    });
  }
});

mainCanvas.addEventListener('click', (event) => {
  if (showBackground) {
    const rect = mainCanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    rideLogos.forEach(ride => {
      if (mouseX > ride.x && mouseX < ride.x + ride.width &&
          mouseY > ride.y && mouseY < ride.y + ride.height) {
        window.location.href = ride.url;
      }
    });
  }
});

logoImage.onload = () => {
  resizeCanvas();
  createParticles();
  animate();
};
