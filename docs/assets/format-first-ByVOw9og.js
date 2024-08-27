import{u as _,w as M}from"./xlsx-DAjWcioG.js";import{B as w,U as b,a as y}from"./UploadOutlined-CNluGjdV.js";import{d as v,b as E,c as B,a as d,w as h,u as f,e as a,o as k,f as U}from"./index-HAqYNAFu.js";const V={class:"tools flex flex-col justify-center items-center mt-[12px] format-first"},g={class:"flex justify-center items-center"},j=a("div",{class:"format-first-demo"},[a("h2",{class:"font-bold text-lg"},"处理如下格式数据"),a("pre",{class:"format-first-demo-code text-stone-700 bg-slate-200 p-[8px] rounded-[4px]"},`#  Timestep    No_Moles    No_Specs C136H115O38          O2
        100         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2
        200         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2
        300         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2
        400         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2
        500         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2
        600         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2
        700         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2
        800         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2
        900         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2
       1000         105           2           5         100
#  Timestep    No_Moles    No_Specs C136H115O38          O2`)],-1),L=v({__name:"format-first",setup(F){const m=E([]),x=(e,t)=>{const c=_.json_to_sheet(e),l=_.book_new();_.book_append_sheet(l,c,"Sheet1"),M(l,`${t}.csv`,{bookType:"csv",type:"binary"})},S=e=>{const t=new FileReader;t.onload=c=>{const C=c.target.result.split(`
`),u=[];C.forEach((s,o)=>{const n=s.split(/\s+/);u.push(n.filter(i=>!["","#"].includes(i)))});let p=new Set,N=[],O=[];const r=[];u.forEach((s,o)=>{if(o%2==0)N=s,p=new Set([...p,...s]);else{O=s;const n={};N.forEach((i,H)=>{n[i]=O[H]}),r.push(n)}}),r.forEach(s=>{p.forEach(o=>{s[o]=s[o]||""})}),x(r,e.name)},t.readAsText(e)},T=e=>(m.value=[e],S(e),!1);return(e,t)=>(k(),B("div",V,[d(f(y),{"file-list":m.value,"before-upload":T},{default:h(()=>[d(f(w),{type:"primary"},{default:h(()=>[a("div",g,[d(f(b),{class:"mr-[4px]"}),U("点击上传 ")])]),_:1})]),_:1},8,["file-list"]),j]))}});export{L as default};
