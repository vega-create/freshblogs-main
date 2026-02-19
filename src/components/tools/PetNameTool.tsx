import { useState } from 'react';

const names: Record<string,Record<string,string[]>> = {
  Dog:{
    Cute:['Biscuit','Mochi','Waffles','Pudding','Noodle','Butterscotch','Pebbles','Cinnamon','Marshmallow','Cupcake'],
    Strong:['Thor','Zeus','Blaze','Titan','Rex','Storm','Atlas','Diesel','Maverick','Hunter'],
    Funny:['Sir Barks-a-Lot','Bark Twain','Chewbarka','Droolius Caesar','Bark Obama','Woofgang','Indiana Bones','Salvador Dogi'],
    Classic:['Max','Bella','Charlie','Luna','Buddy','Daisy','Rocky','Lucy','Duke','Sadie'],
  },
  Cat:{
    Cute:['Muffin','Whiskers','Mittens','Pumpkin','Snickers','Cleo','Boba','Tofu','Peaches','Mango'],
    Strong:['Shadow','Panther','Onyx','Salem','Midnight','Raven','Sphinx','Tempest','Blaze','Phantom'],
    Funny:['Catrick Swayze','Purrlock Holmes','Meowly Cyrus','Clawdia','Furrdinand','Whisker Biscuit','Chairman Meow','Paws'],
    Classic:['Oliver','Simba','Nala','Felix','Cleo','Jasper','Chloe','Oscar','Milo','Willow'],
  },
  Bird:{
    Cute:['Tweety','Kiwi','Peep','Sunny','Mango','Birdie','Chirpy','Pip','Skye','Pebble'],
    Funny:['Feather Locklear','Owl Pacino','Beak-oncé','Hen Solo','Macawly Culkin','Wing Crosby','Robin Hood','Flamingo Starr'],
    Classic:['Rio','Phoenix','Angel','Blue','Ruby','Jade','Pearl','Sunny','Storm','Echo'],
  },
  Hamster:{
    Cute:['Nugget','Biscuit','Squeaky','Button','Peanut','Cookie','Nibbles','Cheddar','Poppy','Waffle'],
    Funny:['Hamtaro','MC Hamster','Hammy Potter','Brad Pitt-a-Pat','Hamlet','Tiny Dancer','Sir Squeaks','Fuzzy Logic'],
    Classic:['Ginger','Hazel','Teddy','Honey','Maple','Sandy','Dusty','Cocoa','Mocha','Toffee'],
  },
};

export default function PetNameTool() {
  const [pet,setPet]=useState('');
  const [vibe,setVibe]=useState('');
  const [results,setResults]=useState<string[]>([]);
  const [fav,setFav]=useState<string[]>([]);

  const generate = () => {
    if(!pet||!vibe) return;
    const pool = names[pet]?.[vibe] || [];
    const shuffled = [...pool].sort(()=>Math.random()-0.5);
    setResults(shuffled.slice(0,5));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">What kind of pet?</label>
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(names).map(p=>(
            <button key={p} onClick={()=>{setPet(p);setResults([]);}}
              className={`p-3 rounded-lg text-center transition-all ${pet===p?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>
              <div className="text-2xl">{p==='Dog'?'🐶':p==='Cat'?'🐱':p==='Bird'?'🐦':'🐹'}</div>
              <div className="text-xs mt-1">{p}</div>
            </button>
          ))}
        </div>
      </div>
      {pet && (
        <div>
          <label className="block text-sm text-gray-400 mb-2">Name vibe:</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(names[pet]||{}).map(v=>(
              <button key={v} onClick={()=>{setVibe(v);setResults([]);}}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${vibe===v?'bg-purple-600':'bg-white/5 hover:bg-white/10'}`}>{v}</button>
            ))}
          </div>
        </div>
      )}
      <button onClick={generate} disabled={!pet||!vibe} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 rounded-lg font-semibold transition-colors">🎲 Generate Names</button>

      {results.length>0 && (
        <div className="grid gap-2">
          {results.map((n,i)=>(
            <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <span className="font-semibold text-white">{n}</span>
              <button onClick={()=>{if(!fav.includes(n))setFav([...fav,n]);}} className="text-sm px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                {fav.includes(n)?'❤️':'🤍'}
              </button>
            </div>
          ))}
          <button onClick={generate} className="text-sm text-center text-purple-400 hover:text-white transition-colors">🔄 More names</button>
        </div>
      )}

      {fav.length>0 && <div className="p-3 bg-white/5 rounded-lg"><p className="text-xs text-gray-500 mb-2">❤️ Favorites</p><p className="text-gray-300 text-sm">{fav.join(', ')}</p></div>}
    </div>
  );
}
