/* ==========================================================
   登录 / 注册 逻辑（数据保存在 localStorage，纯前端演示）
   ========================================================== */
(function () {
  'use strict';

  const USERS_KEY = 'ultraman_users';
  const SESSION_KEY = 'ultraman_session';
  const REMEMBER_KEY = 'ultraman_remember';

  /* ---------- 工具 ---------- */
  const $ = (s) => document.querySelector(s);
  const enc = (s) => btoa(unescape(encodeURIComponent('M78|' + s))); // 演示用编码，非加密

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveUsers(list) { localStorage.setItem(USERS_KEY, JSON.stringify(list)); }

  function seed() {
    let list = getUsers();
    if (!list.some(u => u.username === 'ultraman')) {
      list.push({
        username: 'ultraman',
        email: 'ultraman@m78.nebula',
        password: enc('123456'),
        createdAt: '2026-01-01 00:00'
      });
      saveUsers(list);
    }
  }
  seed();

  function setError(inputSel, msg) {
    const el = $(inputSel);
    const field = el.closest('.field');
    field.classList.toggle('invalid', !!msg);
    const box = field.querySelector('.err');
    if (box) box.textContent = msg || '';
    return !msg;
  }
  function clearErrors(form) {
    form.querySelectorAll('.field').forEach(f => {
      f.classList.remove('invalid');
      const b = f.querySelector('.err'); if (b) b.textContent = '';
    });
  }
  function showAlert(sel, msg, success) {
    const el = $(sel);
    el.textContent = msg;
    el.classList.toggle('success', !!success);
    el.classList.add('show');
  }
  function hideAlert(sel) { $(sel).classList.remove('show'); }

  /* ---------- 卡片切换 ---------- */
  const cardLogin = $('#card-login');
  const cardReg = $('#card-register');

  function switchTo(card) {
    [cardLogin, cardReg].forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  }
  $('#toRegister').addEventListener('click', (e) => { e.preventDefault(); switchTo(cardReg); });
  $('#toLogin').addEventListener('click', (e) => { e.preventDefault(); switchTo(cardLogin); });
  $('#toReset').addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('#loginAlert', '演示环境暂不支持找回密钥，请使用体验账号 ultraman / 123456', false);
  });

  /* ---------- 密码可见切换 ---------- */
  document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? '🙈' : '👁';
    });
  });

  /* ---------- 记住账号 ---------- */
  const savedRemember = localStorage.getItem(REMEMBER_KEY);
  if (savedRemember) {
    $('#loginUser').value = savedRemember;
    $('#remember').checked = true;
  }

  /* ---------- 密码强度 ---------- */
  const bars = document.querySelectorAll('#strength .bar i');
  const tip = $('#strength .tip');
  $('#regPass').addEventListener('input', (e) => {
    const v = e.target.value;
    let score = 0;
    if (v.length >= 6) score++;
    if (/[a-zA-Z]/.test(v) && /\d/.test(v)) score++;
    if (v.length >= 10 && /[^a-zA-Z0-9]/.test(v)) score++;
    if (!v) score = 0;
    bars.forEach((b, i) => b.classList.toggle('on', i < score));
    const words = ['—', '弱：能量不足', '中：可应付小型怪兽', '强：足以对抗杰顿'];
    tip.textContent = '能量强度：' + words[score];
  });

  /* ---------- 注册 ---------- */
  $('#regForm').addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(e.target);
    hideAlert('#regAlert');

    const user = $('#regUser').value.trim();
    const email = $('#regEmail').value.trim();
    const pass = $('#regPass').value;
    const pass2 = $('#regPass2').value;
    const users = getUsers();

    let ok = true;

    if (!/^[a-zA-Z0-9_]{3,16}$/.test(user)) {
      ok = setError('#regUser', '代号需为 3–16 位字母、数字或下划线') && false;
    } else if (users.some(u => u.username === user)) {
      ok = setError('#regUser', '该代号已被注册，请更换') && false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ok = setError('#regEmail', '请输入正确的邮箱格式') && false;
    } else if (users.some(u => u.email === email)) {
      ok = setError('#regEmail', '该邮箱已注册，请直接登录') && false;
    }

    if (pass.length < 6) {
      ok = setError('#regPass', '密钥长度不能少于 6 位') && false;
    }

    if (pass2 !== pass) {
      ok = setError('#regPass2', '两次输入的密钥不一致') && false;
    }

    const agree = $('#agree');
    const agreeErr = $('#agreeErr');
    if (!agree.checked) {
      agreeErr.textContent = '请先同意《光之国保密与守护条例》';
      agreeErr.style.opacity = '1';
      ok = false;
    } else {
      agreeErr.textContent = '';
      agreeErr.style.opacity = '0';
    }

    if (!ok) { showAlert('#regAlert', '资料校验未通过，请检查上方红色提示', false); return; }

    users.push({
      username: user,
      email: email,
      password: enc(pass),
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false })
    });
    saveUsers(users);

    $('#regForm').reset();
    bars.forEach(b => b.classList.remove('on'));
    tip.textContent = '能量强度：—';
    showAlert('#regAlert', '注册成功！正在切换至登录界面…', true);

    setTimeout(() => {
      switchTo(cardLogin);
      hideAlert('#regAlert');
      $('#loginUser').value = user;
      $('#loginPass').value = '';
      $('#loginPass').focus();
      showAlert('#loginAlert', '注册成功，请输入密钥后登录', true);
    }, 1200);
  });

  /* ---------- 登录 ---------- */
  $('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(e.target);
    hideAlert('#loginAlert');

    const user = $('#loginUser').value.trim();
    const pass = $('#loginPass').value;
    let ok = true;

    if (!user) ok = setError('#loginUser', '请输入队员代号') && false;
    if (!pass) ok = setError('#loginPass', '请输入密钥') && false;
    if (!ok) return;

    const target = getUsers().find(u => u.username === user || u.email === user);
    if (!target || target.password !== enc(pass)) {
      showAlert('#loginAlert', '代号或密钥错误，请重新输入', false);
      return;
    }

    if ($('#remember').checked) localStorage.setItem(REMEMBER_KEY, user);
    else localStorage.removeItem(REMEMBER_KEY);

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(target));
    enterWelcome(target);
  });

  /* ---------- 欢迎界面 ---------- */
  function enterWelcome(u) {
    $('#welcomeName').textContent = u.username;
    $('#statEmail').textContent = u.email;
    $('#statTime').textContent = new Date().toLocaleString('zh-CN', { hour12: false });
    $('#loginPass').value = '';
    hideAlert('#loginAlert');
    $('#welcome').classList.add('show');
  }

  $('#logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    $('#welcome').classList.remove('show');
    switchTo(cardLogin);
  });

  /* ---------- 刷新后恢复会话 ---------- */
  try {
    const s = sessionStorage.getItem(SESSION_KEY);
    if (s) enterWelcome(JSON.parse(s));
  } catch (err) { /* ignore */ }
})();
