import { useState, useEffect } from 'react';

interface Symbol { id: number; symbol: string; category: string; meaning: string; emotion: string; action: string; zodiac: string[] }

export default function DreamInterpreterTool() {
  const [allSymbols,setAllSymbols]=useState<Symbol[]>([]);
  const [loading,setLoading]=useState(true);
  const [dream,setDream]=useState('');
  const [matches,setMatches]=useState<Symbol[]>([]);
  const [analyzed,setAnalyzed]=useState(false);

  useEffect(()=>{
    fetch('/data/dream-symbols.json')
      .then(r=>r.json())
      .then(d=>{setAllSymbols(d.symbols||[]);setLoading(false);})
      .catch(()=>setLoading(false));
  },[]);

  const analyze = () => {
    if(!dream.trim()||dream.trim().length<10) return;
    const words=dream.toLowerCase().split(/\s+/);
    const found=allSymbols.filter(s=>{
      const sym=s.symbol.toLowerCase();
      return words.some(w=>w.includes(sym)||sym.includes(w)||(w.length>3&&sym.startsWith(w.slice(0,-1))));
    }).slice(0,8);
    setMatches(found);
    setAnalyzed(true);
  };

  const categoryEmojis:Record<string,string>={animals:'🐾',actions:'🏃',colors:'🎨',nature:'🌿',objects:'📦',people:'👥',places:'🏠',symbols:'✨',transitions:'🔄'};
  const emotionColors:Record<string,string>={anxious:'text-red-400',peaceful:'text-green-400',curious:'text-blue-400',empowered:'text-yellow-400',hopeful:'text-emerald-400'};

  if(loading) return <div className="text-center py-8 text-gray-400">Loading dream database...</div>;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Describe your dream in detail:</label>
        <textarea value={dream} onChange={e=>{setDream(e.target.value);setAnalyzed(false);}} rows={4}
          placeholder="I was walking through a dark forest when I saw a snake near a river..."
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"/>
        <p className="text-xs text-gray-600 mt-1">Analyzing against {allSymbols.length.toLocaleString()} dream symbols</p>
      </div>
      <button onClick={analyze} disabled={dream.trim().length<10}
        className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">🔮 Interpret My Dream</button>

      {analyzed && matches.length>0 && (
        <div className="space-y-4">
          <div className="text-center p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <h2 className="font-bold text-white">Found {matches.length} symbol{matches.length!==1?'s':''} in your dream</h2>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {matches.map(m=><span key={m.id} className="px-2 py-1 bg-white/10 rounded-full text-xs text-purple-300">{categoryEmojis[m.category]||'🌙'} {m.symbol}</span>)}
            </div>
          </div>
          {matches.map(m=>(
            <div key={m.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="font-bold text-white">{categoryEmojis[m.category]||'🌙'} {m.symbol}</h3>
              <p className="text-gray-300 text-sm mt-2">{m.meaning}</p>
              <div className="grid sm:grid-cols-2 gap-2 mt-3">
                <div className="p-2 bg-white/5 rounded-lg"><p className="text-[10px] text-gray-500 uppercase">Emotion</p><p className={`text-sm capitalize ${emotionColors[m.emotion]||'text-gray-300'}`}>{m.emotion}</p></div>
                <div className="p-2 bg-white/5 rounded-lg"><p className="text-[10px] text-gray-500 uppercase">Action Step</p><p className="text-sm text-green-400">{m.action}</p></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {analyzed && matches.length===0 && (
        <div className="text-center p-6 bg-white/5 rounded-xl">
          <p className="text-gray-400">No specific symbols matched. Try adding more detail — mention specific objects, animals, people, or places you saw.</p>
        </div>
      )}
    </div>
  );
}
