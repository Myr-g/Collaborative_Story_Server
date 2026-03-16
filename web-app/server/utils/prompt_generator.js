const templates = [
  `{character} discovers {object} {location}.`,
  `{character} receives {object} with a message that reads: "{message}".`,
  `before {event}, {character} must {goal}.`,
  `{character} and {secondary_character} both want {object}, but {condition}.`,
  `the discovery of {object} results in a rash decision, but {condition}.`,
  `one day, {character} discovers {strange_event}.`,
  `{character} realizes {condition}.`,
  `{object} appears {location}.`,
  `No one {location} notices when {strange_event}.`
];

const general_word_banks = {
  character: [
    "a traveler",
    "a detective",
    "a student",
    "a journalist",
    "a merchant",
    "a scientist",
    "an artist",
    "a caretaker",
    "a historian",
    "a librarian",
    "a messenger",
    "a teacher",
    "a musician",
    "an explorer"
  ],

  secondary_character: [
    "a rival",
    "an old friend",
    "a mysterious stranger",
    "a former partner",
    "a childhood friend",
    "a traveling companion",
    "a curious journalist",
    "a determined investigator"
  ],

  object: [
    "a locked journal",
    "a strange key",
    "a sealed envelope",
    "an old photograph",
    "a broken watch",
    "a weathered map",
    "a small wooden box",
    "a glass bottle",
    "a faded diary",
    "a mysterious coin",
    "an antique compass",
    "a bundle of letters"
  ],

  location: [
    "in an abandoned town",
    "in a quiet village",
    "in a crowded marketplace",
    "on a lonely road",
    "inside of a forgotten library",
    "inside of an isolated cabin",
    "in a small coastal town",
    "in a narrow alley",
    "on a remote island",
    "inside an underground tunnel",
    "in a dusty attic",
    "at an old train station",
    "in a public park"
  ],

  event: [
    "sunrise",
    "noon",
    "midnight",
    "a town festival",
    "a sudden storm",
    "a citywide blackout",
    "a wedding",
    "a funeral",
    "an important meeting"
  ],

  strange_event: [
    "gravity stops working",
    "everyone forgets the same person",
    "time repeats every hour",
    "all reflections disappear"
  ],

  message: [
    "You were not meant to find this",
    "Meet me before midnight",
    "Trust no one",
    "You were right all along",
    "Burn this after reading",
    "Someone is watching",
    "You must leave tonight",
    "It begins again"
  ],

  goal: [
    "deliver an urgent message",
    "uncover a hidden truth",
    "protect a valuable secret",
    "reach the meeting point",
    "escape the approaching danger",
    "meet an unknown contact",
    "hide from a dangerous pursuer",
    "decipher a cryptic note",
    "stop a disastrous event"
  ],

  condition: [
    "revealing it could bring about disaster",
    "someone else is already looking for it",
    "nobody knows the full truth",
    "someone is hiding a secret",
    "time is running out"
  ]
};

const genre_specific_word_banks = {

};

function randomItem(array) 
{
  return array[Math.floor(Math.random() * array.length)];
}

function generatePrompt()
{
  const template = randomItem(templates);
  
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const word_bank = general_word_banks[key];

    if(!word_bank)
    {
      return match;
    }

    return randomItem(word_bank);
  });
}

module.exports = {generatePrompt};