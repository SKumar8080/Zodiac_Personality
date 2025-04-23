type Language = 'en' | 'hi';
let language: Language = 'en';

const enDescriptions: Record<string, string> = {
  mesh: "🔥 Bold and fearless. Mesh log kisi ki nahi sunte, except their inner fire.",
  vrishabh: "🍃 Loyal, grounded, aur thoda stubborn. But when you commit, it’s all or nothing.",
  mithun: "🌪️ Chatty, witty, multitasking king. Aaj yahan, kal wahan.",
  karka: "🌊 Emotional ocean. Dil se care karte ho!",
  singh: "👑 Born to rule. Drama hi zindagi hai.",
  kanya: "📚 Logical, neat, and planner. Excel sheet of emotions.",
  tula: "⚖️ Stylish and balanced. Chaos bhi classy lagta hai.",
  vrishchik: "🦂 Intense, magnetic. Full power, no brake.",
  dhanu: "🏹 Wanderer with gyaan. Meme guru.",
  makar: "🧱 Ambitious & grounded. Calm outside, volcano inside.",
  kumbh: "🔮 Quirky rebel. Invents jugaad in dreams.",
  meen: "🐟 Dreamy, intuitive, filmy soul."
};

const hiDescriptions: Record<string, string> = {
  mesh: "🔥 निर्भय और जोशीले। अपने मन की सुनते हैं, और किसी की नहीं।",
  vrishabh: "🍃 भरोसेमंद और जिद्दी। जो ठान लिया, वो पूरा करते हैं।",
  mithun: "🌪️ बातूनी और होशियार। हर जगह मौजूद रहते हैं एक साथ।",
  karka: "🌊 भावना प्रधान। सबसे ज्यादा केयरिंग और इमोशनल।",
  singh: "👑 राजा जैसे स्वभाव वाले। ध्यान का केंद्र रहना पसंद करते हैं।",
  kanya: "📚 परफेक्शनिस्ट। प्लानिंग और सफाई में मास्टर।",
  tula: "⚖️ संतुलित, फैशनेबल, और हमेशा चार्मिंग।",
  vrishchik: "🦂 तीव्र और रहस्यमय। या तो सब कुछ, या कुछ नहीं।",
  dhanu: "🏹 यात्राएं पसंद हैं, लेकिन ज्ञान से भी भरपूर।",
  makar: "🧱 गंभीर और मेहनती। लक्ष्य साधने वाले।",
  kumbh: "🔮 विचित्र लेकिन होशियार। नए विचारों से भरे रहते हैं।",
  meen: "🐟 सपनों की दुनिया में जीने वाले। बेहद संवेदनशील।"
};

const traits: Record<string, string[]> = {
  mesh: ["🚀 Risk taker in life, but slow replier.", "🔥 Fights for fun (and wins)."],
  vrishabh: ["🍫 Food = Emotion.", "💸 Bargains even on Flipkart Sale."],
  mithun: ["🎤 Talks nonstop.", "🧠 Knows everything, even your crush’s birthday."],
  karka: ["😭 Cries watching puppy ads.", "🫂 Emotional hoarder."],
  singh: ["🦁 Majestic AF.", "👑 Attitude is their birthright."],
  kanya: ["📋 Planner of every moment.", "🧽 Cleans to relieve stress."],
  tula: ["💅 Sab kuch stylish hona chahiye.", "⚖️ Decision? 6 hours lagte hain."],
  vrishchik: ["🕵️ Spy-level intuition.", "🔥 Dangerous when silent."],
  dhanu: ["🏕️ Travel dreamer.", "😂 Cracks jokes even during exams."],
  makar: ["🧠 CEO in making.", "📊 Always focused."],
  kumbh: ["🤖 Tech and tandoori thinker.", "🛸 Time traveler in dreams."],
  meen: ["🎧 Escapes in music.", "🌧️ Cries romantically in rain."]
};

const rashiButtons = document.querySelectorAll<HTMLButtonElement>(".rashi-grid button");
const resultBox = document.getElementById("resultBox")!;
const moreBtn = document.getElementById("moreBtn")!;
const deepDiveBox = document.getElementById("deepDiveBox")!;
const langToggle = document.getElementById("langToggle")!;
const shareBtn = document.getElementById("shareBtn")!;

let selectedRashi: string | null = localStorage.getItem("rashi");
let lastTrait: string | null = localStorage.getItem("trait");

function updateDisplay() {
  if (selectedRashi) {
    const desc = language === 'hi' ? hiDescriptions[selectedRashi] : enDescriptions[selectedRashi];
    resultBox.textContent = desc;
    if (lastTrait) {
      deepDiveBox.textContent = lastTrait;
    }
    moreBtn.style.display = "inline-block";
    shareBtn.style.display = "inline-block";
  }
}

rashiButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedRashi = button.dataset.rashi!;
    lastTrait = "";
    localStorage.setItem("rashi", selectedRashi);
    localStorage.removeItem("trait");
    updateDisplay();
  });
});

moreBtn.addEventListener("click", () => {
  if (selectedRashi) {
    const traitList = traits[selectedRashi];
    const randomTrait = traitList[Math.floor(Math.random() * traitList.length)];
    deepDiveBox.textContent = randomTrait;
    localStorage.setItem("trait", randomTrait);
    lastTrait = randomTrait;
    shareBtn.style.display = "inline-block";
  }
});

langToggle.addEventListener("click", () => {
  language = language === 'en' ? 'hi' : 'en';
  langToggle.textContent = language === 'en' ? 'Switch to Hindi 🇮🇳' : 'Switch to English 🇬🇧';
  updateDisplay();
});

shareBtn.addEventListener("click", () => {
  if (selectedRashi) {
    const desc = language === 'hi' ? hiDescriptions[selectedRashi] : enDescriptions[selectedRashi];
    const message = encodeURIComponent(`My Rashi is ${selectedRashi.toUpperCase()}!\n\n✨ Description:\n${desc}\n\n🔍 Personality:\n${lastTrait ?? ""}\nCheck yours now!`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }
});

updateDisplay(); // Auto load if saved in localStorage
