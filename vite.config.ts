import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
// import path from 'path-browserify'
// import os from 'os-browserify'
import 'dotenv'


// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [vue(), UnoCSS()],
  
})

// export default defineConfig({
//   plugins: [vue(), UnoCSS()],
//   resolve: {
//     alias: {
//       path: "path-browserify",
//       os: "os-browserify",
//       crypto: "crypto-browserify"
//     },
//   },
// })