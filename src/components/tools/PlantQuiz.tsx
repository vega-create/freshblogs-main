import { useState } from 'react';

const questions = [
  {q:'How much light does your space get?',opts:['☀️ Bright direct sunlight','🌤️ Bright indirect light','🌥️ Low light / shade']},
  {q:'How often will you remember to water?',opts:['💧 Every few days','💧 Once a week','💧 Every 2+ weeks (I forget)']},
  {q:'What is your experience level?',opts:['🌱 Complete beginner','🌿 Some experience','🌳 Green thumb']},
  {q:'What do you want from your plant?',opts:['🎨 Beautiful to look at','🫁 Air purification','🍃 Low maintenance']},
];

interface PlantResult {name:string;emoji:string;light:string;water:string;difficulty:string;why:string}

function getResult(answers:number[]):PlantResult {
  const [light,water,exp,goal]=answers;
  if(water===2&&exp===0) return {name:'Snake Plant (Sansevieria)',emoji:'🌵',light:'Any light',water:'Every 2-3 weeks',difficulty:'Very Easy',why:'Nearly impossible to kill. Thrives on neglect and purifies air. Perfect for beginners who forget to water.'};
  if(water===2&&light===2) return {name:'ZZ Plant',emoji:'🌿',light:'Low to bright indirect',water:'Every 2-3 weeks',difficulty:'Very Easy',why:'Tolerates low light and drought. Glossy leaves look great with zero effort.'};
  if(light===0&&exp>=1) return {name:'Succulent Collection',emoji:'🪴',light:'Bright direct sun',water:'Every 1-2 weeks',difficulty:'Easy',why:'Love your sunny spot! Come in endless varieties and colors. Great for windowsills.'};
  if(goal===0&&light>=1) return {name:'Monstera Deliciosa',emoji:'🌱',light:'Bright indirect',water:'Weekly',difficulty:'Medium',why:'Iconic split leaves make a dramatic statement. A true showstopper plant.'};
  if(goal===1) return {name:'Peace Lily',emoji:'🌸',light:'Low to medium light',water:'When leaves droop',difficulty:'Easy',why:'NASA-verified air purifier. Tells you when it needs water by drooping. Beautiful white flowers.'};
  if(light===2&&goal===2) return {name:'Pothos',emoji:'🌿',light:'Low to bright indirect',water:'When soil is dry',difficulty:'Very Easy',why:'Cascading vines look gorgeous. Adapts to almost any condition. Great trailing plant.'};
  if(exp===2&&light<=1) return {name:'Fiddle Leaf Fig',emoji:'🌳',light:'Bright indirect',water:'When top inch dry',difficulty:'Medium-Hard',why:'Stunning statement tree for experienced plant parents. Rewards consistent care beautifully.'};
  if(water===0) return {name:'Fern (Boston)',emoji:'🌿',light:'Medium indirect',water:'Keep moist',difficulty:'Medium',why:'Loves regular watering and humidity. Lush, full fronds create a jungle vibe.'};
  return {name:'Spider Plant',emoji:'🌿',light:'Bright indirect',water:'Weekly',difficulty:'Easy',why:'Adaptable, produces cute baby plants you can share. Great air purifier and very forgiving.'};
}

export default function PlantQuiz() {
  const [current,setCurrent]=useState(0);
  const [answers,setAnswers]=useState<number[]>([]);
  const [done,setDone]=useState(false);

  const answer = (idx:number) => {
    const na=[...answers,idx];setAnswers(na);
    if(current<questions.length-1) setCurrent(current+1); else setDone(true);
  };
  const reset = ()=>{setCurrent(0);setAnswers([]);setDone(false);};

  if(done){
    const r=getResult(answers);
    return(
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 text-center">
          <div className="text-5xl mb-2">{r.emoji}</div>
          <h2 className="text-2xl font-bold text-white">{r.name}</h2>
          <p className="text-gray-300 mt-3">{r.why}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-white/5 rounded-lg text-center"><p className="text-xs text-gray-500">Light</p><p className="text-sm text-white mt-1">{r.light}</p></div>
          <div className="p-3 bg-white/5 rounded-lg text-center"><p className="text-xs text-gray-500">Water</p><p className="text-sm text-white mt-1">{r.water}</p></div>
          <div className="p-3 bg-white/5 rounded-lg text-center"><p className="text-xs text-gray-500">Difficulty</p><p className="text-sm text-white mt-1">{r.difficulty}</p></div>
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
        <div className="w-32 h-2 bg-white/10 rounded-full"><div className="h-full bg-green-500 rounded-full transition-all" style={{width:`${(current+1)/questions.length*100}%`}}/></div>
      </div>
      <h2 className="text-xl font-bold text-white">{q.q}</h2>
      <div className="grid gap-3">
        {q.opts.map((o,i)=>(
          <button key={i} onClick={()=>answer(i)} className="text-left p-4 bg-white/5 hover:bg-green-600/30 border border-white/10 hover:border-green-500/50 rounded-xl transition-all">{o}</button>
        ))}
      </div>
    </div>
  );
}
