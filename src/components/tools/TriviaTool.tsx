import { useState, useMemo } from 'react';

const allQuestions = [
  {q:'Which zodiac sign is symbolized by the Ram?',opts:['Aries','Taurus','Capricorn','Leo'],ans:0},
  {q:'What element is Scorpio?',opts:['Fire','Earth','Air','Water'],ans:3},
  {q:'Which planet rules Taurus?',opts:['Mars','Venus','Mercury','Jupiter'],ans:1},
  {q:'What is the last sign of the zodiac?',opts:['Aquarius','Capricorn','Pisces','Scorpio'],ans:2},
  {q:'Which sign is known as "The Twins"?',opts:['Libra','Gemini','Pisces','Aquarius'],ans:1},
  {q:'Leo is ruled by which celestial body?',opts:['Moon','Mars','Sun','Venus'],ans:2},
  {q:'Which sign is associated with the scales?',opts:['Virgo','Libra','Cancer','Capricorn'],ans:1},
  {q:'What element does Sagittarius belong to?',opts:['Water','Earth','Fire','Air'],ans:2},
  {q:'Which sign starts the zodiac calendar?',opts:['Capricorn','Aries','Aquarius','Leo'],ans:1},
  {q:'Pisces is symbolized by what?',opts:['A Crab','A Fish','Two Fish','A Seahorse'],ans:2},
  {q:'Which planet rules Scorpio in modern astrology?',opts:['Saturn','Pluto','Neptune','Uranus'],ans:1},
  {q:'What quality is Cancer? (Cardinal, Fixed, Mutable)',opts:['Cardinal','Fixed','Mutable','None'],ans:0},
  {q:'Which sign is most associated with perfectionism?',opts:['Leo','Virgo','Capricorn','Libra'],ans:1},
  {q:'Aquarius is an _____ sign.',opts:['Water','Fire','Earth','Air'],ans:3},
  {q:'Which planet rules communication in astrology?',opts:['Venus','Jupiter','Mercury','Saturn'],ans:2},
  {q:'The "Age of Aquarius" refers to what?',opts:['A movie','An astrological era','A Beyoncé album','A planet alignment'],ans:1},
  {q:'Which sign is represented by the Archer?',opts:['Aries','Sagittarius','Capricorn','Leo'],ans:1},
  {q:'What does your Rising Sign represent?',opts:['Your emotions','Your career','How others see you','Your love life'],ans:2},
  {q:'Which sign is most associated with home and family?',opts:['Taurus','Libra','Cancer','Virgo'],ans:2},
  {q:'Neptune rules which zodiac sign?',opts:['Aquarius','Pisces','Scorpio','Cancer'],ans:1},
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TriviaTool() {
  const questions = useMemo(() => shuffle(allQuestions).slice(0, 10), []);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[current].ans;
    if (correct) {
      setScore(score + 1);
      const ns = streak + 1;
      setStreak(ns);
      if (ns > bestStreak) setBestStreak(ns);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 1200);
  };

  const reset = () => {
    setCurrent(0); setScore(0); setSelected(null); setDone(false); setStreak(0); setBestStreak(0);
    window.location.reload();
  };

  const getGrade = () => {
    if (score >= 9) return { label: 'Astrology Master! 🏆', color: 'text-yellow-400' };
    if (score >= 7) return { label: 'Star Student ⭐', color: 'text-green-400' };
    if (score >= 5) return { label: 'Cosmic Learner 📚', color: 'text-blue-400' };
    return { label: 'Keep Exploring! 🔮', color: 'text-gray-400' };
  };

  if (done) {
    const grade = getGrade();
    return (
      <div className="text-center space-y-6">
        <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-purple-500/20 rounded-xl border border-white/10">
          <div className="text-5xl mb-3">🎯</div>
          <h2 className="text-3xl font-bold text-white">{score}/{questions.length}</h2>
          <p className={`text-lg font-semibold mt-1 ${grade.color}`}>{grade.label}</p>
          {bestStreak > 1 && <p className="text-sm text-gray-400 mt-2">🔥 Best streak: {bestStreak} in a row</p>}
        </div>
        <button onClick={reset} className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors">
          Play Again
        </button>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Question {current + 1}/{questions.length}</span>
        <div className="flex gap-3">
          <span className="text-green-400">✓ {score}</span>
          {streak > 1 && <span className="text-orange-400">🔥 {streak}</span>}
        </div>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full">
        <div className="h-full bg-purple-500 rounded-full transition-all" style={{width:`${(current+1)/questions.length*100}%`}}/>
      </div>
      <h2 className="text-xl font-bold text-white">{q.q}</h2>
      <div className="grid gap-2">
        {q.opts.map((opt, i) => {
          let cls = 'bg-white/5 hover:bg-purple-600/30 border-white/10';
          if (selected !== null) {
            if (i === q.ans) cls = 'bg-green-600/30 border-green-500/50';
            else if (i === selected) cls = 'bg-red-600/30 border-red-500/50';
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={selected !== null}
              className={`text-left p-4 border rounded-xl transition-all ${cls} ${selected !== null ? 'cursor-default' : 'cursor-pointer'}`}>
              <span className="text-gray-400 mr-2">{String.fromCharCode(65+i)}.</span> {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
