// Data structure for Italian verb exercises
// Easy to scale by adding more verbs, tenses, and levels

const PRONOUNS = {
    io: 'io',
    tu: 'tu',
    lui_lei: 'lui/lei',
    noi: 'noi',
    voi: 'voi',
    loro: 'loro'
};

// Verb database - easily expandable
const VERBS = {
    // PARLARE - to speak (regular -are verb with avere)
    parlare: {
        infinitive: 'parlare',
        translation: 'to speak',
        type: 'regular',
        auxiliary: 'avere',
        tenses: {
            passatoProssimo: {
                io: 'ho parlato',
                tu: 'hai parlato',
                'lui/lei': 'ha parlato',
                noi: 'abbiamo parlato',
                voi: 'avete parlato',
                loro: 'hanno parlato'
            }
        },
        lesson: {
            passatoProssimo: {
                title: 'Parlare - Passato Prossimo',
                explanation: 'Parlare is a regular -are verb. In passato prossimo, it uses the auxiliary verb "avere" + the past participle "parlato". This tense is used to describe completed actions in the past.',
                usage: 'Example: "Ieri ho parlato con Maria" (Yesterday I spoke with Maria)'
            }
        }
    },

    // MANGIARE - to eat (regular -are verb with avere)
    mangiare: {
        infinitive: 'mangiare',
        translation: 'to eat',
        type: 'regular',
        auxiliary: 'avere',
        tenses: {
            passatoProssimo: {
                io: 'ho mangiato',
                tu: 'hai mangiato',
                'lui/lei': 'ha mangiato',
                noi: 'abbiamo mangiato',
                voi: 'avete mangiato',
                loro: 'hanno mangiato'
            }
        },
        lesson: {
            passatoProssimo: {
                title: 'Mangiare - Passato Prossimo',
                explanation: 'Mangiare is a regular -are verb. It uses "avere" as auxiliary + past participle "mangiato". Remember that verbs ending in -giare drop the "i" before adding -ato.',
                usage: 'Example: "Stamattina ho mangiato una mela" (This morning I ate an apple)'
            }
        }
    },

    // ANDARE - to go (irregular verb with essere)
    andare: {
        infinitive: 'andare',
        translation: 'to go',
        type: 'irregular',
        auxiliary: 'essere',
        tenses: {
            passatoProssimo: {
                io: 'sono andato/a',
                tu: 'sei andato/a',
                'lui/lei': 'è andato/a',
                noi: 'siamo andati/e',
                voi: 'siete andati/e',
                loro: 'sono andati/e'
            }
        },
        lesson: {
            passatoProssimo: {
                title: 'Andare - Passato Prossimo',
                explanation: 'Andare is an irregular verb that uses "essere" as auxiliary + past participle "andato". When using essere, the past participle must agree in gender and number with the subject (-o/-a for singular, -i/-e for plural).',
                usage: 'Example: "Sono andato al cinema" (I went to the cinema - masculine) / "Sono andata al cinema" (I went to the cinema - feminine)'
            }
        }
    },

    // FARE - to do/make (irregular verb with avere)
    fare: {
        infinitive: 'fare',
        translation: 'to do/make',
        type: 'irregular',
        auxiliary: 'avere',
        tenses: {
            passatoProssimo: {
                io: 'ho fatto',
                tu: 'hai fatto',
                'lui/lei': 'ha fatto',
                noi: 'abbiamo fatto',
                voi: 'avete fatto',
                loro: 'hanno fatto'
            }
        },
        lesson: {
            passatoProssimo: {
                title: 'Fare - Passato Prossimo',
                explanation: 'Fare is an irregular verb with an irregular past participle "fatto". It uses "avere" as auxiliary. This is one of the most common verbs in Italian.',
                usage: 'Example: "Ho fatto i compiti" (I did my homework)'
            }
        }
    },

    // ESSERE - to be (irregular verb with essere)
    essere: {
        infinitive: 'essere',
        translation: 'to be',
        type: 'irregular',
        auxiliary: 'essere',
        tenses: {
            passatoProssimo: {
                io: 'sono stato/a',
                tu: 'sei stato/a',
                'lui/lei': 'è stato/a',
                noi: 'siamo stati/e',
                voi: 'siete stati/e',
                loro: 'sono stati/e'
            }
        },
        lesson: {
            passatoProssimo: {
                title: 'Essere - Passato Prossimo',
                explanation: 'Essere is irregular and uses itself as auxiliary + past participle "stato". The past participle agrees with the subject in gender and number.',
                usage: 'Example: "Sono stato malato" (I was sick - masculine) / "Sono stata contenta" (I was happy - feminine)'
            }
        }
    }
};

