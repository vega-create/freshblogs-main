import { useState } from 'react';

const meals: Record<string,{name:string;time:string;difficulty:string;emoji:string}[]> = {
  Quick:[
    {name:'Spaghetti Aglio e Olio',time:'15 min',difficulty:'Easy',emoji:'🍝'},
    {name:'Avocado Toast with Egg',time:'10 min',difficulty:'Easy',emoji:'🥑'},
    {name:'Quesadillas',time:'10 min',difficulty:'Easy',emoji:'🌮'},
    {name:'Stir-Fry Noodles',time:'15 min',difficulty:'Easy',emoji:'🍜'},
    {name:'Caprese Salad',time:'5 min',difficulty:'Easy',emoji:'🥗'},
    {name:'Grilled Cheese & Tomato Soup',time:'15 min',difficulty:'Easy',emoji:'🧀'},
  ],
  Comfort:[
    {name:'Mac and Cheese',time:'30 min',difficulty:'Easy',emoji:'🧀'},
    {name:'Chicken Pot Pie',time:'45 min',difficulty:'Medium',emoji:'🥧'},
    {name:'Beef Stew',time:'2 hours',difficulty:'Medium',emoji:'🍲'},
    {name:'Lasagna',time:'1 hour',difficulty:'Medium',emoji:'🍝'},
    {name:'Fried Rice',time:'20 min',difficulty:'Easy',emoji:'🍚'},
    {name:'Meatball Sub',time:'30 min',difficulty:'Easy',emoji:'🥖'},
  ],
  Healthy:[
    {name:'Grilled Salmon & Veggies',time:'25 min',difficulty:'Easy',emoji:'🐟'},
    {name:'Buddha Bowl',time:'20 min',difficulty:'Easy',emoji:'🥗'},
    {name:'Chicken Caesar Salad',time:'15 min',difficulty:'Easy',emoji:'🥬'},
    {name:'Lentil Soup',time:'30 min',difficulty:'Easy',emoji:'🍲'},
    {name:'Turkey Lettuce Wraps',time:'15 min',difficulty:'Easy',emoji:'🥬'},
    {name:'Quinoa Stuffed Peppers',time:'40 min',difficulty:'Medium',emoji:'🫑'},
  ],
  DateNight:[
    {name:'Homemade Pizza',time:'45 min',difficulty:'Medium',emoji:'🍕'},
    {name:'Shrimp Scampi',time:'20 min',difficulty:'Easy',emoji:'🦐'},
    {name:'Beef Tenderloin',time:'1 hour',difficulty:'Hard',emoji:'🥩'},
    {name:'Risotto',time:'40 min',difficulty:'Medium',emoji:'🍚'},
    {name:'Lobster Pasta',time:'30 min',difficulty:'Medium',emoji:'🦞'},
    {name:'Chocolate Fondue',time:'15 min',difficulty:'Easy',emoji:'🍫'},
  ],
};

export default function DinnerSpinnerTool() {
  const [category,setCategory]=useState('');
  const [result,setResult]=useState<typeof meals.Quick[0]|null>(null);
  const [spinning,setSpinning]=useState(false);

  const spin = (cat?:string) => {
    const c = cat||category||Object.keys(meals)[Math.floor(Math.random()*4)];
    if(!category) setCategory(c);
    setSpinning(true);
    let count = 0;
    const pool = meals[c];
    const interval = setInterval(()=>{
      setResult(pool[Math.floor(Math.random()*pool.length)]);
      count++;
      if(count>10){clearInterval(interval);setSpinning(false);}
    },100);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.keys(meals).map(c=>(
          <button key={c} onClick={()=>{setCategory(c);setResult(null);}}
            className={`p-3 rounded-lg text-center text-sm transition-all ${category===c?'bg-purple-600 ring-2 ring-purple-400':'bg-white/5 hover:bg-white/10'}`}>
            {c==='Quick'?'⚡':c==='Comfort'?'🛋️':c==='Healthy'?'🥗':'🕯️'} {c==='DateNight'?'Date Night':c}
          </button>
        ))}
      </div>

      <button onClick={()=>spin()} className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]">
        {spinning?'🎰 Spinning...':'🎰 Spin for Dinner!'}
      </button>

      {result && !spinning && (
        <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
          <div className="text-5xl mb-3">{result.emoji}</div>
          <h2 className="text-2xl font-bold text-white">{result.name}</h2>
          <div className="flex justify-center gap-4 mt-3">
            <span className="text-sm text-gray-400">⏱️ {result.time}</span>
            <span className="text-sm text-gray-400">📊 {result.difficulty}</span>
          </div>
          <button onClick={()=>spin()} className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">🔄 Spin Again</button>
        </div>
      )}
    </div>
  );
}
