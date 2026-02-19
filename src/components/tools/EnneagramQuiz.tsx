import { useState } from 'react';

const questions = [
  {q:'I value being...',opts:[{t:'Correct and principled',s:1},{t:'Helpful and caring',s:2},{t:'Successful and impressive',s:3}]},
  {q:'My biggest fear is...',opts:[{t:'Being emotionally vulnerable',s:5},{t:'Being abandoned or alone',s:6},{t:'Being deprived or in pain',s:7}]},
  {q:'Others would describe me as...',opts:[{t:'Unique and creative',s:4},{t:'Powerful and decisive',s:8},{t:'Easygoing and peaceful',s:9}]},
  {q:'When stressed, I tend to...',opts:[{t:'Become critical of myself and others',s:1},{t:'People-please and overextend',s:2},{t:'Work harder to prove myself',s:3}]},
  {q:'I am drawn to...',opts:[{t:'Deep emotions and authenticity',s:4},{t:'Knowledge and understanding',s:5},{t:'Safety and loyalty',s:6}]},
  {q:'My ideal day involves...',opts:[{t:'New experiences and fun',s:7},{t:'Taking charge and making things happen',s:8},{t:'Peace, quiet, and comfort',s:9}]},
  {q:'In conflict, I...',opts:[{t:'Stand firm on what is right',s:1},{t:'Focus on keeping harmony',s:9},{t:'Withdraw to think it over',s:5}]},
  {q:'I struggle with...',opts:[{t:'Overthinking and anxiety',s:6},{t:'Being scattered and unfocused',s:7},{t:'Anger and control issues',s:8}]},
  {q:'My core motivation is...',opts:[{t:'To be needed and appreciated',s:2},{t:'To achieve and be admired',s:3},{t:'To be unique and understood',s:4}]},
];

const types: Record<number,{name:string;title:string;desc:string;wing:string}> = {
  1:{name:'Type 1',title:'The Reformer',desc:'Principled, purposeful, self-controlled, and perfectionistic. You strive to improve yourself and the world.',wing:'Wings: 9 (The Dreamer) or 2 (The Helper)'},
  2:{name:'Type 2',title:'The Helper',desc:'Generous, demonstrative, people-pleasing, and possessive. You need to be needed and express love through service.',wing:'Wings: 1 (The Servant) or 3 (The Charmer)'},
  3:{name:'Type 3',title:'The Achiever',desc:'Adaptable, excelling, driven, and image-conscious. You are motivated by success and being seen as valuable.',wing:'Wings: 2 (The Enchanter) or 4 (The Professional)'},
  4:{name:'Type 4',title:'The Individualist',desc:'Expressive, dramatic, self-absorbed, and temperamental. You seek identity and significance through uniqueness.',wing:'Wings: 3 (The Aristocrat) or 5 (The Bohemian)'},
  5:{name:'Type 5',title:'The Investigator',desc:'Perceptive, innovative, secretive, and isolated. You seek understanding and guard your energy carefully.',wing:'Wings: 4 (The Iconoclast) or 6 (The Problem Solver)'},
  6:{name:'Type 6',title:'The Loyalist',desc:'Engaging, responsible, anxious, and suspicious. You seek security and are deeply loyal to trusted people.',wing:'Wings: 5 (The Defender) or 7 (The Buddy)'},
  7:{name:'Type 7',title:'The Enthusiast',desc:'Spontaneous, versatile, acquisitive, and scattered. You chase experiences and avoid pain through positivity.',wing:'Wings: 6 (The Entertainer) or 8 (The Realist)'},
  8:{name:'Type 8',title:'The Challenger',desc:'Self-confident, decisive, willful, and confrontational. You protect yourself and others through strength.',wing:'Wings: 7 (The Maverick) or 9 (The Bear)'},
  9:{name:'Type 9',title:'The Peacemaker',desc:'Receptive, reassuring, complacent, and resigned. You seek inner and outer peace above all else.',wing:'Wings: 8 (The Referee) or 1 (The Dreamer)'},
};

export default function EnneagramQuiz() {
  const [current,setCurrent]=useState(0);
  const [scores,setScores]=useState<Record<number,number>>({1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0});
  const [done,setDone]=useState(false);

  const answer = (type:number) => {
    const ns={...scores,[type]:scores[type]+1};
    setScores(ns);
    if(current<questions.length-1)setCurrent(current+1);
    else setDone(true);
  };

  const getResult = ()=>Number(Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]);
  const reset = ()=>{setCurrent(0);setScores({1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0});setDone(false);};

  if(done){
    const top=getResult();
    const info=types[top];
    return(
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl border border-violet-500/30 text-center">
          <div className="text-5xl font-bold text-white">{top}</div>
          <h2 className="text-xl font-bold text-violet-400 mt-1">{info.title}</h2>
          <p className="text-gray-300 mt-3 max-w-md mx-auto">{info.desc}</p>
          <p className="text-xs text-gray-500 mt-3">{info.wing}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k,v])=>(
            <div key={k} className="text-center p-2 bg-white/5 rounded-lg">
              <div className="text-lg font-bold text-white">{k}</div>
              <div className="text-xs text-gray-500">{types[Number(k)].title}</div>
              <div className="text-xs text-violet-400">{v} pts</div>
            </div>
          ))}
        </div>
        <button onClick={reset} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">Take Again</button>
      </div>
    );
  }

  const q=questions[current];
  return(
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Question {current+1}/{questions.length}</span>
        <div className="w-32 h-2 bg-white/10 rounded-full"><div className="h-full bg-violet-500 rounded-full transition-all" style={{width:`${(current+1)/questions.length*100}%`}}/></div>
      </div>
      <h2 className="text-xl font-bold text-white">{q.q}</h2>
      <div className="grid gap-3">
        {q.opts.map((o,i)=>(
          <button key={i} onClick={()=>answer(o.s)} className="text-left p-4 bg-white/5 hover:bg-violet-600/30 border border-white/10 hover:border-violet-500/50 rounded-xl transition-all">{o.t}</button>
        ))}
      </div>
    </div>
  );
}
