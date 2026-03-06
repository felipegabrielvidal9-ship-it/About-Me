/* ================== CANVAS ================== */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

/* ================== RESIZE REAL (FULLSCREEN OK) ================== */
function resize() {
  const dpr = window.devicePixelRatio || 1;

  const w = window.innerWidth;
  const h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;

  canvas.style.width = w + "px";
  canvas.style.height = h + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
window.addEventListener("resize", resize);

/* ================== ESTRELAS ================== */
const STAR_COUNT = 220;

const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  s: Math.random() * 2 + 0.5,
  v: Math.random() * 0.6 + 0.2
}));

function drawStars() {
  ctx.fillStyle = "#fff";

  for (const st of stars) {
    ctx.globalAlpha = Math.random();
    ctx.fillRect(st.x, st.y, st.s, st.s);

    st.y += st.v;
    if (st.y > window.innerHeight) {
      st.y = 0;
      st.x = Math.random() * window.innerWidth;
    }
  }

  ctx.globalAlpha = 1;
}

/* ================== TIROS ================== */
const shots = [];
function shoot(x, y, dir) {
  shots.push({ x, y, dir });
}

/* ================== EXPLOSÕES ================== */
const explosions = [];
function explode(x, y) {
  for (let i = 0; i < 14; i++) {
    explosions.push({
      x,
      y,
      vx: Math.random() * 3 - 1.5,
      vy: Math.random() * 3 - 1.5,
      life: 25
    });
  }
}

/* ================== NAVES ================== */
class Nave {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;

    this.vx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1.8 + 0.6);

    this.cooldown = Math.random() * 90 + 40;
    this.turnTimer = Math.random() * 260 + 120;
  }

  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, 6, 6);
    ctx.fillRect(this.x - 3, this.y + 2, 12, 2);
  }

  update() {
    this.x += this.vx;

    if (this.x < -20 || this.x > window.innerWidth + 20) {
      this.reset();
    }

    this.turnTimer--;
    if (this.turnTimer <= 0) {
      this.vx *= -1;
      this.turnTimer = Math.random() * 260 + 120;
    }

    this.cooldown--;
    if (this.cooldown <= 0) {
      shoot(this.x + 3, this.y + 3, Math.sign(this.vx));
      explode(this.x, this.y);
      this.cooldown = Math.random() * 90 + 40;
    }
  }
}

/* ================== CRIA NAVES ================== */
const NAVES_QTD = 24;
const naves = Array.from({ length: NAVES_QTD }, () => new Nave());

/* ================== LOOP ================== */
function loop() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  drawStars();

  for (const n of naves) {
    n.update();
    n.draw();
  }

  // tiros
  ctx.fillStyle = "#fff";
  for (let i = shots.length - 1; i >= 0; i--) {
    const s = shots[i];
    s.x += s.dir * 5;
    ctx.fillRect(s.x, s.y, 2, 2);

    if (s.x < -10 || s.x > window.innerWidth + 10) {
      shots.splice(i, 1);
    }
  }

  // explosões
  for (let i = explosions.length - 1; i >= 0; i--) {
    const e = explosions[i];
    ctx.fillRect(e.x, e.y, 2, 2);
    e.x += e.vx;
    e.y += e.vy;
    e.life--;
    if (e.life <= 0) explosions.splice(i, 1);
  }

  requestAnimationFrame(loop);
}


loop();


