<template>
  <form class="form" @submit.prevent="submit">
    <header class="head">
      <h2>欢迎回来，光之战士</h2>
      <p>登录后即可调用 M78 星云能量，执行守护任务</p>
    </header>

    <FormField
      v-model="account"
      label="队员代号 / 邮箱"
      icon="user"
      placeholder="输入用户名或星际邮箱"
      autocomplete="username"
      :error="err.account"
    />

    <FormField
      v-model="password"
      label="密钥"
      type="password"
      icon="lock"
      placeholder="请输入登录密码"
      autocomplete="current-password"
      :error="err.password"
    />

    <div class="row">
      <label class="check"><input v-model="remember" type="checkbox" /><i></i><span>记住呼叫机</span></label>
      <a href="#" class="link" @click.prevent="emit('notice', '演示环境暂不支持找回密钥，可用 ultraman / 123456 体验')">忘记密钥？</a>
    </div>

    <Transition name="pop">
      <p v-if="tip" class="tip" :class="{ ok: tipOk }">{{ tip }}</p>
    </Transition>

    <button class="btn btn-fire" type="submit" :disabled="loading">
      <AppIcon v-if="!loading" name="bolt" />
      <span v-if="loading" class="spin"></span>
      <span>{{ loading ? '能量充填中…' : '登 录 · 变身！' }}</span>
    </button>

    <p class="switch">还没有队员资格？<a href="#" class="link" @click.prevent="emit('switch')">立即注册 →</a></p>
    <p class="demo">体验账号 <code>ultraman</code> / <code>123456</code></p>
  </form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import FormField from './FormField.vue'
import AppIcon from './AppIcon.vue'
import { useAuth } from '../composables/useAuth.js'

const props = defineProps({ preset: { type: String, default: '' } })
const emit = defineEmits(['switch', 'success', 'notice'])

const { login, remembered } = useAuth()

const account = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const tip = ref('')
const tipOk = ref(false)
const err = reactive({ account: '', password: '' })

onMounted(() => {
  if (props.preset) account.value = props.preset
  else if (remembered.value) {
    account.value = remembered.value
    remember.value = true
  }
})

function validate() {
  err.account = account.value.trim() ? '' : '请输入队员代号'
  err.password = password.value ? '' : '请输入密钥'
  return !err.account && !err.password
}

function submit() {
  tip.value = ''
  if (!validate()) return
  loading.value = true
  setTimeout(() => {
    const res = login({ account: account.value.trim(), password: password.value, remember: remember.value })
    loading.value = false
    if (!res.ok) {
      tipOk.value = false
      tip.value = res.msg
      return
    }
    password.value = ''
    emit('success', res.user)
  }, 620)
}
</script>

<style scoped>
.form { display: flex; flex-direction: column; }
.head h2 { margin: 0 0 6px; font-size: 24px; letter-spacing: 1px; }
.head p { margin: 0 0 16px; font-size: 13px; line-height: 1.6; color: var(--muted); }

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 0 10px;
  font-size: 13px;
  color: var(--muted);
}

.check { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
.check input { position: absolute; opacity: 0; width: 0; height: 0; }
.check i {
  width: 17px; height: 17px;
  border-radius: 5px;
  border: 1px solid var(--line);
  background: rgba(6, 14, 32, .7);
  transition: .22s;
  position: relative;
}
.check i::after {
  content: "";
  position: absolute; left: 5px; top: 2px;
  width: 5px; height: 9px;
  border: solid #fff; border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform .22s var(--ease);
}
.check input:checked + i { background: linear-gradient(135deg, var(--red), #ff7a52); border-color: var(--red); }
.check input:checked + i::after { transform: rotate(45deg) scale(1); }
.check:hover span { color: #cbd6ec; }

.tip {
  margin: 0 0 12px;
  padding: 11px 14px;
  border-radius: 11px;
  font-size: 13px;
  line-height: 1.5;
  background: rgba(255, 107, 107, .12);
  border: 1px solid rgba(255, 107, 107, .4);
  color: #ffc9c9;
}
.tip.ok {
  background: rgba(53, 208, 127, .12);
  border-color: rgba(53, 208, 127, .45);
  color: #c9ffe2;
}

.pop-enter-active { animation: fade-slide .3s var(--ease); }
.pop-leave-active { animation: fade-slide .25s var(--ease) reverse; }

.btn { margin-top: 2px; height: 48px; }

.spin {
  width: 16px; height: 16px;
  border: 2px solid rgba(255, 255, 255, .35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: sp .7s linear infinite;
}
@keyframes sp { to { transform: rotate(360deg); } }

.switch { margin: 12px 0 0; text-align: center; font-size: 13px; color: var(--muted); }
.demo { margin: 6px 0 0; text-align: center; font-size: 12px; color: #6b7a9c; }
.demo code { padding: 2px 7px; border-radius: 5px; background: rgba(120, 160, 220, .12); color: #a9c2ea; }
</style>
