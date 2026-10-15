# 光之国 · 奥特曼身份认证系统（Vue 3 版）

Vite + Vue 3 单文件组件实现的奥特曼主题 **登录 / 注册** 界面。

## 目录结构

```
vue-app/
├─ index.html
├─ vite.config.js          base: './'（构建产物可直接双击打开）
├─ src/
│  ├─ main.js
│  ├─ App.vue              场景外壳：星空背景、品牌区、登录/注册切换、欢迎层、Toast
│  ├─ styles/theme.css     全局设计令牌（红族红 / 银族银 / 光之蓝）与通用按钮、动效
│  ├─ composables/useAuth.js  本地账号仓库（localStorage + sessionStorage）
│  └─ components/
│     ├─ StarField.vue     canvas 星空 + 流星
│     ├─ BrandPanel.vue    奥特曼立绘（SVG）+ 品牌信息
│     ├─ FormField.vue     通用输入框（图标 / 密码可见 / 错误抖动）
│     ├─ LoginForm.vue     登录表单
│     ├─ RegisterForm.vue  注册表单（能量强度条 + 族群选择）
│     └─ WelcomePanel.vue  登录成功界面（计时器圆环 + 变身能量倒计时）
```

## 启动

```bash
cd vue-app
npm install
npm run dev      # http://127.0.0.1:5273
```

构建后可直接双击打开：

```bash
npm run build    # 产物在 dist/，双击 dist/index.html 即可
```

## 功能

- **登录**：用户名或邮箱登录、记住账号、密码可见切换、空值校验、错误提示、加载态
- **注册**：代号 / 邮箱 / 密码 / 确认密码、实时密码强度条、**族群选择**（红族·力量 / 银族·全能 / 蓝族·机动）、协议勾选；
  提交后自动跳回登录页并回填账号 → **注册完即可登录**
- **登录后**：欢迎面板，展示邮箱、族群、地表活动时间倒计时（180s 演示），支持退出

## 数据说明

账号存于浏览器 `localStorage`（key `ultraman_users`），密码使用自定义 base64 编码，**仅用于演示，不是真实加密**。
默认体验账号：`ultraman` / `123456`。接入生产请改为服务端鉴权。
