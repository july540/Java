<template>
  <form class="form" @submit.prevent="submit">
    <header class="head">
      <h2>申请光之战士资格</h2>
      <p>填写资料完成认证，成功后立即返回登录</p>
    </header>

    <FormField
      v-model="username"
      label="队员代号"
      icon="user"
      placeholder="3–16 位字母 / 数字 / 下划线"
      autocomplete="username"
      :error="err.username"
    />

    <FormField
      v-model="email"
      label="星际邮箱"
      icon="mail"
      placeholder="name@example.com"
      autocomplete="email"
      :error="err.email"
    />

    <FormField
      v-model="password"
      label="设置密钥"
      type="password"
      icon="lock"
      placeholder="至少 6 位，含字母与数字更佳"
      autocomplete="new-password"
      :error="err.password"
    />

    <!-- 能量强度 -->
    <div class="strength">
      <div class="bars">
        <i v-for="n in 3" :key="n" :class="{ on: score >= n, lvl: true }" :data-lvl="score"></i>
      </div>
      <span class="stext">{{ strengthText }}</span>
    </div>

    <FormField
      v-model="confirm"
      label="确认密钥"
      type="password"
      icon="shield"
      placeholder="请再次输入密码"
      autocomplete="new-password"
      :error="err.confirm"
    />

    <!-- 种族选择 -->
    <div class="tribe-box">
      <span class="caption">选择所属族群</span>
      <div class="tribes">
        <button
          v-for="t in tribes" :key="t.key" type="button"
          class="tribe" :class="[t.key, { active: tribe === t.key }]"
          @click="tribe = t.key"
        >
          <b>{{ t.name }}</b>
          <small>{{ t.desc }}</small>
        </button>
      </div>
    </div>

    <label class="agree" :class="{ bad: err.agree }">
      <input v-model="agree" type="checkbox" /><i></i>
      <span>我已阅读并同意《光之国保密与守护条例》</span>
    </label>
    <p v-if="err.agree" class="agree-msg">{{ err.agree }}</p>

    <Transition name="pop">
      <p v-if="tip" class="tip" :class="{ ok: tipOk }">{{ tip }}</p>
    </Transition>

    <button class="btn btn-energy" type="submit" :disabled="loading">
      <AppIcon v-if="!loading" name="shield" />
      <span v-if="loading" class="spin"></span>
      <span>{{ loading ? '资料上传中…' : '提交注册申请' }}</span>
    </button>

    <p class="switch">已有队员资格？<a href="#" class="link" @click.prevent="emit('switch')">返回登录 ←</a></p>
  </form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import FormField from './FormField.vue'
import AppIcon from './AppIcon.vue'
import { useAuth } from '../composables/useAuth.js'

const emit = defineEmits(['switch', 'registered'])
const { register } = useAuth()

const username = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const tribe = ref('silver')
const agree = ref(false)
const loading = ref(false)
const tip = ref('')
const tipOk = ref(false)

const err = reactive({ username: '', email: '', password: '', confirm: '', agree: '' })

const tribes = [
  { key: 'red', name: '红族', desc: '战斗专精 · 力量型' },
  { key: 'silver', name: '银族', desc: '全能平衡 · 指挥型' },
  { key: 'blue', name: '蓝族', desc: '高速机动 · 敏捷型' }
]

const score = computed(() => {
  const v = password.value
  let s = 0
  if (v.length >= 6) s++
  if (/[a-zA-Z]/.test(v) && /\d/.test(v)) s++
  if (v.length >= 10 || /[^a-zA-Z0-9]/.test(v)) s++
  return v ? Math.max(1, s) : 0
})

const strengthText = computed(() => {
  return ['— 尚未注入能量', '偏弱 · 仅可应付小型怪兽', '中等 · 可标准出战', '强劲 · 足以对抗杰顿'][score.value]
})

function validate() {
  err.username = /^[a-zA-Z0-9_]{3,16}$/.test(username.value.trim()) ? '' : '3–16 位字母、数字或下划线'
  err.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? '' : '请输入正确的邮箱格式'
  err.password = password.value.length >= 6 ? '' : '密钥长度不能少于 6 位'
  if (!confirm.value) err.confirm = '请再次输入密钥'
  else err.confirm = confirm.value === password.value ? '' : '两次输入的密钥不一致'
  err.agree = agree.value ? '' : '请先勾选协议'
  return !err.username && !err.email && !err.password && !err.confirm && !err.agree
}

