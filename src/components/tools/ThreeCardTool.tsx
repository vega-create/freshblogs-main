import { useState } from 'react';

const cards = [
  {name:'The Fool',up:'New beginnings, innocence',rev:'Recklessness, fear of change'},
  {name:'The Magician',up:'Manifestation, power',rev:'Manipulation, poor planning'},
  {name:'The High Priestess',up:'Intuition, mystery',rev:'Secrets, disconnection'},
  {name:'The Empress',up:'Abundance, nurturing',rev:'Creative block, neglect'},
  {name:'The Emperor',up:'Authority, structure',rev:'Rigidity, control'},
  {name:'The Hierophant',up:'Tradition, guidance',rev:'Rebellion, new approaches'},
  {name:'The Lovers',up:'Love, choices, harmony',rev:'Disharmony, imbalance'},
  {name:'The Chariot',up:'Determination, victory',rev:'Lack of direction'},
  {name:'Strength',up:'Courage, compassion',rev:'Self-doubt, weakness'},
  {name:'The Hermit',up:'Soul-searching, wisdom',rev:'Isolation, loneliness'},
  {name:'Wheel of Fortune',up:'Change, destiny, luck',rev:'Bad luck, resistance'},
  {name:'Justice',up:'Fairness, truth',rev:'Dishonesty, unfairness'},
  {name:'The Hanged Man',up:'Surrender, new perspective',rev:'Stalling, resistance'},
  {name:'Death',up:'Transformation, endings',rev:'Fear of change, stagnation'},
  {name:'Temperance',up:'Balance, patience',rev:'Imbalance, excess'},
  {name:'The Devil',up:'Shadow self, attachment',rev:'Breaking free, liberation'},
  {name:'The Tower',up:'Sudden change, revelation',rev:'Avoiding disaster, fear'},
  {name:'The Star',up:'Hope, renewal, faith',rev:'Despair, disconnection'},
  {name:'The Moon',up:'Illusion, intuition',rev:'Clarity, release of fear'},
  {name:'The Sun',up:'Joy, success, vitality',rev:'Sadness, blocked joy'},
  {name:'Judgement',up:'Rebirth, inner calling',rev:'Self-doubt, ignoring call'},
  {name:'The World',up:'Completion, fulfillment',rev:'Incompletion, delays'},
];

const positions = ['Past', 'Present', 'Future'];
const posDesc = [
  'What has led you to this moment',
  'Where you are right now',
  'What lies ahead on your path'
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ThreeCardTool() {
  const [spread, setSpread] = useState<{name:string;meaning:string;reversed:boolean}[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([false,false,false]);
  const [pulling, setPulling] = useState(false);

  const pull = () => {
    setPulling(true);
    setRevealed([false,false,false]);
    setTimeout(() => {
      const shuffled = shuffle(cards);
      const picked = shuffled.slice(0,3).map(c => {
        const rev = Math.random() > 0.65;
        return { name:c.name, meaning: rev ? c.rev : c.up, reversed: rev };
      });
      setSpread(picked);
      setPulling(false);
      // Reveal one by one
      setTimeout(() => setRevealed([true,false,false]), 300);
      setTimeout(() => setRevealed([true,true,false]), 800);
      setTimeout(() => setRevealed([true,true,true]), 1300);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {spread.length === 0 && !pulling && (
        <div className="text-center">
          <p className="text-gray-400 mb-6">Think of a situation or question. The three cards will reveal your past, present, and future.</p>
          <button onClick={pull}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-lg transition-all hover:scale-105">
            🃏 Draw Three Cards
          </button>
        </div>
      )}

      {pulling && (
        <div className="text-center py-12">
          <div className="flex justify-center gap-4 text-5xl animate-pulse">
            <span>🃏</span><span>🃏</span><span>🃏</span>
          </div>
          <p className="text-gray-400 mt-4">Drawing your cards...</p>
        </div>
      )}

      {spread.length > 0 && (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            {spread.map((card, i) => (
              <div key={i}
                className={`p-5 rounded-xl border text-center transition-all duration-500 ${
                  revealed[i] ? 'bg-white/5 border-purple-500/30 opacity-100 translate-y-0' : 'bg-white/5 border-white/10 opacity-0 translate-y-4'
                }`}>
                <p className="text-xs text-purple-400 uppercase tracking-wider font-bold">{positions[i]}</p>
                <p className="text-[10px] text-gray-500 mb-3">{posDesc[i]}</p>
                <div className={`text-4xl mb-2 ${card.reversed ? 'rotate-180' : ''}`}>🃏</div>
                <h3 className="font-bold text-white text-lg">{card.name}</h3>
                <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                  {card.reversed ? '🔄 Reversed' : '✨ Upright'}
                </span>
                <p className="text-gray-400 text-sm mt-3">{card.meaning}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={pull}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
              Draw Again
            </button>
          </div>
        </>
      )}
    </div>
  );
}
