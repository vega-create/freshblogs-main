import { useState } from 'react';

const deck = [
  'The Fool','The Magician','The High Priestess','The Empress','The Emperor','The Hierophant',
  'The Lovers','The Chariot','Strength','The Hermit','Wheel of Fortune','Justice',
  'The Hanged Man','Death','Temperance','The Devil','The Tower','The Star',
  'The Moon','The Sun','Judgement','The World',
  'Ace of Wands','Two of Wands','Three of Wands','Four of Wands','Five of Wands',
  'Ace of Cups','Two of Cups','Three of Cups','Four of Cups','Five of Cups',
  'Ace of Swords','Two of Swords','Three of Swords','Four of Swords','Five of Swords',
  'Ace of Pentacles','Two of Pentacles','Three of Pentacles','Four of Pentacles','Five of Pentacles',
];

const positions = [
  {name:'Present',desc:'Your current situation'},
  {name:'Challenge',desc:'What crosses you'},
  {name:'Foundation',desc:'The root of the matter'},
  {name:'Recent Past',desc:'What is passing away'},
  {name:'Crown',desc:'What could be'},
  {name:'Near Future',desc:'What is coming'},
  {name:'Your Attitude',desc:'How you see yourself'},
  {name:'Environment',desc:'External influences'},
  {name:'Hopes & Fears',desc:'Your inner desires'},
  {name:'Outcome',desc:'The final result'},
];

const posEmojis = ['🎯','⚔️','🏛️','⏪','👑','⏩','🪞','🌍','💭','🌟'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a;
}

export default function CelticCrossTool() {
  const [spread, setSpread] = useState<{card:string;rev:boolean}[]>([]);
  const [revealIdx, setRevealIdx] = useState(-1);
  const [pulling, setPulling] = useState(false);

  const pull = () => {
    setPulling(true); setRevealIdx(-1);
    setTimeout(() => {
      const s = shuffle(deck).slice(0,10).map(c => ({card:c, rev:Math.random()>0.6}));
      setSpread(s); setPulling(false);
      for (let i = 0; i < 10; i++) setTimeout(() => setRevealIdx(i), 300*(i+1));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {spread.length === 0 && !pulling && (
        <div className="text-center">
          <p className="text-gray-400 mb-6">The Celtic Cross is one of the most detailed tarot spreads. Focus deeply on your question.</p>
          <button onClick={pull}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-lg transition-all hover:scale-105">
            ✝️ Lay the Celtic Cross
          </button>
        </div>
      )}

      {pulling && (
        <div className="text-center py-12">
          <div className="text-5xl animate-pulse">✝️</div>
          <p className="text-gray-400 mt-4">Laying the ancient spread...</p>
        </div>
      )}

      {spread.length > 0 && (
        <>
          <div className="grid sm:grid-cols-2 gap-2">
            {spread.map((s, i) => (
              <div key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-500 ${
                  i <= revealIdx ? 'bg-white/5 border-purple-500/20 opacity-100' : 'bg-white/3 border-white/5 opacity-20'
                }`}>
                <span className="text-lg flex-shrink-0">{posEmojis[i]}</span>
                <div className="min-w-0">
                  <p className="text-xs text-purple-400 font-bold">{i+1}. {positions[i].name}</p>
                  <p className="text-[10px] text-gray-600">{positions[i].desc}</p>
                  {i <= revealIdx ? (
                    <>
                      <p className="font-bold text-white text-sm mt-1">{s.card}</p>
                      <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded">{s.rev ? '🔄 Rev' : '✨ Up'}</span>
                    </>
                  ) : (
                    <p className="text-gray-600 text-sm mt-1">???</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={pull} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
              New Spread
            </button>
          </div>
        </>
      )}
    </div>
  );
}
