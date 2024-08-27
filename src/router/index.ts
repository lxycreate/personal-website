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
            component: () => import('@views/tools/format.vue'),
            redirect: '/format/format-a',
            children: [{
                path: 'format-a',
                name: 'FormatA',
                component: () => import('@views/tools/components/format-first.vue')
            },{
                path: 'format-b',
                name: 'FormatB',
                component: () => import('@views/tools/components/format-second.vue')
            }]
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