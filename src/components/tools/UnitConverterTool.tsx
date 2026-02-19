import { useState } from 'react';

const conversions: Record<string,Record<string,number>> = {
  'cups→ml':{factor:236.588},
  'cups→fl oz':{factor:8},
  'cups→tbsp':{factor:16},
  'cups→tsp':{factor:48},
  'ml→cups':{factor:1/236.588},
  'ml→fl oz':{factor:1/29.5735},
  'ml→tbsp':{factor:1/14.787},
  'ml→l':{factor:0.001},
  'g→oz':{factor:0.035274},
  'g→lb':{factor:0.00220462},
  'g→kg':{factor:0.001},
  'oz→g':{factor:28.3495},
  'oz→lb':{factor:0.0625},
  'lb→g':{factor:453.592},
  'lb→kg':{factor:0.453592},
  'lb→oz':{factor:16},
  'tbsp→tsp':{factor:3},
  'tbsp→ml':{factor:14.787},
  'tsp→ml':{factor:4.929},
  'tsp→tbsp':{factor:1/3},
  '°F→°C':{factor:-1}, // special
  '°C→°F':{factor:-2}, // special
};

const units = {
  Volume:['cups','ml','fl oz','tbsp','tsp','l'],
  Weight:['g','oz','lb','kg'],
  Temperature:['°F','°C'],
};

export default function UnitConverterTool() {
  const [amount,setAmount]=useState('');
  const [from,setFrom]=useState('cups');
  const [to,setTo]=useState('ml');
  const [result,setResult]=useState('');

  const convert = () => {
    const val = parseFloat(amount);
    if(isNaN(val)) return;

    // Temperature special cases
    if(from==='°F'&&to==='°C') { setResult(((val-32)*5/9).toFixed(1)); return; }
    if(from==='°C'&&to==='°F') { setResult((val*9/5+32).toFixed(1)); return; }
    if(from===to) { setResult(val.toFixed(2)); return; }

    const key = `${from}→${to}`;
    if(conversions[key]) { setResult((val*conversions[key].factor).toFixed(2)); return; }

    // Try indirect conversion through a common unit
    setResult('Conversion not available');
  };

  const allUnits = [...units.Volume,...units.Weight,...units.Temperature];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Amount</label>
          <input type="number" value={amount} onChange={e=>{setAmount(e.target.value);setResult('');}}
            placeholder="1" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-center text-lg focus:outline-none focus:border-purple-500"/>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">From</label>
          <select value={from} onChange={e=>{setFrom(e.target.value);setResult('');}}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-purple-500">
            {Object.entries(units).map(([group,list])=>(
              <optgroup key={group} label={group}>{list.map(u=><option key={u} value={u} className="bg-gray-900">{u}</option>)}</optgroup>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">To</label>
          <select value={to} onChange={e=>{setTo(e.target.value);setResult('');}}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-purple-500">
            {Object.entries(units).map(([group,list])=>(
              <optgroup key={group} label={group}>{list.map(u=><option key={u} value={u} className="bg-gray-900">{u}</option>)}</optgroup>
            ))}
          </select>
        </div>
      </div>
      <button onClick={convert} disabled={!amount} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 rounded-lg font-semibold transition-colors">🔄 Convert</button>

      {result && (
        <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
          <p className="text-gray-400 text-sm">{amount} {from} =</p>
          <p className="text-3xl font-bold text-white mt-1">{result} {to}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
        <div className="p-2 bg-white/5 rounded-lg">1 cup = 236.6 ml</div>
        <div className="p-2 bg-white/5 rounded-lg">1 oz = 28.35 g</div>
        <div className="p-2 bg-white/5 rounded-lg">1 tbsp = 3 tsp</div>
        <div className="p-2 bg-white/5 rounded-lg">350°F = 175°C</div>
      </div>
    </div>
  );
}
