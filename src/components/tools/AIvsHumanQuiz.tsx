import { useState } from 'react';

const rounds = [
  {text:'The sunset painted the sky in hues of amber and rose, as if the universe itself was exhaling after a long day.',answer:'ai',explanation:'AI-generated text tends to use poetic metaphors like "the universe exhaling" — a bit too polished for casual writing.'},
  {text:'honestly the coffee at that new place on 5th was mid at best. like it was fine but for $7 i expected more lol',answer:'human',explanation:'The casual tone, slang ("mid"), lowercase, and "lol" are strong signals of authentic human writing.'},
  {text:'In the tapestry of human experience, few threads are as universally binding as the pursuit of knowledge and understanding.',answer:'ai',explanation:'The "tapestry of human experience" metaphor is a classic AI pattern — overly eloquent and abstract.'},
  {text:'I tried the recipe and it turned out pretty good actually! The only thing is I added way too much garlic but honestly no such thing as too much garlic right??',answer:'human',explanation:'Self-correction, casual asides, and the rhetorical question with double question marks are typical human patterns.'},
  {text:'The relationship between sleep quality and cognitive performance has been extensively studied, with research consistently demonstrating that adequate rest is fundamental to optimal brain function.',answer:'ai',explanation:'Formal academic tone, passive voice, and hedge words like "extensively" and "consistently" are common AI patterns.'},
  {text:'my dog literally just stole my sandwich off the counter and im not even mad because she looked so proud of herself',answer:'human',explanation:'The informal narrative style, use of "literally," and genuine emotional reaction point to human writing.'},
  {text:'As we navigate the complexities of modern life, it becomes increasingly important to cultivate mindfulness and intentional living.',answer:'ai',explanation:'Opening with "As we navigate" and using buzzwords like "cultivate mindfulness" are hallmark AI phrases.'},
  {text:'Just finished reading that book everyone keeps recommending and I get it now. Chapter 12 absolutely wrecked me. No spoilers but WOW.',answer:'human',explanation:'Specific reference (Chapter 12), emotional reaction, and concern about spoilers indicate genuine human experience.'},
];

export default function AIvsHumanQuiz() {
  const [current,setCurrent]=useState(0);
  const [score,setScore]=useState(0);
  const [answered,setAnswered]=useState(false);
  const [choice,setChoice]=useState('');
  const [done,setDone]=useState(false);

  const answer = (c:string) => {
    setChoice(c); setAnswered(true);
    if(c===rounds[current].answer) setScore(s=>s+1);
  };

  const next = () => {
    if(current<rounds.length-1){setCurrent(c=>c+1);setAnswered(false);setChoice('');}
    else setDone(true);
  };

  const reset = ()=>{setCurrent(0);setScore(0);setAnswered(false);setChoice('');setDone(false);};

  if(done){
    const pct=Math.round(score/rounds.length*100);
    return(
      <div className="space-y-6 text-center">
        <div className="p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
          <div className="text-5xl mb-2">{pct>=75?'🏆':pct>=50?'👍':'🤖'}</div>
          <h2 className="text-2xl font-bold text-white">{score}/{rounds.length} Correct!</h2>
          <p className="text-gray-400 mt-2">{pct>=75?'Impressive! You have a sharp eye for AI text.':pct>=50?'Not bad! AI detection is tricky.':'AI is getting really good at fooling us!'}</p>
        </div>
        <button onClick={reset} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">Play Again</button>
      </div>
    );
  }

  const r=rounds[current];
  return(
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Round {current+1}/{rounds.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="p-5 bg-white/5 rounded-xl border border-white/10">
        <p className="text-gray-200 italic leading-relaxed">"{r.text}"</p>
      </div>
      {!answered ? (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={()=>answer('human')} className="p-4 bg-white/5 hover:bg-green-600/30 border border-white/10 hover:border-green-500/50 rounded-xl transition-all text-center font-semibold">👤 Human</button>
          <button onClick={()=>answer('ai')} className="p-4 bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all text-center font-semibold">🤖 AI</button>
        </div>
      ) : (
        <div className={`p-4 rounded-xl border ${choice===r.answer?'bg-green-500/10 border-green-500/30':'bg-red-500/10 border-red-500/30'}`}>
          <p className="font-bold text-white">{choice===r.answer?'✅ Correct!':'❌ Wrong!'} It was written by {r.answer==='ai'?'AI 🤖':'a Human 👤'}</p>
          <p className="text-gray-400 text-sm mt-2">{r.explanation}</p>
          <button onClick={next} className="mt-3 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">{current<rounds.length-1?'Next →':'See Results'}</button>
        </div>
      )}
    </div>
  );
}
