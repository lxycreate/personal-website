<template>
    <div class="tools flex flex-col justify-center items-center mt-[12px] format-first">
        <Upload :file-list="fileList" :before-upload="doBeforeUpload">
            <Button type="primary">
                <div class="flex justify-center items-center">
                    <UploadOutlined class="mr-[4px]" />点击上传
                </div>
            </Button>
        </Upload>
        <div class="format-first-demo">
            <h2 class="font-bold text-lg">处理如下格式数据</h2>
            <pre class="format-first-demo-code text-stone-700 bg-slate-200 p-[8px] rounded-[4px]">
    Step          Temp          E_pair         E_mol          TotEng         Press     
    168750   3005.643      -245186.49      0             -219840.77      1867.304     
    169000   2986.9791     -245041.27      0             -219852.93      2089.5126    
    170000   2992.0923     -244968.68      0             -219737.23      2203.1609    
    171000   3009.7077     -245136.22      0             -219756.22      2820.9004    
    172000   2981.0792     -244841.18      0             -219702.6       2166.8766    
    173000   3001.8042     -245091.5       0             -219778.15      2068.2679    
    174000   2999.8438     -244819.11      0             -219522.3       1394.3422    
    175000   2998.3625     -244980.08      0             -219695.76      2861.8231    
    176000   2996.3531     -244696.81      0             -219429.43      1046.185   
            </pre>
        </div>
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
        lines.forEach((line, index) => {
            // 在这里对每一行进行处理，例如打印到控制台
            const result = line.split(/\s+/);
            temp.push(result.filter((v) => v));
        });
        const header = temp.shift();
        const res = [];
        temp.forEach((row, index) => {
            const obj = {};
            header.forEach((key, index) => {
                obj[key] = row[index] || "";
            });
            res.push(obj);
        })
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
