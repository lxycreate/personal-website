import pandas as pd

def read_and_process_text(file_path):
    # 读取文件内容
    with open(file_path, 'r', encoding='utf-8') as file:
        file_content = file.read()
    
    # 按行处理文件内容
    lines = file_content.split("\n")
    temp = []
    teeeee = []
    for index, line in enumerate(lines):
        result = line.split()
        temp.append([v for v in result if v not in ["", "#"]])
        if index < 10:
            teeeee.append(result)
    
    keys = set()
    tempKey = []
    tempValue = []
    res = []
    for index, arr in enumerate(temp):
        if index % 2 == 0:
            tempKey = arr
            keys.update(arr)
        else:
            tempValue = arr
            obj = dict(zip(tempKey, tempValue))
            res.append(obj)
    
    # 确保所有对象都有相同的键
    for obj in res:
        for key in keys:
            obj.setdefault(key, "")
    
    return res, teeeee

def generate_csv(json_data, file_name):
    df = pd.DataFrame(json_data)
    # 保存为 CSV 文件
    df.to_csv(f"{file_name}.csv", index=False)

# 示例用法
file_path = "/Users/lxy/Desktop/ZeroOne/personal-website/src/views/tools/components/species1.out"  # 替换为实际文件路径
output_name = "species1"

data, first_ten_lines = read_and_process_text(file_path)

generate_csv(data, output_name)

print("Processed data:")
print(data)
print("First ten lines:")
print(first_ten_lines)
