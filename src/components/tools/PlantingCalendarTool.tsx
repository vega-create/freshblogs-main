import { useState } from 'react';

const zones: Record<string,string> = {'3':'Northern (MN, WI, ND)','4':'Upper Midwest (IA, MI, NY)','5':'Central (IL, OH, PA, CO)','6':'Mid-Atlantic (VA, KY, MO)','7':'Southeast (NC, TN, OK, TX-N)','8':'South (GA, AL, TX-S)','9':'Deep South / SW (FL, AZ, CA-S)','10':'Tropical (S FL, HI, SoCal coast)'};

const plants: {name:string;emoji:string;zones:Record<string,[number,number]>}[] = [
  {name:'Tomatoes',emoji:'🍅',zones:{'3':[5,6],'4':[5,6],'5':[4,5],'6':[4,5],'7':[3,4],'8':[2,3],'9':[1,2],'10':[1,12]}},
  {name:'Lettuce',emoji:'🥬',zones:{'3':[4,5],'4':[3,4],'5':[3,4],'6':[2,3],'7':[2,3],'8':[1,2],'9':[10,11],'10':[10,11]}},
  {name:'Peppers',emoji:'🫑',zones:{'3':[5,6],'4':[5,6],'5':[4,5],'6':[4,5],'7':[3,4],'8':[2,3],'9':[1,2],'10':[1,12]}},
  {name:'Cucumbers',emoji:'🥒',zones:{'3':[5,6],'4':[5,6],'5':[4,5],'6':[4,5],'7':[3,4],'8':[2,3],'9':[2,3],'10':[1,12]}},
  {name:'Carrots',emoji:'🥕',zones:{'3':[4,5],'4':[3,4],'5':[3,4],'6':[2,3],'7':[1,2],'8':[1,2],'9':[10,11],'10':[10,11]}},
  {name:'Basil',emoji:'🌿',zones:{'3':[5,6],'4':[5,6],'5':[4,5],'6':[3,4],'7':[3,4],'8':[2,3],'9':[2,3],'10':[1,12]}},
  {name:'Zucchini',emoji:'🥒',zones:{'3':[5,6],'4':[5,6],'5':[4,5],'6':[4,5],'7':[3,4],'8':[2,3],'9':[2,3],'10':[1,12]}},
  {name:'Strawberries',emoji:'🍓',zones:{'3':[4,5],'4':[4,5],'5':[3,4],'6':[2,3],'7':[2,3],'8':[1,2],'9':[10,11],'10':[10,11]}},
  {name:'Sunflowers',emoji:'🌻',zones:{'3':[5,6],'4':[4,5],'5':[4,5],'6':[3,4],'7':[3,4],'8':[2,3],'9':[2,3],'10':[1,2]}},
  {name:'Peas',emoji:'🫛',zones:{'3':[4,5],'4':[3,4],'5':[2,3],'6':[2,3],'7':[1,2],'8':[1,2],'9':[10,11],'10':[10,11]}},
];

const monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function PlantingCalendarTool() {
  const [zone,setZone]=useState('');
  const currentMonth = new Date().getMonth()+1;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Select your USDA Hardiness Zone:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(zones).map(([z,label])=>(
            <button key={z} onClick={()=>setZone(z)}
              className={`p-2 rounded-lg text-xs text-center transition-all ${zone===z?'bg-green-600 ring-2 ring-green-400':'bg-white/5 hover:bg-white/10'}`}>
              <div className="font-bold">Zone {z}</div>
              <div className="text-gray-500 text-[10px]">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {zone && (
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-gray-400">🌱 What to Plant in Zone {zone}</h3>
          {plants.map(p=>{
            const range = p.zones[zone];
            if(!range) return null;
            const [start,end]=range;
            const plantNow = currentMonth>=start && currentMonth<=end;
            const soonMonth = start > currentMonth ? start : null;
            return(
              <div key={p.name} className={`flex items-center gap-3 p-3 rounded-lg border ${plantNow?'bg-green-500/10 border-green-500/30':'bg-white/5 border-white/10'}`}>
                <span className="text-2xl">{p.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">{p.name}</p>
                  <p className="text-xs text-gray-500">Plant: {monthNames[start-1]} – {monthNames[end-1]}</p>
                </div>
                {plantNow ? (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-bold">🌱 Plant Now!</span>
                ) : soonMonth ? (
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Starts {monthNames[soonMonth-1]}</span>
                ) : (
                  <span className="px-2 py-1 bg-white/5 text-gray-500 text-xs rounded-full">Next season</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
