import { useState } from 'react';

const signList = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const emojis: Record<string,string> = { Aries:'♈', Taurus:'♉', Gemini:'♊', Cancer:'♋', Leo:'♌', Virgo:'♍', Libra:'♎', Scorpio:'♏', Sagittarius:'♐', Capricorn:'♑', Aquarius:'♒', Pisces:'♓' };

// Compatibility scores (simplified matrix)
const scores: Record<string, Record<string, number>> = {
  Aries: { Aries:75, Taurus:45, Gemini:83, Cancer:42, Leo:97, Virgo:35, Libra:65, Scorpio:50, Sagittarius:93, Capricorn:47, Aquarius:78, Pisces:67 },
  Taurus: { Aries:45, Taurus:80, Gemini:40, Cancer:97, Leo:55, Virgo:90, Libra:65, Scorpio:88, Sagittarius:30, Capricorn:95, Aquarius:42, Pisces:85 },
  Gemini: { Aries:83, Taurus:40, Gemini:70, Cancer:45, Leo:88, Virgo:55, Libra:93, Scorpio:35, Sagittarius:78, Capricorn:38, Aquarius:95, Pisces:52 },
  Cancer: { Aries:42, Taurus:97, Gemini:45, Cancer:75, Leo:50, Virgo:85, Libra:43, Scorpio:94, Sagittarius:38, Capricorn:60, Aquarius:30, Pisces:98 },
  Leo: { Aries:97, Taurus:55, Gemini:88, Cancer:50, Leo:78, Virgo:40, Libra:85, Scorpio:58, Sagittarius:95, Capricorn:35, Aquarius:68, Pisces:42 },
  Virgo: { Aries:35, Taurus:90, Gemini:55, Cancer:85, Leo:40, Virgo:72, Libra:48, Scorpio:88, Sagittarius:32, Capricorn:95, Aquarius:38, Pisces:65 },
  Libra: { Aries:65, Taurus:65, Gemini:93, Cancer:43, Leo:85, Virgo:48, Libra:75, Scorpio:55, Sagittarius:88, Capricorn:45, Aquarius:92, Pisces:50 },
  Scorpio: { Aries:50, Taurus:88, Gemini:35, Cancer:94, Leo:58, Virgo:88, Libra:55, Scorpio:72, Sagittarius:42, Capricorn:85, Aquarius:48, Pisces:92 },
  Sagittarius: { Aries:93, Taurus:30, Gemini:78, Cancer:38, Leo:95, Virgo:32, Libra:88, Scorpio:42, Sagittarius:76, Capricorn:40, Aquarius:85, Pisces:55 },
  Capricorn: { Aries:47, Taurus:95, Gemini:38, Cancer:60, Leo:35, Virgo:95, Libra:45, Scorpio:85, Sagittarius:40, Capricorn:78, Aquarius:50, Pisces:65 },
  Aquarius: { Aries:78, Taurus:42, Gemini:95, Cancer:30, Leo:68, Virgo:38, Libra:92, Scorpio:48, Sagittarius:85, Capricorn:50, Aquarius:72, Pisces:55 },
  Pisces: { Aries:67, Taurus:85, Gemini:52, Cancer:98, Leo:42, Virgo:65, Libra:50, Scorpio:92, Sagittarius:55, Capricorn:65, Aquarius:55, Pisces:78 },
};

const getLevel = (s: number) => s >= 90 ? { label: 'Soulmate Match! 💕', color: 'text-pink-400' } : s >= 75 ? { label: 'Great Match! ✨', color: 'text-green-400' } : s >= 60 ? { label: 'Good Potential 👍', color: 'text-yellow-400' } : s >= 45 ? { label: 'Challenging 🤔', color: 'text-orange-400' } : { label: 'Difficult Match ⚡', color: 'text-red-400' };

const tips: Record<string, string> = {
  fire_fire: 'Two fire signs together create explosive passion. The key is giving each other space to shine individually.',
  fire_earth: 'Fire and Earth can balance each other beautifully — fire brings excitement, earth brings stability.',
  fire_air: 'Fire and Air are a dynamic duo! Air fans the flames of creativity and keeps things exciting.',
  fire_water: 'Fire and Water require patience. Steam can be powerful, but both need to respect their differences.',
  earth_earth: 'Double Earth is rock-solid and dependable. Just make sure to add spontaneity to avoid routine.',
  earth_air: 'Earth and Air have different speeds. Communication and patience are the keys to harmony.',
  earth_water: 'Earth and Water nurture each other naturally. This is one of the most harmonious element pairings.',
  air_air: 'Two Air signs keep conversation flowing forever. Ground yourselves occasionally for deeper connection.',
  air_water: 'Air and Water can create beautiful mist or stormy seas. Emotional awareness makes all the difference.',
  water_water: 'Double Water is deeply intuitive and emotionally rich. Set boundaries to avoid drowning in feelings.',
};

const elements: Record<string, string> = { Aries:'fire', Taurus:'earth', Gemini:'air', Cancer:'water', Leo:'fire', Virgo:'earth', Libra:'air', Scorpio:'water', Sagittarius:'fire', Capricorn:'earth', Aquarius:'air', Pisces:'water' };

export default function CompatibilityTool() {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');

  const score = sign1 && sign2 ? scores[sign1][sign2] : null;
  const level = score ? getLevel(score) : null;

  const getTip = () => {
    if (!sign1 || !sign2) return '';
    const e1 = elements[sign1], e2 = elements[sign2];
    const key = [e1, e2].sort().join('_');
    return tips[key] || '';
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Your Sign</label>
          <div className="grid grid-cols-4 gap-2">
            {signList.map((s) => (
              <button
                key={s}
                onClick={() => setSign1(s)}
                className={`p-2 rounded-lg text-center transition-all ${sign1 === s ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <div className="text-xl">{emojis[s]}</div>
                <div className="text-[10px] mt-0.5">{s}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Partner's Sign</label>
          <div className="grid grid-cols-4 gap-2">
            {signList.map((s) => (
              <button
                key={s}
                onClick={() => setSign2(s)}
                className={`p-2 rounded-lg text-center transition-all ${sign2 === s ? 'bg-pink-600 ring-2 ring-pink-400' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <div className="text-xl">{emojis[s]}</div>
                <div className="text-[10px] mt-0.5">{s}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {score !== null && level && (
        <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
          <div className="text-4xl mb-2">{emojis[sign1]} ❤️ {emojis[sign2]}</div>
          <h2 className="text-xl font-bold mb-1">{sign1} × {sign2}</h2>
          <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden my-4">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="text-3xl font-bold text-white">{score}%</div>
          <p className={`text-lg font-semibold mt-1 ${level.color}`}>{level.label}</p>
          {getTip() && <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">{getTip()}</p>}
          <div className="flex justify-center gap-3 mt-4">
            <a href={`/astrology/blog/${sign1.toLowerCase()}-compatibility/`} className="text-sm text-purple-400 hover:text-white transition-colors">
              Read {sign1} Guide →
            </a>
            <a href={`/astrology/blog/${sign2.toLowerCase()}-compatibility/`} className="text-sm text-purple-400 hover:text-white transition-colors">
              Read {sign2} Guide →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
