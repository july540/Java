/* 星空背景：粒子 + 偶发流星 */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w = 0, h = 0, dpr = window.devicePixelRatio || 1;
  const stars = [];
  const meteors = [];

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    stars.length = 0;
    const count = Math.min(220, Math.round((w * h) / 7000));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random() * 0.7 + 0.3,
        s: Math.random() * 0.25 + 0.05,
        t: Math.random() * Math.PI * 2
      });
    }
  }

  function spawnMeteor() {
    meteors.push({
      x: Math.random() * w * 0.8 + w * 0.2,
      y: -20,
      len: Math.random() * 90 + 60,
      spd: Math.random() * 5 + 5,
      a: 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const st of stars) {
      st.t += st.s * 0.06;
      const tw = 0.55 + Math.sin(st.t) * 0.45;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,225,255,' + (st.a * tw).toFixed(3) + ')';
      ctx.fill();
      if (st.y > h + 2) st.y = -2;
      st.y += st.s * 0.35;
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      const g = ctx.createLinearGradient(m.x, m.y, m.x - m.len, m.y + m.len);
      g.addColorStop(0, 'rgba(255,255,255,' + m.a.toFixed(2) + ')');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.len, m.y + m.len);
      ctx.stroke();
      m.x -= m.spd; m.y += m.spd; m.a -= 0.012;
      if (m.a <= 0) meteors.splice(i, 1);
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
  setInterval(spawnMeteor, 2600);
})();
