import { useState, useEffect } from 'react';

interface Entry { id:number; date:string; dream:string; mood:string; symbols:string; }

const moods = [{e:'😴',l:'Peaceful'},{e:'😨',l:'Scary'},{e:'🤩',l:'Exciting'},{e:'😢',l:'Sad'},{e:'🤔',l:'Confusing'},{e:'😊',l:'Happy'},{e:'😡',l:'Angry'},{e:'🌀',l:'Surreal'}];

export default function DreamJournalTool() {
  const [entries,setEntries]=useState<Entry[]>([]);
  const [dream,setDream]=useState('');
  const [mood,setMood]=useState('');
  const [symbols,setSymbols]=useState('');
  const [view,setView]=useState<'write'|'list'>('write');

  useEffect(()=>{
    try{ const s=localStorage.getItem('freshblogs-dream-journal'); if(s) setEntries(JSON.parse(s)); }catch{}
  },[]);

  const save = () => {
    if(!dream.trim()) return;
    const entry:Entry = {id:Date.now(),date:new Date().toISOString().split('T')[0],dream:dream.trim(),mood,symbols:symbols.trim()};
    const updated = [entry,...entries];
    setEntries(updated);
    try{localStorage.setItem('freshblogs-dream-journal',JSON.stringify(updated));}catch{}
    setDream(''); setMood(''); setSymbols(''); setView('list');
  };

  const remove = (id:number) => {
    const updated = entries.filter(e=>e.id!==id);
    setEntries(updated);
    try{localStorage.setItem('freshblogs-dream-journal',JSON.stringify(updated));}catch{}
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={()=>setView('write')} className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${view==='write'?'bg-purple-600':'bg-white/10 hover:bg-white/20'}`}>✏️ Write</button>
        <button onClick={()=>setView('list')} className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${view==='list'?'bg-purple-600':'bg-white/10 hover:bg-white/20'}`}>📖 Journal ({entries.length})</button>
      </div>

      {view==='write' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">How did the dream feel?</label>
            <div className="flex flex-wrap gap-2">
              {moods.map(m=>(
                <button key={m.l} onClick={()=>setMood(m.l)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${mood===m.l?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>
                  {m.e} {m.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Describe your dream:</label>
            <textarea value={dream} onChange={e=>setDream(e.target.value)} rows={4} placeholder="I was in a forest and..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"/>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Key symbols (comma separated):</label>
            <input type="text" value={symbols} onChange={e=>setSymbols(e.target.value)} placeholder="forest, owl, river"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"/>
          </div>
          <button onClick={save} disabled={!dream.trim()} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">💾 Save Dream</button>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.length===0 ? (
            <p className="text-center text-gray-500 py-8">No dreams recorded yet. Start writing!</p>
          ) : entries.map(e=>(
            <div key={e.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-gray-500">{e.date}</span>
                  {e.mood && <span className="text-xs text-purple-400 ml-2">{e.mood}</span>}
                </div>
                <button onClick={()=>remove(e.id)} className="text-gray-600 hover:text-red-400 text-xs">✕</button>
              </div>
              <p className="text-gray-300 text-sm mt-2">{e.dream}</p>
              {e.symbols && <div className="flex flex-wrap gap-1 mt-2">{e.symbols.split(',').map((s,i)=><span key={i} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400">{s.trim()}</span>)}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
