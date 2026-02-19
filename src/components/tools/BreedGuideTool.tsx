import { useState } from 'react';

const breeds: Record<string,{name:string;emoji:string;size:string;energy:string;grooming:string;lifespan:string;good_for:string;personality:string}[]> = {
  Dogs:[
    {name:'Golden Retriever',emoji:'🐕',size:'Large',energy:'High',grooming:'Moderate',lifespan:'10-12 yrs',good_for:'Families, active owners',personality:'Friendly, intelligent, devoted. The classic family dog.'},
    {name:'French Bulldog',emoji:'🐶',size:'Small',energy:'Low-Medium',grooming:'Low',lifespan:'10-12 yrs',good_for:'Apartments, first-time owners',personality:'Playful, adaptable, charming. Great city companion.'},
    {name:'Labrador Retriever',emoji:'🐕',size:'Large',energy:'High',grooming:'Low',lifespan:'10-12 yrs',good_for:'Families, active lifestyles',personality:'Outgoing, gentle, active. America\'s most popular breed.'},
    {name:'German Shepherd',emoji:'🐕‍🦺',size:'Large',energy:'High',grooming:'Moderate',lifespan:'9-13 yrs',good_for:'Experienced owners, protection',personality:'Loyal, confident, courageous. Highly trainable.'},
    {name:'Poodle',emoji:'🐩',size:'Varies',energy:'Medium-High',grooming:'High',lifespan:'12-15 yrs',good_for:'Allergy sufferers, training enthusiasts',personality:'Intelligent, elegant, athletic. Hypoallergenic coat.'},
    {name:'Beagle',emoji:'🐶',size:'Small-Medium',energy:'High',grooming:'Low',lifespan:'12-15 yrs',good_for:'Families, scent work',personality:'Curious, merry, friendly. Nose-driven explorer.'},
  ],
  Cats:[
    {name:'Persian',emoji:'🐱',size:'Medium-Large',energy:'Low',grooming:'High',lifespan:'12-17 yrs',good_for:'Quiet homes, lap lovers',personality:'Gentle, calm, affectionate. The ultimate lap cat.'},
    {name:'Maine Coon',emoji:'🐱',size:'Large',energy:'Medium',grooming:'Moderate',lifespan:'12-15 yrs',good_for:'Families, dog lovers',personality:'Gentle giant. Dog-like, playful, sociable.'},
    {name:'Siamese',emoji:'🐱',size:'Medium',energy:'High',grooming:'Low',lifespan:'12-20 yrs',good_for:'Interactive owners',personality:'Vocal, social, intelligent. Demands attention and gives it back.'},
    {name:'British Shorthair',emoji:'🐱',size:'Medium-Large',energy:'Low-Medium',grooming:'Low',lifespan:'12-20 yrs',good_for:'Apartments, busy professionals',personality:'Easygoing, loyal, independent. Low maintenance companion.'},
    {name:'Ragdoll',emoji:'🐱',size:'Large',energy:'Low-Medium',grooming:'Moderate',lifespan:'12-15 yrs',good_for:'Families, cuddlers',personality:'Docile, affectionate, follows you around. Goes limp when held.'},
    {name:'Bengal',emoji:'🐱',size:'Medium-Large',energy:'Very High',grooming:'Low',lifespan:'12-16 yrs',good_for:'Active homes, experienced owners',personality:'Wild-looking, athletic, playful. Mini leopard energy.'},
  ],
};

export default function BreedGuideTool() {
  const [type,setType]=useState<'Dogs'|'Cats'>('Dogs');
  const [selected,setSelected]=useState('');

  const breed = breeds[type].find(b=>b.name===selected);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        <button onClick={()=>{setType('Dogs');setSelected('');}} className={`px-6 py-2 rounded-lg font-semibold ${type==='Dogs'?'bg-purple-600':'bg-white/10 hover:bg-white/20'}`}>🐶 Dogs</button>
        <button onClick={()=>{setType('Cats');setSelected('');}} className={`px-6 py-2 rounded-lg font-semibold ${type==='Cats'?'bg-purple-600':'bg-white/10 hover:bg-white/20'}`}>🐱 Cats</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        {breeds[type].map(b=>(
          <button key={b.name} onClick={()=>setSelected(b.name)}
            className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all border ${selected===b.name?'bg-purple-500/10 border-purple-500/30':'bg-white/5 hover:bg-white/10 border-white/10'}`}>
            <span className="text-2xl">{b.emoji}</span>
            <div><p className="font-semibold text-white text-sm">{b.name}</p><p className="text-xs text-gray-500">{b.size} • {b.energy} energy</p></div>
          </button>
        ))}
      </div>

      {breed && (
        <div className="p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20">
          <h2 className="text-xl font-bold text-white mb-1">{breed.emoji} {breed.name}</h2>
          <p className="text-gray-300 text-sm mb-4">{breed.personality}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[['Size',breed.size],['Energy',breed.energy],['Grooming',breed.grooming],['Lifespan',breed.lifespan],['Best For',breed.good_for]].map(([k,v])=>(
              <div key={k} className="p-2 bg-white/5 rounded-lg"><p className="text-[10px] text-gray-500 uppercase">{k}</p><p className="text-sm text-white">{v}</p></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
