import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@comp/layout/layout.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Layout,
        redirect: '/format',
        children: [{
            path: 'format',
            name: 'Format',
            component: () => import('@views/tools/format.vue')
        },{
            path: 'delete-column',
            name: 'DeleteColumn',
            component: () => import('@views/tools/delete-column.vue')
        }]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router