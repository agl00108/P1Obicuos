import { createApp } from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import './style.css'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/',
            name: 'Home',
            component: () => import('./components/HomeView.vue')},
        {path: '/info/:name',
            name: 'Info',
            component: () => import('./components/InfoSingular.vue'),
            props: true
        }
    ]
})

createApp(App)
    .use(router)
    .mount('#app')
