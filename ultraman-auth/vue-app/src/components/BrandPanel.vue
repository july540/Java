<template>
  <figure class="hero">
    <div class="aura"></div>

    <svg class="figure" viewBox="0 0 240 320">
      <defs>
        <linearGradient id="gSilver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="45%" stop-color="#cfd8e3" />
          <stop offset="100%" stop-color="#8f9aa8" />
        </linearGradient>
        <linearGradient id="gRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff5f56" />
          <stop offset="100%" stop-color="#c3141c" />
        </linearGradient>
        <filter id="fGlow">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <!-- 头冠 -->
      <path fill="url(#gSilver)" d="M120 20c26 0 44 18 44 42 0 16-6 28-14 38l-6 8H96l-6-8c-8-10-14-22-14-38 0-24 18-42 44-42z" />
      <path fill="url(#gRed)" d="M120 22c22 0 38 15 41 35l-9 2c-3-16-15-27-32-27-17 0-29 11-32 27l-9-2c3-20 19-35 41-35z" />
      <!-- 眼灯 -->
      <ellipse cx="103" cy="72" rx="13" ry="8" fill="#ffe14d" filter="url(#fGlow)">
        <animate attributeName="rx" values="13;11;13" dur="3.4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="137" cy="72" rx="13" ry="8" fill="#ffe14d" filter="url(#fGlow)">
        <animate attributeName="rx" values="13;11;13" dur="3.4s" repeatCount="indefinite" />
      </ellipse>
      <!-- 躯干 -->
      <path fill="url(#gSilver)" d="M120 108c30 0 50 14 54 40l-8 88c-14 8-30 12-46 12s-32-4-46-12l-8-88c4-26 24-40 54-40z" />
      <!-- 侧红纹 -->
      <path fill="url(#gRed)" d="M66 148l10-2 6 92-12-4zM164 146l10 2-4 86-12 4z" />
      <!-- 手臂 -->
      <path fill="url(#gRed)" d="M186 152l22 10-18 100-24-10zM54 152l-22 10 18 100 24-10z" />
      <!-- 彩色计时器 -->
      <circle cx="120" cy="152" r="23" fill="#0d2b52" />
      <circle cx="120" cy="152" r="18" fill="#3fe0ff" filter="url(#fGlow)">
        <animate attributeName="fill" values="#3fe0ff;#ff4d4d;#3fe0ff" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="152" r="11" fill="#ffffff" opacity=".9" />
    </svg>

    <h1 class="title">ULTRAMAN</h1>
    <p class="sub">ウルトラマン · 光之战士认证终端</p>

    <ul class="facts">
      <li><em>M78</em><span>光之国 · 宇宙警备队</span></li>
      <li><em>3:00</em><span>地表活动时间限制</span></li>
      <li><em class="live">● ONLINE</em><span>系统实时待命中</span></li>
    </ul>
  </figure>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 1;
  margin: 0;
  text-align: center;
  animation: fade-slide .9s var(--ease) both;
}

.aura {
  position: absolute;
  left: 50%;
  top: 40px;
  width: 320px;
  height: 320px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(70, 226, 255, .3), transparent 62%);
  filter: blur(6px);
  animation: pulse-soft 5s ease-in-out infinite;
}

.figure {
  position: relative;
  width: 200px;
  margin: 18px auto 10px;
  display: block;
  filter: drop-shadow(0 0 30px rgba(70, 226, 255, .5));
  animation: floating 5.5s ease-in-out infinite;
}

.title {
  margin: 4px 0 6px;
  font-size: 46px;
  font-weight: 900;
  letter-spacing: 8px;
  background: linear-gradient(180deg, #fff 18%, var(--silver) 52%, #8fa0bf 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 22px rgba(70, 226, 255, .35));
}

.sub {
  margin: 0 0 26px;
  font-size: 13px;
  letter-spacing: 3px;
  color: var(--muted);
}

.facts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.facts li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  background: rgba(9, 16, 34, .5);
  border: 1px solid var(--line);
  font-size: 13px;
  color: #cbd6ec;
  transition: transform .25s var(--ease), border-color .25s;
}
.facts li:hover { transform: translateX(4px); border-color: rgba(70, 226, 255, .5); }

.facts em {
  flex: none;
  min-width: 64px;
  font-style: normal;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--gold);
  text-align: left;
}
.facts .live { color: var(--ok); animation: blink 1.8s infinite; }

@media (max-width: 900px) {
  .figure { width: 130px; margin: 10px auto 4px; }
  .title { font-size: 34px; }
  .facts { display: none; }
}
</style>
