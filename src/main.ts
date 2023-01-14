import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';

import './assets/css/index.css'

const app = createApp(App)
const i18n = createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'en'
})
app.use(i18n).mount('#app')
