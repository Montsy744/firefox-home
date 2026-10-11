<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    count?: number; // nombre d'étoiles
    speed?: number; // vitesse d'avance (profondeur parcourue par seconde)
    trail?: number; // longueur des traînées d'étoiles
    rocket?: boolean; // fusée qui traverse l'écran
  }>(),
  { count: 700, speed: 0.12, trail: 1, rocket: true },
);

const canvas = ref<HTMLCanvasElement | null>(null);

const TAU = Math.PI * 2;
const NEAR = 0.02;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

type Star = { x: number; y: number; z: number; hue: number };
type Rocket = {
  t: number;
  dur: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  scale: number;
};
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number };

let ctx: CanvasRenderingContext2D | null = null;
let stars: Star[] = [];
let particles: Particle[] = [];
let rocket: Rocket | null = null;

let raf = 0;
let last = 0;
let time = 0;
let w = 0;
let h = 0;
let dpr = 1;

let tRocket = 6; 

function makeStar(randomZ = true): Star {
  return {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: randomZ ? Math.random() : 1,
    hue: Math.random() < 0.15 ? 30 + Math.random() * 20 : 200 + Math.random() * 40,
  };
}

function resize() {
  const c = canvas.value;
  if (!c || !ctx) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  c.width = Math.floor(w * dpr);
  c.height = Math.floor(h * dpr);
  c.style.width = `${w}px`;
  c.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawBackground(c: CanvasRenderingContext2D) {
  const g = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.75);
  g.addColorStop(0, "#0b1230");
  g.addColorStop(0.5, "#070a1c");
  g.addColorStop(1, "#02030a");
  c.fillStyle = g;
  c.fillRect(0, 0, w, h);
}

function drawStars(c: CanvasRenderingContext2D, dt: number) {
  const cx = w / 2;
  const cy = h / 2;
  const k = Math.max(w, h) * 0.25;
  const step = props.speed * dt;
  c.lineCap = "round";

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    const prevZ = s.z;
    s.z -= step;

    const sx = cx + (s.x / s.z) * k;
    const sy = cy + (s.y / s.z) * k;

    if (s.z <= NEAR || sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) {
      stars[i] = makeStar(false);
      continue;
    }

    const tz = Math.min(prevZ + props.speed * 0.016 * props.trail, 1.2);
    const px = cx + (s.x / tz) * k;
    const py = cy + (s.y / tz) * k;

    const depth = 1 - s.z;
    const alpha = Math.min(1, depth * 1.4 + 0.1);

    c.strokeStyle = `hsla(${s.hue}, 70%, ${80 + depth * 20}%, ${alpha})`;
    c.lineWidth = 0.4 + depth * 2.2;
    c.beginPath();
    c.moveTo(px, py);
    c.lineTo(sx, sy);
    c.stroke();
  }
}

function spawnRocket() {
  const fromLeft = Math.random() < 0.5;
  rocket = {
    t: 0,
    dur: rand(9, 13),
    x0: fromLeft ? -80 : w + 80,
    y0: rand(h * 0.15, h * 0.85),
    x1: fromLeft ? w + 80 : -80,
    y1: rand(h * 0.1, h * 0.9),
    scale: rand(0.7, 1.1),
  };
}

