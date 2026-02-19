import { useState } from 'react';

const signList = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const emojis = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

// Simplified rising sign: based on birth hour + sun sign offset
const risingDesc: Record<string, string> = {
  Aries: 'You come across as bold, direct, and energetic. People see you as a natural leader with a competitive spirit.',
  Taurus: 'You appear calm, grounded, and reliable. Others perceive you as someone who values comfort and stability.',
  Gemini: 'You seem curious, talkative, and versatile. First impressions show your quick wit and adaptability.',
  Cancer: 'You appear nurturing, sensitive, and approachable. People sense your emotional depth immediately.',
  Leo: 'You come across as confident, warm, and charismatic. You naturally draw attention in any room.',
  Virgo: 'You appear organized, modest, and detail-oriented. Others see you as practical and helpful.',
  Libra: 'You seem charming, diplomatic, and aesthetically aware. People find you easy to be around.',
  Scorpio: 'You appear intense, mysterious, and powerful. Others sense your depth before you even speak.',
  Sagittarius: 'You come across as adventurous, optimistic, and philosophical. People see your free spirit.',
  Capricorn: 'You appear serious, ambitious, and disciplined. Others respect your maturity and drive.',
  Aquarius: 'You seem unique, independent, and forward-thinking. People notice your unconventional approach.',
  Pisces: 'You appear dreamy, compassionate, and artistic. Others sense your empathy and creativity.',
};

export default function RisingSignTool() {
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(-1);
  const [result, setResult] = useState<string | null>(null);

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const getSunSignIndex = (m: number, d: number): number => {
    const cutoffs = [20,19,21,20,21,21,23,23,23,23,22,22];
    return d >= cutoffs[m - 1] ? m % 12 : (m + 10) % 12;
  };

  const calculate = () => {
    if (month > 0 && day > 0 && hour >= 0) {
      const sunIdx = getSunSignIndex(month, day);
      // Rising sign shifts ~1 sign every 2 hours from sunrise (~6am)
      const hourOffset = Math.floor(((hour + 18) % 24) / 2);
      const risingIdx = (sunIdx + hourOffset) % 12;
      setResult(signList[risingIdx]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-3">
        <select value={month} onChange={(e) => { setMonth(Number(e.target.value)); setResult(null); }}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
          <option value={0}>Month</option>
          {months.map((m, i) => <option key={i} value={i+1} className="bg-gray-900">{m}</option>)}
        </select>
        <select value={day} onChange={(e) => { setDay(Number(e.target.value)); setResult(null); }}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
          <option value={0}>Day</option>
          {Array.from({length:31},(_,i) => <option key={i} value={i+1} className="bg-gray-900">{i+1}</option>)}
        </select>
        <select value={hour} onChange={(e) => { setHour(Number(e.target.value)); setResult(null); }}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
          <option value={-1}>Birth Hour</option>
          {Array.from({length:24},(_,i) => <option key={i} value={i} className="bg-gray-900">{i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i-12} PM`}</option>)}
        </select>
      </div>
      <button onClick={calculate} disabled={!month || !day || hour < 0}
        className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">
        Calculate Rising Sign
      </button>

      {result && (
        <div className="p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30 text-center">
          <div className="text-5xl mb-2">{emojis[signList.indexOf(result)]}</div>
          <p className="text-sm text-gray-400 mb-1">Your Rising Sign (Ascendant)</p>
          <h2 className="text-3xl font-bold text-white">{result} Rising</h2>
          <p className="text-gray-300 mt-3 max-w-md mx-auto">{risingDesc[result]}</p>
          <p className="text-xs text-gray-500 mt-4">Note: For a precise rising sign, you need your exact birth time and location. This is a simplified estimate.</p>
        </div>
      )}
    </div>
  );
}
