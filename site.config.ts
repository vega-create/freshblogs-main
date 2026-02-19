export const siteConfig = {
  name: 'FreshBlogs',
  url: 'https://freshblogs.cc',
  description: 'Your daily dose of astrology, personality quizzes, tarot readings, dream interpretations, and more. Free interactive tools and expert insights.',
  author: 'FreshBlogs Editorial Team',
  adsensePubId: 'ca-pub-3493526929407874',
  ga4Id: '', // TODO: add GA4 measurement ID
  lang: 'en',
  locale: 'en_US',
  ogImage: '/images/og-default.png',
  favicon: '/favicon.svg',

  // 13 subdirectory sites
  sites: [
    { slug: 'astrology', name: 'Astrology', emoji: '🔮', color: '#7C3AED', description: 'Daily horoscopes, zodiac compatibility, and birth chart insights' },
    { slug: 'tarot', name: 'Tarot', emoji: '🃏', color: '#6D28D9', description: 'Card readings, spreads, and mystical guidance' },
    { slug: 'numerology', name: 'Numerology', emoji: '🔢', color: '#4F46E5', description: 'Life path numbers, name analysis, and number meanings' },
    { slug: 'dreams', name: 'Dreams', emoji: '🌙', color: '#2563EB', description: 'Dream dictionary, interpretation tools, and sleep insights' },
    { slug: 'personality', name: 'Personality', emoji: '🧠', color: '#DB2777', description: 'MBTI, love language, enneagram quizzes, and more' },
    { slug: 'manifest', name: 'Manifest', emoji: '✨', color: '#D97706', description: 'Affirmations, vision boards, and manifestation guides' },
    { slug: 'quotes', name: 'Quotes', emoji: '💬', color: '#059669', description: 'Daily inspiration, quote maker, and curated collections' },
    { slug: 'pets', name: 'Pets', emoji: '🐾', color: '#EA580C', description: 'Pet matching, breed guides, and owner compatibility' },
    { slug: 'recipes', name: 'Recipes', emoji: '🍳', color: '#DC2626', description: 'Recipe finder, meal planner, and cooking tools' },
    { slug: 'ai', name: 'AI Tools', emoji: '🤖', color: '#0891B2', description: 'AI tool finder, prompt library, and tech insights' },
    { slug: 'travel', name: 'Travel', emoji: '✈️', color: '#0D9488', description: 'Trip planner, packing lists, and destination guides' },
    { slug: 'diy', name: 'DIY', emoji: '🔨', color: '#B45309', description: 'Home projects, calculators, and how-to guides' },
    { slug: 'garden', name: 'Garden', emoji: '🌱', color: '#16A34A', description: 'Planting calendar, care guides, and garden planning' },
  ],

  // Virtual editorial team
  authors: [
    {
      slug: 'luna-starfield',
      name: 'Luna Starfield',
      role: 'Astrology & Mysticism Editor',
      sites: ['astrology', 'tarot', 'numerology'],
      bio: 'Luna has been studying astrology and tarot for over 12 years. With a background in psychology and a lifelong fascination with celestial patterns, she brings a grounded yet mystical perspective to her writing. She believes the stars offer guidance, not destiny — empowering readers to make their own choices with cosmic awareness.',
      avatar: '/images/authors/luna-starfield.webp',
    },
    {
      slug: 'maya-dreamwell',
      name: 'Maya Dreamwell',
      role: 'Dreams & Manifestation Editor',
      sites: ['dreams', 'manifest'],
      bio: 'Maya is a certified dream analyst and manifestation coach with a background in cognitive science. She has helped thousands of readers decode their subconscious messages and turn intentions into reality. Her approach blends scientific research with spiritual wisdom, making complex concepts accessible to everyone.',
      avatar: '/images/authors/maya-dreamwell.webp',
    },
    {
      slug: 'sophie-park',
      name: 'Sophie Park',
      role: 'Personality & Inspiration Editor',
      sites: ['personality', 'quotes'],
      bio: 'Sophie holds a degree in behavioral psychology and has spent 8 years creating personality assessments and curating motivational content. She is passionate about helping people understand themselves better through validated frameworks like MBTI, Enneagram, and attachment theory. Her quizzes have been taken by over 2 million people worldwide.',
      avatar: '/images/authors/sophie-park.webp',
    },
    {
      slug: 'chef-marco-rossi',
      name: 'Chef Marco Rossi',
      role: 'Recipes & Food Editor',
      sites: ['recipes'],
      bio: 'Marco trained at the Culinary Institute of America and spent a decade working in restaurants across Italy, New York, and San Francisco. Now he focuses on making professional cooking techniques accessible for home cooks. His recipes prioritize bold flavors with minimal fuss, and he firmly believes that anyone can cook restaurant-quality meals at home.',
      avatar: '/images/authors/chef-marco-rossi.webp',
    },
    {
      slug: 'emily-chen',
      name: 'Dr. Emily Chen',
      role: 'Pets & Animal Behavior Editor',
      sites: ['pets'],
      bio: 'Emily is a veterinary behaviorist with 10 years of clinical experience. She specializes in the human-animal bond and believes that finding the right pet match is one of the most important decisions a family can make. Her evidence-based approach helps pet owners build happier, healthier relationships with their furry companions.',
      avatar: '/images/authors/emily-chen.webp',
    },
    {
      slug: 'alex-nomad',
      name: 'Alex Nomad',
      role: 'Travel & Adventure Editor',
      sites: ['travel'],
      bio: 'Alex has visited 47 countries across 6 continents and has been a full-time travel writer for 6 years. From budget backpacking to luxury escapes, he provides practical tips and honest reviews based on firsthand experience. His philosophy: the best trip is the one that changes how you see the world.',
      avatar: '/images/authors/alex-nomad.webp',
    },
    {
      slug: 'jake-builder',
      name: 'Jake Builder',
      role: 'DIY & Garden Editor',
      sites: ['diy', 'garden'],
      bio: 'Jake is a licensed contractor and master gardener who has been renovating homes and growing gardens for over 15 years. He breaks down complex projects into step-by-step guides that even beginners can follow. His motto: measure twice, cut once, and always wear safety goggles.',
      avatar: '/images/authors/jake-builder.webp',
    },
    {
      slug: 'aria-tech',
      name: 'Aria Tech',
      role: 'AI & Technology Editor',
      sites: ['ai'],
      bio: 'Aria is a former machine learning engineer turned tech journalist. She has tested over 500 AI tools and breaks down the hype from the reality. Her mission is to help everyday people leverage AI effectively without the jargon. She contributes to several major tech publications and speaks at industry conferences.',
      avatar: '/images/authors/aria-tech.webp',
    },
  ],
};

export default siteConfig;
