// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path' // ⬅️ path 모듈 꼭 import!

// // https://vite.dev/config/
// export default defineConfig({
//   base: '/pupi/',
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src') // ⬅️ 이 줄이 핵심!
//     }
//   }
// })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})