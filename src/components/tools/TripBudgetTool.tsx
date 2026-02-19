import { useState } from 'react';

const destinations: Record<string,{daily:{budget:number;mid:number;luxury:number};currency:string;tips:string}> = {
  'Southeast Asia':{daily:{budget:30,mid:75,luxury:200},currency:'USD',tips:'Street food averages $1-3. Hostels $5-15/night. Negotiate tuk-tuk prices.'},
  'Western Europe':{daily:{budget:80,mid:150,luxury:400},currency:'USD',tips:'Museum passes save money. Eat lunch as main meal. Free walking tours in most cities.'},
  'Eastern Europe':{daily:{budget:40,mid:80,luxury:200},currency:'USD',tips:'Great value for food and accommodation. Prague, Budapest, and Krakow are budget-friendly.'},
  'Japan':{daily:{budget:60,mid:120,luxury:350},currency:'USD',tips:'Get a JR Pass for trains. Convenience store meals are excellent. Capsule hotels from $25.'},
  'USA':{daily:{budget:70,mid:150,luxury:400},currency:'USD',tips:'Road trips save on flights. Happy hour deals for food. National parks pass is $80/year.'},
  'Central America':{daily:{budget:35,mid:70,luxury:180},currency:'USD',tips:'Comedores (local eateries) are cheapest. Chicken buses for budget transport.'},
  'Australia':{daily:{budget:80,mid:160,luxury:400},currency:'USD',tips:'Cook your own meals. Greyhound bus passes available. Free BBQs in parks.'},
  'South America':{daily:{budget:30,mid:70,luxury:200},currency:'USD',tips:'Overnight buses save on hotels. Fixed-price lunch menus (almuerzo) are cheap.'},
};

export default function TripBudgetTool() {
  const [dest,setDest]=useState('');
  const [days,setDays]=useState('7');
  const [travelers,setTravelers]=useState('1');
  const [style,setStyle]=useState<'budget'|'mid'|'luxury'>('mid');

  const info = dest?destinations[dest]:null;
  const d=parseInt(days)||1, t=parseInt(travelers)||1;
  const daily = info?info.daily[style]:0;
  const total = daily*d*t;
  const flights = style==='budget'?400:style==='mid'?800:2000;
  const grandTotal = total + flights*t;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Destination:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.keys(destinations).map(d=>(
            <button key={d} onClick={()=>setDest(d)}
              className={`p-2 rounded-lg text-xs text-center transition-all ${dest===d?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>{d}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="block text-xs text-gray-400 mb-1">Days</label>
          <input type="number" value={days} onChange={e=>setDays(e.target.value)} min={1}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-purple-500"/></div>
        <div><label className="block text-xs text-gray-400 mb-1">Travelers</label>
          <input type="number" value={travelers} onChange={e=>setTravelers(e.target.value)} min={1}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-purple-500"/></div>
        <div><label className="block text-xs text-gray-400 mb-1">Style</label>
          <select value={style} onChange={e=>setStyle(e.target.value as any)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
            <option value="budget" className="bg-gray-900">💰 Budget</option>
            <option value="mid" className="bg-gray-900">🏨 Mid-Range</option>
            <option value="luxury" className="bg-gray-900">✨ Luxury</option>
          </select></div>
      </div>

      {info && (
        <div className="space-y-3">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 bg-white/5 rounded-xl text-center"><p className="text-xs text-gray-500">Daily / Person</p><p className="text-2xl font-bold text-white">${daily}</p></div>
            <div className="p-4 bg-white/5 rounded-xl text-center"><p className="text-xs text-gray-500">On-ground Total</p><p className="text-2xl font-bold text-white">${total.toLocaleString()}</p></div>
            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-center"><p className="text-xs text-purple-400">Est. Grand Total</p><p className="text-2xl font-bold text-white">${grandTotal.toLocaleString()}</p><p className="text-xs text-gray-500">incl. est. flights</p></div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-green-400 uppercase font-bold mb-1">💡 Tips</p><p className="text-gray-300 text-sm">{info.tips}</p></div>
        </div>
      )}
    </div>
  );
}
