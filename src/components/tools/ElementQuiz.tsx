import { useState } from 'react';

const questions = [
  { q: 'How do you recharge after a long day?', opts: [{t:'Going for a run or workout',e:'Fire'},{t:'A cozy night with comfort food',e:'Earth'},{t:'Calling a friend to chat',e:'Air'},{t:'A long bath or journaling',e:'Water'}]},
  { q: 'In a group project, you naturally...', opts: [{t:'Take charge and lead',e:'Fire'},{t:'Create the timeline and budget',e:'Earth'},{t:'Brainstorm ideas and delegate',e:'Air'},{t:'Make sure everyone feels included',e:'Water'}]},
  { q: 'Your ideal vacation is...', opts: [{t:'Adventure sports and adrenaline',e:'Fire'},{t:'A vineyard tour or cabin retreat',e:'Earth'},{t:'City hopping and meeting locals',e:'Air'},{t:'A quiet beach or spiritual retreat',e:'Water'}]},
  { q: 'When you\'re upset, you tend to...', opts: [{t:'Get angry and need to vent',e:'Fire'},{t:'Go quiet and need alone time',e:'Earth'},{t:'Talk it out with someone',e:'Air'},{t:'Cry or withdraw inward',e:'Water'}]},
  { q: 'Your friends would describe you as...', opts: [{t:'Bold and inspiring',e:'Fire'},{t:'Reliable and steady',e:'Earth'},{t:'Fun and unpredictable',e:'Air'},{t:'Empathic and deep',e:'Water'}]},
  { q: 'Pick a season:', opts: [{t:'Summer — heat and energy',e:'Fire'},{t:'Autumn — harvest and grounding',e:'Earth'},{t:'Spring — fresh starts and breezes',e:'Air'},{t:'Winter — reflection and depth',e:'Water'}]},
  { q: 'What matters most in a relationship?', opts: [{t:'Passion and excitement',e:'Fire'},{t:'Loyalty and consistency',e:'Earth'},{t:'Intellectual connection',e:'Air'},{t:'Emotional depth and trust',e:'Water'}]},
];

const results: Record<string, {emoji:string; title:string; desc:string; signs:string; strength:string; growth:string}> = {
  Fire: { emoji:'🔥', title:'Fire Element', desc:'You are passionate, courageous, and full of energy. You light up any room and inspire others with your enthusiasm.', signs:'Aries ♈ • Leo ♌ • Sagittarius ♐', strength:'Leadership, motivation, creativity, courage', growth:'Practice patience and listening. Not every situation needs immediate action.' },
  Earth: { emoji:'🌍', title:'Earth Element', desc:'You are grounded, practical, and dependable. People trust you because you always follow through on your word.', signs:'Taurus ♉ • Virgo ♍ • Capricorn ♑', strength:'Reliability, patience, building, planning', growth:'Allow yourself to be spontaneous. Not everything needs a plan.' },
  Air: { emoji:'💨', title:'Air Element', desc:'You are intellectual, social, and endlessly curious. Your mind moves quickly and you love connecting ideas and people.', signs:'Gemini ♊ • Libra ♎ • Aquarius ♒', strength:'Communication, innovation, adaptability, wit', growth:'Ground your ideas into action. Thinking is powerful, but doing transforms.' },
  Water: { emoji:'💧', title:'Water Element', desc:'You are intuitive, empathic, and emotionally deep. You understand people on a level others can\'t reach.', signs:'Cancer ♋ • Scorpio ♏ • Pisces ♓', strength:'Empathy, intuition, healing, creativity', growth:'Set emotional boundaries. You can care deeply without absorbing everything.' },
};

export default function ElementQuiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string,number>>({Fire:0,Earth:0,Air:0,Water:0});
  const [done, setDone] = useState(false);

  const handleAnswer = (element: string) => {
    const newScores = {...scores, [element]: scores[element]+1};
    setScores(newScores);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => { setCurrent(0); setScores({Fire:0,Earth:0,Air:0,Water:0}); setDone(false); };

  const topElement = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  const result = results[topElement];

  if (done) {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-xl border border-white/10 text-center">
          <div className="text-6xl mb-3">{result.emoji}</div>
          <h2 className="text-3xl font-bold text-white">{result.title}</h2>
          <p className="text-gray-300 mt-3 max-w-md mx-auto">{result.desc}</p>
          <p className="text-purple-400 text-sm mt-3">{result.signs}</p>
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(scores).sort((a,b)=>b[1]-a[1]).map(([el,sc]) => (
            <div key={el} className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl">{results[el].emoji}</div>
              <div className="text-xs text-gray-400">{el}</div>
              <div className="text-lg font-bold text-white">{Math.round(sc/questions.length*100)}%</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Strengths</p>
            <p className="text-gray-300 text-sm mt-1">{result.strength}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Growth Area</p>
            <p className="text-gray-300 text-sm mt-1">{result.growth}</p>
          </div>
        </div>

        <button onClick={reset} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
          Take Again
        </button>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Question {current+1} of {questions.length}</span>
        <div className="w-32 h-2 bg-white/10 rounded-full">
          <div className="h-full bg-purple-500 rounded-full transition-all" style={{width:`${(current+1)/questions.length*100}%`}}/>
        </div>
      </div>
      <h2 className="text-xl font-bold text-white">{q.q}</h2>
      <div className="grid gap-2">
        {q.opts.map((opt,i) => (
          <button key={i} onClick={()=>handleAnswer(opt.e)}
            className="text-left p-4 bg-white/5 hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/50 rounded-xl transition-all">
            {opt.t}
          </button>
        ))}
      </div>
    </div>
  );
}