function drawRocketShape(c: CanvasRenderingContext2D) {
  const flick = 1 + Math.sin(time * 40) * 0.15 + Math.random() * 0.1;
  const L = 22 * flick;

  const fg = c.createLinearGradient(0, 22, 0, 22 + L * 1.6);
  fg.addColorStop(0, "rgba(255,240,150,0.95)");
  fg.addColorStop(0.45, "rgba(255,140,40,0.8)");
  fg.addColorStop(1, "rgba(255,60,0,0)");
  c.fillStyle = fg;
  c.beginPath();
  c.moveTo(-6, 22);
  c.quadraticCurveTo(0, 22 + L * 2.2, 6, 22);
  c.closePath();
  c.fill();

  c.fillStyle = "#d64545";
  c.beginPath();
  c.moveTo(-9, 4);
  c.lineTo(-19, 24);
  c.lineTo(-9, 19);
  c.closePath();
  c.fill();
  c.beginPath();
  c.moveTo(9, 4);
  c.lineTo(19, 24);
  c.lineTo(9, 19);
  c.closePath();
  c.fill();

  c.fillStyle = "#555b66";
  c.fillRect(-5, 19, 10, 5);

  const bg = c.createLinearGradient(-10, 0, 10, 0);
  bg.addColorStop(0, "#c9d2e0");
  bg.addColorStop(0.5, "#ffffff");
  bg.addColorStop(1, "#aab4c4");
  c.fillStyle = bg;
  c.beginPath();
  c.moveTo(0, -32);
  c.bezierCurveTo(12, -20, 10, 6, 9, 20);
  c.lineTo(-9, 20);
  c.bezierCurveTo(-10, 6, -12, -20, 0, -32);
  c.closePath();
  c.fill();

  c.fillStyle = "#d64545";
  c.beginPath();
  c.moveTo(0, -32);
  c.bezierCurveTo(6, -26, 8, -20, 8.5, -16);
  c.lineTo(-8.5, -16);
  c.bezierCurveTo(-8, -20, -6, -26, 0, -32);
  c.closePath();
  c.fill();

  c.fillStyle = "#6ec6ff";
  c.strokeStyle = "#7c8696";
  c.lineWidth = 2;
  c.beginPath();
  c.arc(0, -4, 5, 0, TAU);
  c.fill();
  c.stroke();
}

function updateDrawRocket(c: CanvasRenderingContext2D, dt: number) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    const a = p.life / p.max;
    c.fillStyle = `hsla(${20 + (1 - a) * 15},100%,${35 + a * 40}%,${a * 0.55})`;
    c.beginPath();
    c.arc(p.x, p.y, p.size * (1.3 - a * 0.3), 0, TAU);
    c.fill();
  }

  if (!rocket) return;
  const r = rocket;
  r.t += dt;
  const p = r.t / r.dur;
  if (p >= 1) {
    rocket = null;
    return;
  }

  const wave = p * TAU * 1.5;
  const x = r.x0 + (r.x1 - r.x0) * p;
  const y = r.y0 + (r.y1 - r.y0) * p + Math.sin(wave) * 18;
  const dx = r.x1 - r.x0;
  const dy = r.y1 - r.y0 + Math.cos(wave) * 18 * TAU * 1.5;
  const ang = Math.atan2(dy, dx);
  const tail = 26 * r.scale;
  for (let i = 0; i < 2; i++) {
    particles.push({
      x: x - Math.cos(ang) * tail + rand(-2, 2),
      y: y - Math.sin(ang) * tail + rand(-2, 2),
      vx: -Math.cos(ang) * 25 + rand(-12, 12),
      vy: -Math.sin(ang) * 25 + rand(-12, 12),
      life: rand(0.5, 1),
      max: 1,
      size: rand(2, 4) * r.scale,
    });
  }

  c.save();
  c.translate(x, y);
  c.rotate(ang + Math.PI / 2);
  c.scale(r.scale, r.scale);
  drawRocketShape(c);
  c.restore();
}

function frame(now: number) {
  const c = ctx;
  if (!c) return;
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  time += dt;

  drawBackground(c);
  drawStars(c, dt);

  if (props.rocket) {
    tRocket -= dt;
    if (tRocket <= 0) {
      if (!rocket) spawnRocket();
      tRocket = rand(20, 35);
    }
    updateDrawRocket(c, dt);
  }

  raf = requestAnimationFrame(frame);
}

onMounted(() => {
  const c = canvas.value;
  if (!c) return;
  ctx = c.getContext("2d");
  resize();
  stars = Array.from({ length: props.count }, () => makeStar(true));
  window.addEventListener("resize", resize);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce && ctx) {
    drawBackground(ctx);
    return;
  }
  last = performance.now();
  raf = requestAnimationFrame(frame);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", resize);
});
</script>

<template>
  <canvas ref="canvas" class="starfield" />
</template>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  z-index: -1;
  display: block;
}
</style>