// ============================================================
//  SyberAware — Game Data (Client-side only, no DB)
//  4 scenarios per stage, covering essential youth cyber safety
// ============================================================

export const PRE_TEST_SCENARIOS = [
  {
    id: 'pre-1',
    tag: '// THE SCENARIO',
    prompt:
      '"You receive an email from \'GameSupport_X\' saying your account has been flagged. They need your login credentials and birth date to verify you within the next 24 hours or your progress will be deleted. What is your first action?"',
    choices: [
      { id: 'a', label: 'A.', text: 'Reply immediately with the info to save my progress.' },
      { id: 'b', label: 'B.', text: 'Click the link provided in the email to check my status.' },
      { id: 'c', label: 'C.', text: 'Delete the email and report it as phishing.' },
    ],
    correctId: 'c',
    footer: 'SCENARIO // PRE-TEST',
  },
  {
    id: 'pre-2',
    tag: '// THE SCENARIO',
    prompt:
      '"A pop-up appears while gaming: \'You\'ve won a free gaming headset! Click here to claim within 60 seconds!\'. The timer is counting down. What do you do?"',
    choices: [
      { id: 'a', label: 'A.', text: 'Click quickly before the timer runs out — free stuff!' },
      { id: 'b', label: 'B.', text: 'Close the pop-up and ignore it — it\'s a scam.' },
      { id: 'c', label: 'C.', text: 'Ask an adult or google if the game has such a prize.' },
    ],
    correctId: 'b',
    footer: 'SCENARIO // PRE-TEST',
  },
  {
    id: 'pre-3',
    tag: '// THE SCENARIO',
    prompt:
      '"A new online friend sends you a friend request and asks for your full name, school, and home city to \\"verify\\" you are a real person. What do you do?"',
    choices: [
      { id: 'a', label: 'A.', text: 'Share the info — they seem friendly and trustworthy.' },
      { id: 'b', label: 'B.', text: 'Only share my first name and nothing else.' },
      { id: 'c', label: 'C.', text: 'Decline and report the request — real friends don\'t ask that.' },
    ],
    correctId: 'c',
    footer: 'SCENARIO // PRE-TEST',
  },
  {
    id: 'pre-4',
    tag: '// THE SCENARIO',
    prompt:
      '"You are setting a password for your main gaming account. Which of these is the safest password hygiene practice?"',
    choices: [
      { id: 'a', label: 'A.', text: 'Use "GameMaster2024!" so you remember it easily.' },
      { id: 'b', label: 'B.', text: 'Use your school email password so all your logins are the same.' },
      { id: 'c', label: 'C.', text: 'Create a long, unique 4-word passphrase with symbols and numbers.' },
    ],
    correctId: 'c',
    footer: 'SCENARIO // PRE-TEST',
  },
];

