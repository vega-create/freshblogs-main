import { useState } from 'react';

const signList = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const emojis = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const elements: Record<string,string> = { Aries:'Fire', Taurus:'Earth', Gemini:'Air', Cancer:'Water', Leo:'Fire', Virgo:'Earth', Libra:'Air', Scorpio:'Water', Sagittarius:'Fire', Capricorn:'Earth', Aquarius:'Air', Pisces:'Water' };
const qualities: Record<string,string> = { Aries:'Cardinal', Taurus:'Fixed', Gemini:'Mutable', Cancer:'Cardinal', Leo:'Fixed', Virgo:'Mutable', Libra:'Cardinal', Scorpio:'Fixed', Sagittarius:'Mutable', Capricorn:'Cardinal', Aquarius:'Fixed', Pisces:'Mutable' };
const rulers: Record<string,string> = { Aries:'Mars', Taurus:'Venus', Gemini:'Mercury', Cancer:'Moon', Leo:'Sun', Virgo:'Mercury', Libra:'Venus', Scorpio:'Pluto', Sagittarius:'Jupiter', Capricorn:'Saturn', Aquarius:'Uranus', Pisces:'Neptune' };

const getSunSign = (m:number,d:number) => {
  const cutoffs = [20,19,21,20,21,21,23,23,23,23,22,22];
  return d >= cutoffs[m-1] ? m % 12 : (m+10) % 12;
};

export default function BirthChartTool() {
  const [month,setMonth] = useState(0);
  const [day,setDay] = useState(0);
  const [year,setYear] = useState(0);
  const [hour,setHour] = useState(-1);
  const [chart,setChart] = useState<{sun:number;moon:number;rising:number;mercury:number;venus:number;mars:number}|null>(null);

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const generate = () => {
    if (!month||!day||!year||hour<0) return;
    const sunIdx = getSunSign(month,day);
    const base = new Date(year,month-1,day).getTime();
    const epoch = new Date(2000,0,6).getTime();
    const lc = 29.53059*24*3600*1000;
    const moonIdx = Math.floor((((base-epoch)/lc%1+1)%1)*12)%12;
    const risingIdx = (sunIdx + Math.floor(((hour+18)%24)/2))%12;
    // Simplified: Mercury near sun, Venus 0-2 signs away, Mars based on year
    const mercuryIdx = (sunIdx + (year%3===0?1:year%3===1?0:11))%12;
    const venusIdx = (sunIdx + (year%5===0?2:year%5===1?1:year%5===2?0:year%5===3?11:10))%12;
    const marsIdx = (sunIdx + Math.floor((year*day)%12))%12;
    setChart({sun:sunIdx,moon:moonIdx,rising:risingIdx,mercury:mercuryIdx,venus:venusIdx,mars:marsIdx});
  };

  const placements = chart ? [
    {label:'☀️ Sun',idx:chart.sun,desc:'Your core identity & ego'},
    {label:'🌙 Moon',idx:chart.moon,desc:'Your emotions & inner world'},
    {label:'⬆️ Rising',idx:chart.rising,desc:'How others perceive you'},
    {label:'☿ Mercury',idx:chart.mercury,desc:'How you think & communicate'},
    {label:'♀ Venus',idx:chart.venus,desc:'How you love & what you value'},
    {label:'♂ Mars',idx:chart.mars,desc:'Your drive & energy'},
  ] : null;

  // Count elements
  const elementCount = placements ? placements.reduce((acc,p) => {
    const el = elements[signList[p.idx]];
    acc[el] = (acc[el]||0)+1;
    return acc;
  },{} as Record<string,number>) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <select value={month} onChange={e=>{setMonth(Number(e.target.value));setChart(null);}}
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-purple-500">
          <option value={0}>Month</option>
          {months.map((m,i)=><option key={i} value={i+1} className="bg-gray-900">{m}</option>)}
        </select>
        <select value={day} onChange={e=>{setDay(Number(e.target.value));setChart(null);}}
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-purple-500">
          <option value={0}>Day</option>
          {Array.from({length:31},(_,i)=><option key={i} value={i+1} className="bg-gray-900">{i+1}</option>)}
        </select>
        <select value={year} onChange={e=>{setYear(Number(e.target.value));setChart(null);}}
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-purple-500">
          <option value={0}>Year</option>
          {Array.from({length:80},(_,i)=><option key={i} value={2006-i} className="bg-gray-900">{2006-i}</option>)}
        </select>
        <select value={hour} onChange={e=>{setHour(Number(e.target.value));setChart(null);}}
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-purple-500">
          <option value={-1}>Hour</option>
          {Array.from({length:24},(_,i)=><option key={i} value={i} className="bg-gray-900">{i===0?'12 AM':i<12?`${i} AM`:i===12?'12 PM':`${i-12} PM`}</option>)}
        </select>
      </div>
      <button onClick={generate} disabled={!month||!day||!year||hour<0}
        className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">
        📊 Generate Birth Chart
      </button>

      {placements && elementCount && (
        <div className="space-y-4">
          <div className="grid gap-2">
            {placements.map((p,i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-lg w-8">{p.label.split(' ')[0]}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{p.label.split(' ').slice(1).join(' ')}</span>
                    <span className="text-lg">{emojis[p.idx]}</span>
                    <span className="text-purple-400 font-semibold">{signList[p.idx]}</span>
                  </div>
                  <p className="text-xs text-gray-500">{p.desc}</p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <div>{elements[signList[p.idx]]}</div>
                  <div>{rulers[signList[p.idx]]}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Element balance */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <h3 className="font-bold text-sm mb-3">Element Balance</h3>
            <div className="grid grid-cols-4 gap-2">
              {['Fire','Earth','Air','Water'].map(el => (
                <div key={el} className="text-center">
                  <div className="text-lg">{el==='Fire'?'🔥':el==='Earth'?'🌍':el==='Air'?'💨':'💧'}</div>
                  <div className="text-xs text-gray-400">{el}</div>
                  <div className="w-full h-2 bg-white/10 rounded-full mt-1">
                    <div className="h-full bg-purple-500 rounded-full" style={{width:`${(elementCount[el]||0)/6*100}%`}}/>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{elementCount[el]||0}/6</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">Simplified chart. For accurate planetary positions, consult a professional astrologer with your exact birth time and location.</p>
        </div>
      )}
    </div>
  );
}
