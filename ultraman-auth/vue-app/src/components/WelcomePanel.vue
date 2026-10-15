<template>
  <div class="mask">
    <div class="card">
      <div class="rays"></div>

      <svg class="ring" viewBox="0 0 120 120">
        <circle class="track" cx="60" cy="60" r="52" />
        <circle class="prog" cx="60" cy="60" r="52" :stroke-dasharray="dash" :stroke-dashoffset="offset" />
      </svg>
      <div class="core">
        <svg viewBox="0 0 24 24" class="tick"><path d="m5 13 4 4L19 7" /></svg>
      </div>

      <h2>变身成功！</h2>
      <p class="who">欢迎，<strong>{{ user.username }}</strong></p>
      <span class="badge" :class="user.tribe">{{ tribeName }}</span>

      <ul class="stats">
        <li><b>{{ user.email }}</b><span>星际邮箱</span></li>
        <li><b>{{ clock }}</b><span>地表活动时间</span></li>
      </ul>

      <button class="btn btn-fire small" @click="emit('logout')">
        <span>退出登录</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({ user: { type: Object, required: true } })
const emit = defineEmits(['logout'])

const TOTAL = 180
const left = ref(TOTAL)
let timer = null

const C = 2 * Math.PI * 52
const dash = C
const offset = computed(() => C * (1 - left.value / TOTAL))

const clock = computed(() => {
  if (left.value <= 0) return '00:00'
  const m = String(Math.floor(left.value / 60)).padStart(2, '0')
  const s = String(left.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

const NAMES = { red: '红族 · 战斗型', silver: '银族 · 全能型', blue: '蓝族 · 机动型' }
const tribeName = computed(() => NAMES[props.user.tribe] || '银族 · 全能型')

onMounted(() => {
  timer = setInterval(() => { if (left.value > 0) left.value-- }, 1000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.mask {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(3, 8, 20, .84);
  backdrop-filter: blur(9px);
}

.card {
  position: relative;
  width: min(430px, 92vw);
  padding: 44px 38px 34px;
  text-align: center;
  border-radius: 24px;
  border: 1px solid rgba(70, 226, 255, .34);
  background: linear-gradient(170deg, rgba(13, 25, 54, .96), rgba(8, 14, 32, .97));
  box-shadow: 0 34px 80px rgba(0, 0, 0, .66), 0 0 70px rgba(70, 226, 255, .16);
  overflow: hidden;
  animation: fade-slide .5s var(--ease) both;
}

.rays {
  position: absolute;
  inset: -40% -10% auto;
  height: 320px;
  background: conic-gradient(from 0deg, transparent 0 12deg, rgba(70, 226, 255, .12) 13deg 16deg, transparent 17deg 30deg);
  animation: spin 14s linear infinite;
  pointer-events: none;
}
@keyframes spin { to { transform: rotate(360deg); } }

.ring { position: relative; width: 118px; height: 118px; margin: 0 auto; transform: rotate(-90deg); }
.ring circle { fill: none; stroke-width: 6; stroke-linecap: round; }
.track { stroke: rgba(120, 160, 220, .18); }
.prog {
  stroke: var(--cyan);
  filter: drop-shadow(0 0 8px rgba(70, 226, 255, .8));
  transition: stroke-dashoffset 1s linear;
}

.core {
  position: absolute;
  top: 66px; left: 50%;
  transform: translateX(-50%);
  width: 74px; height: 74px;
  border-radius: 50%;
  display: grid; place-items: center;
  background: radial-gradient(circle, #bff6ff 0%, var(--cyan) 45%, #0f4a86 100%);
  box-shadow: 0 0 40px rgba(70, 226, 255, .7), inset 0 0 20px rgba(255, 255, 255, .6);
  animation: pulse-soft 2.4s ease-in-out infinite;
}
.tick { width: 34px; height: 34px; fill: none; stroke: #05304d; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
.tick path {
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: draw .6s var(--ease) .2s forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }

h2 {
  margin: 26px 0 6px;
  font-size: 28px;
  letter-spacing: 3px;
  color: var(--gold);
  text-shadow: 0 0 24px rgba(255, 213, 74, .5);
}
.who { margin: 0 0 14px; color: #cdd8ec; font-size: 14px; }
.who strong { color: var(--cyan); font-size: 18px; }

.badge {
  display: inline-block;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 1px;
  border: 1px solid var(--line);
  margin-bottom: 22px;
}
.badge.red { color: #ffb4b4; border-color: rgba(230, 39, 45, .5); background: rgba(230, 39, 45, .16); }
.badge.silver { color: #e6ecf6; border-color: rgba(217, 222, 230, .5); background: rgba(217, 222, 230, .12); }
.badge.blue { color: #b6e6ff; border-color: rgba(70, 226, 255, .5); background: rgba(29, 127, 224, .18); }

.stats { list-style: none; margin: 0 0 24px; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.stats li { padding: 12px 8px; border-radius: 13px; background: rgba(120, 160, 220, .1); border: 1px solid var(--line); }
.stats b { display: block; font-size: 13.5px; color: #e9eef8; word-break: break-all; }
.stats span { display: block; margin-top: 4px; font-size: 11.5px; color: var(--muted); }

.btn.small { height: 46px; font-size: 14px; letter-spacing: 2px; }
</style>
