<template>
    <div class="delete-column flex justify-center items-center mt-[12px] flex-col">
        <Upload :file-list="fileList" :before-upload="doBeforeUpload">
            <Button type="primary">
                <div class="flex justify-center items-center">
                    <UploadOutlined class="mr-[4px]" />点击上传
                </div>
            </Button>
        </Upload>
        <div class="w-full max-w-[500px]">
            <div v-for="item in tableData" :key="item.key" class="flex items-center mt-[12px] w-full">
                <span class="block w-[130px]"> {{ item.key }}</span>
                <Input v-model:value="item.value" class="ml-[12px] w-full" placeholder="输入要删除的列，如：1 2；多个以空格分割" />
            </div>
        </div>
        <div class="mt-[12px]">
            <Button type="primary" @click="doDelete">
                <div class="flex justify-center items-center">
                    <DeleteOutlined class="mr-[4px]" />删除
                </div>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, ref } from "vue";
import { Upload, Button, Input } from 'ant-design-vue'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const fileData = ref(null);
const fileStr = ref(null);
const tableData = ref([]);

const useGroups = ['Masses', 'Atoms']
const groupNames = ['LAMMPS data file', 'Masses', 'Pair Coeffs', 'Bond Coeffs', 'Angle Coeffs', 'Dihedral Coeffs', 'Improper Coeffs', 'Atoms', 'Bonds', 'Angles', 'Dihedrals', 'Impropers']
const isGroup = (line) => {
    return groupNames.some((name) => line.startsWith(name))
}
const fileGroup = computed(() => {
    const list = [];
    if (fileStr.value) {
        let group = '', children = [];
        fileStr.value.split('\n').forEach((line, index) => {
            line = line.trim();
            const temp = isGroup(line);
            if (temp) {
                group = line;
                children = [];
                list.push({
                    value: line,
                    children
                })
            } else if (group) {
                children.push({
                    value: line,
                })
            } else {
                group = '';
                children = [];
                list.push({
                    value: line,
                })
            }
        })
    }
    return list;
});

const fileList = computed(() => {
    return fileData.value ? [fileData.value] : [];
});

const doDeal = (group) => {
    const rule = tableData.value.find(v => v.key === group.value);
    if (!rule) {
        return group.children.map(v => v.value);
    }
    const str = rule.value.trim();
    const temp = str.split(/\s+/).map(v => parseInt(v)).filter(v => !isNaN(v));
    const list = [];
    group.children.forEach(child => {
        const childStr = child.value.trim().split(/\s+/);
        const res = childStr.filter((v, index) => !temp.includes(index + 1)).map(v => v.padStart(8, ' '));
        list.push(res.join(' '));
    })
    return list;
}

const doDownload = (content, filename) => {
    // 创建一个 Blob 对象，它表示一个不可变的、原始数据的类文件对象。
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

    // 创建一个隐藏的可下载链接
    const link = document.createElement('a');

    // 设置 URL 和文件名
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // 添加到文档
    document.body.appendChild(link);

    // 触发点击事件
    link.click();

    // 清理工作
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

const doDelete = () => {
    const result = [];
    fileGroup.value.forEach(item => {
        result.push(item.value);
        if (item?.children?.length) {
            result.push(...doDeal(item));
        }
    })
    doDownload(result.join('\n'), fileData.value.name)
    console.log('result', result.join('\n'));
}

const doRead = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        fileStr.value = e.target.result;
        const list = fileGroup.value.filter(v => useGroups.some(g => v.value.startsWith(g)));
        tableData.value = list.filter(v => v.children?.length).map(item => ({ key: item.value, value: '' }))
        console.log(fileGroup.value)
    };
    reader.readAsText(file);
}

const doBeforeUpload = (file) => {
    fileData.value = file;
    doRead(file)
    return false;
}
</script>