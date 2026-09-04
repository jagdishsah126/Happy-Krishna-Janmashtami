// =============================================================================
// 🪔 HOME PAGE DATA STORE (data/home.js)
// =============================================================================

window.HOME_DATA = {
  header: {
    sanskritGreeting: "॥ ॐ श्री कृष्णाय नमः ॥",
    title: "Happy Janmashtami",
    subtitle: "A quiet sanctuary to drop your shoulders, breathe deeply, and find timeless peace in the present moment.",
    badge: "Bhagavad Gita • Timeless Solace"
  },

  breathingGuide: {
    enabled: true,
    title: "Gentle Breath Pacer",
    hint: "Sync your breath with the glowing rhythm",
    phases: [
      { text: "Breathe In Peace...", duration: 4000, class: "inhale" },
      { text: "Hold Gently...", duration: 4000, class: "hold" },
      { text: "Exhale All Worry...", duration: 4000, class: "exhale" },
      { text: "Rest in Stillness...", duration: 4000, class: "rest" }
    ]
  },

  calmEntrance: {
    tag: "The Calm Entrance",
    title: "Welcome. Breathe.",
    openingThought: "You are here because the noise of life has become too loud.",
    coreNarrative: [
      "The Bhagavad Gita was not spoken in a quiet temple. It was spoken on a chaotic battlefield to a man who had completely lost his way.",
      "If you are feeling lost, confused, or terrified of the future, you are in the exact right place to begin."
    ],
    ctaText: "Begin Chapter 1: The Overwhelm →",
    ctaLink: "#chapter1"
  },

  chapterCards: [
    {
      num: "01",
      title: "The Overwhelm",
      subtitle: "Vishada Yoga • It is okay to not have the answers",
      link: "#chapter1",
      icon: "🕊️"
    },
    {
      num: "02",
      title: "The Illusion of Control",
      subtitle: "Karma Yoga • Dropping the heavy burden of 'What if?'",
      link: "#chapter2",
      icon: "⚖️"
    },
    {
      num: "03",
      title: "The Anchor of the Mind",
      subtitle: "Dhyana Yoga • Quieting the internal storm",
      link: "#chapter3",
      icon: "🧘"
    },
    {
      num: "04",
      title: "The Path Forward",
      subtitle: "Svadharma • Acting without a 10-year master plan",
      link: "#chapter4",
      icon: "🧭"
    },
    {
      num: "05",
      title: "The Sacred Refuge",
      subtitle: "Bhakti Yoga • The ultimate sigh of relief & surrender",
      link: "#chapter5",
      icon: "🪷"
    },
    {
      num: "✨",
      title: "The Ultimate Diya Release",
      subtitle: "Sanctuary of Surrender • Entrust your worries to the sky",
      link: "#final",
      icon: "🪔"
    }
  ],

  footer: {
    sanskritClosing: "॥ ॐ शान्तिः शान्तिः शान्तिः ॥",
    blessing: "May the divine wisdom of Shri Krishna illuminate your mind with quiet clarity and deep serenity.",
    subtext: "Crafted with reverence • Wishing you a peaceful Janmashtami",
    diyaClickPrompt: "✨ Click or tap anywhere in the sky to release a glowing Diya"
  }
};
