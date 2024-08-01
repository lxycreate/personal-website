<template>
    <div class="delete-column flex justify-center items-center mt-[12px] flex-col">
        <div class=" max-w-[500px] w-full">
            <Alert message="文件有哪些组，如：Masses；多个以英文逗号,分割" type="info" show-icon />
            <Textarea v-model:value="groupValue" :auto-size="{ minRows: 3 }" type="textarea"
                placeholder="文件有哪些组，如：Masses；多个以英文逗号,分割" class="mt-[12px]" @blur="doGroupsChange" />
            <Alert message="文件要删除哪些组，如：Masses；多个以英文逗号,分割" type="info" show-icon class="mt-[12px]" />
            <Textarea v-model:value="deleteValue" :auto-size="{ minRows: 3 }" type="textarea"
                placeholder="文件要删除哪些组，如：Masses；多个以英文逗号,分割" class="mt-[12px]" @blur="doGroupsChange" />
        </div>
        <Upload :file-list="fileList" :before-upload="doBeforeUpload" class="mt-[12px]">
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
            <Button type="primary" :disabled="!fileData" class="mr-[12px]" @click="doPreview">
                <div class="flex justify-center items-center">
                    <EyeOutlined class="mr-[4px]" />预览
                </div>
            </Button>
            <Button type="primary" :disabled="!fileData" @click="doDelete">
                <div class="flex justify-center items-center">
                    <DeleteOutlined class="mr-[4px]" />删除
                </div>
            </Button>
        </div>
        <Modal v-model:open="previewVisible" title="预览" width="80%" okText="下载" @ok="doDelete">
            <div class="flex">
                <div class="delete-column-old w-[50%] flex-1 mr-[8px]">
                    <span class="text-[16px] font-bold">旧</span>
                </div>
                <div class="delete-column-new  w-[50%] flex-1">
                    <span class="text-[16px] font-bold">新</span>
                </div>
            </div>
            <div class="flex overflow-y-auto max-h-[80vh]">
                <div class="delete-column-old w-[50%] flex-1 mr-[8px]">
                    <div class="bg-gray-300 p-[12px] rounded-[4px]">
                        <div v-for="(item, index) in fileParseList" :key="index"
                            :class="{ 'mt-[12px]': item === '\r', 'is-not-same': !isSameLine[index] }">
                            {{ item }}
                        </div>
                    </div>
                </div>
                <div class="delete-column-new  w-[50%] flex-1">
                    <div class="bg-gray-300 p-[12px] rounded-[4px]">
                        <div v-for="(item, index) in previewValue" :key="index"
                            :class="{ 'mt-[12px]': !item.trim(), 'is-not-same': !isSameLine[index] }">
                            {{ item }}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, ref } from "vue";
import { debounce } from 'lodash-es'
import { Upload, Button, Input, Textarea, Alert, Modal } from 'ant-design-vue'
import { UploadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue';

const fileData = ref(null);
const fileStr = ref('');
const tableData = ref([]);
const groupValue = ref('');
const realGroupValue = ref('');
const realDeleteValue = ref('');
const deleteValue = ref('');
const previewVisible = ref(false)
const previewValue = ref([])

const defaultGroups = ['LAMMPS data file', 'Masses', 'Pair Coeffs', 'Bond Coeffs', 'Angle Coeffs', 'Dihedral Coeffs', 'Improper Coeffs', 'Atoms', 'Bonds', 'Angles', 'Dihedrals', 'Impropers'];
const defaultDeleteGroups = ['Masses', 'Atoms'];

const groupNames = computed(() => [...new Set(realGroupValue.value.split(',').map(v => v.trim()))])
const deleteGroups = computed(() => [...new Set(realDeleteValue.value.split(',').map(v => v.trim()))])
const fileParseList = computed(() => {
    return fileStr.value.split('\n')
})

const isGroup = (line) => {
    return groupNames.value.some((name) => line.startsWith(name))
}

const isSameLine = computed(() => {
    const list = [];
    fileParseList.value.forEach((line, index) => {
        if (line.trim() !== (previewValue.value[index]?.trim?.() || '')) {
            list[index] = false;
        } else {
            list[index] = true;
        }
    })
    return list;
})

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

const doGroupsChange = () => {
    realGroupValue.value = groupValue.value;
    realDeleteValue.value = deleteValue.value;
    if (fileData.value) {
        doRead(fileData.value)
    }
    localStorage.setItem('delete-groups', JSON.stringify(deleteGroups.value));
    localStorage.setItem('all-groups', JSON.stringify(groupNames.value));
}

const doPreview = debounce(() => {
    previewValue.value = getDealContent();
    previewVisible.value = true;
}, 100)

const doDeal = (group) => {
    const rule = tableData.value.find(v => v.key === group.value);
    if (!rule) {
        return group.children.map(v => v.value);
    }
    const str = rule.value.trim();
    const temp = str.split(/\s+/).map(v => parseInt(v)).filter(v => !isNaN(v));
    const list = [];
    const maxWidth = [];
    group.children.forEach(child => {
        const childStr = child.value.trim().split(/\s+/);
        const res = childStr.filter((v, index) => !temp.includes(index + 1));
        res.forEach((v, index) => {
            const width = maxWidth[index] || 0;
            if (v.length > width) {
                maxWidth[index] = v.length;
            }
        })
        list.push(res);
    })
    list.forEach(v => v.forEach((item, index) => {
        v[index] = v[index].padStart(maxWidth[index], ' ');
    }))
    return list.map(v => v.join(' '));
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

const getDealContent = () => {
    const result = [];
    fileGroup.value.forEach(item => {
        result.push(item.value);
        if (item?.children?.length) {
            result.push(...doDeal(item));
        }
    })
    return result;
}

const doDelete = () => {
    previewVisible.value = false;
    doDownload(getDealContent().join('\n'), fileData.value.name)
}

const doRead = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        fileStr.value = e.target.result;
        const list = fileGroup.value.filter(v => deleteGroups.value.some(g => v.value.startsWith(g)));
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

const initParams = () => {
    const temp = localStorage.getItem('delete-groups');
    if (temp) {
        deleteValue.value = JSON.parse(temp).join(',');
    } else {
        deleteValue.value = defaultDeleteGroups.join(',');
    }
    realDeleteValue.value = deleteValue.value;
    const str = localStorage.getItem('all-groups');
    if (str) {
        groupValue.value = JSON.parse(str).join(',');
    } else {
        groupValue.value = defaultGroups.join(',');
    }
    realGroupValue.value = groupValue.value;
}

initParams();

</script>

<style lang="scss" scoped>
.delete-column {
    &-old {
        .is-not-same {
            background-color: #ffe58f;
        }
    }

    &-new {
        .is-not-same {
            background-color: #91d5ff;
        }
    }
}
</style>