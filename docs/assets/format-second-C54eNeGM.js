import{u as i,w as v}from"./xlsx-DAjWcioG.js";import{B,U as k,a as T}from"./UploadOutlined-C36WCqWt.js";import{d as g,b as j,o as U,c as F,a as d,w as u,u as f,e as o,f as N}from"./index-wq43-80I.js";const S={class:"tools flex flex-col justify-center items-center mt-[12px] format-first"},V={class:"flex justify-center items-center"},C=o("div",{class:"format-first-demo"},[o("h2",{class:"font-bold text-lg"},"处理如下格式数据"),o("pre",{class:"format-first-demo-code text-stone-700 bg-slate-200 p-[8px] rounded-[4px]"},`    Step          Temp          E_pair         E_mol          TotEng         Press     
    168750   3005.643      -245186.49      0             -219840.77      1867.304     
    169000   2986.9791     -245041.27      0             -219852.93      2089.5126    
    170000   2992.0923     -244968.68      0             -219737.23      2203.1609    
    171000   3009.7077     -245136.22      0             -219756.22      2820.9004    
    172000   2981.0792     -244841.18      0             -219702.6       2166.8766    
    173000   3001.8042     -245091.5       0             -219778.15      2068.2679    
    174000   2999.8438     -244819.11      0             -219522.3       1394.3422    
    175000   2998.3625     -244980.08      0             -219695.76      2861.8231    
    176000   2996.3531     -244696.81      0             -219429.43      1046.185   
            `)],-1),P=g({__name:"format-second",setup(A){const p=j([]),_=(e,t)=>{const a=i.json_to_sheet(e),n=i.book_new();i.book_append_sheet(n,a,"Sheet1"),v(n,`${t}.csv`,{bookType:"csv",type:"binary"})},x=e=>{const t=new FileReader;t.onload=a=>{const b=a.target.result.split(`
`),r=[];b.forEach((c,y)=>{const s=c.split(/\s+/);r.push(s.filter(l=>l))});const w=r.shift(),m=[];r.forEach((c,y)=>{const s={};w.forEach((l,E)=>{s[l]=c[E]||""}),m.push(s)}),_(m,e.name)},t.readAsText(e)},h=e=>(p.value=[e],x(e),!1);return(e,t)=>(U(),F("div",S,[d(f(T),{"file-list":p.value,"before-upload":h},{default:u(()=>[d(f(B),{type:"primary"},{default:u(()=>[o("div",V,[d(f(k),{class:"mr-[4px]"}),N("点击上传 ")])]),_:1})]),_:1},8,["file-list"]),C]))}});export{P as default};
