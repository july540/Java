/* 王者荣耀登录页 —— Vue 3 全局构建版（无需 npm / 构建，双击 index.html 即可运行） */
const { createApp, ref, onMounted } = Vue;

const heroes = [
  {
    key: 'houyi',
    name: '后 羿 · 灼 日 之 弓',
    img: 'assets/houyi.png',
    aura: 'radial-gradient(circle, rgba(212,175,55,0.45), transparent 70%)',
    glow: 'rgba(255,190,60,0.85)',
    nameColor: '#f3d27a'
  },
  {
    key: 'libai',
    name: '李 白 · 青 莲 剑 仙',
    img: 'assets/libai.png',
    aura: 'radial-gradient(circle, rgba(80,160,220,0.45), transparent 70%)',
    glow: 'rgba(120,200,255,0.85)',
    nameColor: '#aee0ff'
  },
  {
    key: 'daji',
    name: '妲 己 · 魅 惑 之 狐',
    img: 'assets/daji.png',
    aura: 'radial-gradient(circle, rgba(220,120,200,0.45), transparent 70%)',
    glow: 'rgba(255,150,230,0.85)',
    nameColor: '#ffb6e6'
  }
];

const App = {
  setup() {
    const activeHero = ref(heroes[0]);
    const account = ref('');
    const password = ref('');
    const remember = ref(true);
    const msg = ref('');
    const particles = ref([]);

    function selectHero(h) {
      activeHero.value = h;
    }

    function onLogin() {
      if (!account.value || !password.value) {
        msg.value = '请填写账号和密码';
        setTimeout(() => (msg.value = ''), 1800);
        return;
      }
      msg.value = '欢迎回来，' + account.value + '！正在进入王者峡谷……';
      setTimeout(() => (msg.value = ''), 2200);
    }

    function noop() {}

    onMounted(() => {
      const list = [];
      for (let i = 0; i < 28; i++) {
        list.push({
          id: i,
          style: {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            width: 2 + Math.random() * 4 + 'px',
            height: 2 + Math.random() * 4 + 'px',
            animationDuration: 4 + Math.random() * 6 + 's',
            animationDelay: Math.random() * 5 + 's'
          }
        });
      }
      particles.value = list;
    });

    return {
      heroes,
      activeHero,
      account,
      password,
      remember,
      msg,
      particles,
      selectHero,
      onLogin,
      noop
    };
  },
  template: `
    <div class="login-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="particles">
        <span v-for="p in particles" :key="p.id" class="particle" :style="p.style"></span>
      </div>

      <div class="hero-side">
        <div class="hero-aura" :style="{ background: activeHero.aura }"></div>
        <transition name="hero-switch" mode="out-in">
          <img :key="activeHero.key" :src="activeHero.img" class="hero-img"
               :style="{ filter: 'drop-shadow(0 0 28px ' + activeHero.glow + ')' }"
               :alt="activeHero.key" />
        </transition>
        <div class="hero-name" :style="{ color: activeHero.nameColor, textShadow: '0 0 12px ' + activeHero.glow }">
          {{ activeHero.name }}
        </div>

        <div class="hero-switch">
          <button v-for="h in heroes" :key="h.key" class="thumb"
                  :class="{ active: h.key === activeHero.key }" @click="selectHero(h)">
            <img :src="h.img" :alt="h.key" />
          </button>
        </div>
      </div>

      <div class="login-card">
        <div class="logo">王者荣耀</div>
        <div class="subtitle">HONOR OF KINGS</div>

        <form class="form" @submit.prevent="onLogin">
          <div class="field">
            <span class="icon">👤</span>
            <input v-model="account" type="text" placeholder="请输入游戏账号 / 手机号" />
          </div>
          <div class="field">
            <span class="icon">🔒</span>
            <input v-model="password" type="password" placeholder="请输入密码" />
          </div>

          <div class="row">
            <label class="remember">
              <input type="checkbox" v-model="remember" /> 记住账号
            </label>
            <a class="link" @click="noop">忘记密码？</a>
          </div>

          <button class="login-btn" type="submit">登 录 游 戏</button>

          <div class="other">
            <span>其他方式登录</span>
            <div class="socials">
              <span class="social">微信</span>
              <span class="social">QQ</span>
              <span class="social">游客</span>
            </div>
          </div>
        </form>

        <transition name="fade">
          <div v-if="msg" class="toast">{{ msg }}</div>
        </transition>
      </div>
    </div>
  `
};

createApp(App).mount('#app');
