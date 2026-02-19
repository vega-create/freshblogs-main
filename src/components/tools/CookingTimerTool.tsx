import { useState, useEffect, useRef } from 'react';

const presets = [
  {name:'Soft Boiled Egg',emoji:'🥚',seconds:360},
  {name:'Hard Boiled Egg',emoji:'🥚',seconds:720},
  {name:'Pasta (al dente)',emoji:'🍝',seconds:480},
  {name:'Rice',emoji:'🍚',seconds:1080},
  {name:'Steep Tea',emoji:'🍵',seconds:180},
  {name:'Rest Steak',emoji:'🥩',seconds:300},
  {name:'Proof Dough',emoji:'🍞',seconds:3600},
  {name:'Marinate (quick)',emoji:'🥗',seconds:1800},
];

interface Timer {id:number;name:string;total:number;remaining:number;running:boolean}

export default function CookingTimerTool() {
  const [timers,setTimers]=useState<Timer[]>([]);
  const [customMin,setCustomMin]=useState('');
  const [customName,setCustomName]=useState('');
  const intervalRef=useRef<number|null>(null);

  useEffect(()=>{
    intervalRef.current=window.setInterval(()=>{
      setTimers(prev=>prev.map(t=>{
        if(!t.running||t.remaining<=0) return t;
        const next=t.remaining-1;
        if(next===0){try{new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACA').play();}catch{}}
        return {...t,remaining:next,running:next>0};
      }));
    },1000);
    return ()=>{if(intervalRef.current)clearInterval(intervalRef.current);};
  },[]);

  const addPreset = (p:typeof presets[0]) => {
    setTimers(prev=>[...prev,{id:Date.now(),name:p.name,total:p.seconds,remaining:p.seconds,running:false}]);
  };

  const addCustom = () => {
    const min=parseFloat(customMin);
    if(isNaN(min)||min<=0) return;
    setTimers(prev=>[...prev,{id:Date.now(),name:customName||'Custom Timer',total:Math.round(min*60),remaining:Math.round(min*60),running:false}]);
    setCustomMin('');setCustomName('');
  };

  const toggle = (id:number) => setTimers(prev=>prev.map(t=>t.id===id?{...t,running:!t.running}:t));
  const reset = (id:number) => setTimers(prev=>prev.map(t=>t.id===id?{...t,remaining:t.total,running:false}:t));
  const remove = (id:number) => setTimers(prev=>prev.filter(t=>t.id!==id));

  const fmt = (s:number) => {const m=Math.floor(s/60);const sec=s%60;return `${m}:${String(sec).padStart(2,'0')}`;};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-2">
        {presets.map((p,i)=>(
          <button key={i} onClick={()=>addPreset(p)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
            <div className="text-xl">{p.emoji}</div>
            <div className="text-xs text-gray-400 mt-1">{p.name}</div>
            <div className="text-xs text-gray-600">{fmt(p.seconds)}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input type="text" value={customName} onChange={e=>setCustomName(e.target.value)} placeholder="Timer name"
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"/>
        <input type="number" value={customMin} onChange={e=>setCustomMin(e.target.value)} placeholder="Min"
          className="w-20 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm text-center placeholder-gray-500 focus:outline-none focus:border-purple-500"/>
        <button onClick={addCustom} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-semibold transition-colors">+ Add</button>
      </div>

      {timers.length>0 && (
        <div className="space-y-3">
          {timers.map(t=>(
            <div key={t.id} className={`p-4 rounded-xl border ${t.remaining===0?'bg-green-500/10 border-green-500/30':'bg-white/5 border-white/10'}`}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white text-sm">{t.name}</span>
                <button onClick={()=>remove(t.id)} className="text-gray-600 hover:text-red-400 text-xs">✕</button>
              </div>
              <div className="text-3xl font-mono text-center my-2" style={{color:t.remaining===0?'#22c55e':t.running?'#a78bfa':'#9ca3af'}}>
                {t.remaining===0?'✅ Done!':fmt(t.remaining)}
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mb-2">
                <div className="h-full bg-purple-500 rounded-full transition-all" style={{width:`${t.total?((t.total-t.remaining)/t.total)*100:0}%`}}/>
              </div>
              <div className="flex justify-center gap-2">
                <button onClick={()=>toggle(t.id)} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${t.running?'bg-red-600 hover:bg-red-500':'bg-green-600 hover:bg-green-500'}`}>
                  {t.running?'⏸ Pause':'▶ Start'}
                </button>
                <button onClick={()=>reset(t.id)} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">🔄 Reset</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
