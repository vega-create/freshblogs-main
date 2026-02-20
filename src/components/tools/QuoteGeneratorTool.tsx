import { useState, useEffect } from 'react';

interface Quote { id: number; text: string; author: string; category: string }

const categoryEmojis: Record<string,string> = {motivation:'🔥',love:'❤️',wisdom:'🦉',happiness:'😊',courage:'🦁',success:'🏆',life:'🌿',growth:'🌱',friendship:'🤝',gratitude:'🙏',creativity:'🎨',faith:'✨'};

export default function QuoteGeneratorTool() {
  const [allQuotes,setAllQuotes]=useState<Quote[]>([]);
  const [loading,setLoading]=useState(true);
  const [category,setCategory]=useState('');
  const [current,setCurrent]=useState<Quote|null>(null);
  const [favorites,setFavorites]=useState<Quote[]>([]);
  const [showFavs,setShowFavs]=useState(false);

  useEffect(()=>{
    fetch('/data/quotes-database.json')
      .then(r=>r.json())
      .then(d=>{
        const q=d.quotes||[];
        setAllQuotes(q);
        // Daily quote seeded by date
        const seed=new Date().toDateString();
        let hash=0;for(let i=0;i<seed.length;i++)hash=((hash<<5)-hash)+seed.charCodeAt(i);
        setCurrent(q[Math.abs(hash)%q.length]);
        setLoading(false);
      })
      .catch(()=>setLoading(false));
  },[]);

  const random = () => {
    const pool=category?allQuotes.filter(q=>q.category===category):allQuotes;
    if(pool.length)setCurrent(pool[Math.floor(Math.random()*pool.length)]);
  };

  const toggleFav = (q:Quote) => {
    setFavorites(prev=>prev.find(f=>f.id===q.id)?prev.filter(f=>f.id!==q.id):[...prev,q]);
  };

  const isFav=(q:Quote)=>favorites.some(f=>f.id===q.id);

  if(loading) return <div className="text-center py-8 text-gray-400">Loading quotes...</div>;

  const cats=Object.keys(categoryEmojis);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={()=>{setCategory('');}} className={`px-3 py-1.5 rounded-full text-xs ${!category?'bg-purple-600':'bg-white/5 hover:bg-white/10'}`}>All</button>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs capitalize ${category===c?'bg-purple-600':'bg-white/5 hover:bg-white/10'}`}>{categoryEmojis[c]} {c}</button>
        ))}
      </div>

      {current && (
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 text-center">
          <p className="text-lg text-gray-100 italic leading-relaxed">&ldquo;{current.text}&rdquo;</p>
          <p className="text-purple-400 mt-3">&mdash; {current.author}</p>
          <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-gray-500 capitalize">{current.category}</span>
          <div className="flex justify-center gap-3 mt-4">
            <button onClick={()=>toggleFav(current)} className={`px-3 py-1.5 rounded-lg text-sm ${isFav(current)?'bg-pink-600':'bg-white/10 hover:bg-white/20'}`}>
              {isFav(current)?'❤️ Saved':'🤍 Save'}
            </button>
            <button onClick={()=>navigator.clipboard?.writeText(`"${current.text}" — ${current.author}`)} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm">📋 Copy</button>
          </div>
        </div>
      )}

      <button onClick={random} className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors">✨ New Quote</button>

      {favorites.length>0 && (
        <div>
          <button onClick={()=>setShowFavs(!showFavs)} className="text-sm text-gray-400 hover:text-white">❤️ {favorites.length} saved {showFavs?'▲':'▼'}</button>
          {showFavs && <div className="mt-2 space-y-2">{favorites.map(q=>(
            <div key={q.id} className="p-3 bg-white/5 rounded-lg flex justify-between items-start">
              <div><p className="text-sm text-gray-300 italic">&ldquo;{q.text}&rdquo;</p><p className="text-xs text-purple-400 mt-1">&mdash; {q.author}</p></div>
              <button onClick={()=>toggleFav(q)} className="text-xs text-red-400 ml-2">✕</button>
            </div>
          ))}</div>}
        </div>
      )}
    </div>
  );
}
