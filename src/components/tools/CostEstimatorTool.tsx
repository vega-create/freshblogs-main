import { useState } from 'react';

const projects: Record<string,{emoji:string;items:{name:string;low:number;high:number}[];laborPct:number;timeRange:string}> = {
  'Bathroom Remodel':{emoji:'🚿',items:[{name:'Tiles',low:200,high:1500},{name:'Vanity',low:150,high:800},{name:'Toilet',low:100,high:500},{name:'Fixtures (faucet, showerhead)',low:100,high:600},{name:'Paint & supplies',low:50,high:150},{name:'Lighting',low:50,high:300}],laborPct:50,timeRange:'1-3 weeks'},
  'Kitchen Update':{emoji:'🍳',items:[{name:'Cabinet refacing/paint',low:200,high:2000},{name:'Countertops',low:300,high:3000},{name:'Backsplash',low:100,high:800},{name:'Sink & faucet',low:150,high:600},{name:'Lighting',low:50,high:400},{name:'Hardware',low:30,high:150}],laborPct:40,timeRange:'2-4 weeks'},
  'Deck Build':{emoji:'🏗️',items:[{name:'Lumber / composite',low:500,high:3000},{name:'Hardware & fasteners',low:50,high:200},{name:'Concrete (footings)',low:100,high:400},{name:'Railing',low:100,high:600},{name:'Stain/sealant',low:50,high:150}],laborPct:45,timeRange:'1-2 weeks'},
  'Interior Paint':{emoji:'🎨',items:[{name:'Paint (per room)',low:30,high:80},{name:'Primer',low:20,high:40},{name:'Brushes & rollers',low:15,high:40},{name:'Tape & drop cloths',low:10,high:25},{name:'Patch/repair supplies',low:10,high:30}],laborPct:30,timeRange:'1-3 days per room'},
  'Fence Install':{emoji:'🏡',items:[{name:'Fence panels (per 50ft)',low:300,high:2000},{name:'Posts',low:50,high:300},{name:'Concrete',low:30,high:100},{name:'Hardware & gates',low:50,high:300},{name:'Stain/paint',low:30,high:100}],laborPct:40,timeRange:'2-4 days'},
};

export default function CostEstimatorTool() {
  const [project,setProject]=useState('');
  const [diy,setDiy]=useState(true);

  const info=project?projects[project]:null;
  const materialLow=info?info.items.reduce((a,b)=>a+b.low,0):0;
  const materialHigh=info?info.items.reduce((a,b)=>a+b.high,0):0;
  const laborLow=diy?0:Math.round(materialLow*((info?.laborPct||0)/100));
  const laborHigh=diy?0:Math.round(materialHigh*((info?.laborPct||0)/100));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(projects).map(([name,p])=>(
          <button key={name} onClick={()=>setProject(name)}
            className={`p-3 rounded-lg text-center text-sm transition-all ${project===name?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>
            <div className="text-2xl">{p.emoji}</div>
            <div className="text-xs mt-1">{name}</div>
          </button>
        ))}
      </div>

      {info && (
        <>
          <div className="flex gap-2 justify-center">
            <button onClick={()=>setDiy(true)} className={`px-4 py-2 rounded-lg text-sm ${diy?'bg-green-600':'bg-white/10'}`}>🔨 DIY</button>
            <button onClick={()=>setDiy(false)} className={`px-4 py-2 rounded-lg text-sm ${!diy?'bg-orange-600':'bg-white/10'}`}>👷 Hire Pro</button>
          </div>

          <div className="space-y-2">
            {info.items.map((item,i)=>(
              <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-300">{item.name}</span>
                <span className="text-sm text-gray-400">${item.low} – ${item.high}</span>
              </div>
            ))}
            {!diy && (
              <div className="flex justify-between items-center p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <span className="text-sm text-orange-400">👷 Labor (~{info.laborPct}%)</span>
                <span className="text-sm text-orange-400">${laborLow} – ${laborHigh}</span>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
              <p className="text-xs text-green-400">Budget Estimate</p>
              <p className="text-xl font-bold text-white">${(materialLow+laborLow).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-center">
              <p className="text-xs text-purple-400">Mid-Range</p>
              <p className="text-xl font-bold text-white">${Math.round((materialLow+materialHigh)/2+((laborLow+laborHigh)/2)).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
              <p className="text-xs text-amber-400">High-End</p>
              <p className="text-xl font-bold text-white">${(materialHigh+laborHigh).toLocaleString()}</p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500">⏱️ Estimated time: {info.timeRange}</p>
        </>
      )}
    </div>
  );
}
