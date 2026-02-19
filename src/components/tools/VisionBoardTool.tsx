import { useState, useEffect } from 'react';

const categories = [
  {name:'Career',emoji:'💼',color:'from-blue-500/20 to-indigo-500/20'},
  {name:'Health',emoji:'💪',color:'from-green-500/20 to-emerald-500/20'},
  {name:'Love',emoji:'❤️',color:'from-pink-500/20 to-rose-500/20'},
  {name:'Wealth',emoji:'💰',color:'from-yellow-500/20 to-amber-500/20'},
  {name:'Travel',emoji:'✈️',color:'from-cyan-500/20 to-sky-500/20'},
  {name:'Growth',emoji:'🌱',color:'from-purple-500/20 to-violet-500/20'},
];

interface Goal {id:number;category:string;text:string;done:boolean}

export default function VisionBoardTool() {
  const [goals,setGoals]=useState<Goal[]>([]);
  const [cat,setCat]=useState('Career');
  const [text,setText]=useState('');

  useEffect(()=>{try{const s=localStorage.getItem('fb-vision');if(s)setGoals(JSON.parse(s));}catch{};},[]);
  const save=(g:Goal[])=>{setGoals(g);try{localStorage.setItem('fb-vision',JSON.stringify(g));}catch{};};

  const add=()=>{if(!text.trim())return;save([...goals,{id:Date.now(),category:cat,text:text.trim(),done:false}]);setText('');};
  const toggle=(id:number)=>save(goals.map(g=>g.id===id?{...g,done:!g.done}:g));
  const remove=(id:number)=>save(goals.filter(g=>g.id!==id));
  const total=goals.length;const done=goals.filter(g=>g.done).length;

  return (
    <div className="space-y-6">
      {total>0 && (
        <div className="text-center">
          <div className="text-sm text-gray-400">Manifested: {done}/{total}</div>
          <div className="w-full h-2 bg-white/10 rounded-full mt-2"><div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" style={{width:`${total?done/total*100:0}%`}}/></div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {categories.map(c=>(
          <button key={c.name} onClick={()=>setCat(c.name)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${cat===c.name?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>
            {c.emoji} {c.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" value={text} onChange={e=>setText(e.target.value)} placeholder="I will..." onKeyDown={e=>e.key==='Enter'&&add()}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"/>
        <button onClick={add} disabled={!text.trim()} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 rounded-lg font-semibold transition-colors">+ Add</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {categories.map(c=>{
          const catGoals=goals.filter(g=>g.category===c.name);
          if(!catGoals.length) return null;
          return(
            <div key={c.name} className={`p-4 bg-gradient-to-br ${c.color} rounded-xl border border-white/10`}>
              <h3 className="font-bold text-white text-sm mb-2">{c.emoji} {c.name}</h3>
              <div className="space-y-1">
                {catGoals.map(g=>(
                  <div key={g.id} className="flex items-center gap-2">
                    <button onClick={()=>toggle(g.id)} className="text-sm">{g.done?'✅':'⬜'}</button>
                    <span className={`text-sm flex-1 ${g.done?'line-through text-gray-500':'text-gray-200'}`}>{g.text}</span>
                    <button onClick={()=>remove(g.id)} className="text-gray-600 hover:text-red-400 text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {total===0 && <p className="text-center text-gray-500 py-4">Add your first goal to start your vision board! ✨</p>}
    </div>
  );
}
