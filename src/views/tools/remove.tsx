//@ts-nocheck
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { Button, message, Upload } from "antd";
import * as XLSX from "xlsx";

const Remove: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const props: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: (file) => {
      doDealFile(file);
      setFileList([file]);
      return false;
    },
  };
  return (
    <div className="Remove">
    
      <Upload {...props} fileList={fileList}>
        <Button icon={<UploadOutlined />}>点击选择</Button>
      </Upload>
    </div>
  );
};

export default Remove;
