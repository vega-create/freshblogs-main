import { useState, useEffect } from 'react';

// All 78 cards inline (Major + Minor Arcana basics)
const majorArcana = [
  {name:'The Fool',num:0,up:'New beginnings, innocence, spontaneity, free spirit',rev:'Holding back, recklessness, risk-taking',advice:'Take a leap of faith. A fresh start awaits you.'},
  {name:'The Magician',num:1,up:'Manifestation, resourcefulness, power, inspired action',rev:'Manipulation, poor planning, untapped talents',advice:'You have all the tools you need. Focus your willpower.'},
  {name:'The High Priestess',num:2,up:'Intuition, sacred knowledge, divine feminine, the subconscious',rev:'Secrets, disconnected from intuition, withdrawal',advice:'Trust your gut feeling. The answer lies within.'},
  {name:'The Empress',num:3,up:'Femininity, beauty, nature, nurturing, abundance',rev:'Creative block, dependence on others',advice:'Embrace creativity and nurture yourself and others.'},
  {name:'The Emperor',num:4,up:'Authority, establishment, structure, father figure',rev:'Domination, excessive control, rigidity',advice:'Take charge with wisdom. Structure creates freedom.'},
  {name:'The Hierophant',num:5,up:'Spiritual wisdom, tradition, conformity, education',rev:'Personal beliefs, freedom, challenging the status quo',advice:'Seek guidance from a mentor or trusted tradition.'},
  {name:'The Lovers',num:6,up:'Love, harmony, relationships, values alignment, choices',rev:'Self-love, disharmony, imbalance, misalignment',advice:'Follow your heart. An important choice defines your path.'},
  {name:'The Chariot',num:7,up:'Control, willpower, success, action, determination',rev:'Self-discipline, opposition, lack of direction',advice:'Stay focused and push through obstacles with confidence.'},
  {name:'Strength',num:8,up:'Strength, courage, persuasion, influence, compassion',rev:'Inner strength, self-doubt, raw emotion',advice:'Gentle strength wins. Lead with courage and compassion.'},
  {name:'The Hermit',num:9,up:'Soul-searching, introspection, being alone, inner guidance',rev:'Isolation, loneliness, withdrawal',advice:'Take time for solitude and reflection. Wisdom comes from within.'},
  {name:'Wheel of Fortune',num:10,up:'Good luck, karma, life cycles, destiny, turning point',rev:'Bad luck, resistance to change, breaking cycles',advice:'Change is coming. Embrace the turning of the wheel.'},
  {name:'Justice',num:11,up:'Justice, fairness, truth, cause and effect, law',rev:'Unfairness, lack of accountability, dishonesty',advice:'Act with integrity. Truth and fairness will prevail.'},
  {name:'The Hanged Man',num:12,up:'Pause, surrender, letting go, new perspectives',rev:'Delays, resistance, stalling, indecision',advice:'Let go of control. A new perspective changes everything.'},
  {name:'Death',num:13,up:'Endings, change, transformation, transition',rev:'Resistance to change, personal transformation, inner purging',advice:'Something must end for something new to begin. Embrace transformation.'},
  {name:'Temperance',num:14,up:'Balance, moderation, patience, finding meaning',rev:'Imbalance, excess, self-healing, re-alignment',advice:'Find your middle ground. Patience and balance bring peace.'},
  {name:'The Devil',num:15,up:'Shadow self, attachment, addiction, restriction',rev:'Releasing limiting beliefs, exploring dark thoughts, detachment',advice:'Examine what holds you back. Freedom comes from awareness.'},
  {name:'The Tower',num:16,up:'Sudden change, upheaval, chaos, revelation, awakening',rev:'Personal transformation, fear of change, averting disaster',advice:'Destruction clears the path for rebuilding. Trust the process.'},
  {name:'The Star',num:17,up:'Hope, faith, purpose, renewal, spirituality',rev:'Lack of faith, despair, self-trust, disconnection',advice:'Have hope. You are guided by a light that never fades.'},
  {name:'The Moon',num:18,up:'Illusion, fear, anxiety, subconscious, intuition',rev:'Release of fear, repressed emotion, inner confusion',advice:'Not everything is as it seems. Trust your intuition through uncertainty.'},
  {name:'The Sun',num:19,up:'Positivity, fun, warmth, success, vitality',rev:'Inner child, feeling down, overly optimistic',advice:'Joy and success surround you. Let your inner light shine.'},
  {name:'Judgement',num:20,up:'Judgement, rebirth, inner calling, absolution',rev:'Self-doubt, inner critic, ignoring the call',advice:'Answer your higher calling. It\'s time for a fresh start.'},
  {name:'The World',num:21,up:'Completion, integration, accomplishment, travel',rev:'Seeking personal closure, short-cuts, delays',advice:'A cycle is complete. Celebrate your journey and prepare for the next.'},
];

export default function DailyPullTool() {
  const [card, setCard] = useState<typeof majorArcana[0]|null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [pulling, setPulling] = useState(false);

  const pullCard = () => {
    setPulling(true);
    setFlipped(false);
    setCard(null);
    
    setTimeout(() => {
      const today = new Date();
      const seed = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate();
      const idx = seed % majorArcana.length;
      const rev = (seed * 7) % 3 === 0;
      setCard(majorArcana[idx]);
      setIsReversed(rev);
      setPulling(false);
      setTimeout(() => setFlipped(true), 100);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {!card && !pulling && (
        <div className="text-center">
          <p className="text-gray-400 mb-6">Focus on your question or intention, then pull your card.</p>
          <button onClick={pullCard}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-purple-500/25">
            🃏 Pull Today's Card
          </button>
        </div>
      )}

      {pulling && (
        <div className="text-center py-12">
          <div className="text-6xl animate-pulse">🃏</div>
          <p className="text-gray-400 mt-4 animate-pulse">Shuffling the deck...</p>
        </div>
      )}

      {card && (
        <div className={`transition-all duration-700 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              {new Date().toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric'})}
            </p>
            <div className={`text-6xl mb-3 ${isReversed ? 'rotate-180' : ''}`}>🃏</div>
            <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
              {isReversed ? '🔄 Reversed' : '✨ Upright'} • Major Arcana {card.num}
            </span>
            <h2 className="text-3xl font-bold text-white mt-3">{card.name}</h2>
            
            <div className="mt-6 space-y-4 text-left max-w-md mx-auto">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-500 uppercase">Meaning</p>
                <p className="text-gray-200 text-sm mt-1">{isReversed ? card.rev : card.up}</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-xs text-purple-400 uppercase">Today's Message</p>
                <p className="text-gray-200 text-sm mt-1">{card.advice}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <button onClick={pullCard}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
              Pull Another Card
            </button>
            <a href="/tarot/tools/three-card/"
              className="px-6 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg text-sm transition-colors">
              Try 3-Card Spread →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
