<template>
    <div class="layout">
        <Menu v-model:selectedKeys="current" :items="routes" theme="dark" mode="horizontal" @select="doChange"></Menu>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const routes: any[] = [{
    key: 'Format',
    name: 'Format',
    label: '格式化'
}, {
    key: "DeleteColumn",
    name: 'DeleteColumn',
    label: '删除列'
}]

const current = ref(['Format'])

const doChange = (data: any) => {
    const { key, selectedKeys } = data;
    current.value = selectedKeys;
    router.push({ name: key })
}

onMounted(() => {
    // @ts-ignore
    current.value = [route.name]
})
</script>