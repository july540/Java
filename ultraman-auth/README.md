# ultraman-auth · 奥特曼主题登录系统

桌面上的 `ultraman-auth` 文件夹包含两套实现，挑一个用即可。

## 1. Vue 3 版本（推荐）

目录：`vue-app/`

```bash
cd vue-app
npm install
npm run dev     # http://127.0.0.1:5273
npm run build   # 产物 dist/，双击 dist/index.html 直接打开
```

组件化实现：登录 / 注册分离 SFC，含密码强度条、族群选择、登录成功欢迎面板。详见 `vue-app/README.md`。

## 2. 原生 HTML 版本

根目录的 `index.html` + `css/` + `js/`，零依赖，双击 `index.html` 即用。

## 账号说明

- 默认体验账号：`ultraman` / `123456`
- 数据存在浏览器 localStorage（key `ultraman_users`），两套版本共用同一份账号
- 密码为演示级编码，非真实加密；接入生产请改为服务端鉴权