// Tense configuration - maps tenses to levels
const TENSES_BY_LEVEL = {
    A1: [
        { id: 'passatoProssimo', name: 'Passato Prossimo', description: 'Recent past' }
    ],
    A2: [
        { id: 'passatoProssimo', name: 'Passato Prossimo', description: 'Recent past' }
        // Add more tenses here: imperfetto, etc.
    ],
    B1: [
        { id: 'passatoProssimo', name: 'Passato Prossimo', description: 'Recent past' }
        // Add more tenses here
    ],
    B2: [
        { id: 'passatoProssimo', name: 'Passato Prossimo', description: 'Recent past' }
        // Add more tenses here
    ]
};

// Exercise generation utilities
function getVerbsForTense(tense) {
    return Object.keys(VERBS).filter(verb => VERBS[verb].tenses[tense]);
}

function generateExercise(verb, tense, pronoun) {
    const verbData = VERBS[verb];
    const correctAnswer = verbData.tenses[tense][pronoun];

    return {
        verb: verb,
        infinitive: verbData.infinitive,
        translation: verbData.translation,
        tense: tense,
        pronoun: pronoun,
        question: `${pronoun} __________ (${verbData.infinitive})`,
        correctAnswer: correctAnswer,
        explanation: verbData.lesson[tense]
    };
}

function generateDistractors(correctAnswer, verb, tense, pronoun, count = 5) {
    const verbData = VERBS[verb];
    const correctAuxiliary = verbData.auxiliary;
    const distractors = [];

    // Get all verbs categorized by auxiliary
    const avereVerbs = Object.keys(VERBS).filter(v => VERBS[v].auxiliary === 'avere');
    const essereVerbs = Object.keys(VERBS).filter(v => VERBS[v].auxiliary === 'essere');

    // We need 3 of each auxiliary type among all 6 options (including correct answer)
    // So if correct answer uses 'avere', we need 2 more avere and 3 essere
    // If correct answer uses 'essere', we need 2 more essere and 3 avere
    const needAvere = correctAuxiliary === 'avere' ? 2 : 3;
    const needEssere = correctAuxiliary === 'essere' ? 2 : 3;

    // Generate avere-based distractors
    const avereDistractors = [];
    const shuffledAvere = [...avereVerbs].sort(() => Math.random() - 0.5);

    for (const avereVerb of shuffledAvere) {
        if (avereDistractors.length >= needAvere) break;
        if (!VERBS[avereVerb].tenses[tense]) continue;

        const conjugation = VERBS[avereVerb].tenses[tense][pronoun];
        if (conjugation !== correctAnswer && !avereDistractors.includes(conjugation)) {
            avereDistractors.push(conjugation);
        }
    }

    // Generate essere-based distractors
    const essereDistractors = [];
    const shuffledEssere = [...essereVerbs].sort(() => Math.random() - 0.5);

    for (const essereVerb of shuffledEssere) {
        if (essereDistractors.length >= needEssere) break;
        if (!VERBS[essereVerb].tenses[tense]) continue;

        const conjugation = VERBS[essereVerb].tenses[tense][pronoun];
        if (conjugation !== correctAnswer && !essereDistractors.includes(conjugation)) {
            essereDistractors.push(conjugation);
        }
    }

    // Combine all distractors
    distractors.push(...avereDistractors, ...essereDistractors);

    // If we still don't have enough, fill with random options from different pronouns
    let attempts = 0;
    const maxAttempts = 50; // Prevent infinite loops

    while (distractors.length < count && attempts < maxAttempts) {
        attempts++;
        const allVerbs = Object.keys(VERBS);
        const randomVerb = allVerbs[Math.floor(Math.random() * allVerbs.length)];

        if (!VERBS[randomVerb].tenses[tense]) continue;

        // Try different pronouns if we can't get enough from the same pronoun
        const allPronouns = Object.keys(VERBS[randomVerb].tenses[tense]);
        const randomOtherPronoun = allPronouns[Math.floor(Math.random() * allPronouns.length)];
        const conjugation = VERBS[randomVerb].tenses[tense][randomOtherPronoun];

        if (conjugation !== correctAnswer && !distractors.includes(conjugation)) {
            distractors.push(conjugation);
        }
    }

    return distractors.slice(0, count);
}

function generateMultipleChoiceExercise(verb, tense) {
    // Random pronoun
    const pronouns = Object.keys(VERBS[verb].tenses[tense]);
    const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];

    const exercise = generateExercise(verb, tense, randomPronoun);
    const distractors = generateDistractors(exercise.correctAnswer, verb, tense, randomPronoun, 5);

    // Combine and shuffle to ensure random order
    const options = [exercise.correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

    return {
        ...exercise,
        options: options
    };
}

function getRandomExercise(tense) {
    const availableVerbs = getVerbsForTense(tense);
    const randomVerb = availableVerbs[Math.floor(Math.random() * availableVerbs.length)];
    return generateMultipleChoiceExercise(randomVerb, tense);
}
