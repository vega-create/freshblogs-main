import { useState } from 'react';

export default function PaintCalculatorTool() {
  const [unit,setUnit]=useState<'ft'|'m'>('ft');
  const [length,setLength]=useState('');
  const [width,setWidth]=useState('');
  const [height,setHeight]=useState(unit==='ft'?'8':'2.4');
  const [doors,setDoors]=useState('1');
  const [windows,setWindows]=useState('2');
  const [coats,setCoats]=useState('2');
  const [result,setResult]=useState<{area:number;gallons:number;liters:number;cost:string}|null>(null);

  const calc = () => {
    const l=parseFloat(length),w=parseFloat(width),h=parseFloat(height);
    const d=parseInt(doors)||0,win=parseInt(windows)||0,c=parseInt(coats)||2;
    if(isNaN(l)||isNaN(w)||isNaN(h)) return;
    
    const perimeter = 2*(l+w);
    let wallArea = perimeter*h;
    
    // Subtract openings (avg door 21sqft/1.95m², avg window 15sqft/1.4m²)
    const doorArea = unit==='ft'?21:1.95;
    const windowArea = unit==='ft'?15:1.4;
    wallArea -= (d*doorArea + win*windowArea);
    wallArea = Math.max(wallArea,0);
    
    const totalArea = wallArea*c;
    // 1 gallon covers ~400 sqft, 1 liter covers ~10 m²
    const gallons = unit==='ft'? totalArea/400 : (totalArea*10.764)/400;
    const liters = gallons*3.785;
    const cost = `$${(Math.ceil(gallons)*35).toFixed(0)} – $${(Math.ceil(gallons)*55).toFixed(0)}`;
    
    setResult({area:Math.round(wallArea),gallons:Math.ceil(gallons*10)/10,liters:Math.ceil(liters*10)/10,cost});
  };

  const u = unit==='ft'?'ft':'m';

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        <button onClick={()=>setUnit('ft')} className={`px-4 py-2 rounded-lg text-sm ${unit==='ft'?'bg-purple-600':'bg-white/10'}`}>Feet</button>
        <button onClick={()=>setUnit('m')} className={`px-4 py-2 rounded-lg text-sm ${unit==='m'?'bg-purple-600':'bg-white/10'}`}>Meters</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs text-gray-400 mb-1">Room Length ({u})</label>
          <input type="number" value={length} onChange={e=>setLength(e.target.value)} placeholder={unit==='ft'?'12':'3.6'} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"/></div>
        <div><label className="block text-xs text-gray-400 mb-1">Room Width ({u})</label>
          <input type="number" value={width} onChange={e=>setWidth(e.target.value)} placeholder={unit==='ft'?'10':'3'} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"/></div>
        <div><label className="block text-xs text-gray-400 mb-1">Ceiling Height ({u})</label>
          <input type="number" value={height} onChange={e=>setHeight(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"/></div>
        <div><label className="block text-xs text-gray-400 mb-1">Coats</label>
          <select value={coats} onChange={e=>setCoats(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
            <option value="1" className="bg-gray-900">1</option><option value="2" className="bg-gray-900">2</option><option value="3" className="bg-gray-900">3</option>
          </select></div>
        <div><label className="block text-xs text-gray-400 mb-1">Doors</label>
          <input type="number" value={doors} onChange={e=>setDoors(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"/></div>
        <div><label className="block text-xs text-gray-400 mb-1">Windows</label>
          <input type="number" value={windows} onChange={e=>setWindows(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"/></div>
      </div>
      <button onClick={calc} disabled={!length||!width} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 rounded-lg font-semibold transition-colors">🎨 Calculate Paint Needed</button>

      {result && (
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <p className="text-xs text-gray-500">Wall Area</p>
            <p className="text-2xl font-bold text-white">{result.area} {u}²</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <p className="text-xs text-gray-500">Paint Needed</p>
            <p className="text-2xl font-bold text-white">{result.gallons} gal / {result.liters} L</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center sm:col-span-2">
            <p className="text-xs text-gray-500">Estimated Cost</p>
            <p className="text-xl font-bold text-green-400">{result.cost}</p>
            <p className="text-xs text-gray-600 mt-1">Based on $35–$55 per gallon average</p>
          </div>
        </div>
      )}
    </div>
  );
}
