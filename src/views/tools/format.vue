<template>
    <div class="tools flex justify-center items-center mt-[12px]">
        <Upload :file-list="fileList" :before-upload="doBeforeUpload">
            <Button type="primary">
                <div class="flex justify-center items-center">
                    <UploadOutlined class="mr-[4px]"/>点击上传
                </div>
            </Button>
        </Upload>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue";
import * as XLSX from "xlsx";
import { Upload, Button } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue';

const fileList = ref([]);

const createExcel = (jsonData, name) => {
    // 将JSON数据转换为工作表
    const ws = XLSX.utils.json_to_sheet(jsonData);

    // 创建一个新的工作簿
    const wb = XLSX.utils.book_new();

    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // 写入文件
    XLSX.writeFile(wb, `${name}.csv`, { bookType: "csv", type: "binary" });
};

const doDealFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = e.target.result;
        // 按行处理文件内容
        const lines = data.split("\n");
        const temp = [];
        const teeeee = [];
        lines.forEach((line, index) => {
            // 在这里对每一行进行处理，例如打印到控制台
            const result = line.split(/\s+/);
            temp.push(result.filter((v) => !["", "#"].includes(v)));
            if (index < 10) {
                teeeee.push(result);
            }
        });
        let keys = new Set();
        let tempKey = [];
        let tempValue = [];
        const res = [];
        temp.forEach((arr, index) => {
            if (index % 2 == 0) {
                tempKey = arr;
                keys = new Set([...keys, ...arr]);
            } else {
                tempValue = arr;
                const obj = {};
                tempKey.forEach((key, i) => {
                    obj[key] = tempValue[i];
                });
                res.push(obj);
            }
        });
        res.forEach((obj) => {
            keys.forEach((key) => {
                obj[key] = obj[key] || "";
            });
        });
        createExcel(res, file.name);
    };
    reader.readAsText(file);
};

const doBeforeUpload = (file) => {
    fileList.value = [file]
    doDealFile(file)
    return false;
}
</script>