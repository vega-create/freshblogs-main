import { useState } from 'react';

const signList = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const emojis = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

const signSeeds: Record<string,number[]> = {
  Aries:[1,9,18,27,36,45], Taurus:[2,6,15,24,33,42], Gemini:[3,5,14,23,32,41],
  Cancer:[4,7,16,25,34,43], Leo:[1,5,19,28,37,46], Virgo:[3,6,17,26,35,44],
  Libra:[2,7,15,24,33,42], Scorpio:[4,9,18,27,36,45], Sagittarius:[3,8,12,21,39,48],
  Capricorn:[1,4,10,22,31,40], Aquarius:[2,8,13,22,31,49], Pisces:[3,7,11,20,29,38],
};

export default function LuckyNumberTool() {
  const [sign, setSign] = useState('');
  const [numbers, setNumbers] = useState<number[]>([]);

  const generate = (s: string) => {
    setSign(s);
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate();
    const base = signSeeds[s];
    const lucky = base.map((n, i) => {
      const shifted = ((n * (seed + i * 7)) % 49) + 1;
      return shifted;
    });
    // Ensure unique
    const unique = [...new Set(lucky)];
    while (unique.length < 6) {
      unique.push(((seed + unique.length * 13) % 49) + 1);
    }
    setNumbers(unique.slice(0, 6).sort((a,b) => a - b));
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-400">Select your sign to get today's lucky numbers</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {signList.map((s, i) => (
          <button key={s} onClick={() => generate(s)}
            className={`p-3 rounded-lg text-center transition-all ${sign === s ? 'bg-purple-600 ring-2 ring-purple-400 scale-105' : 'bg-white/5 hover:bg-white/10'}`}>
            <div className="text-2xl">{emojis[i]}</div>
            <div className="text-[10px] mt-1">{s}</div>
          </button>
        ))}
      </div>

      {numbers.length > 0 && (
        <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 text-center">
          <p className="text-sm text-gray-400">{emojis[signList.indexOf(sign)]} {sign} • {today}</p>
          <h2 className="text-xl font-bold text-white mt-2 mb-4">Your Lucky Numbers</h2>
          <div className="flex justify-center gap-3 flex-wrap">
            {numbers.map((n, i) => (
              <div key={i} className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl font-bold text-gray-900 shadow-lg">
                {n}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">Numbers refresh daily. For entertainment purposes only.</p>
        </div>
      )}
    </div>
  );
}
