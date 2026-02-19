import { useState } from 'react';

const questions = [
  {q:'What is your ideal climate?',opts:['☀️ Hot & sunny','🌤️ Warm & pleasant','❄️ Cold & snowy','🌴 Tropical']},
  {q:'What matters most on vacation?',opts:['🏛️ Culture & history','🏖️ Beach & relaxation','🏔️ Nature & adventure','🍕 Food & nightlife']},
  {q:'Your travel budget?',opts:['💰 Budget-friendly','💵 Mid-range comfort','💎 Luxury experience']},
  {q:'Who are you traveling with?',opts:['🎒 Solo adventure','❤️ Romantic getaway','👨‍👩‍👧‍👦 Family trip','🎉 Friends trip']},
  {q:'Your ideal pace?',opts:['🏃 Action-packed itinerary','🚶 Balanced mix','🧘 Slow & relaxing']},
];

interface Dest {name:string;country:string;emoji:string;why:string;bestTime:string;budget:string}

function getResult(a:number[]):Dest {
  const [climate,interest,budget,travel,pace]=a;
  if(climate===3&&interest===1) return {name:'Bali',country:'Indonesia',emoji:'🌴',why:'Tropical paradise with stunning beaches, spiritual temples, and incredible cuisine at amazing value.',bestTime:'Apr-Oct (dry season)',budget:'$50-150/day'};
  if(interest===0&&budget<=1) return {name:'Lisbon',country:'Portugal',emoji:'🏰',why:'Rich history, colorful streets, amazing pastéis de nata, and one of Europe\'s most affordable capitals.',bestTime:'Mar-May, Sep-Nov',budget:'$60-120/day'};
  if(climate===2) return {name:'Reykjavik',country:'Iceland',emoji:'🇮🇸',why:'Northern lights, dramatic landscapes, hot springs, and otherworldly beauty. A once-in-a-lifetime experience.',bestTime:'Sep-Mar (Northern Lights), Jun-Aug (midnight sun)',budget:'$150-300/day'};
  if(interest===2&&pace===0) return {name:'Queenstown',country:'New Zealand',emoji:'🏔️',why:'The adventure capital of the world — bungee jumping, hiking, skiing, and jaw-dropping scenery.',bestTime:'Dec-Feb (summer), Jun-Aug (skiing)',budget:'$100-200/day'};
  if(interest===3&&climate<=1) return {name:'Tokyo',country:'Japan',emoji:'🗼',why:'Mind-blowing food scene, neon-lit nightlife, ancient temples, and cutting-edge technology in harmony.',bestTime:'Mar-May (cherry blossoms), Oct-Nov (autumn)',budget:'$80-200/day'};
  if(budget===2&&interest===1) return {name:'Maldives',country:'Maldives',emoji:'🏝️',why:'Crystal-clear waters, overwater villas, and the ultimate luxury beach escape.',bestTime:'Nov-Apr (dry season)',budget:'$300-1000/day'};
  if(travel===1) return {name:'Santorini',country:'Greece',emoji:'🇬🇷',why:'Iconic blue domes, sunset views, wine tasting, and Mediterranean romance at its finest.',bestTime:'Apr-Jun, Sep-Oct',budget:'$100-250/day'};
  if(travel===2) return {name:'Costa Rica',country:'Costa Rica',emoji:'🦜',why:'Incredible biodiversity, kid-friendly adventures, zip-lining, and beautiful beaches. Pura Vida!',bestTime:'Dec-Apr (dry season)',budget:'$80-180/day'};
  if(travel===3&&interest===3) return {name:'Barcelona',country:'Spain',emoji:'🇪🇸',why:'Epic nightlife, world-class food, stunning Gaudí architecture, and Mediterranean beaches.',bestTime:'May-Jun, Sep-Oct',budget:'$80-180/day'};
  return {name:'Kyoto',country:'Japan',emoji:'⛩️',why:'Ancient temples, zen gardens, geisha districts, and the soul of traditional Japan. Peaceful and profound.',bestTime:'Mar-May (cherry blossoms), Oct-Nov',budget:'$80-150/day'};
}

export default function DestinationQuiz() {
  const [current,setCurrent]=useState(0);
  const [answers,setAnswers]=useState<number[]>([]);
  const [done,setDone]=useState(false);

  const answer=(idx:number)=>{const na=[...answers,idx];setAnswers(na);if(current<questions.length-1)setCurrent(c=>c+1);else setDone(true);};
  const reset=()=>{setCurrent(0);setAnswers([]);setDone(false);};

  if(done){
    const r=getResult(answers);
    return(
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl border border-teal-500/30 text-center">
          <div className="text-5xl mb-2">{r.emoji}</div>
          <h2 className="text-2xl font-bold text-white">{r.name}</h2>
          <p className="text-teal-400 text-sm">{r.country}</p>
          <p className="text-gray-300 mt-3">{r.why}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-white/5 rounded-lg text-center"><p className="text-xs text-gray-500">Best Time</p><p className="text-sm text-white mt-1">{r.bestTime}</p></div>
          <div className="p-3 bg-white/5 rounded-lg text-center"><p className="text-xs text-gray-500">Daily Budget</p><p className="text-sm text-white mt-1">{r.budget}</p></div>
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
        <div className="w-32 h-2 bg-white/10 rounded-full"><div className="h-full bg-teal-500 rounded-full transition-all" style={{width:`${(current+1)/questions.length*100}%`}}/></div>
      </div>
      <h2 className="text-xl font-bold text-white">{q.q}</h2>
      <div className="grid gap-3">
        {q.opts.map((o,i)=>(
          <button key={i} onClick={()=>answer(i)} className="text-left p-4 bg-white/5 hover:bg-teal-600/30 border border-white/10 hover:border-teal-500/50 rounded-xl transition-all">{o}</button>
        ))}
      </div>
    </div>
  );
}
