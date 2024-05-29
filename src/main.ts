import 'uno.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import 'dotenv'


import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

const app = createApp(App)

app.use(router).mount("#app")

app.use(vue3GoogleLogin, {
    clientId: "121230697941-4ekr8g7bk6g1ihg1ejhjtq6j3pu3g9qq.apps.googleusercontent.com" //import.meta.env.VITE_ID_CLIENTE |
})

app.component('l-map', LMap)
app.component('l-tile-layer', LTileLayer)


