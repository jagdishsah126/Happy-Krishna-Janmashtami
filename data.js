// =============================================================================
// 🪔 THE BHAGAVAD GITA MEDITATIVE SANCTUARY - DATA STORE 🪔
// Janmashtami Edition • All texts, verses, reflections, and rituals are configured here.
// You can edit or add any content in this file to update the sanctuary instantly.
// =============================================================================

const JANMASHTAMI_DATA = {
  header: {
    sanskritGreeting: "॥ ॐ श्री कृष्णाय नमः ॥",
    title: "Happy Janmashtami",
    subtitle: "A quiet sanctuary to drop your shoulders, breathe deeply, and find timeless peace in the present moment.",
    badge: "Bhagavad Gita • Timeless Solace"
  },

  // [Header Section: The Calm Entrance]
  calmEntrance: {
    tag: "The Calm Entrance",
    title: "Welcome. Breathe.",
    openingThought: "You are here because the noise of life has become too loud.",
    coreNarrative: "The Bhagavad Gita was not spoken in a quiet temple. It was spoken on a chaotic battlefield to a man who had completely lost his way. If you are feeling lost, confused, or terrified of the future, you are in the exact right place to begin.",
    actionPrompt: "Take a slow, deep breath. Step into the 5 sacred gateways below when you are ready to let go."
  },

  // The 5 Sacred Gateways of Peace
  wisdomSections: [
    {
      id: "vishada-yoga",
      number: "01",
      gatewayName: "Gateway I • Vishada Yoga",
      title: "The Overwhelm",
      subtitle: "The realization that it is okay to not have the answers.",
      sanskritQuote: "कार्पण्यदोषोपहतस्वभावः\nपृच्छामि त्वां धर्मसंमूढचेताः ।\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे\nशिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम् ॥",
      shlokaReference: "Bhagavad Gita — Chapter 2, Verse 7",
      verse: "“My heart is weighed down with pity; my mind is confused about my duty. I ask you, tell me for certain which is better. I am your student; teach me, for I have surrendered to you.”",
      meaningForYou: "It is completely acceptable to freeze. Before any wisdom was given, Arjuna dropped his weapons and sat down in the middle of the battlefield, paralyzed by anxiety about his future and his choices. You do not need to fake having it all figured out. Acknowledging that you are confused is the first step toward finding clarity. Give yourself permission to just be lost for a moment.",
      practicalTakeaways: {
        heading: "What this means for you tonight:",
        points: [
          "Give yourself full permission to pause. Freezing under pressure is not weakness—it is your soul signaling for a quiet reset.",
          "You do not need to put on a brave face or pretend you have life figured out.",
          "Honest admission of confusion is the sacred doorway through which genuine clarity enters."
        ]
      },
      mantra: "It is okay not to know. I give myself permission to be still and allow clarity to find me."
    },
    {
      id: "karma-yoga",
      number: "02",
      gatewayName: "Gateway II • Karma Yoga",
      title: "The Illusion of Control",
      subtitle: "Letting go of the heavy burden of “What if?” and “What next?”.",
      sanskritQuote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
      shlokaReference: "Bhagavad Gita — Chapter 2, Verse 47",
      verse: "“You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.”",
      meaningForYou: "Your anxiety about your career and your life comes from trying to control a future that hasn't happened yet. The Gita offers a profound relief: the outcome is not your responsibility. Your only job is to focus on the work immediately in front of you today. Put your energy into the effort, and let the universe handle the results. You are carrying a weight you were never meant to hold. Drop it.",
      practicalTakeaways: {
        heading: "What this means for you tonight:",
        points: [
          "You don't have to figure out your entire career today. Just focus honestly on the single task before you.",
          "Outcomes belong to the grand tapestry of life; your peace belongs to your present, sincere effort.",
          "Drop the heavy backpack of future 'what ifs' and notice how effortlessly your chest can expand again."
        ]
      },
      mantra: "My only responsibility is this present moment. I let the universe take care of the rest."
    },
    {
      id: "dhyana-yoga",
      number: "03",
      gatewayName: "Gateway III • Dhyana Yoga",
      title: "The Anchor of the Mind",
      subtitle: "Quieting the internal storm.",
      sanskritQuote: "असंशयं महाबाहो मनो दुर्निग्रहं चलम् ।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥",
      shlokaReference: "Bhagavad Gita — Chapter 6, Verse 35",
      verse: "“The mind is restless and difficult to restrain, but it is subdued by practice and detachment.”",
      meaningForYou: "Your mind will constantly try to drag you into past regrets or future panics. It will tell you that you are falling behind or making the wrong choices. This is the nature of the human mind—it is like a restless wind. Do not fight it with frustration. Instead, gently bring your focus back to the present moment, over and over again. Peace is not the absence of wandering thoughts; it is the practice of constantly returning to the 'now.'",
      practicalTakeaways: {
        heading: "What this means for you tonight:",
        points: [
          "Don't fight your restless thoughts with frustration. Notice them like clouds passing across a dark sky.",
          "Every single breath is an open invitation to return home to this exact second.",
          "True peace is not a mind that never wanders, but a heart that gently forgives the wandering and returns."
        ]
      },
      mantra: "My mind may wander like the wind, but I am the quiet, unshakeable sky behind it."
    },
    {
      id: "dharma-yoga",
      number: "04",
      gatewayName: "Gateway IV • Svadharma",
      title: "The Path Forward",
      subtitle: "How to act when you don't have a grand master plan.",
      sanskritQuote: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् ।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥",
      shlokaReference: "Bhagavad Gita — Chapter 3, Verse 35",
      verse: "“It is far better to discharge one's prescribed duties, even though faultily, than another's duties perfectly.”",
      meaningForYou: "You do not need a perfect, 10-year life plan. You just need to follow your own internal compass today. Do not look at what others are doing or what society expects you to be. What is your immediate responsibility right now? Focus on being true to your own nature and your own current stage of life. The next step will reveal itself only after you take the first one.",
      practicalTakeaways: {
        heading: "What this means for you tonight:",
        points: [
          "Stop measuring your private chapter against someone else's highlight reel.",
          "Living your authentic truth—even with imperfections—is infinitely superior to copying someone else's life.",
          "Your dharma is simply the honest responsibility waiting patiently in front of you right now."
        ]
      },
      mantra: "I walk my authentic path with sincerity. The next step will appear only when I take this one."
    },
    {
      id: "bhakti-yoga",
      number: "05",
      gatewayName: "Gateway V • Bhakti & Sharanagati",
      title: "The Ultimate Release",
      subtitle: "Finding rest and unconditional trust.",
      sanskritQuote: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
      shlokaReference: "Bhagavad Gita — Chapter 18, Verse 66",
      verse: "“Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.”",
      meaningForYou: "This is the final, ultimate sigh of relief. You don't have to carry the universe on your shoulders. You are a small, beautiful part of a massive, divine system that is unfolding exactly as it should. Do your best, be kind, act with integrity, and then completely surrender the rest. Trust the journey. Do not fear.",
      practicalTakeaways: {
        heading: "What this means for you tonight:",
        points: [
          "Take a slow, deep, healing exhale. You are supported and held by life itself.",
          "Surrender is not giving up—it is the supreme courage of trusting the wisdom of the universe.",
          "Lay down your fears. You were never meant to carry the whole cosmos alone."
        ]
      },
      mantra: "I release the weight of the universe. I am held, I am guided, and I do not fear."
    }
  ],

  // Interactive Ritual: "The Diya of Surrender"
  surrenderDiyaRitual: {
    title: "Light a Diya of Surrender",
    subtitle: "What is a heavy worry, anxiety, or expectation you are carrying tonight? Entrust it to the quiet night sky.",
    inputPlaceholder: "Type your worry here (e.g., Fear of not succeeding, Anxiety about tomorrow...)",
    buttonText: "Release into the Sky 🪔",
    presetWorries: [
      "Anxiety about my career path & future",
      "The heavy pressure to have everything figured out",
      "Fear of failing or disappointing others",
      "Doubts about my self-worth and timing"
    ],
    successMessage: "🪔 Your worry has dissolved into a rising light. You are free to rest."
  },

  // Ambient Soundscapes
  soundscapes: [
    { id: "flute", name: "Meditative Flute", icon: "🪈", description: "Bansuri ambient drone in meditative C#" },
    { id: "om", name: "Cosmic Om (432Hz)", icon: "🕉️", description: "Harmonic healing frequency for deep peace" },
    { id: "night", name: "Quiet Night Rain", icon: "🌧️", description: "Gentle falling rain & distant crickets" }
  ],

  footer: {
    sanskritClosing: "॥ ॐ शान्तिः शान्तिः शान्तिः ॥",
    blessing: "May the divine wisdom and playful grace of Shri Krishna illuminate your mind with quiet clarity, fearlessness, and deep serenity.",
    subtext: "Crafted with reverence • Wishing you a deeply peaceful & blessed Janmashtami",
    diyaClickPrompt: "✨ Click or tap anywhere in the starry sky to release a glowing Diya"
  }
};
