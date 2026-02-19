import { useState } from 'react';

const cards = [
  {num:0,name:'The Fool',up:'New beginnings, innocence, spontaneity, free spirit',rev:'Holding back, recklessness, risk-taking',element:'Air',planet:'Uranus',yes:'Yes — leap of faith'},
  {num:1,name:'The Magician',up:'Manifestation, resourcefulness, power',rev:'Manipulation, poor planning, untapped talents',element:'Air',planet:'Mercury',yes:'Yes — you have the power'},
  {num:2,name:'The High Priestess',up:'Intuition, sacred knowledge, the subconscious',rev:'Secrets, disconnected from intuition',element:'Water',planet:'Moon',yes:'Maybe — trust your gut'},
  {num:3,name:'The Empress',up:'Femininity, beauty, nature, abundance',rev:'Creative block, dependence',element:'Earth',planet:'Venus',yes:'Yes — abundance flows'},
  {num:4,name:'The Emperor',up:'Authority, structure, control, father figure',rev:'Domination, excessive control, rigidity',element:'Fire',planet:'Aries',yes:'Yes — take charge'},
  {num:5,name:'The Hierophant',up:'Tradition, conformity, spiritual wisdom',rev:'Personal beliefs, freedom, rebellion',element:'Earth',planet:'Taurus',yes:'Maybe — seek guidance'},
  {num:6,name:'The Lovers',up:'Love, harmony, relationships, choices',rev:'Disharmony, imbalance, misalignment',element:'Air',planet:'Gemini',yes:'Yes — follow your heart'},
  {num:7,name:'The Chariot',up:'Control, willpower, success, determination',rev:'Lack of direction, aggression',element:'Water',planet:'Cancer',yes:'Yes — push forward'},
  {num:8,name:'Strength',up:'Courage, persuasion, influence, compassion',rev:'Self-doubt, raw emotion, insecurity',element:'Fire',planet:'Leo',yes:'Yes — gentle strength'},
  {num:9,name:'The Hermit',up:'Soul-searching, introspection, inner guidance',rev:'Isolation, loneliness, withdrawal',element:'Earth',planet:'Virgo',yes:'Maybe — reflect first'},
  {num:10,name:'Wheel of Fortune',up:'Change, cycles, destiny, turning point',rev:'Bad luck, resistance to change',element:'Fire',planet:'Jupiter',yes:'Yes — luck is turning'},
  {num:11,name:'Justice',up:'Fairness, truth, cause and effect',rev:'Unfairness, lack of accountability',element:'Air',planet:'Libra',yes:'Maybe — depends on truth'},
  {num:12,name:'The Hanged Man',up:'Pause, surrender, new perspectives',rev:'Delays, resistance, stalling',element:'Water',planet:'Neptune',yes:'No — wait and see'},
  {num:13,name:'Death',up:'Endings, change, transformation',rev:'Resistance to change, stagnation',element:'Water',planet:'Scorpio',yes:'No — something must end first'},
  {num:14,name:'Temperance',up:'Balance, moderation, patience',rev:'Imbalance, excess, misalignment',element:'Fire',planet:'Sagittarius',yes:'Yes — with patience'},
  {num:15,name:'The Devil',up:'Shadow self, attachment, addiction',rev:'Breaking free, releasing limiting beliefs',element:'Earth',planet:'Capricorn',yes:'No — examine attachments'},
  {num:16,name:'The Tower',up:'Sudden change, upheaval, revelation',rev:'Fear of change, averting disaster',element:'Fire',planet:'Mars',yes:'No — expect disruption'},
  {num:17,name:'The Star',up:'Hope, faith, renewal, spirituality',rev:'Lack of faith, despair',element:'Air',planet:'Aquarius',yes:'Yes — have hope'},
  {num:18,name:'The Moon',up:'Illusion, fear, anxiety, intuition',rev:'Release of fear, clarity emerging',element:'Water',planet:'Pisces',yes:'No — things are unclear'},
  {num:19,name:'The Sun',up:'Positivity, fun, warmth, success',rev:'Feeling down, temporary setback',element:'Fire',planet:'Sun',yes:'Yes — absolutely'},
  {num:20,name:'Judgement',up:'Rebirth, inner calling, absolution',rev:'Self-doubt, inner critic',element:'Fire',planet:'Pluto',yes:'Yes — answer the call'},
  {num:21,name:'The World',up:'Completion, accomplishment, travel',rev:'Incompletion, delays',element:'Earth',planet:'Saturn',yes:'Yes — cycle complete'},
];

export default function EncyclopediaTool() {
  const [selected, setSelected] = useState<typeof cards[0]|null>(null);
  const [search, setSearch] = useState('');

  const filtered = search ? cards.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : cards;

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search cards..."
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
      />

      {selected ? (
        <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
          <button onClick={() => setSelected(null)} className="text-sm text-gray-400 hover:text-white mb-4">← Back to all cards</button>
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🃏</div>
            <span className="text-xs px-2 py-1 bg-white/10 rounded-full">Major Arcana {selected.num}</span>
            <h2 className="text-3xl font-bold text-white mt-2">{selected.name}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-green-400 uppercase font-bold">✨ Upright</p>
              <p className="text-gray-300 text-sm mt-1">{selected.up}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-red-400 uppercase font-bold">🔄 Reversed</p>
              <p className="text-gray-300 text-sm mt-1">{selected.rev}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Element</p>
              <p className="text-white font-medium">{selected.element}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Ruling Planet/Sign</p>
              <p className="text-white font-medium">{selected.planet}</p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-center">
            <p className="text-xs text-purple-400 uppercase">Yes/No Answer</p>
            <p className="text-white font-semibold">{selected.yes}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filtered.map((card) => (
            <button key={card.num} onClick={() => setSelected(card)}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-lg text-left transition-all">
              <span className="text-xs text-gray-500">{card.num}</span>
              <p className="font-semibold text-white text-sm">{card.name}</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{card.up}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
