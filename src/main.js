// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <- router/index.js를 자동 인식함
import './assets/reset.css' // <- 브라우저 초기화 css
import './style.css' // <- 전역 css 스타일

const app = createApp(App)
app.use(router)
app.mount('#app')
