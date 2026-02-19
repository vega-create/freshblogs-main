import { useState } from 'react';

const lists: Record<string,Record<string,string[]>> = {
  Beach:{
    Essentials:['Passport/ID','Phone & charger','Cash & cards','Travel insurance docs','Sunscreen SPF 50+','Sunglasses'],
    Clothing:['Swimsuits (2-3)','Cover-up/sarong','Flip flops','Sandals','Shorts','Light dresses','Tank tops','Sun hat'],
    Gear:['Beach towel','Waterproof phone pouch','Snorkel gear','Beach bag','Aloe vera gel','Insect repellent'],
    Toiletries:['Reef-safe sunscreen','After-sun lotion','Shampoo & conditioner','Toothbrush & paste','Deodorant'],
  },
  City:{
    Essentials:['Passport/ID','Phone & charger','Portable battery','Cash & cards','City map/app','Travel adapter'],
    Clothing:['Comfortable walking shoes','Smart casual outfit','Layers for weather','Rain jacket','Day bag/backpack'],
    Tech:['Camera','Earbuds','Power bank','Universal adapter'],
    Toiletries:['Travel toiletry kit','Hand sanitizer','Tissues','Medication','Pain reliever'],
  },
  Hiking:{
    Essentials:['Trail map','First aid kit','Water bottle (1L+)','Headlamp','Emergency whistle','Pocket knife'],
    Clothing:['Hiking boots (broken in)','Moisture-wicking socks','Quick-dry pants','Base layer','Rain shell','Warm fleece','Hat & gloves'],
    Gear:['Backpack (30-50L)','Trekking poles','Sleeping bag','Tent/shelter','Water purifier','Fire starter'],
    Food:['Trail mix','Energy bars','Electrolyte tablets','Freeze-dried meals','Camp stove & fuel'],
  },
  Business:{
    Essentials:['Passport/ID','Business cards','Laptop & charger','Phone & charger','Travel adapter','Important documents'],
    Clothing:['Suits/blazers','Dress shirts','Dress shoes','Casual dinner outfit','Iron/steamer','Belt & accessories'],
    Tech:['Laptop bag','USB drives','Presentation clicker','Portable monitor','Noise-canceling headphones'],
    Toiletries:['Grooming kit','Cologne/perfume','Wrinkle-release spray','Stain pen','Medication'],
  },
};

export default function PackingTool() {
  const [trip,setTrip]=useState('');
  const [checked,setChecked]=useState<Set<string>>(new Set());

  const toggle = (item:string) => {
    const n = new Set(checked);
    n.has(item)?n.delete(item):n.add(item);
    setChecked(n);
  };

  const list = trip ? lists[trip] : null;
  const total = list ? Object.values(list).flat().length : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.keys(lists).map(t=>(
          <button key={t} onClick={()=>{setTrip(t);setChecked(new Set());}}
            className={`p-3 rounded-lg text-center transition-all ${trip===t?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>
            <div className="text-2xl">{t==='Beach'?'🏖️':t==='City'?'🏙️':t==='Hiking'?'🥾':'💼'}</div>
            <div className="text-xs mt-1">{t}</div>
          </button>
        ))}
      </div>

      {list && (
        <>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Packed: {checked.size}/{total}</span>
            <div className="w-32 h-2 bg-white/10 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all" style={{width:`${total?checked.size/total*100:0}%`}}/></div>
          </div>
          {Object.entries(list).map(([cat,items])=>(
            <div key={cat}>
              <h3 className="text-sm font-bold text-gray-400 mb-2">{cat}</h3>
              <div className="grid gap-1">
                {items.map(item=>(
                  <button key={item} onClick={()=>toggle(item)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-all ${checked.has(item)?'bg-green-500/10 line-through text-gray-500':'bg-white/5 hover:bg-white/10 text-gray-200'}`}>
                    <span>{checked.has(item)?'✅':'⬜'}</span>{item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
