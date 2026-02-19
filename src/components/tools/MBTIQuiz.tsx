import { useState } from 'react';

const questions = [
  {q:'At a party, you prefer to:',a:'Talk to many people, including strangers',b:'Talk deeply with a few close friends',d:'EI'},
  {q:'You are more interested in:',a:'What is real and actual',b:'What is possible and theoretical',d:'SN'},
  {q:'When making decisions, you rely more on:',a:'Logic and consistency',b:'Personal values and impact on people',d:'TF'},
  {q:'You prefer your life to be:',a:'Planned and organized',b:'Flexible and spontaneous',d:'JP'},
  {q:'You get energy from:',a:'Being around other people',b:'Spending time alone',d:'EI'},
  {q:'You pay more attention to:',a:'Facts and details',b:'Patterns and big picture',d:'SN'},
  {q:'You value more:',a:'Justice and fairness',b:'Mercy and compassion',d:'TF'},
  {q:'You prefer to:',a:'Have things decided and settled',b:'Keep options open',d:'JP'},
  {q:'In conversations you:',a:'Talk more than listen',b:'Listen more than talk',d:'EI'},
  {q:'You trust:',a:'Experience and evidence',b:'Inspiration and hunches',d:'SN'},
  {q:'You are more:',a:'Tough-minded',b:'Tender-hearted',d:'TF'},
  {q:'You prefer working:',a:'With deadlines and structure',b:'Without rigid schedules',d:'JP'},
];

const types: Record<string,{title:string;desc:string;famous:string}> = {
  INTJ:{title:'The Architect',desc:'Strategic, independent, determined. You see the big picture and work tirelessly toward your vision.',famous:'Elon Musk, Michelle Obama'},
  INTP:{title:'The Logician',desc:'Innovative, curious, analytical. You love exploring complex theories and finding elegant solutions.',famous:'Albert Einstein, Bill Gates'},
  ENTJ:{title:'The Commander',desc:'Bold, imaginative, strong-willed. You find a way — or make one.',famous:'Steve Jobs, Margaret Thatcher'},
  ENTP:{title:'The Debater',desc:'Smart, curious, quick-witted. You love intellectual challenges and playing devil\'s advocate.',famous:'Mark Twain, Tom Hanks'},
  INFJ:{title:'The Advocate',desc:'Quiet, mystical, yet inspiring. You seek meaning and connection in everything.',famous:'Martin Luther King Jr., Taylor Swift'},
  INFP:{title:'The Mediator',desc:'Poetic, kind, altruistic. You see good in everyone and seek to make the world better.',famous:'Shakespeare, J.R.R. Tolkien'},
  ENFJ:{title:'The Protagonist',desc:'Charismatic, inspiring leaders. You rally others toward a greater good.',famous:'Barack Obama, Oprah Winfrey'},
  ENFP:{title:'The Campaigner',desc:'Enthusiastic, creative, social. You see life as full of possibilities.',famous:'Robin Williams, Robert Downey Jr.'},
  ISTJ:{title:'The Logistician',desc:'Practical, fact-minded, reliable. Your word is your bond.',famous:'George Washington, Angela Merkel'},
  ISFJ:{title:'The Defender',desc:'Dedicated, warm, protective. You quietly ensure everyone is taken care of.',famous:'Beyoncé, Queen Elizabeth II'},
  ESTJ:{title:'The Executive',desc:'Excellent administrators. You manage people and processes with order.',famous:'Judge Judy, Sonia Sotomayor'},
  ESFJ:{title:'The Consul',desc:'Caring, social, popular. You are always eager to help and create harmony.',famous:'Taylor Swift, Jennifer Garner'},
  ISTP:{title:'The Virtuoso',desc:'Bold, practical, experimental. You master tools and explore with your hands.',famous:'Bruce Lee, Clint Eastwood'},
  ISFP:{title:'The Adventurer',desc:'Flexible, charming, artistic. You live in the moment with quiet passion.',famous:'Bob Dylan, Michael Jackson'},
  ESTP:{title:'The Entrepreneur',desc:'Smart, energetic, perceptive. You live on the edge and love action.',famous:'Donald Trump, Madonna'},
  ESFP:{title:'The Entertainer',desc:'Spontaneous, energetic, fun. You turn any room into a party.',famous:'Adele, Jamie Foxx'},
};

export default function MBTIQuiz() {
  const [current,setCurrent]=useState(0);
  const [scores,setScores]=useState({E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0});
  const [done,setDone]=useState(false);

  const answer = (choice:'a'|'b') => {
    const dim = questions[current].d;
    const k1 = dim[0], k2 = dim[1];
    const ns = {...scores, [choice==='a'?k1:k2]: scores[choice==='a'?k1 as keyof typeof scores:k2 as keyof typeof scores]+1};
    setScores(ns);
    if(current<questions.length-1) setCurrent(current+1);
    else setDone(true);
  };

  const getType = () => {
    const e = scores.E>=scores.I?'E':'I';
    const s = scores.S>=scores.N?'S':'N';
    const t = scores.T>=scores.F?'T':'F';
    const j = scores.J>=scores.P?'J':'P';
    return e+s+t+j;
  };

  const reset = () => {setCurrent(0);setScores({E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0});setDone(false);};

  if(done) {
    const type = getType();
    const info = types[type] || {title:'Unique Type',desc:'You have a unique personality blend!',famous:''};
    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl border border-teal-500/30 text-center">
          <div className="text-5xl font-bold text-white tracking-wider">{type}</div>
          <h2 className="text-xl font-bold text-teal-400 mt-2">{info.title}</h2>
          <p className="text-gray-300 mt-3 max-w-md mx-auto">{info.desc}</p>
          {info.famous && <p className="text-xs text-gray-500 mt-3">Famous {type}s: {info.famous}</p>}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[['E','I'],['S','N'],['T','F'],['J','P']].map(([a,b])=>(
            <div key={a} className="text-center p-2 bg-white/5 rounded-lg">
              <div className="text-xs text-gray-500">{a} vs {b}</div>
              <div className="text-sm font-bold text-white">{scores[a as keyof typeof scores]}-{scores[b as keyof typeof scores]}</div>
            </div>
          ))}
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
        <div className="w-32 h-2 bg-white/10 rounded-full"><div className="h-full bg-teal-500 rounded-full transition-all" style={{width:`${(current+1)/questions.length*100}%`}}/></div>
      </div>
      <h2 className="text-xl font-bold text-white">{q.q}</h2>
      <div className="grid gap-3">
        <button onClick={()=>answer('a')} className="text-left p-4 bg-white/5 hover:bg-teal-600/30 border border-white/10 hover:border-teal-500/50 rounded-xl transition-all">{q.a}</button>
        <button onClick={()=>answer('b')} className="text-left p-4 bg-white/5 hover:bg-teal-600/30 border border-white/10 hover:border-teal-500/50 rounded-xl transition-all">{q.b}</button>
      </div>
    </div>
  );
}