export const QUEST_SCENARIOS = [
  {
    id: 'quest-1',
    questNumber: 1,
    totalQuests: 4,
    levelTitle: 'THE PHISHING TRAP',
    sticker: { sender: 'GameSupport_X', time: 'JUST NOW' },
    message:
      '"Hey player! Your account is flagged. Send your login and birth date in 24 hours, or lose all your progress!"',
    byteTip: 'Pause before you click. Real support never asks for your password. What will you do?',
    choices: [
      { id: 'a', label: 'A.', text: 'Report and delete it. Keep my login details private.', points: 2 },
      { id: 'b', label: 'B.', text: "Ignore the message, but don't report it.", points: 1 },
      { id: 'c', label: 'C.', text: "Send my details so I don't lose my progress.", points: 0 },
    ],
    correctId: 'a',
    bestPoints: 2,
    feedbackCorrect: {
      heading: 'CORRECT ACTION!',
      summary: 'Report and delete it. Keep my login details private.',
      explanation:
        'That urgent warning is a phishing trick. Real support will never ask for your password or birth date in a message. Reporting helps protect other players, too!',
    },
    feedbackWrong: {
      heading: 'WATCH OUT!',
      summary: 'That was a phishing trap.',
      explanation:
        'Legitimate game support NEVER demands passwords via chat or email. Urgency is a manipulation tactic. Always report suspicious messages.',
    },
    footer: 'QUEST // CHOOSE YOUR NEXT MOVE',
  },
  {
    id: 'quest-2',
    questNumber: 2,
    totalQuests: 4,
    levelTitle: 'THE PASSWORD PLEA',
    sticker: { sender: 'CoolKid2009', time: '2 MINS AGO' },
    message:
      '"Hey! I found a glitch that gives free V-Bucks. Send me your account password and I\'ll add 10,000 to your account tonight!"',
    byteTip: "Free currency hacks are ALWAYS scams. Your account could be stolen forever. Don't share passwords — not even with friends!",
    choices: [
      { id: 'a', label: 'A.', text: "Report the user and block them — it's a scam.", points: 2 },
      { id: 'b', label: 'B.', text: "Ask them to prove it first before sharing.", points: 1 },
      { id: 'c', label: 'C.', text: 'Share my password — they seem like a real player.', points: 0 },
    ],
    correctId: 'a',
    bestPoints: 2,
    feedbackCorrect: {
      heading: 'SMART MOVE!',
      summary: 'You protected your account like a pro.',
      explanation:
        "Account takeover scams often come from people pretending to be fellow players. Once they have your password, they can steal everything. Report + block = safe!",
    },
    feedbackWrong: {
      heading: 'BE CAREFUL!',
      summary: 'That could cost you your account.',
      explanation:
        "No legitimate player or service needs your password. Free currency glitches are bait. Always report these to keep your account safe.",
    },
    footer: 'QUEST // CHOOSE YOUR NEXT MOVE',
  },
  {
    id: 'quest-3',
    questNumber: 3,
    totalQuests: 4,
    levelTitle: 'THE OVERSHARE',
    sticker: { sender: 'ProGamer_99', time: 'JUST NOW' },
    message:
      '"Join our exclusive clan! We need your real name, photo, and home address for the official roster. Hurry before spots fill up!"',
    byteTip: "Real online clans NEVER need your address or photo. This is oversharing — once out, you can't take it back!",
    choices: [
      { id: 'a', label: 'A.', text: "Decline and report — they're asking for too much personal info.", points: 2 },
      { id: 'b', label: 'B.', text: 'Share only my name and photo, skip the address.', points: 1 },
      { id: 'c', label: 'C.', text: 'Share everything — I really want to join the clan.', points: 0 },
    ],
    correctId: 'a',
    bestPoints: 2,
    feedbackCorrect: {
      heading: 'EXCELLENT!',
      summary: 'You kept your private info safe.',
      explanation:
        "Your address and real name can be used to locate you in the real world. Online gaming clans never need this information. You made the safest call!",
    },
    feedbackWrong: {
      heading: 'TOO MUCH SHARING!',
      summary: 'Personal data shared online can be misused.',
      explanation:
        "Even sharing just your name and photo can be dangerous. Fake clans are used to build profiles on real kids. Always protect your identity online.",
    },
    footer: 'QUEST // CHOOSE YOUR NEXT MOVE',
  },
  {
    id: 'quest-4',
    questNumber: 4,
    totalQuests: 4,
    levelTitle: 'THE PASSWORD VAULT',
    sticker: { sender: 'System_Security', time: 'JUST NOW' },
    message:
      '"Security Alert: Your password \'Gamer1234\' is too weak and was found in a leaked database. Please update it to secure your account!"',
    byteTip: "Short or reused passwords get cracked by automated bots in seconds. Make your password a unique passphrase that only you know!",
    choices: [
      { id: 'a', label: 'A.', text: 'Create a unique 4-word passphrase with numbers and symbols.', points: 2 },
      { id: 'b', label: 'B.', text: 'Change it to "Gamer1235!" — just one digit different and an exclamation mark.', points: 1 },
      { id: 'c', label: 'C.', text: 'Ignore the alert. Nobody is going to guess my gamer tag anyway.', points: 0 },
    ],
    correctId: 'a',
    bestPoints: 2,
    feedbackCorrect: {
      heading: 'VAULT SECURED!',
      summary: 'Strong unique passphrases keep hackers out.',
      explanation:
        'Passphrases made of multiple unrelated words with symbols take automated cracking computers centuries to decipher! And by keeping it unique, other accounts stay safe if one gets breached.',
    },
    feedbackWrong: {
      heading: 'CREDENTIAL RISK!',
      summary: 'Weak or slight password variations are easily cracked.',
      explanation:
        'Hackers use automated dictionary tools that test millions of common words and slight variations like adding "!" or changing "4" to "5" in seconds. Always use long, unique passphrases!',
    },
    footer: 'QUEST // CHOOSE YOUR NEXT MOVE',
  },
];

