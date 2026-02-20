import { useState, useEffect } from 'react';

interface Quote { id: number; text: string; author: string; category: string }

const topCategories = ['life','love','motivation','wisdom','happiness','success','courage','growth','friendship','gratitude','creativity','leadership'];

export default function QuoteSearchTool() {
  const [allQuotes,setAllQuotes]=useState<Quote[]>([]);
  const [loading,setLoading]=useState(true);
  const [query,setQuery]=useState('');
  const [tag,setTag]=useState('');
  const [results,setResults]=useState<Quote[]>([]);
  const [searched,setSearched]=useState(false);
  const [page,setPage]=useState(0);
  const PER_PAGE=20;

  useEffect(()=>{
    fetch('/data/quotes-database.json')
      .then(r=>r.json())
      .then(d=>{setAllQuotes(d.quotes||[]);setLoading(false);})
      .catch(()=>setLoading(false));
  },[]);

  const search = (q?:string, t?:string) => {
    const searchQ=(q??query).toLowerCase().trim();
    const searchT=t??tag;
    let filtered=allQuotes;
    if(searchQ) filtered=filtered.filter(qt=>qt.text.toLowerCase().includes(searchQ)||qt.author.toLowerCase().includes(searchQ));
    if(searchT) filtered=filtered.filter(qt=>qt.category===searchT);
    setResults(filtered);
    setSearched(true);
    setPage(0);
  };

  const paged=results.slice(0,(page+1)*PER_PAGE);
  const hasMore=paged.length<results.length;

  if(loading) return <div className="text-center py-8 text-gray-400">Loading 10,000+ quotes...</div>;

  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-gray-500">{allQuotes.length.toLocaleString()} quotes available</p>
      <div className="flex gap-2">
        <input type="text" value={query} onChange={e=>{setQuery(e.target.value);setSearched(false);}}
          placeholder="Search by keyword or author..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          onKeyDown={e=>e.key==='Enter'&&search()} />
        <button onClick={()=>search()} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors">🔍</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {topCategories.map(t=>(
          <button key={t} onClick={()=>{const next=tag===t?'':t;setTag(next);search(undefined,next);}}
            className={`px-3 py-1.5 rounded-full text-xs transition-all capitalize ${tag===t?'bg-purple-600 text-white':'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{t}</button>
        ))}
      </div>
      {searched && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{results.length.toLocaleString()} quote{results.length!==1?'s':''} found</p>
          {paged.map((q)=>(
            <div key={q.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-gray-200 italic">&ldquo;{q.text}&rdquo;</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-purple-400">&mdash; {q.author}</span>
                <div className="flex gap-2 items-center">
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-500 capitalize">{q.category}</span>
                  <button onClick={()=>navigator.clipboard?.writeText(`"${q.text}" — ${q.author}`)} className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors">📋</button>
                </div>
              </div>
            </div>
          ))}
          {hasMore && <button onClick={()=>setPage(p=>p+1)} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-400 transition-colors">Show more ({results.length-paged.length} remaining)</button>}
          {results.length===0 && <p className="text-center text-gray-500 py-4">No quotes found. Try a different search.</p>}
        </div>
      )}
    </div>
  );
}
