import { useState } from 'react';

const signList = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const emojis = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

const moonDesc: Record<string, {emotion:string; needs:string; style:string}> = {
  Aries: { emotion:'Fiery and impulsive', needs:'Independence and excitement', style:'You process emotions quickly and move on. You need action, not sitting with feelings.' },
  Taurus: { emotion:'Steady and sensual', needs:'Security and comfort', style:'You crave emotional stability. Physical comforts like food, nature, and cozy spaces soothe you.' },
  Gemini: { emotion:'Changeable and curious', needs:'Mental stimulation', style:'You process feelings by talking them through. Journaling and conversation are your therapy.' },
  Cancer: { emotion:'Deep and nurturing', needs:'Emotional safety', style:'You feel everything intensely. Home, family, and close bonds are essential to your wellbeing.' },
  Leo: { emotion:'Warm and dramatic', needs:'Recognition and appreciation', style:'You need to feel seen and valued. Creative expression is how you process emotions.' },
  Virgo: { emotion:'Analytical and helpful', needs:'Order and purpose', style:'You process emotions by analyzing them. Helping others gives you emotional fulfillment.' },
  Libra: { emotion:'Harmonious and social', needs:'Partnership and beauty', style:'You need emotional balance and fairness. Conflict deeply unsettles you.' },
  Scorpio: { emotion:'Intense and transformative', needs:'Deep connection and truth', style:'You feel everything to the extreme. Trust issues run deep but so does your loyalty.' },
  Sagittarius: { emotion:'Optimistic and restless', needs:'Freedom and meaning', style:'You process emotions through adventure and philosophy. You bounce back quickly from setbacks.' },
  Capricorn: { emotion:'Reserved and responsible', needs:'Achievement and structure', style:'You may suppress emotions to stay productive. Learning to be vulnerable is your growth edge.' },
  Aquarius: { emotion:'Detached and humanitarian', needs:'Independence and causes', style:'You intellectualize emotions. Connecting feelings to bigger ideas helps you process them.' },
  Pisces: { emotion:'Empathic and dreamy', needs:'Spiritual connection', style:'You absorb others\' emotions like a sponge. Alone time, water, and creativity recharge you.' },
};

export default function MoonSignTool() {
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [year, setYear] = useState(0);
  const [result, setResult] = useState<string|null>(null);

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const calculate = () => {
    if (month && day && year) {
      // Simplified moon sign calculation using lunar cycle offset
      const base = new Date(year, month - 1, day).getTime();
      const epoch = new Date(2000, 0, 6).getTime(); // Known new moon
      const lunarCycle = 29.53059 * 24 * 3600 * 1000;
      const daysSince = (base - epoch) / lunarCycle;
      const phase = ((daysSince % 1) + 1) % 1;
      const idx = Math.floor(phase * 12) % 12;
      setResult(signList[idx]);
    }
  };

  const info = result ? moonDesc[result] : null;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-3">
        <select value={month} onChange={(e) => { setMonth(Number(e.target.value)); setResult(null); }}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
          <option value={0}>Month</option>
          {months.map((m,i) => <option key={i} value={i+1} className="bg-gray-900">{m}</option>)}
        </select>
        <select value={day} onChange={(e) => { setDay(Number(e.target.value)); setResult(null); }}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
          <option value={0}>Day</option>
          {Array.from({length:31},(_,i) => <option key={i} value={i+1} className="bg-gray-900">{i+1}</option>)}
        </select>
        <select value={year} onChange={(e) => { setYear(Number(e.target.value)); setResult(null); }}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
          <option value={0}>Year</option>
          {Array.from({length:80},(_,i) => <option key={i} value={2006-i} className="bg-gray-900">{2006-i}</option>)}
        </select>
      </div>
      <button onClick={calculate} disabled={!month||!day||!year}
        className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">
        🌙 Calculate Moon Sign
      </button>

      {result && info && (
        <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">🌙 {emojis[signList.indexOf(result)]}</div>
            <h2 className="text-3xl font-bold">Moon in {result}</h2>
            <p className="text-gray-400 text-sm">Your emotional inner world</p>
          </div>
          <div className="grid gap-3 mt-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Emotional Nature</p>
              <p className="text-white font-medium">{info.emotion}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Core Needs</p>
              <p className="text-white font-medium">{info.needs}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wider">How You Process Feelings</p>
              <p className="text-gray-300 text-sm">{info.style}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">Simplified estimate. For precision, use your exact birth time and location with a professional astrologer.</p>
        </div>
      )}
    </div>
  );
}
