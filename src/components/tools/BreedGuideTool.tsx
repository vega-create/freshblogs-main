import { useState, useEffect } from 'react';

interface Breed { id:number;name:string;species:string;origin:string;size:string;energy:string;grooming:string;good_with_kids:number;good_with_dogs:number;good_with_cats:number;lifespan_years:string;weight_lbs:string;temperament:string[];description:string;care_notes:string;zodiac_match:string[];personality_match:string }

const speciesEmojis:Record<string,string>={dog:'🐶',cat:'🐱',bird:'🐦',fish:'🐟',rabbit:'🐰',hamster:'🐹',reptile:'🦎',turtle:'🐢',horse:'🐴',guinea_pig:'🐹',ferret:'🦊',hedgehog:'🦔',gerbil:'🐭',mouse:'🐭',rat:'🐭',chinchilla:'🐭',amphibian:'🐸',marsupial:'🦘'};

export default function BreedGuideTool() {
  const [allBreeds,setAllBreeds]=useState<Breed[]>([]);
  const [loading,setLoading]=useState(true);
  const [species,setSpecies]=useState('dog');
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState<Breed|null>(null);

  useEffect(()=>{
    fetch('/data/pet-breeds.json')
      .then(r=>r.json())
      .then(d=>{setAllBreeds(d.breeds||[]);setLoading(false);})
      .catch(()=>setLoading(false));
  },[]);

  const speciesList=[...new Set(allBreeds.map(b=>b.species))].sort();
  const filtered=allBreeds
    .filter(b=>b.species===species)
    .filter(b=>!query||b.name.toLowerCase().includes(query.toLowerCase())||b.temperament.some(t=>t.includes(query.toLowerCase())));

  const stars=(n:number)=>'★'.repeat(n)+'☆'.repeat(5-n);

  if(loading) return <div className="text-center py-8 text-gray-400">Loading 200+ breeds...</div>;

  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-gray-500">{allBreeds.length} breeds across {speciesList.length} species</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {speciesList.slice(0,8).map(s=>(
          <button key={s} onClick={()=>{setSpecies(s);setSelected(null);setQuery('');}}
            className={`px-3 py-2 rounded-lg text-xs capitalize ${species===s?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>
            {speciesEmojis[s]||'🐾'} {s}
          </button>
        ))}
      </div>
      <input type="text" value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${species} breeds...`}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"/>

      <div className="grid sm:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
        {filtered.map(b=>(
          <button key={b.id} onClick={()=>setSelected(b)}
            className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all border ${selected?.id===b.id?'bg-purple-500/10 border-purple-500/30':'bg-white/5 hover:bg-white/10 border-white/10'}`}>
            <span className="text-xl">{speciesEmojis[b.species]||'🐾'}</span>
            <div><p className="font-semibold text-white text-sm">{b.name}</p><p className="text-[10px] text-gray-500 capitalize">{b.size} • {b.energy} energy • {b.origin}</p></div>
          </button>
        ))}
        {filtered.length===0 && <p className="text-gray-500 text-sm col-span-2 text-center py-4">No breeds found</p>}
      </div>

      {selected && (
        <div className="p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20">
          <div className="flex justify-between items-start">
            <div><h2 className="text-xl font-bold text-white">{speciesEmojis[selected.species]} {selected.name}</h2>
              <p className="text-xs text-gray-500 capitalize">{selected.origin} • {selected.weight_lbs} lbs</p></div>
            <button onClick={()=>setSelected(null)} className="text-gray-600 hover:text-white">✕</button>
          </div>
          <p className="text-gray-300 text-sm mt-3">{selected.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">{selected.temperament.map(t=><span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-gray-400 capitalize">{t}</span>)}</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            <div className="p-2 bg-white/5 rounded-lg"><p className="text-[10px] text-gray-500">Size</p><p className="text-sm text-white capitalize">{selected.size}</p></div>
            <div className="p-2 bg-white/5 rounded-lg"><p className="text-[10px] text-gray-500">Energy</p><p className="text-sm text-white capitalize">{selected.energy}</p></div>
            <div className="p-2 bg-white/5 rounded-lg"><p className="text-[10px] text-gray-500">Grooming</p><p className="text-sm text-white capitalize">{selected.grooming}</p></div>
            <div className="p-2 bg-white/5 rounded-lg"><p className="text-[10px] text-gray-500">Lifespan</p><p className="text-sm text-white">{selected.lifespan_years} yrs</p></div>
            <div className="p-2 bg-white/5 rounded-lg"><p className="text-[10px] text-gray-500">Kids</p><p className="text-sm text-yellow-400">{stars(selected.good_with_kids)}</p></div>
            <div className="p-2 bg-white/5 rounded-lg"><p className="text-[10px] text-gray-500">Other pets</p><p className="text-sm text-yellow-400">{stars(selected.good_with_cats)}</p></div>
          </div>
          <div className="mt-3 p-3 bg-white/5 rounded-lg"><p className="text-[10px] text-green-400 uppercase font-bold">🐾 Care Notes</p><p className="text-sm text-gray-300 mt-1">{selected.care_notes}</p></div>
          {selected.zodiac_match?.length>0 && <p className="text-xs text-gray-500 mt-2">♈ Best zodiac match: {selected.zodiac_match.join(', ')}</p>}
        </div>
      )}
    </div>
  );
}
