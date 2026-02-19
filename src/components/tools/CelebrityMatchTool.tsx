import { useState } from 'react';

const signList = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const emojis = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

const celebrities: Record<string, {name:string;bday:string;known:string}[]> = {
  Aries: [{name:'Lady Gaga',bday:'Mar 28',known:'Singer & actress'},{name:'Robert Downey Jr.',bday:'Apr 4',known:'Actor'},{name:'Emma Watson',bday:'Apr 15',known:'Actress & activist'},{name:'Elton John',bday:'Mar 25',known:'Singer & pianist'},{name:'Mariah Carey',bday:'Mar 27',known:'Singer'}],
  Taurus: [{name:'Adele',bday:'May 5',known:'Singer'},{name:'Dwayne Johnson',bday:'May 2',known:'Actor & wrestler'},{name:'Queen Elizabeth II',bday:'Apr 21',known:'Former Queen of UK'},{name:'David Beckham',bday:'May 2',known:'Football legend'},{name:'Lizzo',bday:'Apr 27',known:'Singer & rapper'}],
  Gemini: [{name:'Kanye West',bday:'Jun 8',known:'Rapper & designer'},{name:'Angelina Jolie',bday:'Jun 4',known:'Actress & director'},{name:'Marilyn Monroe',bday:'Jun 1',known:'Actress & icon'},{name:'Johnny Depp',bday:'Jun 9',known:'Actor'},{name:'Naomi Campbell',bday:'May 22',known:'Supermodel'}],
  Cancer: [{name:'Ariana Grande',bday:'Jun 26',known:'Singer & actress'},{name:'Tom Hanks',bday:'Jul 9',known:'Actor'},{name:'Selena Gomez',bday:'Jul 22',known:'Singer & actress'},{name:'Princess Diana',bday:'Jul 1',known:'Princess of Wales'},{name:'Elon Musk',bday:'Jun 28',known:'Entrepreneur'}],
  Leo: [{name:'Barack Obama',bday:'Aug 4',known:'44th US President'},{name:'Jennifer Lopez',bday:'Jul 24',known:'Singer & actress'},{name:'Daniel Radcliffe',bday:'Jul 23',known:'Actor'},{name:'Mick Jagger',bday:'Jul 26',known:'Rock legend'},{name:'Madonna',bday:'Aug 16',known:'Queen of Pop'}],
  Virgo: [{name:'Beyoncé',bday:'Sep 4',known:'Singer & icon'},{name:'Keanu Reeves',bday:'Sep 2',known:'Actor'},{name:'Zendaya',bday:'Sep 1',known:'Actress'},{name:'Michael Jackson',bday:'Aug 29',known:'King of Pop'},{name:'Pink',bday:'Sep 8',known:'Singer'}],
  Libra: [{name:'Kim Kardashian',bday:'Oct 21',known:'Media personality'},{name:'Will Smith',bday:'Sep 25',known:'Actor'},{name:'John Lennon',bday:'Oct 9',known:'Musician'},{name:'Cardi B',bday:'Oct 11',known:'Rapper'},{name:'Serena Williams',bday:'Sep 26',known:'Tennis champion'}],
  Scorpio: [{name:'Leonardo DiCaprio',bday:'Nov 11',known:'Actor'},{name:'Drake',bday:'Oct 24',known:'Rapper'},{name:'Bill Gates',bday:'Oct 28',known:'Tech mogul'},{name:'Katy Perry',bday:'Oct 25',known:'Singer'},{name:'Ryan Gosling',bday:'Nov 12',known:'Actor'}],
  Sagittarius: [{name:'Taylor Swift',bday:'Dec 13',known:'Singer-songwriter'},{name:'Brad Pitt',bday:'Dec 18',known:'Actor'},{name:'Jay-Z',bday:'Dec 4',known:'Rapper & mogul'},{name:'Miley Cyrus',bday:'Nov 23',known:'Singer'},{name:'Nicki Minaj',bday:'Dec 8',known:'Rapper'}],
  Capricorn: [{name:'LeBron James',bday:'Dec 30',known:'Basketball legend'},{name:'Michelle Obama',bday:'Jan 17',known:'Former First Lady'},{name:'Dolly Parton',bday:'Jan 19',known:'Country icon'},{name:'Timothée Chalamet',bday:'Dec 27',known:'Actor'},{name:'Kate Middleton',bday:'Jan 9',known:'Princess of Wales'}],
  Aquarius: [{name:'Oprah Winfrey',bday:'Jan 29',known:'Media mogul'},{name:'Harry Styles',bday:'Feb 1',known:'Singer & actor'},{name:'The Weeknd',bday:'Feb 16',known:'Singer'},{name:'Shakira',bday:'Feb 2',known:'Singer'},{name:'Michael Jordan',bday:'Feb 17',known:'Basketball legend'}],
  Pisces: [{name:'Rihanna',bday:'Feb 20',known:'Singer & mogul'},{name:'Justin Bieber',bday:'Mar 1',known:'Singer'},{name:'Albert Einstein',bday:'Mar 14',known:'Physicist'},{name:'Steve Jobs',bday:'Feb 24',known:'Apple co-founder'},{name:'Bad Bunny',bday:'Mar 10',known:'Musician'}],
};

export default function CelebrityMatchTool() {
  const [sign, setSign] = useState('');

  const celebs = sign ? celebrities[sign] : [];
  const today = new Date();
  const dayIdx = Math.floor(today.getTime() / 86400000) % 5;
  const todayMatch = celebs.length > 0 ? celebs[dayIdx % celebs.length] : null;

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-400">Pick your sign to see which celebrities share it</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {signList.map((s, i) => (
          <button key={s} onClick={() => setSign(s)}
            className={`p-3 rounded-lg text-center transition-all ${sign === s ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-white/5 hover:bg-white/10'}`}>
            <div className="text-2xl">{emojis[i]}</div>
            <div className="text-[10px] mt-1">{s}</div>
          </button>
        ))}
      </div>

      {todayMatch && (
        <div className="p-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-500/30 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Today's Celebrity Twin</p>
          <div className="text-5xl mt-2">⭐</div>
          <h2 className="text-2xl font-bold text-white mt-2">{todayMatch.name}</h2>
          <p className="text-gray-400 text-sm">{todayMatch.known} • Born {todayMatch.bday}</p>
          <p className="text-purple-400 mt-1">{emojis[signList.indexOf(sign)]} {sign}</p>
        </div>
      )}

      {celebs.length > 0 && (
        <div>
          <h3 className="font-bold text-sm text-gray-400 mb-3">All Famous {sign}s</h3>
          <div className="grid gap-2">
            {celebs.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xl">⭐</span>
                <div className="flex-1">
                  <span className="font-semibold text-white">{c.name}</span>
                  <span className="text-gray-500 text-sm ml-2">{c.known}</span>
                </div>
                <span className="text-xs text-gray-500">{c.bday}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
