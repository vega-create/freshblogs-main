import { useState, useEffect } from 'react';

interface Symbol { id: number; symbol: string; category: string; meaning: string; emotion: string; action: string; zodiac: string[] }

const categoryEmojis: Record<string,string> = {animals:'🐾',actions:'🏃',colors:'🎨',nature:'🌿',objects:'📦',people:'👥',places:'🏠',symbols:'✨',transitions:'🔄'};

export default function DreamDictionaryTool() {
  const [allSymbols,setAllSymbols]=useState<Symbol[]>([]);
  const [loading,setLoading]=useState(true);
  const [query,setQuery]=useState('');
  const [cat,setCat]=useState('');
  const [results,setResults]=useState<Symbol[]>([]);
  const [searched,setSearched]=useState(false);
  const [page,setPage]=useState(0);
  const PER=15;

  useEffect(()=>{
    fetch('/data/dream-symbols.json')
      .then(r=>r.json())
      .then(d=>{setAllSymbols(d.symbols||[]);setLoading(false);})
      .catch(()=>setLoading(false));
  },[]);

  const search = (q?:string,c?:string) => {
    const sq=(q??query).toLowerCase().trim();
    const sc=c??cat;
    let f=allSymbols;
    if(sq) f=f.filter(s=>s.symbol.toLowerCase().includes(sq)||s.meaning.toLowerCase().includes(sq));
    if(sc) f=f.filter(s=>s.category===sc);
    setResults(f);setSearched(true);setPage(0);
  };

  const paged=results.slice(0,(page+1)*PER);
  const hasMore=paged.length<results.length;
  const emotionEmoji:Record<string,string>={reassured:'😊',curious:'🤔',anxious:'😰',hopeful:'🌟',empowered:'💪',reflective:'🪞',peaceful:'☮️',alert:'⚠️',inspired:'✨',nostalgic:'🥹',determined:'🎯',vulnerable:'💔',liberated:'🕊️',conflicted:'😣',grateful:'🙏'};

  if(loading) return <div className="text-center py-8 text-gray-400">Loading 5,000+ dream symbols...</div>;

  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-gray-500">{allSymbols.length.toLocaleString()} symbols available</p>
      <div className="flex gap-2">
        <input type="text" value={query} onChange={e=>{setQuery(e.target.value);setSearched(false);}}
          placeholder="Search: snake, water, flying, house..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          onKeyDown={e=>e.key==='Enter'&&search()} />
        <button onClick={()=>search()} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors">🔍</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(categoryEmojis).map(([c,e])=>(
          <button key={c} onClick={()=>{const next=cat===c?'':c;setCat(next);search(undefined,next);}}
            className={`px-3 py-1.5 rounded-full text-xs capitalize ${cat===c?'bg-indigo-600 text-white':'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{e} {c}</button>
        ))}
      </div>
      {searched && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{results.length.toLocaleString()} symbol{results.length!==1?'s':''} found</p>
          {paged.map(s=>(
            <div key={s.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white">{categoryEmojis[s.category]||'🌙'} {s.symbol}</h3>
                <span className="text-xs text-gray-600 capitalize">{s.category}</span>
              </div>
              <p className="text-gray-300 text-sm mt-2">{s.meaning}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full">{emotionEmoji[s.emotion]||'💭'} {s.emotion}</span>
                <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full">🎯 {s.action}</span>
              </div>
              {s.zodiac?.length>0 && <p className="text-[10px] text-gray-600 mt-2">Related signs: {s.zodiac.join(', ')}</p>}
            </div>
          ))}
          {hasMore && <button onClick={()=>setPage(p=>p+1)} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-400">Show more ({results.length-paged.length} remaining)</button>}
          {results.length===0 && <p className="text-center text-gray-500 py-4">No symbols found. Try a different search.</p>}
        </div>
      )}
    </div>
  );
}
