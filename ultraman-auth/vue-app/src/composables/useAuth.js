import { ref } from 'vue'

/**
 * 演示用的本地账号仓库（localStorage）。
 * 注意：编码方式仅用于演示，不具备真实安全性，接入后端时应改为服务端鉴权。
 */
const USERS_KEY = 'ultraman_users'
const SESSION_KEY = 'ultraman_session'
const REMEMBER_KEY = 'ultraman_remember'

const enc = (s) => btoa(unescape(encodeURIComponent('M78|' + s)))

function read() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

const users = ref(read())

if (!users.value.some((u) => u.username === 'ultraman')) {
  users.value.push({
    username: 'ultraman',
    email: 'ultraman@m78.nebula',
    password: enc('123456'),
    tribe: 'silver',
    createdAt: '2026-01-01 00:00'
  })
  localStorage.setItem(USERS_KEY, JSON.stringify(users.value))
}

const restore = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

/* 模块级单例状态：必须放在 useAuth() 外面，否则每个调用方拿到的是不同的 ref */
const currentUser = ref(restore())
const remembered = ref(localStorage.getItem(REMEMBER_KEY) || '')

export function useAuth() {
  const exists = (key, val) => users.value.some((u) => u[key] === val)

  const register = ({ username, email, password, tribe }) => {
    if (exists('username', username)) {
      return { ok: false, field: 'username', msg: '该代号已被占用，换一个试试' }
    }
    if (exists('email', email)) {
      return { ok: false, field: 'email', msg: '该邮箱已注册，请直接登录' }
    }
    users.value.push({
      username,
      email,
      tribe,
      password: enc(password),
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false })
    })
    localStorage.setItem(USERS_KEY, JSON.stringify(users.value))
    return { ok: true }
  }

  const login = ({ account, password, remember }) => {
    const target = users.value.find((u) => u.username === account || u.email === account)
    if (!target || target.password !== enc(password)) {
      return { ok: false, msg: '代号或密钥错误，请重新输入' }
    }
    remember ? localStorage.setItem(REMEMBER_KEY, account) : localStorage.removeItem(REMEMBER_KEY)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(target))
    currentUser.value = target
    return { ok: true, user: target }
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    currentUser.value = null
  }

  return { currentUser, remembered, users, login, register, logout, exists }
}
