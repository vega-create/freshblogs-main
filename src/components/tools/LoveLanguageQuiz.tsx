import { useState } from 'react';

const questions = [
  {q:'What makes you feel most loved?',a:'Hearing "I love you" or sincere compliments',b:'A long, warm hug',d:'WA-PT'},
  {q:'You prefer a partner who:',a:'Helps with chores without being asked',b:'Plans a special date night',d:'AS-QT'},
  {q:'After a hard day, you want:',a:'Someone to listen and encourage you',b:'A thoughtful surprise gift',d:'WA-RG'},
  {q:'You feel most connected when:',a:'Spending uninterrupted time together',b:'Holding hands or cuddling',d:'QT-PT'},
  {q:'The best birthday gift is:',a:'A heartfelt letter or card',b:'Something they put effort into finding',d:'WA-RG'},
  {q:'You feel neglected when your partner:',a:'Is always busy and distracted',b:'Rarely hugs or touches you',d:'QT-PT'},
  {q:'You show love by:',a:'Doing helpful things for them',b:'Buying thoughtful presents',d:'AS-RG'},
  {q:'A perfect evening is:',a:'Deep conversation, no phones',b:'Partner cooks your favorite meal',d:'QT-AS'},
  {q:'You notice most when someone:',a:'Says something kind about you',b:'Does a favor without asking',d:'WA-AS'},
  {q:'Which bothers you more?',a:'Going a week without a compliment',b:'Going a week without a hug',d:'WA-PT'},
];

const languages: Record<string,{name:string;emoji:string;desc:string;tips:string}> = {
  WA:{name:'Words of Affirmation',emoji:'💬',desc:'You feel most loved through verbal expressions — compliments, encouragement, "I love you," and written notes.',tips:'Tell your partner what you appreciate about them. Leave notes. Send encouraging texts.'},
  PT:{name:'Physical Touch',emoji:'🤗',desc:'Physical closeness makes you feel secure and loved — hugs, hand-holding, and affectionate gestures.',tips:'Hold hands in public. Give long hugs. Sit close together. A gentle touch goes a long way.'},
  QT:{name:'Quality Time',emoji:'⏰',desc:'Undivided attention is your love fuel. You feel most connected during focused, shared experiences.',tips:'Put phones away during dinner. Plan regular date nights. Listen actively when they talk.'},
  RG:{name:'Receiving Gifts',emoji:'🎁',desc:'Thoughtful gifts show you someone was thinking of you. It is the thought and effort behind the gift that matters.',tips:'Remember special dates. Pick up small surprises. The gift does not need to be expensive — just thoughtful.'},
  AS:{name:'Acts of Service',emoji:'🛠️',desc:'Actions speak louder than words for you. When someone helps lighten your load, you feel deeply cared for.',tips:'Help without being asked. Take over a chore. Run an errand for them. Actions = love.'},
};

export default function LoveLanguageQuiz() {
  const [current,setCurrent]=useState(0);
  const [scores,setScores]=useState<Record<string,number>>({WA:0,PT:0,QT:0,RG:0,AS:0});
  const [done,setDone]=useState(false);

  const answer = (choice:'a'|'b') => {
    const dim = questions[current].d.split('-');
    const key = choice==='a'?dim[0]:dim[1];
    const ns = {...scores,[key]:scores[key]+1};
    setScores(ns);
    if(current<questions.length-1) setCurrent(current+1);
    else setDone(true);
  };

  const getResult = () => Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  const reset = () => {setCurrent(0);setScores({WA:0,PT:0,QT:0,RG:0,AS:0});setDone(false);};

  if(done) {
    const top = getResult();
    const info = languages[top];
    const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl border border-pink-500/30 text-center">
          <div className="text-5xl mb-2">{info.emoji}</div>
          <h2 className="text-2xl font-bold text-white">{info.name}</h2>
          <p className="text-gray-300 mt-3 max-w-md mx-auto">{info.desc}</p>
          <div className="mt-4 p-3 bg-white/5 rounded-lg"><p className="text-xs text-pink-400 uppercase font-bold mb-1">💡 Tips</p><p className="text-gray-300 text-sm">{info.tips}</p></div>
        </div>
        <div className="space-y-2">
          {sorted.map(([k,v])=>{const l=languages[k];return(
            <div key={k} className="flex items-center gap-3">
              <span className="text-lg">{l.emoji}</span>
              <div className="flex-1"><div className="flex justify-between text-sm"><span className="text-gray-300">{l.name}</span><span className="text-gray-500">{v}</span></div>
                <div className="w-full h-2 bg-white/10 rounded-full mt-1"><div className="h-full bg-pink-500 rounded-full transition-all" style={{width:`${v/questions.length*100}%`}}/></div>
              </div>
            </div>
          );})}
        </div>
        <button onClick={reset} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">Take Again</button>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Question {current+1}/{questions.length}</span>
        <div className="w-32 h-2 bg-white/10 rounded-full"><div className="h-full bg-pink-500 rounded-full transition-all" style={{width:`${(current+1)/questions.length*100}%`}}/></div>
      </div>
      <h2 className="text-xl font-bold text-white">{q.q}</h2>
      <div className="grid gap-3">
        <button onClick={()=>answer('a')} className="text-left p-4 bg-white/5 hover:bg-pink-600/30 border border-white/10 hover:border-pink-500/50 rounded-xl transition-all">{q.a}</button>
        <button onClick={()=>answer('b')} className="text-left p-4 bg-white/5 hover:bg-pink-600/30 border border-white/10 hover:border-pink-500/50 rounded-xl transition-all">{q.b}</button>
      </div>
    </div>
  );
}
