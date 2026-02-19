import { useState } from 'react';

const categories: Record<string,{emoji:string;affirmations:string[]}> = {
  'Self-Love':{emoji:'💕',affirmations:['I am worthy of love exactly as I am.','I choose to treat myself with kindness and compassion.','My imperfections make me beautifully unique.','I deserve the same love I give to others.','I am enough, just as I am right now.','I honor my needs and set healthy boundaries.','Every day I grow more comfortable in my own skin.','I release the need for external validation.']},
  'Abundance':{emoji:'💰',affirmations:['Money flows to me easily and effortlessly.','I am a magnet for prosperity and success.','I deserve financial freedom and abundance.','Opportunities for wealth surround me daily.','I am grateful for the abundance already in my life.','My income constantly increases.','I release all resistance to attracting money.','Wealth is my natural state of being.']},
  'Career':{emoji:'💼',affirmations:['I am confident in my skills and abilities.','Success is my natural outcome.','I attract opportunities that align with my purpose.','My work makes a positive impact on others.','I am worthy of promotion and recognition.','Every challenge at work makes me stronger.','I am building the career of my dreams.','My talents are valued and well-compensated.']},
  'Health':{emoji:'🌿',affirmations:['My body is healthy, strong, and full of energy.','I nourish my body with healthy choices.','Every cell in my body radiates with health.','I listen to my body and honor its needs.','I am grateful for my body and all it does for me.','Healing energy flows through every part of me.','I choose foods that fuel and energize me.','Rest and recovery are essential parts of my wellness.']},
  'Relationships':{emoji:'🤝',affirmations:['I attract loving, supportive relationships.','I communicate openly and honestly with others.','I deserve relationships that bring out my best.','I release toxic connections with love and grace.','My relationships grow stronger every day.','I am surrounded by people who respect and value me.','I give and receive love freely.','Every relationship teaches me something valuable.']},
  'Confidence':{emoji:'⚡',affirmations:['I believe in myself and my abilities.','I am bold, brave, and brilliant.','My confidence grows stronger every single day.','I walk into every room knowing my worth.','I am capable of achieving anything I set my mind to.','Fear does not control me — I control my actions.','I trust myself to handle whatever comes my way.','My voice matters and deserves to be heard.']},
};

export default function AffirmationTool() {
  const [cat,setCat]=useState('');
  const [current,setCurrent]=useState('');
  const [saved,setSaved]=useState<string[]>([]);

  const generate = (c:string) => {
    setCat(c);
    const affs = categories[c].affirmations;
    setCurrent(affs[Math.floor(Math.random()*affs.length)]);
  };

  const next = () => {
    if(!cat) return;
    const affs = categories[cat].affirmations;
    let n = affs[Math.floor(Math.random()*affs.length)];
    while(n===current && affs.length>1) n = affs[Math.floor(Math.random()*affs.length)];
    setCurrent(n);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(categories).map(([k,v])=>(
          <button key={k} onClick={()=>generate(k)}
            className={`p-3 rounded-lg text-center transition-all ${cat===k?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>
            <div className="text-2xl">{v.emoji}</div>
            <div className="text-xs mt-1">{k}</div>
          </button>
        ))}
      </div>

      {current && (
        <div className="p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 text-center">
          <p className="text-xl md:text-2xl font-serif text-white italic leading-relaxed">"{current}"</p>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={next} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">🔄 Next</button>
            <button onClick={()=>{if(!saved.includes(current))setSaved([...saved,current]);}} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
              {saved.includes(current)?'✅ Saved':'💾 Save'}
            </button>
            <button onClick={()=>navigator.clipboard?.writeText(current)} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">📋 Copy</button>
          </div>
        </div>
      )}

      {saved.length>0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-400 mb-2">💾 Saved ({saved.length})</h3>
          <div className="space-y-2">
            {saved.map((s,i)=>(
              <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg text-sm">
                <span className="text-gray-300 italic">"{s}"</span>
                <button onClick={()=>setSaved(saved.filter((_,j)=>j!==i))} className="text-gray-600 hover:text-red-400 ml-2">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
