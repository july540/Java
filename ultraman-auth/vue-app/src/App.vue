<template>
  <div class="scene" @mousemove="tilt" @mouseleave="resetTilt">
    <StarField />
    <div class="beam b1"></div>
    <div class="beam b2"></div>
    <div class="beam b3"></div>
    <div class="planet"></div>

    <div class="stage" :style="stageStyle">
      <aside class="brand">
        <span class="tag">M78 星云 · 光之国</span>
        <BrandPanel />
      </aside>

      <section class="auth">
        <div class="tabs">
          <span class="indicator" :style="{ transform: `translateX(${tab === 'login' ? 0 : 100}%)` }"></span>
          <button class="tab" :class="{ on: tab === 'login' }" @click="tab = 'login'">登录</button>
          <button class="tab" :class="{ on: tab === 'register' }" @click="tab = 'register'">注册</button>
        </div>

        <div class="viewport">
          <Transition name="swap" mode="out-in">
            <LoginForm
              v-if="tab === 'login'"
              key="login"
              :preset="preset"
              @switch="tab = 'register'"
              @success="onLogin"
              @notice="toast"
            />
            <RegisterForm
              v-else
              key="register"
              @switch="tab = 'login'"
              @registered="onRegistered"
            />
          </Transition>
        </div>
      </section>
    </div>

    <Transition name="mask">
      <WelcomePanel v-if="currentUser" :user="currentUser" @logout="logout" />
    </Transition>

    <Transition name="toast">
      <div v-if="toastMsg" class="toast">{{ toastMsg }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import StarField from './components/StarField.vue'
import BrandPanel from './components/BrandPanel.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import WelcomePanel from './components/WelcomePanel.vue'
import { useAuth } from './composables/useAuth.js'

const { currentUser, logout: doLogout } = useAuth()

const tab = ref('login')
const preset = ref('')
const toastMsg = ref('')
let toastTimer = null

const rx = ref(0)
const ry = ref(0)
const canTilt = () => window.innerWidth > 900
const stageStyle = computed(() => ({
  transform: `perspective(1400px) rotateX(${rx.value}deg) rotateY(${ry.value}deg)`
}))

function tilt(e) {
  if (!canTilt()) return
  const x = e.clientX / window.innerWidth - .5
  const y = e.clientY / window.innerHeight - .5
  ry.value = x * 6
  rx.value = -y * 6
}
function resetTilt() { rx.value = 0; ry.value = 0 }

function toast(msg) {
  toastMsg.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastMsg.value = ''), 2600)
}

function onLogin() {
  toast('登录成功，欢迎归来！')
}

function onRegistered(username) {
  tab.value = 'login'
  preset.value = username
  toast(`注册成功：${username}，请输入密钥登录`)
}

function logout() {
  doLogout()
  toast('已退出登录')
}
</script>

<style scoped>
.scene {
  position: relative;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 14px;
  overflow: hidden;
  background:
    radial-gradient(1100px 700px at 18% 12%, rgba(70, 226, 255, .14), transparent 60%),
    radial-gradient(900px 700px at 84% 84%, rgba(230, 39, 45, .2), transparent 62%),
    linear-gradient(160deg, #050912 0%, #0a1533 45%, #12081c 100%);
}

.beam {
  position: absolute;
  top: -30%; left: 50%;
  width: 190px; height: 180%;
  background: linear-gradient(180deg, rgba(255, 213, 74, .16), transparent 65%);
  transform-origin: top center;
  mix-blend-mode: screen;
  animation: sweep 11s ease-in-out infinite;
  pointer-events: none;
}
.b1 { transform: rotate(-24deg); }
.b2 { transform: rotate(6deg); animation-delay: -4s; opacity: .7; }
.b3 { transform: rotate(28deg); animation-delay: -7s; opacity: .5; }
@keyframes sweep { 0%, 100% { opacity: .22; } 50% { opacity: .8; } }

.planet {
  position: absolute;
  right: -150px; bottom: -170px;
  width: 540px; height: 540px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 30%, #3a5f9e, #16224a 60%, #0a1024 100%);
  box-shadow: inset -40px -30px 90px rgba(0, 0, 0, .7), 0 0 130px rgba(70, 226, 255, .18);
  opacity: .75;
  animation: pulse-soft 12s ease-in-out infinite;
}

.stage {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: min(1090px, 100%);
  height: min(690px, calc(100vh - 28px));
  border-radius: 26px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: rgba(12, 20, 40, .72);
  backdrop-filter: blur(14px);
  box-shadow: 0 40px 90px rgba(0, 0, 0, .62);
  transition: transform .35s var(--ease);
  animation: fade-slide .8s var(--ease) both;
}

.brand {
  position: relative;
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--line);
  background: linear-gradient(165deg, rgba(230, 39, 45, .24), rgba(11, 22, 48, .6) 55%, rgba(29, 127, 224, .18));
  overflow: hidden;
}
.brand::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(120, 160, 220, .07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(120, 160, 220, .07) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(180deg, #000, transparent 72%);
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 72%);
  pointer-events: none;
}

.tag {
  position: absolute;
  top: 26px; left: 32px;
  z-index: 2;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 2px;
  color: #ffe9b8;
  background: rgba(255, 213, 74, .12);
  border: 1px solid rgba(255, 213, 74, .35);
}

.auth { padding: 20px 42px; display: flex; flex-direction: column; overflow: hidden; }

.tabs {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: center;
  width: 260px;
  margin: 4px 0 16px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(6, 14, 32, .7);
  border: 1px solid var(--line);
}
.indicator {
  position: absolute;
  top: 5px; left: 5px;
  width: calc(50% - 5px);
  height: calc(100% - 10px);
  border-radius: 999px;
  background: linear-gradient(100deg, var(--red-deep), var(--red) 45%, #ff7a52);
  box-shadow: 0 8px 20px rgba(230, 39, 45, .35);
  transition: transform .35s var(--ease);
}
.tab {
  position: relative;
  z-index: 2;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-size: 14.5px;
  letter-spacing: 3px;
  cursor: pointer;
  transition: color .25s;
}
.tab.on { color: #fff; font-weight: 700; }

.viewport { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; padding-right: 4px; }

.swap-enter-active { animation: swapIn .42s var(--ease) both; }
.swap-leave-active { animation: swapOut .28s var(--ease) both; }
@keyframes swapIn { from { opacity: 0; transform: translateX(26px); } to { opacity: 1; transform: none; } }
@keyframes swapOut { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateX(-26px); } }

.mask-enter-active { animation: fade .4s var(--ease) both; }
.mask-leave-active { animation: fade .3s var(--ease) reverse both; }
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }

.toast {
  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  z-index: 40;
  padding: 12px 22px;
  border-radius: 12px;
  font-size: 13.5px;
  color: #dff4ff;
  background: rgba(10, 25, 52, .95);
  border: 1px solid rgba(70, 226, 255, .4);
  box-shadow: 0 14px 34px rgba(0, 0, 0, .5), 0 0 24px rgba(70, 226, 255, .18);
}
.toast-enter-active { animation: fade-slide .32s var(--ease) both; }
.toast-leave-active { animation: fade-slide .28s var(--ease) reverse both; }

@media (max-width: 900px) {
  .scene { padding: 0; place-items: start stretch; overflow: auto; }
  .stage {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100%;
    border-radius: 0;
    border: 0;
    transform: none !important;
  }
  .brand { padding: 60px 24px 26px; border-right: 0; border-bottom: 1px solid var(--line); }
  .tag { top: 20px; left: 20px; }
  .auth { padding: 26px 22px 44px; }
  .viewport { overflow: visible; }
}
</style>
