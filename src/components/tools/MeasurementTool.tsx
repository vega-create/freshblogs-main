import { useState } from 'react';

const categories: Record<string,{units:string[];conversions:Record<string,number>}> = {
  Length:{
    units:['inches','feet','yards','cm','meters'],
    conversions:{inches:1,feet:12,yards:36,cm:0.393701,meters:39.3701},
  },
  Area:{
    units:['sq ft','sq m','sq yards','acres'],
    conversions:{'sq ft':1,'sq m':10.7639,'sq yards':9,'acres':43560},
  },
  Volume:{
    units:['cubic ft','cubic m','cubic yards','gallons','liters'],
    conversions:{'cubic ft':1,'cubic m':35.3147,'cubic yards':27,'gallons':0.133681,'liters':0.0353147},
  },
};

const quickRefs = [
  '1 foot = 12 inches = 30.48 cm',
  '1 yard = 3 feet = 0.914 meters',
  '1 sq meter = 10.76 sq ft',
  '1 acre = 43,560 sq ft',
  '1 cubic yard = 27 cubic ft',
  '1 gallon = 3.785 liters',
];

export default function MeasurementTool() {
  const [cat,setCat]=useState('Length');
  const [amount,setAmount]=useState('');
  const [from,setFrom]=useState('');
  const [results,setResults]=useState<{unit:string;value:string}[]>([]);

  const convert = () => {
    const val=parseFloat(amount);
    if(isNaN(val)) return;
    const c=categories[cat];
    const fromFactor=c.conversions[from];
    if(!fromFactor) return;
    const baseValue=val*fromFactor;
    setResults(c.units.filter(u=>u!==from).map(u=>({unit:u,value:(baseValue/c.conversions[u]).toFixed(4).replace(/\.?0+$/,'')})));
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        {Object.keys(categories).map(c=>(
          <button key={c} onClick={()=>{setCat(c);setFrom(categories[c].units[0]);setResults([]);}}
            className={`px-4 py-2 rounded-lg text-sm ${cat===c?'bg-purple-600':'bg-white/10 hover:bg-white/20'}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs text-gray-400 mb-1">Amount</label>
          <input type="number" value={amount} onChange={e=>{setAmount(e.target.value);setResults([]);}}
            placeholder="Enter value" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-center text-lg focus:outline-none focus:border-purple-500"/></div>
        <div><label className="block text-xs text-gray-400 mb-1">From</label>
          <select value={from||categories[cat].units[0]} onChange={e=>{setFrom(e.target.value);setResults([]);}}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-purple-500">
            {categories[cat].units.map(u=><option key={u} value={u} className="bg-gray-900">{u}</option>)}
          </select></div>
      </div>
      <button onClick={convert} disabled={!amount} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 rounded-lg font-semibold transition-colors">📏 Convert</button>

      {results.length>0 && (
        <div className="grid gap-2">
          {results.map((r,i)=>(
            <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400 text-sm">{r.unit}</span>
              <span className="text-xl font-bold text-white">{r.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="p-3 bg-white/5 rounded-lg">
        <p className="text-xs text-gray-500 font-bold mb-2">📐 Quick Reference</p>
        <div className="grid gap-1">{quickRefs.map((r,i)=><p key={i} className="text-xs text-gray-500">{r}</p>)}</div>
      </div>
    </div>
  );
}
