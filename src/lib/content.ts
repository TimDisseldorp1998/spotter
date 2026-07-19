/**
 * Alle copy van de landingspagina op één plek.
 *
 * LET OP — de cijfers in `stats` en de quotes in `testimonials` zijn
 * voorbeeldcontent. Vervang ze door echte gegevens voordat de site live gaat.
 */

export const site = {
  name: "Spotter",
  tagline: "Je AI-spotter voor elke set",
  description:
    "Spotter rekent je 1RM uit, zegt wanneer je rust nodig hebt en bouwt een schema dat bij jouw week past. Nodig je trainingsmaatje uit en doe dezelfde workout.",
  url: "https://spotter.app",
};

export const nav = [
  { label: "Tools", href: "#tools" },
  { label: "Hoe het werkt", href: "#hoe-het-werkt" },
  { label: "Samen trainen", href: "#samen" },
  { label: "Ervaringen", href: "#ervaringen" },
];

export const hero = {
  pill: "Nu in bèta",
  headingStart: "Je spotter voor",
  /* Roterend staartje — één woord per keer, blijft altijd op één regel. */
  rotating: ["zwaarder tillen", "slim herstellen", "samen trainen"],
  body:
    "Een spotter staat naast je bank en houdt je veilig. Deze doet hetzelfde met je hele training: hij rekent je maxima uit, telt je volume per spiergroep en zegt het als je lijf toe is aan rust.",
  primaryCta: { label: "Start gratis", href: "#start" },
  secondaryCta: { label: "Bekijk de tools", href: "#tools" },
  microcopy: "Geen creditcard. Je houdt je eigen data.",
};

/* Voorbeeldcijfers — vervangen door echte data voor livegang. */
export const stats = [
  { value: "3.100", label: "sporters in de bèta" },
  { value: "128.000", label: "sets gelogd" },
  { value: "41", label: "oefeningen in de database" },
  { value: "4,8", label: "gemiddelde beoordeling" },
];

export const tools = {
  eyebrow: "De tools",
  heading: "Alles wat je tijdens je workout nodig hebt",
  body:
    "Geen los rekenwerk meer op je telefoon. Spotter zit in je broekzak en rekent mee terwijl je traint.",
  cards: [
    {
      id: "1rm",
      icon: "calculator",
      title: "1RM-calculator",
      body:
        "Vul je gewicht en herhalingen in. Je krijgt je één-herhalingsmaximum terug, plus de werkgewichten voor 3, 5 en 8 herhalingen.",
      span: "wide",
      demo: "onerm",
    },
    {
      id: "herstel",
      icon: "heart",
      title: "Herstelmeter",
      body:
        "Spotter telt je volume per spiergroep en zegt of je vandaag kunt gaan of beter een dag wacht.",
      span: "tall",
      demo: "recovery",
    },
    /* Volgorde is ook layout: de spans moeten per rij optellen tot een volle
       rij, anders valt er een gat bij sm (2 koloms) en lg (6 koloms). */
    {
      id: "rustklok",
      icon: "timer",
      title: "Rustklok",
      body:
        "Tussen je sets loopt een klok mee die weet welke oefening je doet. Zware compound, langere pauze.",
      span: "normal",
      demo: "timer",
    },
    {
      id: "schema",
      icon: "sparkles",
      title: "Schema-bouwer",
      body:
        "Typ wat je wilt: vier keer per week, focus op rug, drie kwartier per keer. Je krijgt een schema terug dat je zelf kunt bijstellen.",
      span: "wide",
      demo: "prompt",
    },
    {
      id: "progressie",
      icon: "trending",
      title: "Progressie per oefening",
      body:
        "Elke set die je logt komt terug in je grafiek. Je ziet per oefening of je vooruitgaat of stilstaat.",
      span: "normal",
      demo: "chart",
    },
  ],
};

export const how = {
  eyebrow: "Hoe het werkt",
  heading: "Drie stappen, daarna traint hij met je mee",
  steps: [
    {
      number: "01",
      title: "Vertel wat je wilt bereiken",
      body:
        "Sterker worden, afvallen, of terugkomen na een blessure. Spotter vraagt door tot hij weet hoeveel dagen je hebt en welk materiaal je gebruikt.",
    },
    {
      number: "02",
      title: "Train met je schema",
      body:
        "Je log je sets terwijl je traint. De rustklok loopt mee, de gewichten voor je volgende set staan al klaar.",
    },
    {
      number: "03",
      title: "Spotter stelt bij",
      body:
        "Ging het te makkelijk, dan gaat het gewicht omhoog. Zag hij drie zware beendagen op rij, dan plant hij rust in voor je erom vraagt.",
    },
  ],
};

export const social = {
  eyebrow: "Samen trainen",
  heading: "Trainen met iemand erbij werkt beter",
  body:
    "Stuur een link naar je trainingsmaatje. Jullie doen dezelfde workout, zien elkaars sets binnenkomen en weten wie er nog moet. Ook als je in een andere gym staat.",
  points: [
    {
      icon: "users",
      title: "Nodig je maatje uit",
      body: "Eén link, geen account nodig om mee te kijken.",
    },
    {
      icon: "zap",
      title: "Live dezelfde workout",
      body: "Je ziet elkaars sets binnenkomen terwijl je traint.",
    },
    {
      icon: "trophy",
      title: "Kleine onderlinge doelen",
      body: "Wie haalt deze maand het meeste volume op de squat.",
    },
  ],
  cta: { label: "Probeer het met je maatje", href: "#start" },
};

/* Voorbeeldquotes — vervangen door echte ervaringen voor livegang. */
export const testimonials = {
  eyebrow: "Ervaringen",
  heading: "Wat sporters in de bèta zeggen",
  items: [
    {
      quote:
        "Ik rekende mijn werkgewichten altijd op gevoel uit. Nu staan ze klaar voordat ik bij de rekken sta.",
      name: "Sanne de Wit",
      role: "Traint 4× per week",
    },
    {
      quote:
        "De herstelmeter hield me tegen na drie zware dagen. Dat had ik zelf nooit gedaan.",
      name: "Youssef Bakkali",
      role: "Powerlifting, 2 jaar",
    },
    {
      quote:
        "Mijn vriendin traint in Utrecht en ik in Alkmaar. We doen nu hetzelfde schema en zien elkaars sets.",
      name: "Marit Jansen",
      role: "Traint sinds januari",
    },
  ],
};

export const cta = {
  eyebrow: "Aan de slag",
  heading: "Zet je eerste set erin",
  body:
    "De bèta is gratis. Laat je mailadres achter en je krijgt een uitnodiging zodra er plek is.",
  microcopy: "Geen nieuwsbrief. Alleen je uitnodiging.",
};

export const footer = {
  blurb:
    "Spotter is een trainingsassistent voor iedereen die met gewichten werkt. Gebouwd in Noord-Holland.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Tools", href: "#tools" },
        { label: "Hoe het werkt", href: "#hoe-het-werkt" },
        { label: "Samen trainen", href: "#samen" },
      ],
    },
    {
      title: "Spotter",
      links: [
        { label: "Over ons", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Werken bij", href: "#" },
      ],
    },
    {
      title: "Juridisch",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Voorwaarden", href: "#" },
        { label: "Cookies", href: "#" },
      ],
    },
  ],
  disclaimer:
    "Spotter geeft trainingsadvies, geen medisch advies. Twijfel je over een blessure, ga naar een fysiotherapeut of arts.",
};
