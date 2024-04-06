
const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1));
const opt = {
  particles: 1000,
  noiseScale: 0.009,
  angle: Math.PI / 180 * 90,
  brownHueRange: [30, 40],
  goldHues: [40, 50, 55],
  lightnessRange: [70, 80],
  saturation: 50,
  strokeWeight: 1.2,
  tail: 82,
};
const Particles = [];
let time = 0;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lx = x;
    this.ly = y;
    this.vx = 0;
    this.vy = 1;
    this.ax = 0;
    this.ay = 0;
    this.hue = this.chooseHue();
    this.saturation = opt.saturation;
    this.lightness = rand(opt.lightnessRange[0], opt.lightnessRange[1]);
    this.maxSpeed = 2;
  }

  chooseHue() {
    if (Math.random() < 0.5) {
      return rand(opt.brownHueRange[0], opt.brownHueRange[1]);
    } else {
      return opt.goldHues[Math.floor(Math.random() * opt.goldHues.length)];
    }
  }

  update() {
    this.follow();

    this.vx += this.ax;
    this.vy += this.ay;

    const p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const a = Math.atan2(this.vy, this.vx);
    const m = Math.min(this.maxSpeed, p);
    this.vx = Math.cos(a) * m;
    this.vy = Math.sin(a) * m;

    this.x += this.vx;
    this.y += this.vy;
    this.ax = 0;
    this.ay = 0;

    this.edges();
  }

  follow() {
    const angle = (noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale)) * Math.PI * 0.5 + opt.angle;

    this.ax += Math.cos(angle);
    this.ay += Math.sin(angle);
  }

  updatePrev() {
    this.lx = this.x;
    this.ly = this.y;
  }

  edges() {
    const { width, height } = canvasSize();
    if (this.y > height) {
      this.x = Math.random() * width;
      this.y = -10;
      this.lx = this.x;
      this.ly = this.y;
      this.hue = this.chooseHue();
      this.lightness = rand(opt.lightnessRange[0], opt.lightnessRange[1]);
    }
  }

  render() {
    const alpha = 255; // Adjust the transparency (0-255, where 0 is fully transparent and 255 is fully opaque)
    const color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${alpha / 255})`;
    stroke(color);
    strokeWeight(opt.strokeWeight);
    point(this.x, this.y); // Draw particle as a point
    this.updatePrev();
  }
}
 function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < opt.particles; i++) {
    Particles.push(new Particle(Math.random() * width, Math.random() * height));
  }
  strokeWeight(opt.strokeWeight);
}

function draw() {
  time++;
  background(255, 255, 255, 0); // Set background with low alpha for transparency

  for (const p of Particles) {
    p.update();
    p.render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function canvasSize() {
  return { width: windowWidth, height: windowHeight };
}
