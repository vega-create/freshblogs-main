import { useState } from 'react';

const signs = [
  { name: 'Capricorn', emoji: '♑', element: 'Earth', start: [12,22], end: [1,19], traits: 'Ambitious, disciplined, patient, responsible' },
  { name: 'Aquarius', emoji: '♒', element: 'Air', start: [1,20], end: [2,18], traits: 'Independent, humanitarian, original, progressive' },
  { name: 'Pisces', emoji: '♓', element: 'Water', start: [2,19], end: [3,20], traits: 'Compassionate, intuitive, artistic, gentle' },
  { name: 'Aries', emoji: '♈', element: 'Fire', start: [3,21], end: [4,19], traits: 'Courageous, energetic, confident, enthusiastic' },
  { name: 'Taurus', emoji: '♉', element: 'Earth', start: [4,20], end: [5,20], traits: 'Reliable, patient, devoted, stable' },
  { name: 'Gemini', emoji: '♊', element: 'Air', start: [5,21], end: [6,20], traits: 'Versatile, curious, communicative, witty' },
  { name: 'Cancer', emoji: '♋', element: 'Water', start: [6,21], end: [7,22], traits: 'Nurturing, intuitive, protective, loyal' },
  { name: 'Leo', emoji: '♌', element: 'Fire', start: [7,23], end: [8,22], traits: 'Confident, dramatic, generous, warm-hearted' },
  { name: 'Virgo', emoji: '♍', element: 'Earth', start: [8,23], end: [9,22], traits: 'Analytical, practical, diligent, modest' },
  { name: 'Libra', emoji: '♎', element: 'Air', start: [9,23], end: [10,22], traits: 'Diplomatic, fair, social, gracious' },
  { name: 'Scorpio', emoji: '♏', element: 'Water', start: [10,23], end: [11,21], traits: 'Passionate, resourceful, brave, magnetic' },
  { name: 'Sagittarius', emoji: '♐', element: 'Fire', start: [11,22], end: [12,21], traits: 'Optimistic, adventurous, honest, philosophical' },
];

const elementColors: Record<string, string> = {
  Fire: 'from-red-500/20 to-orange-500/20 border-red-500/30',
  Earth: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  Air: 'from-sky-500/20 to-cyan-500/20 border-sky-500/30',
  Water: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
};

function getSign(month: number, day: number) {
  for (const sign of signs) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if (sm === em) {
      if (month === sm && day >= sd && day <= ed) return sign;
    } else if (sm > em) {
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return sign;
    } else {
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return sign;
    }
  }
  return null;
}

export default function ZodiacSignTool() {
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [result, setResult] = useState<typeof signs[0] | null>(null);

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const daysInMonth = [31,29,31,30,31,30,31,31,30,31,30,31];

  const handleFind = () => {
    if (month > 0 && day > 0) {
      setResult(getSign(month, day));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={month}
          onChange={(e) => { setMonth(Number(e.target.value)); setResult(null); }}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        >
          <option value={0}>Select Month</option>
          {months.map((m, i) => (
            <option key={i} value={i + 1} className="bg-gray-900">{m}</option>
          ))}
        </select>
        <select
          value={day}
          onChange={(e) => { setDay(Number(e.target.value)); setResult(null); }}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        >
          <option value={0}>Select Day</option>
          {Array.from({ length: month ? daysInMonth[month - 1] : 31 }, (_, i) => (
            <option key={i} value={i + 1} className="bg-gray-900">{i + 1}</option>
          ))}
        </select>
        <button
          onClick={handleFind}
          disabled={!month || !day}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
        >
          Find My Sign
        </button>
      </div>

      {result && (
        <div className={`p-6 rounded-xl bg-gradient-to-br ${elementColors[result.element]} border animate-fadeIn`}>
          <div className="text-center">
            <div className="text-6xl mb-3">{result.emoji}</div>
            <h2 className="text-3xl font-bold text-white mb-1">{result.name}</h2>
            <p className="text-sm text-gray-300 mb-4">
              {months[result.start[0] - 1]} {result.start[1]} – {months[result.end[0] - 1]} {result.end[1]}
            </p>
            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm mb-4">
              {result.element} Sign
            </span>
            <p className="text-gray-200">{result.traits}</p>
            <a
              href={`/astrology/blog/${result.name.toLowerCase()}-compatibility/`}
              className="inline-block mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
            >
              Read {result.name} Compatibility Guide →
            </a>
          </div>
        </div>
      )}

      {/* All signs reference */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-6">
        {signs.map((s) => (
          <div
            key={s.name}
            className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setResult(s)}
          >
            <div className="text-2xl">{s.emoji}</div>
            <div className="text-xs text-gray-400 mt-1">{s.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
