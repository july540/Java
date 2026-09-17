<script setup>
import { ref } from 'vue'

const account = ref('')
const password = ref('')
const remember = ref(true)
const showPassword = ref(false)
const errMsg = ref('')
const loading = ref(false)
const card = ref(null)

function togglePassword() {
  showPassword.value = !showPassword.value
}

function shake() {
  if (!card.value) return
  card.value.classList.remove('shake')
  // 强制重排以重启动画
  void card.value.offsetWidth
  card.value.classList.add('shake')
}

function onSubmit() {
  errMsg.value = ''
  if (!account.value.trim()) {
    errMsg.value = '请输入账号'
    shake()
    return
  }
  if (!password.value.trim()) {
    errMsg.value = '请输入密码'
    shake()
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert('演示登录成功，欢迎来到王者荣耀！\n账号：' + account.value.trim())
  }, 700)
}
</script>

<template>
  <div class="card" ref="card">
    <span class="corner tl"></span><span class="corner tr"></span>
    <span class="corner bl"></span><span class="corner br"></span>

    <div class="brand">
      <!-- 王冠 -->
      <svg class="crown" viewBox="0 0 64 64" fill="none">
        <path d="M8 22l9 10 15-18 15 18 9-10-5 28H13L8 22z" fill="url(#g)"/>
        <circle cx="32" cy="34" r="4" fill="#fff7df"/>
        <defs>
          <linearGradient id="g" x1="8" y1="14" x2="56" y2="50">
            <stop stop-color="#fff3cf"/><stop offset=".55" stop-color="#f5d061"/><stop offset="1" stop-color="#c79a2a"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="title">王者荣耀</div>
      <div class="subtitle">HONOR OF KINGS · 账号登录</div>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="field">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>
        </svg>
        <input type="text" v-model="account" placeholder="请输入游戏账号 / 手机号" />
      </div>

      <div class="field">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>
        </svg>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="请输入密码" />
        <svg class="eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" @click="togglePassword">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>
        </svg>
      </div>

      <div class="err">{{ errMsg }}</div>

      <div class="row">
        <label class="remember"><input type="checkbox" v-model="remember" /> 记住账号</label>
        <a class="link" href="javascript:void(0)">忘记密码？</a>
      </div>

      <button type="submit" class="btn-login">{{ loading ? '登录中…' : '登 录' }}</button>
    </form>

    <div class="divider">其他方式登录</div>

    <div class="socials">
      <!-- 微信 -->
      <div class="social" title="微信登录">
        <svg viewBox="0 0 24 24" fill="#07C160">
          <path d="M9 4C5.5 4 3 6.2 3 9c0 1.5.9 2.9 2.3 3.8l-.5 1.6 1.9-1c.5.1 1 .2 1.3.2h.4C9.2 11.6 11.7 9.5 14.6 9.5h.3C14.7 6.3 12.1 4 9 4z"/>
          <path d="M21 12.8c0-2.2-2.2-4-4.9-4s-4.9 1.8-4.9 4 2.2 4 4.9 4c.4 0 .7 0 1.1-.1l1.6.8-.5-1.5c1.5-.7 2.6-1.8 2.6-3.2z"/>
        </svg>
      </div>
      <!-- QQ -->
      <div class="social" title="QQ登录">
        <svg viewBox="0 0 24 24" fill="#12B7F5">
          <path d="M12 3c3.3 0 5.5 2.6 5.5 6 0 1.7-.4 3.2-1.1 4.4.8.4 1.3 1 1.3 1.7 0 1.3-2 2-5.7 2h0c-3.7 0-5.7-.7-5.7-2 0-.7.5-1.3 1.3-1.7C6.4 12.2 6 10.7 6 9c0-3.4 2.2-6 6-6z"/>
          <circle cx="9.4" cy="9.4" r="1" fill="#fff"/><circle cx="14.6" cy="9.4" r="1" fill="#fff"/>
        </svg>
      </div>
    </div>

    <p class="tip">
      登录即代表同意 <a href="javascript:void(0)">用户协议</a> 与 <a href="javascript:void(0)">隐私政策</a><br>
      © 2026 王者荣耀 · 本页面仅为界面演示
    </p>
  </div>
</template>