function submit() {
  tip.value = ''
  if (!validate()) {
    tipOk.value = false
    tip.value = '资料校验未通过，请检查红色提示项'
    return
  }
  loading.value = true
  const payload = {
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value,
    tribe: tribe.value
  }
  setTimeout(() => {
    const res = register(payload)
    loading.value = false
    if (!res.ok) {
      tipOk.value = false
      tip.value = res.msg
      err[res.field] = res.msg
      return
    }
    tipOk.value = true
    tip.value = '注册成功！正在前往登录…'
    setTimeout(() => emit('registered', payload.username), 900)
  }, 700)
}
</script>

<style scoped>
.form { display: flex; flex-direction: column; }
.head h2 { margin: 0 0 6px; font-size: 24px; letter-spacing: 1px; }
.head p { margin: 0 0 14px; font-size: 13px; line-height: 1.6; color: var(--muted); }

/* 能量强度 */
.strength { margin: -4px 0 8px; }
.bars { display: flex; gap: 6px; }
.bars i {
  flex: 1; height: 5px; border-radius: 3px;
  background: rgba(120, 160, 220, .18);
  transition: background .3s var(--ease), box-shadow .3s;
}
.bars i.on[data-lvl="1"] { background: var(--err); box-shadow: 0 0 10px rgba(255, 107, 107, .5); }
.bars i.on[data-lvl="2"] { background: var(--gold); box-shadow: 0 0 10px rgba(255, 213, 74, .5); }
.bars i.on[data-lvl="3"] { background: var(--ok); box-shadow: 0 0 10px rgba(53, 208, 127, .5); }
.stext { display: block; margin-top: 6px; font-size: 12px; color: var(--muted); }

/* 族群选择 */
.tribe-box { margin: 0 0 12px; }
.caption { display: block; margin: 0 0 9px 2px; font-size: 12.5px; letter-spacing: 1.5px; color: var(--muted); }
.tribes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.tribe {
  padding: 12px 8px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: rgba(6, 14, 32, .6);
  color: var(--muted);
  cursor: pointer;
  transition: transform .22s var(--ease), border-color .22s, background .22s, color .22s;
}
.tribe b { display: block; font-size: 14px; color: #cdd8ec; }
.tribe small { display: block; margin-top: 3px; font-size: 11px; }
.tribe:hover { transform: translateY(-3px); }
.tribe.red.active { border-color: var(--red); background: rgba(230, 39, 45, .16); box-shadow: 0 0 0 3px rgba(230, 39, 45, .12); }
.tribe.silver.active { border-color: var(--silver); background: rgba(217, 222, 230, .14); box-shadow: 0 0 0 3px rgba(217, 222, 230, .1); }
.tribe.blue.active { border-color: var(--blue); background: rgba(29, 127, 224, .18); box-shadow: 0 0 0 3px rgba(70, 226, 255, .12); }
.tribe.active b { color: #fff; }
.tribe.active small { color: var(--cyan); }

/* 协议 */
.agree { display: inline-flex; align-items: center; gap: 9px; font-size: 12.5px; color: var(--muted); cursor: pointer; }
.agree input { position: absolute; opacity: 0; width: 0; height: 0; }
.agree i {
  width: 17px; height: 17px; border-radius: 5px;
  border: 1px solid var(--line); background: rgba(6, 14, 32, .7);
  position: relative; transition: .22s;
}
.agree i::after {
  content: ""; position: absolute; left: 5px; top: 2px;
  width: 5px; height: 9px;
  border: solid #fff; border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0); transition: transform .22s var(--ease);
}
.agree input:checked + i { background: linear-gradient(135deg, var(--blue), var(--cyan)); border-color: var(--cyan); }
.agree input:checked + i::after { transform: rotate(45deg) scale(1); }
.agree.bad i { border-color: var(--err); }
.agree-msg { margin: 7px 0 0; font-size: 12px; color: var(--err); }

.tip {
  margin: 10px 0 0;
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

.btn { margin-top: 12px; height: 48px; }
.spin {
  width: 16px; height: 16px;
  border: 2px solid rgba(255, 255, 255, .35);
  border-top-color: #fff; border-radius: 50%;
  animation: sp .7s linear infinite;
}
@keyframes sp { to { transform: rotate(360deg); } }

.switch { margin: 12px 0 0; text-align: center; font-size: 13px; color: var(--muted); }
</style>
