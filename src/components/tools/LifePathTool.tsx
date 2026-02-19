import { useState } from 'react';

const meanings: Record<number,{title:string;traits:string;career:string;challenge:string}> = {
  1:{title:'The Leader',traits:'Independent, ambitious, pioneering, confident, innovative',career:'Entrepreneur, CEO, inventor, freelancer',challenge:'Learning to collaborate and accept help from others'},
  2:{title:'The Peacemaker',traits:'Diplomatic, sensitive, cooperative, intuitive, patient',career:'Counselor, mediator, teacher, nurse',challenge:'Standing up for yourself and setting boundaries'},
  3:{title:'The Creative',traits:'Expressive, artistic, social, optimistic, inspiring',career:'Artist, writer, entertainer, marketing',challenge:'Focusing energy and avoiding scattered efforts'},
  4:{title:'The Builder',traits:'Practical, organized, disciplined, loyal, hardworking',career:'Engineer, architect, manager, accountant',challenge:'Embracing flexibility and spontaneity'},
  5:{title:'The Adventurer',traits:'Freedom-loving, versatile, curious, energetic, adaptable',career:'Travel writer, sales, entrepreneur, journalist',challenge:'Committing to long-term goals and relationships'},
  6:{title:'The Nurturer',traits:'Responsible, caring, harmonious, protective, family-oriented',career:'Healthcare, teaching, interior design, social work',challenge:'Avoiding over-giving and people-pleasing'},
  7:{title:'The Seeker',traits:'Analytical, spiritual, introspective, wise, perfectionist',career:'Researcher, analyst, philosopher, programmer',challenge:'Opening up emotionally and trusting others'},
  8:{title:'The Powerhouse',traits:'Ambitious, authoritative, strategic, material-focused, driven',career:'Finance, business owner, executive, real estate',challenge:'Balancing material success with personal fulfillment'},
  9:{title:'The Humanitarian',traits:'Compassionate, idealistic, generous, wise, worldly',career:'Nonprofit, counselor, artist, international work',challenge:'Letting go of the past and personal attachments'},
  11:{title:'The Intuitive (Master)',traits:'Visionary, inspirational, sensitive, spiritual, charismatic',career:'Spiritual leader, healer, artist, inventor',challenge:'Managing extreme sensitivity and self-doubt'},
  22:{title:'The Master Builder',traits:'Visionary, practical, powerful, disciplined, transformative',career:'Architect, leader, philanthropist, engineer',challenge:'Living up to immense potential without burning out'},
  33:{title:'The Master Teacher',traits:'Compassionate, selfless, wise, healing, uplifting',career:'Healer, teacher, spiritual guide, counselor',challenge:'Balancing service to others with self-care'},
};

function calcLifePath(m:number,d:number,y:number):[number,string] {
  const reduce = (n:number):number => {
    while(n>9 && n!==11 && n!==22 && n!==33) n = String(n).split('').reduce((a,b)=>a+Number(b),0);
    return n;
  };
  const rm = reduce(m), rd = reduce(d), ry = reduce(y);
  const total = rm + rd + ry;
  const result = reduce(total);
  const steps = `Month ${m} → ${rm} | Day ${d} → ${rd} | Year ${y} → ${ry} | Total ${rm}+${rd}+${ry}=${total} → ${result}`;
  return [result, steps];
}

export default function LifePathTool() {
  const [month,setMonth]=useState(0);
  const [day,setDay]=useState(0);
  const [year,setYear]=useState(0);
  const [result,setResult]=useState<{num:number;steps:string}|null>(null);
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];

  const calc = () => {
    if(month&&day&&year){ const [n,s]=calcLifePath(month,day,year); setResult({num:n,steps:s}); }
  };
  const info = result ? meanings[result.num] || meanings[result.num > 9 ? 9 : result.num] : null;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-3">
        <select value={month} onChange={e=>{setMonth(Number(e.target.value));setResult(null);}} className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
          <option value={0}>Month</option>
          {months.map((m,i)=><option key={i} value={i+1} className="bg-gray-900">{m}</option>)}
        </select>
        <select value={day} onChange={e=>{setDay(Number(e.target.value));setResult(null);}} className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
          <option value={0}>Day</option>
          {Array.from({length:31},(_,i)=><option key={i} value={i+1} className="bg-gray-900">{i+1}</option>)}
        </select>
        <select value={year} onChange={e=>{setYear(Number(e.target.value));setResult(null);}} className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
          <option value={0}>Year</option>
          {Array.from({length:80},(_,i)=><option key={i} value={2006-i} className="bg-gray-900">{2006-i}</option>)}
        </select>
      </div>
      <button onClick={calc} disabled={!month||!day||!year} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">🔢 Calculate Life Path Number</button>

      {result && info && (
        <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
          <div className="text-center mb-4">
            <div className="text-6xl font-bold text-white">{result.num}</div>
            <h2 className="text-xl font-bold text-purple-400 mt-1">{info.title}</h2>
            <p className="text-xs text-gray-500 mt-2">{result.steps}</p>
          </div>
          <div className="grid gap-3 mt-4">
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-gray-500 uppercase">Key Traits</p><p className="text-gray-200 text-sm mt-1">{info.traits}</p></div>
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-gray-500 uppercase">Ideal Careers</p><p className="text-gray-200 text-sm mt-1">{info.career}</p></div>
            <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-gray-500 uppercase">Life Challenge</p><p className="text-gray-200 text-sm mt-1">{info.challenge}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
