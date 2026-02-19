import { useState } from 'react';

const questions = [
  {q:'How active are you?',opts:['🏃 Very active','🚶 Moderately active','🛋️ Couch potato']},
  {q:'How much space do you have?',opts:['🏡 House with yard','🏢 Apartment','🏠 Small house']},
  {q:'How much time can you dedicate daily?',opts:['⏰ 2+ hours','⏰ 1 hour','⏰ 30 minutes or less']},
  {q:'Do you have kids?',opts:['👶 Yes, young kids','🧒 Yes, older kids','🚫 No kids']},
  {q:'How do you feel about grooming?',opts:['✂️ Love it','🤷 Don\'t mind','😅 Minimal please']},
  {q:'What matters most to you?',opts:['❤️ Affection & cuddles','🧠 Intelligence & training','😎 Low maintenance']},
];

interface PetResult {name:string;emoji:string;breed:string;why:string;care:string}

function getResult(answers:number[]): PetResult {
  const [active,space,time,kids,groom,priority]=answers;
  // Active + big space + time = active dog breeds
  if(active===0 && space===0 && time<=1) return {name:'Golden Retriever',emoji:'🐕',breed:'Large Dog',why:'Your active lifestyle and spacious home are perfect for this energetic, loving breed.',care:'Daily exercise (1-2 hours), weekly brushing, regular vet visits.'};
  if(active===0 && time<=1) return {name:'Border Collie',emoji:'🐕',breed:'Medium Dog',why:'You have the energy and time to keep up with one of the smartest breeds.',care:'Intense daily exercise, mental stimulation, weekly grooming.'};
  if(active<=1 && kids<=1 && priority===0) return {name:'Cavalier King Charles',emoji:'🐶',breed:'Small Dog',why:'Gentle, affectionate, and great with kids — the perfect family companion.',care:'Daily walks, weekly brushing, lots of lap time.'};
  if(active===2 && space>=1 && time===2) return {name:'Cat (British Shorthair)',emoji:'🐱',breed:'Cat',why:'Independent, low-maintenance, and perfectly content in smaller spaces.',care:'Daily feeding, litter box cleaning, occasional brushing.'};
  if(space>=1 && time===2 && groom===2) return {name:'Fish (Betta)',emoji:'🐟',breed:'Fish',why:'Beautiful, calming, and require minimal daily time commitment.',care:'Feed daily, clean tank weekly, maintain water temperature.'};
  if(priority===1 && time<=1) return {name:'Poodle',emoji:'🐩',breed:'Dog',why:'Incredibly smart and trainable — perfect for someone who values intelligence.',care:'Daily exercise, regular grooming every 6 weeks, mental games.'};
  if(active<=1 && groom<=1 && priority===0) return {name:'Ragdoll Cat',emoji:'🐱',breed:'Cat',why:'Called "puppy cats" for their affectionate nature — they follow you everywhere.',care:'Daily play, weekly brushing, indoor only.'};
  if(kids===0) return {name:'Labrador Retriever',emoji:'🐕',breed:'Large Dog',why:'Patient, gentle, and endlessly fun — the ultimate family dog for young kids.',care:'Daily exercise, weekly brushing, lots of attention.'};
  return {name:'Mixed Breed Dog',emoji:'🐕',breed:'Dog',why:'A shelter mixed breed gives you the best of many worlds — and saves a life.',care:'Varies by size. Daily walks, regular vet care, lots of love.'};
}

export default function PetMatchQuiz() {
  const [current,setCurrent]=useState(0);
  const [answers,setAnswers]=useState<number[]>([]);
  const [done,setDone]=useState(false);

  const answer = (idx:number) => {
    const na=[...answers,idx];
    setAnswers(na);
    if(current<questions.length-1) setCurrent(current+1);
    else setDone(true);
  };

  const reset = ()=>{setCurrent(0);setAnswers([]);setDone(false);};

  if(done){
    const result=getResult(answers);
    return(
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl border border-orange-500/30 text-center">
          <div className="text-6xl mb-2">{result.emoji}</div>
          <h2 className="text-2xl font-bold text-white">{result.name}</h2>
          <span className="text-xs text-orange-400 uppercase">{result.breed}</span>
          <p className="text-gray-300 mt-3">{result.why}</p>
          <div className="mt-4 p-3 bg-white/5 rounded-lg text-left"><p className="text-xs text-orange-400 uppercase font-bold mb-1">🐾 Care Needs</p><p className="text-gray-300 text-sm">{result.care}</p></div>
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
        <div className="w-32 h-2 bg-white/10 rounded-full"><div className="h-full bg-orange-500 rounded-full transition-all" style={{width:`${(current+1)/questions.length*100}%`}}/></div>
      </div>
      <h2 className="text-xl font-bold text-white">{q.q}</h2>
      <div className="grid gap-3">
        {q.opts.map((o,i)=>(
          <button key={i} onClick={()=>answer(i)} className="text-left p-4 bg-white/5 hover:bg-orange-600/30 border border-white/10 hover:border-orange-500/50 rounded-xl transition-all">{o}</button>
        ))}
      </div>
    </div>
  );
}
