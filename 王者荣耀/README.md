# 王者荣耀登录页（Vue 3 免构建版）

王者荣耀主题登录页面，使用 **Vue 3 全局构建**，**无需 npm 安装、无需打包**。

## 特性
- 后羿 / 李白 / 妲己 三英雄立绘：悬浮 + 光晕脉冲动效，点击缩略图即可切换
- 金红主题、玻璃拟态登录卡片、背景粒子与光球动画
- 纯前端，双击 `index.html` 即可在浏览器打开（Vue 已本地内置，离线可用）

## 运行
方式一：直接双击 `index.html`
方式二：用任意静态服务器，例如
```
python -m http.server 5173
```
然后访问 http://localhost:5173/

## 目录结构
```
王者荣耀/
├── index.html          # 入口页面
├── app.js              # Vue 应用逻辑（英雄切换 / 登录交互）
├── style.css           # 样式
├── vue.global.prod.js  # 本地内置的 Vue 3 运行时
├── assets/             # 英雄立绘（houyi / libai / daji）
└── README.md
```

> 上传到 GitHub 后，开启 Pages 并把根目录设为 `/` 即可直接预览。
