#!/bin/bash
# Pexels image downloader for FreshBlogs
API_KEY="Eb4SCeYc0RlQ7er88ykLNPuymXDfe9CBSr9smQd5q4YjmVN0zsVpb8gV"
BASE="/Users/linyangting/Desktop/freshblogs-main/public/images"

download_image() {
  local query="$1"
  local output="$2"
  local orientation="${3:-landscape}"

  if [ -f "$output" ]; then
    echo "SKIP: $output already exists"
    return
  fi

  # Search Pexels
  local url="https://api.pexels.com/v1/search?query=$(echo "$query" | sed 's/ /+/g')&per_page=1&orientation=$orientation&size=medium"
  local img_url=$(curl -s "$url" -H "Authorization: $API_KEY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['photos'][0]['src']['large'])" 2>/dev/null)

  if [ -z "$img_url" ]; then
    echo "FAIL: No image found for '$query'"
    return 1
  fi

  curl -s -o "$output" "$img_url"
  echo "OK: $output (query: $query)"
  sleep 0.3
}

echo "=== Downloading Astrology Images ==="
download_image "zodiac wheel astrology chart" "$BASE/astrology/12-houses.jpg"
download_image "aquarius zodiac water bearer constellation" "$BASE/astrology/aquarius-compatibility.jpg"
download_image "aries zodiac ram fire" "$BASE/astrology/aries-compatibility.jpg"
download_image "romantic couple zodiac love" "$BASE/astrology/best-couples.jpg"
download_image "birth chart astrology reading" "$BASE/astrology/birth-chart-guide.jpg"
download_image "cancer zodiac crab moon" "$BASE/astrology/cancer-compatibility.jpg"
download_image "capricorn zodiac mountain goat" "$BASE/astrology/capricorn-compatibility.jpg"
download_image "broken heart zodiac warning" "$BASE/astrology/challenging-zodiac-combinations.jpg"
download_image "chinese dragon zodiac eastern" "$BASE/astrology/chinese-vs-western.jpg"
download_image "fire water earth air elements nature" "$BASE/astrology/elements.jpg"
download_image "full moon night sky" "$BASE/astrology/full-moon-calendar-2026.jpg"
download_image "gemini zodiac twins constellation" "$BASE/astrology/gemini-compatibility.jpg"
download_image "leo zodiac lion golden sun" "$BASE/astrology/leo-compatibility.jpg"
download_image "libra zodiac scales balance" "$BASE/astrology/libra-compatibility.jpg"
download_image "colorful crystals spiritual healing" "$BASE/astrology/lucky-colors-zodiac-2026.jpg"
download_image "planet mars red night sky" "$BASE/astrology/mars-astrology.jpg"
download_image "mercury planet space retrograde" "$BASE/astrology/mercury-retrograde-2026.jpg"
download_image "moon phases night cycle" "$BASE/astrology/moon-vs-sun-sign.jpg"
download_image "pisces zodiac fish ocean spiritual" "$BASE/astrology/pisces-compatibility.jpg"
download_image "powerful zodiac crown stars" "$BASE/astrology/powerful-zodiac-signs.jpg"
download_image "sunrise horizon eastern sky dawn" "$BASE/astrology/rising-sign-guide.jpg"
download_image "sagittarius zodiac archer arrow" "$BASE/astrology/sagittarius-compatibility.jpg"
download_image "saturn planet rings space" "$BASE/astrology/saturn-return.jpg"
download_image "scorpio zodiac scorpion dark mysterious" "$BASE/astrology/scorpio-compatibility.jpg"
download_image "taurus zodiac bull earth nature" "$BASE/astrology/taurus-compatibility.jpg"
download_image "venus planet love beauty pink" "$BASE/astrology/venus-astrology.jpg"
download_image "virgo zodiac wheat harvest earth" "$BASE/astrology/virgo-compatibility.jpg"
download_image "career office desk professional work" "$BASE/astrology/zodiac-career-guide.jpg"
download_image "zodiac signs cusp transition blending" "$BASE/astrology/zodiac-cusp-signs.jpg"
download_image "zodiac personality character traits astrology" "$BASE/astrology/zodiac-personality-types.jpg"

echo ""
echo "=== Downloading AI Images ==="
download_image "AI artificial intelligence digital art" "$BASE/ai/ai-image-generators.jpg"
download_image "AI writing detection robot pen" "$BASE/ai/ai-writing-detection.jpg"
download_image "AI tools technology laptop screen" "$BASE/ai/best-free-ai-tools.jpg"
download_image "ChatGPT productivity laptop workspace" "$BASE/ai/chatgpt-prompts.jpg"
download_image "prompt engineering code screen AI" "$BASE/ai/prompt-engineering.jpg"

echo ""
echo "=== Downloading DIY Images ==="
download_image "modern bathroom renovation tiles" "$BASE/diy/bathroom-refresh.jpg"
download_image "home improvement tools workshop" "$BASE/diy/beginner-home-improvement.jpg"
download_image "handyman professional tools repair" "$BASE/diy/diy-vs-professional.jpg"
download_image "essential tools toolbox homeowner" "$BASE/diy/essential-tools.jpg"
download_image "painting room wall roller brush" "$BASE/diy/paint-room-pro.jpg"

