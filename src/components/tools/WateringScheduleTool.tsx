import { useState } from 'react';

const plants: Record<string,{emoji:string;water:string;light:string;freq:number;tips:string}> = {
  'Pothos':{emoji:'🌿',water:'When top inch of soil is dry',light:'Low to bright indirect',freq:7,tips:'Nearly indestructible. Great for beginners. Trim to encourage bushier growth.'},
  'Snake Plant':{emoji:'🌵',water:'When soil is completely dry',light:'Low to bright indirect',freq:14,tips:'Extremely drought-tolerant. Purifies air. Don\'t overwater.'},
  'Monstera':{emoji:'🌱',water:'When top 2 inches are dry',light:'Bright indirect',freq:7,tips:'Loves humidity. Wipe leaves monthly. Provide a moss pole for climbing.'},
  'Fiddle Leaf Fig':{emoji:'🌳',water:'When top inch is dry',light:'Bright indirect',freq:7,tips:'Sensitive to change. Pick a spot and don\'t move it. Rotate monthly.'},
  'Peace Lily':{emoji:'🌸',water:'When leaves start to droop slightly',light:'Low to medium indirect',freq:5,tips:'Tells you when it\'s thirsty by drooping. Wipe leaves for shine.'},
  'Succulents':{emoji:'🪴',water:'When soil is bone dry',light:'Bright direct',freq:14,tips:'Less is more with watering. Need drainage holes. Rotate for even growth.'},
  'Aloe Vera':{emoji:'🌿',water:'When soil is completely dry',light:'Bright indirect to direct',freq:21,tips:'Medicinal gel inside leaves. Let soil dry completely between waterings.'},
  'Spider Plant':{emoji:'🕷️',water:'When top inch is dry',light:'Bright indirect',freq:7,tips:'Produces baby plants you can propagate. Great air purifier.'},
  'Rubber Plant':{emoji:'🌿',water:'When top inch is dry',light:'Medium to bright indirect',freq:7,tips:'Wipe leaves to keep them shiny. Can grow quite tall indoors.'},
  'ZZ Plant':{emoji:'🌿',water:'When completely dry',light:'Low to bright indirect',freq:14,tips:'Thrives on neglect. Toxic if eaten. Grows from rhizomes.'},
  'Orchid':{emoji:'🌺',water:'When roots turn silvery',light:'Bright indirect',freq:7,tips:'Ice cube watering works well. Don\'t let water sit in crown.'},
  'Basil':{emoji:'🌿',water:'Keep soil consistently moist',light:'Bright direct (6+ hours)',freq:2,tips:'Pinch off flowers to extend harvest. Harvest from the top.'},
  'Tomato':{emoji:'🍅',water:'Deep watering when top inch dry',light:'Full sun (8+ hours)',freq:3,tips:'Support with stakes or cages. Remove suckers for bigger fruit.'},
  'Lavender':{emoji:'💜',water:'When soil is dry',light:'Full sun',freq:10,tips:'Prefers lean soil. Don\'t overwater. Prune after flowering.'},
  'Rose':{emoji:'🌹',water:'Deep watering at base',light:'Full sun (6+ hours)',freq:3,tips:'Water at base, not leaves. Prune in late winter. Feed monthly.'},
};

export default function WateringScheduleTool() {
  const [selected,setSelected]=useState<string[]>([]);
  const [search,setSearch]=useState('');

  const filtered = search ? Object.entries(plants).filter(([k])=>k.toLowerCase().includes(search.toLowerCase())) : Object.entries(plants);

  const toggle = (name:string) => {
    setSelected(prev=>prev.includes(name)?prev.filter(n=>n!==name):[...prev,name]);
  };

  const getNextWater = (freq:number) => {
    const next = new Date();
    next.setDate(next.getDate()+freq);
    return next.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
  };

  return (
    <div className="space-y-6">
      <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search plants..."
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"/>
      
      <div className="grid sm:grid-cols-2 gap-2">
        {filtered.map(([name,info])=>(
          <button key={name} onClick={()=>toggle(name)}
            className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all ${selected.includes(name)?'bg-green-500/10 border-green-500/30 ring-1 ring-green-500/30':'bg-white/5 hover:bg-white/10 border-white/10'} border`}>
            <span className="text-2xl">{info.emoji}</span>
            <div>
              <p className="font-semibold text-white text-sm">{name}</p>
              <p className="text-xs text-gray-500">Every {info.freq} days • {info.light}</p>
            </div>
            {selected.includes(name) && <span className="ml-auto text-green-400">✓</span>}
          </button>
        ))}
      </div>

      {selected.length>0 && (
        <div>
          <h3 className="font-bold text-sm text-gray-400 mb-3">🗓️ Your Watering Schedule</h3>
          <div className="space-y-2">
            {selected.sort((a,b)=>plants[a].freq-plants[b].freq).map(name=>{
              const p = plants[name];
              return (
                <div key={name} className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white text-sm">{p.emoji} {name}</span>
                    <span className="text-xs text-green-400">Next: {getNextWater(p.freq)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{p.water} • Every {p.freq} days</p>
                  <p className="text-xs text-gray-600 mt-1">{p.tips}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
