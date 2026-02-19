import { useState } from 'react';

const yesCards = ['The Sun','The Star','The World','The Empress','The Magician','Wheel of Fortune','Strength','The Lovers','Temperance','The Chariot','Judgement'];
const noCards = ['The Tower','Death','The Devil','The Moon','The Hanged Man','The Hermit'];
const maybeCards = ['The High Priestess','Justice','The Emperor','The Hierophant','The Fool'];

const allCards = [
  ...yesCards.map(c => ({name:c,answer:'Yes ✅',color:'from-green-500/20 to-emerald-500/20 border-green-500/30'})),
  ...noCards.map(c => ({name:c,answer:'No ❌',color:'from-red-500/20 to-rose-500/20 border-red-500/30'})),
  ...maybeCards.map(c => ({name:c,answer:'Maybe 🤔',color:'from-yellow-500/20 to-amber-500/20 border-yellow-500/30'})),
];

const messages: Record<string,string> = {
  'Yes ✅': 'The cards indicate a positive outcome. Trust the energy and move forward with confidence.',
  'No ❌': 'The cards suggest this may not be the right path or timing. Reflect and consider alternatives.',
  'Maybe 🤔': 'The answer is unclear — more information is needed. Revisit this question after gaining clarity.',
};

export default function YesNoTool() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<typeof allCards[0]|null>(null);
  const [pulling, setPulling] = useState(false);

  const pull = () => {
    if (!question.trim()) return;
    setPulling(true);
    setResult(null);
    setTimeout(() => {
      const seed = question.length + new Date().getTime();
      const idx = Math.floor(Math.abs(Math.sin(seed) * 10000)) % allCards.length;
      setResult(allCards[idx]);
      setPulling(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Ask a yes or no question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => { setQuestion(e.target.value); setResult(null); }}
          placeholder="Will I get the job I applied for?"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          onKeyDown={(e) => e.key === 'Enter' && pull()}
        />
      </div>
      <button onClick={pull} disabled={!question.trim() || pulling}
        className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">
        {pulling ? 'Drawing...' : '🃏 Get Your Answer'}
      </button>

      {result && (
        <div className={`p-6 bg-gradient-to-br ${result.color} rounded-xl border text-center transition-all`}>
          <div className="text-5xl mb-3">🃏</div>
          <h2 className="text-2xl font-bold text-white">{result.name}</h2>
          <div className="text-4xl font-bold mt-3">{result.answer}</div>
          <p className="text-gray-300 text-sm mt-3 max-w-sm mx-auto">{messages[result.answer]}</p>
          <button onClick={() => { setQuestion(''); setResult(null); }}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
            Ask Another Question
          </button>
        </div>
      )}
    </div>
  );
}