echo ""
echo "=== Downloading Dreams Images ==="
download_image "surreal dream clouds sleeping" "$BASE/dreams/common-dreams.jpg"
download_image "water ocean waves dreamy" "$BASE/dreams/dream-water.jpg"
download_image "sleeping bed peaceful morning" "$BASE/dreams/remember-dreams.jpg"
download_image "lucid dream flying surreal sky" "$BASE/dreams/lucid-dreaming.jpg"
download_image "nightmare dark shadow scary" "$BASE/dreams/nightmares.jpg"

echo ""
echo "=== Downloading Garden Images ==="
download_image "companion planting garden vegetables herbs" "$BASE/garden/companion-planting.jpg"
download_image "container garden balcony pots plants" "$BASE/garden/container-gardening.jpg"
download_image "indoor plants low light home decor" "$BASE/garden/indoor-plants.jpg"
download_image "garden maintenance tools season" "$BASE/garden/seasonal-garden.jpg"
download_image "vegetable garden raised bed beginner" "$BASE/garden/vegetable-gardening.jpg"

echo ""
echo "=== Downloading Manifest Images ==="
download_image "journal writing manifestation notebook" "$BASE/manifest/369-method.jpg"
download_image "gratitude journal morning coffee" "$BASE/manifest/gratitude-journal.jpg"
download_image "meditation manifestation peaceful calm" "$BASE/manifest/manifestation-beginners.jpg"
download_image "morning sunrise affirmation positive" "$BASE/manifest/morning-affirmations.jpg"
download_image "vision board photos goals inspiration" "$BASE/manifest/vision-board.jpg"

echo ""
echo "=== Downloading Numerology Images ==="
download_image "angel numbers 111 spiritual light" "$BASE/numerology/angel-numbers.jpg"
download_image "numerology numbers calculation destiny" "$BASE/numerology/life-path-number.jpg"
download_image "master number spiritual enlightenment" "$BASE/numerology/master-numbers.jpg"
download_image "name written calligraphy letters" "$BASE/numerology/name-numerology.jpg"
download_image "couple love numerology heart numbers" "$BASE/numerology/numerology-compatibility.jpg"

echo ""
echo "=== Downloading Personality Images ==="
download_image "attachment relationship couple connection" "$BASE/personality/attachment-styles.jpg"
download_image "enneagram personality types symbol" "$BASE/personality/enneagram-types.jpg"
download_image "love language heart gift affection" "$BASE/personality/love-languages.jpg"
download_image "MBTI personality types psychology test" "$BASE/personality/mbti-types.jpg"
download_image "spirit animal wolf nature spiritual" "$BASE/personality/spirit-animal.jpg"

echo ""
echo "=== Downloading Pets Images ==="
download_image "small dog apartment cozy indoor" "$BASE/pets/apartment-dog-breeds.jpg"
download_image "family dog children playing park" "$BASE/pets/family-dog-breeds.jpg"
download_image "cute cat kitten first pet" "$BASE/pets/first-time-cat.jpg"
download_image "low maintenance pet hamster aquarium" "$BASE/pets/low-maintenance-pets.jpg"
download_image "pet zodiac cat dog astrology fun" "$BASE/pets/pet-zodiac.jpg"

echo ""
echo "=== Downloading Quotes Images ==="
download_image "laughing funny comedy joyful" "$BASE/quotes/funny-quotes.jpg"
download_image "morning sunrise motivational new day" "$BASE/quotes/morning-quotes.jpg"
download_image "motivational climb mountain perseverance" "$BASE/quotes/motivational-quotes.jpg"
download_image "self love mirror confidence woman" "$BASE/quotes/self-love-quotes.jpg"
download_image "wisdom books library ancient thinker" "$BASE/quotes/wisdom-quotes.jpg"

echo ""
echo "=== Downloading Recipes Images ==="
download_image "quick dinner cooking pan kitchen" "$BASE/recipes/30-minute-dinners.jpg"
download_image "air fryer kitchen appliance cooking" "$BASE/recipes/air-fryer-recipes.jpg"
download_image "measuring cups spoons kitchen baking" "$BASE/recipes/kitchen-measurements.jpg"
download_image "meal prep containers food healthy" "$BASE/recipes/meal-prep.jpg"
download_image "pantry shelves ingredients cooking" "$BASE/recipes/pantry-meals.jpg"

echo ""
echo "=== Downloading Tarot Images ==="
download_image "tarot cards reading mystical" "$BASE/tarot/beginners-tarot.jpg"
download_image "cleansing sage smoke crystals spiritual" "$BASE/tarot/cleanse-tarot.jpg"
download_image "major arcana tarot deck spread" "$BASE/tarot/major-arcana.jpg"
download_image "tarot spread cards layout reading" "$BASE/tarot/tarot-spreads.jpg"
download_image "tarot oracle cards comparison spiritual" "$BASE/tarot/tarot-vs-oracle.jpg"

echo ""
echo "=== Downloading Travel Images ==="
download_image "travel destination tropical beach paradise" "$BASE/travel/best-destinations.jpg"
download_image "budget travel backpack world map" "$BASE/travel/budget-travel.jpg"
download_image "packing suitcase travel luggage" "$BASE/travel/packing-list.jpg"
download_image "solo travel woman city exploring" "$BASE/travel/solo-travel.jpg"
download_image "travel photography phone camera scenic" "$BASE/travel/travel-photography.jpg"

echo ""
echo "=== DONE ==="
ls -la $BASE/astrology/ | wc -l
ls -la $BASE/ai/ | wc -l
echo "Total images downloaded:"
find $BASE -name "*.jpg" | wc -l
