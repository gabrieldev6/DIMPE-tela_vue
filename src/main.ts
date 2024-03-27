import 'uno.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import 'dotenv'




const app = createApp(App)

app.use(router).mount("#app")

app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_ID_CLIENTE 
})
crossOriginIsolated=false


