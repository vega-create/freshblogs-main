import { useState } from 'react';

const pythagorean: Record<string,number> = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8};

const meanings: Record<number,{title:string;desc:string}> = {
  1:{title:'The Individualist',desc:'You project leadership, independence, and originality. Others see you as a pioneer.'},
  2:{title:'The Diplomat',desc:'You radiate cooperation, sensitivity, and harmony. People feel comfortable around you.'},
  3:{title:'The Communicator',desc:'You express creativity, joy, and social charm. You light up conversations.'},
  4:{title:'The Organizer',desc:'You project stability, hard work, and reliability. People trust your consistency.'},
  5:{title:'The Freedom Seeker',desc:'You radiate adventure, change, and versatility. You inspire others to explore.'},
  6:{title:'The Caretaker',desc:'You express love, responsibility, and harmony. Family and community are central to you.'},
  7:{title:'The Philosopher',desc:'You project wisdom, analysis, and spirituality. Others see depth in you.'},
  8:{title:'The Achiever',desc:'You radiate power, ambition, and material success. People see authority in you.'},
  9:{title:'The Visionary',desc:'You express compassion, idealism, and global consciousness. You inspire humanitarianism.'},
  11:{title:'Master Intuitive',desc:'You project spiritual insight and inspiration. You are a natural lightworker.'},
  22:{title:'Master Builder',desc:'You radiate practical vision and large-scale ambition. You can turn dreams into reality.'},
};

function reduce(n:number):number {
  while(n>9&&n!==11&&n!==22&&n!==33) n=String(n).split('').reduce((a,b)=>a+Number(b),0);
  return n;
}

export default function NameNumberTool() {
  const [name,setName]=useState('');
  const [result,setResult]=useState<{num:number;breakdown:string}|null>(null);

  const calc = () => {
    const clean = name.toLowerCase().replace(/[^a-z]/g,'');
    if(!clean) return;
    const values = clean.split('').map(c=>pythagorean[c]||0);
    const total = values.reduce((a,b)=>a+b,0);
    const num = reduce(total);
    const breakdown = clean.split('').map(c=>`${c.toUpperCase()}=${pythagorean[c]}`).join(' + ');
    setResult({num, breakdown: `${breakdown} = ${total} → ${num}`});
  };

  const info = result ? meanings[result.num] || meanings[9] : null;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Enter your full name:</label>
        <input type="text" value={name} onChange={e=>{setName(e.target.value);setResult(null);}}
          placeholder="e.g. John Smith"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          onKeyDown={e=>e.key==='Enter'&&calc()} />
      </div>
      <button onClick={calc} disabled={!name.trim()} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">✨ Calculate Name Number</button>
      {result && info && (
        <div className="p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30 text-center">
          <div className="text-6xl font-bold text-white">{result.num}</div>
          <h2 className="text-xl font-bold text-amber-400 mt-1">{info.title}</h2>
          <p className="text-gray-300 mt-3 max-w-md mx-auto">{info.desc}</p>
          <p className="text-xs text-gray-500 mt-4 break-all">{result.breakdown}</p>
        </div>
      )}
    </div>
  );
}