export const POST_TEST_SCENARIOS = [
  {
    id: 'post-1',
    tag: '// POST-CHECK',
    prompt:
      '"A message says your game account will be locked unless you verify your password using a link. You have learned how to spot a phishing trap. What is the safest next step?"',
    choices: [
      { id: 'a', label: 'A.', text: 'Open the game website myself and check my account there.' },
      { id: 'b', label: 'B.', text: 'Reply to the sender with my password to keep my account.' },
      { id: 'c', label: 'C.', text: 'Click the link because the message looks official.' },
    ],
    correctId: 'a',
    footer: 'SCENARIO // POST-TEST',
  },
  {
    id: 'post-2',
    tag: '// POST-CHECK',
    prompt:
      '"After completing the Cyber Quest, you notice a website URL starts with \'http://\' instead of \'https://\' before you enter your login. What do you do now?"',
    choices: [
      { id: 'a', label: 'A.', text: "Log in anyway — the site looks exactly like the real one." },
      { id: 'b', label: 'B.', text: 'Close the tab and navigate to the real site directly.' },
      { id: 'c', label: 'C.', text: "Tell a friend and let them decide if it's safe." },
    ],
    correctId: 'b',
    footer: 'SCENARIO // POST-TEST',
  },
  {
    id: 'post-3',
    tag: '// POST-CHECK',
    prompt:
      '"Someone in an online game offers to trade rare items if you share your email and date of birth. You recall what Cyber-Byte taught you. What is the right action?"',
    choices: [
      { id: 'a', label: 'A.', text: "The trade sounds fair — share my email only, not DOB." },
      { id: 'b', label: 'B.', text: "Refuse the trade and report the user for suspicious behavior." },
      { id: 'c', label: 'C.', text: "Accept — rare items are worth it." },
    ],
    correctId: 'b',
    footer: 'SCENARIO // POST-TEST',
  },
  {
    id: 'post-4',
    tag: '// POST-CHECK',
    prompt:
      '"You need to create a new password for your personal account. Based on cyber safety and password hygiene, what should you do?"',
    choices: [
      { id: 'a', label: 'A.', text: 'Reuse your favorite game password so you never get locked out.' },
      { id: 'b', label: 'B.', text: 'Combine your birthday and your dog\'s name.' },
      { id: 'c', label: 'C.', text: 'Create a long, memorable passphrase with random words, numbers, and symbols unique to this account.' },
    ],
    correctId: 'c',
    footer: 'SCENARIO // POST-TEST',
  },
];

// One skill per question number: pre-test N, quest N and post-test N all cover the same danger.
export const TOPICS = [
  'SPOTTING FAKE MESSAGES',
  'SCAMS & RISKY LINKS',
  'KEEPING INFO PRIVATE',
  'PASSWORD HYGIENE',
];

export const TOPIC_TIPS = [
  'Real support never asks for your password. Stop, don\'t click, and tell a grown-up.',
  '"Free" prizes and strange links are bait. Close them and go to the real site yourself.',
  'Never share your name, address, school or birthday with people you only know online.',
  'Build long, unique passphrases with 4+ words and symbols. Never reuse the same password across accounts!',
];

