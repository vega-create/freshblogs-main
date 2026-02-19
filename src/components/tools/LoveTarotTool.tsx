import { useState } from 'react';

const loveCards = [
  {name:'The Lovers',msg:'Deep connection and harmony in love'},
  {name:'Two of Cups',msg:'A meaningful partnership is forming or deepening'},
  {name:'Ace of Cups',msg:'New love or emotional renewal is on the horizon'},
  {name:'Ten of Cups',msg:'Emotional fulfillment and family happiness'},
  {name:'Knight of Cups',msg:'A romantic offer or emotional invitation is coming'},
  {name:'Queen of Cups',msg:'Trust your emotional intuition in relationships'},
  {name:'King of Cups',msg:'Emotional maturity brings relationship stability'},
  {name:'The Empress',msg:'Nurturing love and creative abundance surround you'},
  {name:'The Star',msg:'Hope and healing are entering your love life'},
  {name:'The Sun',msg:'Joy, warmth, and celebration in your relationship'},
  {name:'Temperance',msg:'Balance and patience will strengthen your bond'},
  {name:'The World',msg:'A relationship cycle is completing beautifully'},
  {name:'Three of Cups',msg:'Celebration and joyful connections with others'},
  {name:'Four of Wands',msg:'Commitment, home, and shared celebrations'},
  {name:'Nine of Cups',msg:'Your romantic wish is likely to come true'},
  {name:'The Moon',msg:'Hidden feelings need to surface for clarity'},
  {name:'Five of Cups',msg:'Healing from past disappointment is needed first'},
  {name:'Three of Swords',msg:'A painful truth may need to be acknowledged'},
  {name:'The Tower',msg:'A sudden shift will transform your love life'},
  {name:'The Hermit',msg:'Time alone will bring clarity about what you want'},
  {name:'Seven of Cups',msg:'Be careful of illusions — choose with clear eyes'},
  {name:'Eight of Swords',msg:'You may feel trapped but freedom is possible'},
  {name:'The Devil',msg:'Examine attachments that may not serve you'},
  {name:'Death',msg:'An old pattern must end for new love to enter'},
  {name:'Judgement',msg:'A pivotal moment of clarity about your heart'},
];

const positions = ['Your Heart','Your Partner','The Connection','The Challenge','The Outcome'];
const posEmojis = ['❤️','💙','💜','⚡','🌟'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function LoveTarotTool() {
  const [spread, setSpread] = useState<typeof loveCards>([]);
  const [revealIdx, setRevealIdx] = useState(-1);
  const [pulling, setPulling] = useState(false);

  const pull = () => {
    setPulling(true);
    setRevealIdx(-1);
    setTimeout(() => {
      setSpread(shuffle(loveCards).slice(0, 5));
      setPulling(false);
      for (let i = 0; i < 5; i++) {
        setTimeout(() => setRevealIdx(i), 400 * (i + 1));
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {spread.length === 0 && !pulling && (
        <div className="text-center">
          <p className="text-gray-400 mb-6">Focus on your love life or a specific relationship, then draw your cards.</p>
          <button onClick={pull}
            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 rounded-xl font-bold text-lg transition-all hover:scale-105">
            ❤️ Draw Love Reading
          </button>
        </div>
      )}

      {pulling && (
        <div className="text-center py-12">
          <div className="text-5xl animate-pulse">❤️</div>
          <p className="text-gray-400 mt-4">Reading the energy of your heart...</p>
        </div>
      )}

      {spread.length > 0 && (
        <>
          <div className="grid gap-3">
            {spread.map((card, i) => (
              <div key={i}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-500 ${
                  i <= revealIdx ? 'bg-white/5 border-pink-500/20 opacity-100' : 'bg-white/5 border-white/10 opacity-30'
                }`}>
                <div className="text-2xl flex-shrink-0">{posEmojis[i]}</div>
                <div>
                  <p className="text-xs text-pink-400 uppercase tracking-wider font-bold">{positions[i]}</p>
                  <h3 className="font-bold text-white">{i <= revealIdx ? card.name : '???'}</h3>
                  {i <= revealIdx && <p className="text-gray-400 text-sm mt-1">{card.msg}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={pull}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
              New Reading
            </button>
          </div>
        </>
      )}
    </div>
  );
}
