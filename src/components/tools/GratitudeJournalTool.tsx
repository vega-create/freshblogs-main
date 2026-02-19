import { useState, useEffect } from 'react';

const prompts = ['What made you smile today?','Who are you grateful for right now?','What is something beautiful you noticed today?','What ability or skill are you thankful for?','What challenge taught you something valuable?','What simple pleasure brought you joy today?','What part of your home are you grateful for?','Who showed you kindness recently?'];

export default function GratitudeJournalTool() {
  const [entries,setEntries]=useState<{id:number;date:string;items:string[];prompt:string}[]>([]);
  const [items,setItems]=useState(['','','']);
  const [view,setView]=useState<'write'|'list'>('write');
  const todayPrompt = prompts[new Date().getDay() % prompts.length];

  useEffect(()=>{try{const s=localStorage.getItem('fb-gratitude');if(s)setEntries(JSON.parse(s));}catch{};},[]);

  const save = () => {
    const filled = items.filter(i=>i.trim());
    if(!filled.length) return;
    const entry = {id:Date.now(),date:new Date().toISOString().split('T')[0],items:filled,prompt:todayPrompt};
    const updated = [entry,...entries];
    setEntries(updated);
    try{localStorage.setItem('fb-gratitude',JSON.stringify(updated));}catch{}
    setItems(['','','']); setView('list');
  };

  const streak = () => {
    let count = 0;
    const today = new Date();
    for(let i=0;i<entries.length;i++){
      const d = new Date(entries[i].date);
      const diff = Math.floor((today.getTime()-d.getTime())/86400000);
      if(diff===count) count++;
      else break;
    }
    return count;
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={()=>setView('write')} className={`flex-1 py-2 rounded-lg font-semibold text-sm ${view==='write'?'bg-purple-600':'bg-white/10'}`}>✏️ Today</button>
        <button onClick={()=>setView('list')} className={`flex-1 py-2 rounded-lg font-semibold text-sm ${view==='list'?'bg-purple-600':'bg-white/10'}`}>📖 History ({entries.length})</button>
      </div>

      {view==='write' ? (
        <div className="space-y-4">
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 text-center">
            <p className="text-xs text-purple-400 uppercase">Today's Prompt</p>
            <p className="text-white font-medium mt-1">{todayPrompt}</p>
          </div>
          <p className="text-sm text-gray-400">List 3 things you're grateful for today:</p>
          {items.map((item,i)=>(
            <div key={i} className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">{i+1}.</span>
              <input type="text" value={item} onChange={e=>{const n=[...items];n[i]=e.target.value;setItems(n);}}
                placeholder={`Gratitude ${i+1}...`}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"/>
            </div>
          ))}
          <button onClick={save} disabled={!items.some(i=>i.trim())} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 rounded-lg font-semibold transition-colors">🙏 Save Gratitude</button>
          {streak()>0 && <p className="text-center text-sm text-yellow-400">🔥 {streak()} day streak!</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {entries.length===0?<p className="text-center text-gray-500 py-8">Start your gratitude practice today!</p>:
          entries.map(e=>(
            <div key={e.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
              <span className="text-xs text-gray-500">{e.date}</span>
              <ul className="mt-2 space-y-1">{e.items.map((item,i)=><li key={i} className="text-gray-300 text-sm">🙏 {item}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
