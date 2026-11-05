// Officium Supremum — Academic Vault Manifest
// Serialized Curricular Assets: NDA Maths (30 Ch), CDS Maths (22 Ch), English (34 Ch), PYQs (14 Yrs)

export interface ChapterItem {
  num: string;
  title: string;
  desc?: string;
  meta?: string;
  tag?: string;
  documentKey: string;
}

export interface PYQYearItem {
  year: string;
  tag: string;
  papers: {
    name: string;
    documentKey: string;
  }[];
}

export const NDA_MATHS_CHAPTERS: ChapterItem[] = [
  {
    "num": "Chapter 01",
    "title": "Logarithms",
    "desc": "32 Cadet Drill Problems + 35 NDA PYQs (2011\u20132025) with full step-by-step Officer Solutions.",
    "meta": "67 Problems",
    "documentKey": "nda-mathematics-chapter-01"
  },
  {
    "num": "Chapter 02",
    "title": "Equations & Inequalities",
    "desc": "40 Practice Drill Problems + 138 NDA PYQs (2011\u20132025) covering quadratic roots, symmetry, and bounds.",
    "meta": "178 Problems",
    "documentKey": "nda-mathematics-chapter-02"
  },
  {
    "num": "Chapter 03",
    "title": "Binary Numbers",
    "desc": "20 Practice Drill Problems + 29 NDA PYQs (2011\u20132025) covering conversions, fractions, 2's complements & operations.",
    "meta": "49 Problems",
    "documentKey": "nda-mathematics-chapter-03"
  },
  {
    "num": "Chapter 04",
    "title": "Set & Relation",
    "desc": "26 Practice Drill Problems + 133 NDA PYQs (2011\u20132025) on Venn diagrams, equivalence relations, power sets & cardinality.",
    "meta": "159 Problems",
    "documentKey": "nda-mathematics-chapter-04"
  },
  {
    "num": "Chapter 05",
    "title": "Complex Number",
    "desc": "50 Practice Drill Problems + 118 NDA PYQs (2011\u20132025) on cube roots of unity, modulus, arg & loci.",
    "meta": "168 Problems",
    "documentKey": "nda-mathematics-chapter-05"
  },
  {
    "num": "Chapter 06",
    "title": "Permutation & Combination",
    "desc": "26 Practice Drill Problems + 117 NDA PYQs (2011\u20132025) on arrangements, selections, rank, and polygon diagonals.",
    "meta": "143 Problems",
    "documentKey": "nda-mathematics-chapter-06"
  },
  {
    "num": "Chapter 07",
    "title": "Binomial Theorem",
    "desc": "22 Practice Drill Problems + 69 NDA PYQs (2011\u20132025) on general terms, middle terms, divisibility, and coefficients.",
    "meta": "91 Problems",
    "documentKey": "nda-mathematics-chapter-07"
  },
  {
    "num": "Chapter 08",
    "title": "Sequences & Series",
    "desc": "27 Practice Drill Problems + 126 NDA PYQs (2011\u20132025) on AP, GP, HP, AM-GM-HM relations & infinite series.",
    "meta": "153 Problems",
    "documentKey": "nda-mathematics-chapter-08"
  },
  {
    "num": "Chapter 09",
    "title": "Matrices",
    "desc": "28 Practice Drill Problems + 125 NDA PYQs (2011\u20132025) on matrix algebra, symmetric/skew-symmetric, adjoint & inverse.",
    "meta": "153 Problems",
    "documentKey": "nda-mathematics-chapter-09"
  },
  {
    "num": "Chapter 10",
    "title": "Determinants",
    "desc": "21 Practice Drill Problems + 131 NDA PYQs (2011\u20132025) on determinant properties, Cramer's rule & linear systems.",
    "meta": "152 Problems",
    "documentKey": "nda-mathematics-chapter-10"
  },
  {
    "num": "Chapter 11",
    "title": "Trigonometry",
    "desc": "39 Practice Drill Problems + 258 NDA PYQs (2011\u20132025) on identities, compounds, multiples, equations, and ranges.",
    "meta": "297 Problems",
    "documentKey": "nda-mathematics-chapter-11"
  },
  {
    "num": "Chapter 12",
    "title": "Height & Distance",
    "desc": "18 Practice Drill Problems + 46 NDA PYQs (2011\u20132025) on elevation, depression, towers, and balloon problems.",
    "meta": "64 Problems",
    "documentKey": "nda-mathematics-chapter-12"
  },
  {
    "num": "Chapter 13",
    "title": "Inverse Trigonometry",
    "desc": "17 Practice Drill Problems + 51 NDA PYQs (2011\u20132025) on principal values, domain-range, and summation identities.",
    "meta": "68 Problems",
    "documentKey": "nda-mathematics-chapter-13"
  },
  {
    "num": "Chapter 14",
    "title": "Properties of Triangle",
    "desc": "12 Practice Drill Problems + 67 NDA PYQs (2011\u20132025) on sine/cosine formulas, projection rule, and circum-radius.",
    "meta": "79 Problems",
    "documentKey": "nda-mathematics-chapter-14"
  },
  {
    "num": "Chapter 15",
    "title": "Point & Straight Line",
    "desc": "32 Practice Drill Problems + 177 NDA PYQs (2011\u20132025) on coordinate geometry, intercepts, concurrency, and bisectors.",
    "meta": "209 Problems",
    "documentKey": "nda-mathematics-chapter-15"
  },
  {
    "num": "Chapter 16",
    "title": "Circle",
    "desc": "12 Practice Drill Problems + 37 NDA PYQs (2011\u20132025) on standard & general forms, intercepts, tangents, and chords.",
    "meta": "49 Problems",
    "documentKey": "nda-mathematics-chapter-16"
  },
  {
    "num": "Chapter 17",
    "title": "Conic Section",
    "desc": "23 Practice Drill Problems + 58 NDA PYQs (2011\u20132025) on parabola, ellipse, hyperbola, eccentricity & latus rectum.",
    "meta": "81 Problems",
    "documentKey": "nda-mathematics-chapter-17"
  },
  {
    "num": "Chapter 18",
    "title": "Vector",
    "desc": "35 Practice Drill Problems + 176 NDA PYQs (2011\u20132025) on dot/cross products, scalar triple product, coplanarity & projections.",
    "meta": "211 Problems",
    "documentKey": "nda-mathematics-chapter-18"
  },
  {
    "num": "Chapter 19",
    "title": "3D Geometry",
    "desc": "30 Practice Drill Problems + 152 NDA PYQs (2011\u20132025) on direction cosines/ratios, planes, lines in 3D & spheres.",
    "meta": "182 Problems",
    "documentKey": "nda-mathematics-chapter-19"
  },
  {
    "num": "Chapter 20",
    "title": "Probability",
    "desc": "44 Practice Drill Problems + 281 NDA PYQs (2011\u20132025) on Bayes' theorem, binomial distribution, independent events & odds.",
    "meta": "325 Problems",
    "documentKey": "nda-mathematics-chapter-20"
  },
  {
    "num": "Chapter 21",
    "title": "Statistics",
    "desc": "33 Practice Drill Problems + 268 NDA PYQs (2011\u20132025) on mean, median, mode, variance, SD & regression coefficients.",
    "meta": "301 Problems",
    "documentKey": "nda-mathematics-chapter-21"
  },
  {
    "num": "Chapter 22",
    "title": "Function",
    "desc": "15 Practice Drill Problems + 130 NDA PYQs (2011\u20132025) on domain, range, one-one, onto, inverse & composite functions.",
    "meta": "145 Problems",
    "documentKey": "nda-mathematics-chapter-22"
  },
  {
    "num": "Chapter 23",
    "title": "Limits",
    "desc": "18 Practice Drill Problems + 75 NDA PYQs (2011\u20132025) on L'H\u00f4pital's rule, indeterminate forms & trigonometric limits.",
    "meta": "93 Problems",
    "documentKey": "nda-mathematics-chapter-23"
  },
  {
    "num": "Chapter 24",
    "title": "Continuity & Differentiability",
    "desc": "15 Practice Drill Problems + 78 NDA PYQs (2011\u20132025) on point continuity, LHD/RHD, modulus & greatest integer functions.",
    "meta": "93 Problems",
    "documentKey": "nda-mathematics-chapter-24"
  },
  {
    "num": "Chapter 25",
    "title": "Differentiation",
    "desc": "26 Practice Drill Problems + 113 NDA PYQs (2011\u20132025) on chain rule, implicit functions, parametric forms & higher order derivatives.",
    "meta": "139 Problems",
    "documentKey": "nda-mathematics-chapter-25"
  },
  {
    "num": "Chapter 26",
    "title": "Application of Derivatives",
    "desc": "30 Practice Drill Problems + 144 NDA PYQs (2011\u20132025) on tangents & normals, maxima-minima, increasing/decreasing & rates.",
    "meta": "174 Problems",
    "documentKey": "nda-mathematics-chapter-26"
  },
  {
    "num": "Chapter 27",
    "title": "Indefinite Integration",
    "desc": "15 Practice Drill + 94 Subjective + 69 NDA PYQs (2011\u20132025) on substitution, by parts, partial fractions & rational forms.",
    "meta": "178 Problems",
    "documentKey": "nda-mathematics-chapter-27"
  },
  {
    "num": "Chapter 28",
    "title": "Definite Integration",
    "desc": "21 Practice Drill Problems + 105 NDA PYQs (2011\u20132025) on King's property, periodic integrals, modulus bounds & Leibnitz rule.",
    "meta": "126 Problems",
    "documentKey": "nda-mathematics-chapter-28"
  },
  {
    "num": "Chapter 29",
    "title": "Area Bounded by Curve",
    "desc": "10 Practice Drill Problems + 56 NDA PYQs (2011\u20132025) on parabolas, circles, ellipses, lines & multi-curve enclosed regions.",
    "meta": "66 Problems",
    "documentKey": "nda-mathematics-chapter-29"
  },
  {
    "num": "Chapter 30",
    "title": "Differential Equation",
    "desc": "30 Practice Drill Problems + 116 NDA PYQs (2011\u20132025) on order & degree, variable separable, homogeneous, linear & family of curves.",
    "meta": "146 Problems",
    "documentKey": "nda-mathematics-chapter-30"
  }
];

export const CDS_MATHS_CHAPTERS: ChapterItem[] = [
  {
    "num": "Chapter 01",
    "tag": "Arithmetic",
    "title": "Ratio and Proportion",
    "desc": "5 Practice Sheets + CDS PYQs covering proportional parts, compound ratios, milk-water mixtures, and partnership allocations.",
    "meta": "17 Pages \u00b7 56+ Problems",
    "documentKey": "cds-mathematics-chapter-01"
  },
  {
    "num": "Chapter 02",
    "tag": "Arithmetic",
    "title": "Average",
    "desc": "3 Practice Sheets + CDS PYQs on consecutive odd/even series, replacement rules, bowling averages, and batting stats.",
    "meta": "12 Pages \u00b7 43+ Problems",
    "documentKey": "cds-mathematics-chapter-02"
  },
  {
    "num": "Chapter 03",
    "tag": "Arithmetic",
    "title": "Time and Work",
    "desc": "4 Practice Sheets + CDS PYQs on unitary methods, alternate days, pipe-and-cistern inlet/leak rates, and efficiency ratios.",
    "meta": "16 Pages \u00b7 67+ Problems",
    "documentKey": "cds-mathematics-chapter-03"
  },
  {
    "num": "Chapter 04",
    "tag": "Arithmetic",
    "title": "Time and Distance",
    "desc": "4 Practice Sheets + CDS PYQs on relative speed, train crossings, circular tracks, and upstream/downstream boat problems.",
    "meta": "18 Pages \u00b7 89+ Problems",
    "documentKey": "cds-mathematics-chapter-04"
  },
  {
    "num": "Chapter 05",
    "tag": "Arithmetic",
    "title": "Percentage",
    "desc": "5 Practice Sheets + CDS PYQs covering successive percentage increments, election ballots, consumption-price adjustments & Venn models.",
    "meta": "14 Pages \u00b7 31+ Problems",
    "documentKey": "cds-mathematics-chapter-05"
  },
  {
    "num": "Chapter 06",
    "tag": "Arithmetic",
    "title": "Profit and Loss",
    "desc": "5 Practice Sheets + CDS PYQs on marked price, successive trade discounts, deceptive weights & dishonest dealer markups.",
    "meta": "15 Pages \u00b7 36+ Problems",
    "documentKey": "cds-mathematics-chapter-06"
  },
  {
    "num": "Chapter 07",
    "tag": "Arithmetic",
    "title": "Interest (SI & CI)",
    "desc": "Comprehensive drill sheets & CDS PYQs on Simple & Compound Interest, semi-annual compounding, SI-CI differences & installment loans.",
    "meta": "15 Pages \u00b7 36+ Problems",
    "documentKey": "cds-mathematics-chapter-07"
  },
  {
    "num": "Chapter 08",
    "tag": "Arithmetic",
    "title": "Number System",
    "desc": "5 Practice Sheets + CDS PYQs on Euler remainder theorem, unit digits, number of zeroes, factorials & divisibility rules.",
    "meta": "29 Pages \u00b7 205+ Problems",
    "documentKey": "cds-mathematics-chapter-08"
  },
  {
    "num": "Chapter 09",
    "tag": "Arithmetic",
    "title": "Simplification",
    "desc": "2 Practice Sheets + CDS PYQs on surds & indices, nested radicals, recurring decimals, BODMAS order, and continued fractions.",
    "meta": "7 Pages \u00b7 40+ Problems",
    "documentKey": "cds-mathematics-chapter-09"
  },
  {
    "num": "Chapter 10",
    "tag": "Arithmetic",
    "title": "LCM and HCF",
    "desc": "2 Practice Sheets + CDS PYQs on co-prime products, simultaneous tolling bells, fractional LCM/HCF, and remainder constraints.",
    "meta": "9 Pages \u00b7 46+ Problems",
    "documentKey": "cds-mathematics-chapter-10"
  },
  {
    "num": "Chapter 11",
    "tag": "Advance",
    "title": "Equations",
    "desc": "Drill sets & CDS PYQs on linear system consistency, quadratic roots, Vieta formulas, signs of roots, and real polynomial bounds.",
    "meta": "23 Pages \u00b7 161+ Problems",
    "documentKey": "cds-mathematics-chapter-11"
  },
  {
    "num": "Chapter 12",
    "tag": "Advance",
    "title": "Algebra",
    "desc": "Extensive drill questions & CDS PYQs on algebraic identities, symmetric polynomials, cyclic factoring, and minimum/maximum expressions.",
    "meta": "23 Pages \u00b7 205+ Problems",
    "documentKey": "cds-mathematics-chapter-12"
  },
  {
    "num": "Chapter 13",
    "tag": "Advance",
    "title": "LCM & HCF of Algebraic Factors",
    "desc": "Targeted practice sheet + CDS PYQs on polynomial common divisors, highest common factors, and cyclic expression factorization.",
    "meta": "4 Pages \u00b7 27+ Problems",
    "documentKey": "cds-mathematics-chapter-13"
  },
  {
    "num": "Chapter 14",
    "tag": "Advance",
    "title": "Sets",
    "desc": "Drill problems & CDS PYQs on Venn diagrams, cardinality equations, inclusion-exclusion, Cartesian products, and power sets.",
    "meta": "7 Pages \u00b7 34+ Problems",
    "documentKey": "cds-mathematics-chapter-14"
  },
  {
    "num": "Chapter 15",
    "tag": "Advance",
    "title": "Logarithm",
    "desc": "Targeted practice sheet + CDS PYQs on logarithmic laws, base changes, characteristics, mantissas, and exponential-log systems.",
    "meta": "4 Pages \u00b7 30+ Problems",
    "documentKey": "cds-mathematics-chapter-15"
  },
  {
    "num": "Chapter 16",
    "tag": "Advance",
    "title": "Geometry",
    "desc": "Comprehensive 46-page master archive of 348+ CDS PYQs covering triangle centers, Apollonius theorem, cyclic quads, and tangents.",
    "meta": "46 Pages \u00b7 348+ Problems",
    "documentKey": "cds-mathematics-chapter-16"
  },
  {
    "num": "Chapter 17",
    "tag": "Advance",
    "title": "Mensuration 2D",
    "desc": "206+ CDS PYQs on rectilinear perimeters, polygon areas, shaded circular segments, inscribed circles, and wire-bending transformations.",
    "meta": "25 Pages \u00b7 206+ Problems",
    "documentKey": "cds-mathematics-chapter-17"
  },
  {
    "num": "Chapter 18",
    "tag": "Advance",
    "title": "Mensuration 3D",
    "desc": "203+ CDS PYQs on total surface area, hollow cylinders, frustum of cones, melted spheres, spherical shells, and pyramid geometry.",
    "meta": "23 Pages \u00b7 203+ Problems",
    "documentKey": "cds-mathematics-chapter-18"
  },
  {
    "num": "Chapter 19",
    "tag": "Advance",
    "title": "Trigonometry",
    "desc": "247+ CDS PYQs covering circular measures, compound angles, reciprocal identities, and minimax values of trigonometric expressions.",
    "meta": "31 Pages \u00b7 247+ Problems",
    "documentKey": "cds-mathematics-chapter-19"
  },
  {
    "num": "Chapter 20",
    "tag": "Advance",
    "title": "Height and Distance",
    "desc": "Practice sheet + 51+ CDS PYQs covering angle of elevation & depression, cloudy reflections, towers, flagstaffs, and moving ships.",
    "meta": "9 Pages \u00b7 51+ Problems",
    "documentKey": "cds-mathematics-chapter-20"
  },
  {
    "num": "Chapter 21",
    "tag": "Advance",
    "title": "Statistics",
    "desc": "150+ CDS PYQs covering frequency distributions, step deviation mean, cumulative ogives, mode, variance, and standard deviation formulas.",
    "meta": "28 Pages \u00b7 150+ Problems",
    "documentKey": "cds-mathematics-chapter-21"
  },
  {
    "num": "Chapter 22",
    "tag": "Advance",
    "title": "Miscellaneous & CAPF PYQs",
    "desc": "Targeted CAPF past year examination questions with official keys covering combined permutations, couples seating, and dice coin tosses.",
    "meta": "1 Page \u00b7 CAPF PYQs",
    "documentKey": "cds-mathematics-chapter-22"
  }
];

export const ENGLISH_CHAPTERS: ChapterItem[] = [
  {
    "num": "Chapter 01",
    "tag": "Grammar",
    "title": "Noun",
    "desc": "Practice Sheets 1 & 2 + 15 Years NDA & CDS Solved PYQs on countable/uncountable nouns, collective nouns, rules of pluralization & matching questions.",
    "meta": "8 Pages",
    "documentKey": "nda-cds-english-chapter-01"
  },
  {
    "num": "Chapter 02",
    "tag": "Grammar",
    "title": "Pronoun",
    "desc": "Targeted Practice Sheets + NDA/CDS PYQs covering personal, relative, demonstrative, reflexive & reciprocal pronouns with error spotting.",
    "meta": "7 Pages",
    "documentKey": "nda-cds-english-chapter-02"
  },
  {
    "num": "Chapter 03",
    "tag": "Grammar",
    "title": "Verb & Subject-Verb Agreement",
    "desc": "Comprehensive rules on transitive/intransitive verbs, subject-verb agreement, gerunds, infinitives & 15-year NDA/CDS PYQ drills.",
    "meta": "11 Pages",
    "documentKey": "nda-cds-english-chapter-03"
  },
  {
    "num": "Chapter 04",
    "tag": "Grammar",
    "title": "Modals",
    "desc": "Targeted practice drills and past exam questions on modal auxiliaries (can, could, may, might, should, must, ought to, would).",
    "meta": "3 Pages",
    "documentKey": "nda-cds-english-chapter-04"
  },
  {
    "num": "Chapter 05",
    "tag": "Grammar",
    "title": "Tense",
    "desc": "Master drills on simple, continuous, perfect & perfect continuous tenses, conditional time clauses & NDA/CDS past year sentence analysis.",
    "meta": "10 Pages",
    "documentKey": "nda-cds-english-chapter-05"
  },
  {
    "num": "Chapter 06",
    "tag": "Grammar",
    "title": "Adjective",
    "desc": "Degrees of comparison, order of adjectives, qualitative/quantitative modifiers & NDA/CDS error spotting question sets.",
    "meta": "5 Pages",
    "documentKey": "nda-cds-english-chapter-06"
  },
  {
    "num": "Chapter 07",
    "tag": "Grammar",
    "title": "Adverb",
    "desc": "Adverb positioning, inversion rules, frequency adverbs, modifiers of degree & NDA/CDS targeted exam exercises.",
    "meta": "4 Pages",
    "documentKey": "nda-cds-english-chapter-07"
  },
  {
    "num": "Chapter 08",
    "tag": "Grammar",
    "title": "Article",
    "desc": "Definite and indefinite articles (a, an, the), omission of articles, special geographical uses & CDS/NDA PYQ question bank.",
    "meta": "6 Pages",
    "documentKey": "nda-cds-english-chapter-08"
  },
  {
    "num": "Chapter 09",
    "tag": "Grammar",
    "title": "Conjunction",
    "desc": "Coordinating, subordinating & correlative conjunctions (neither-nor, either-or, not only-but also) with past examination drills.",
    "meta": "5 Pages",
    "documentKey": "nda-cds-english-chapter-09"
  },
  {
    "num": "Chapter 10",
    "tag": "Grammar",
    "title": "Preposition & Fixed Prepositions",
    "desc": "Prepositions of time/place/direction + master table of fixed prepositions and phrasal collocations with NDA/CDS PYQs.",
    "meta": "10 Pages",
    "documentKey": "nda-cds-english-chapter-10"
  },
  {
    "num": "Chapter 11",
    "tag": "Grammar",
    "title": "Question Tag",
    "desc": "Rules for positive/negative question tags, imperative tags, exceptional auxiliary tags & solved defence questions.",
    "meta": "2 Pages",
    "documentKey": "nda-cds-english-chapter-11"
  },
  {
    "num": "Chapter 12",
    "tag": "Grammar",
    "title": "Miscellaneous Grammar",
    "desc": "Mixed error spotting drills, unusual grammatical constructions, parallelism & combined defence exam revision problems.",
    "meta": "3 Pages",
    "documentKey": "nda-cds-english-chapter-12"
  },
  {
    "num": "Chapter 13",
    "tag": "Grammar",
    "title": "Identification of Parts of Speech",
    "desc": "CDS & NDA official syllabus module: Identifying underlined parts of speech (noun, pronoun, adjective, adverb, preposition, conjunction).",
    "meta": "9 Pages",
    "documentKey": "nda-cds-english-chapter-13"
  },
  {
    "num": "Chapter 14",
    "tag": "Grammar",
    "title": "Active & Passive Voice",
    "desc": "Voice transformation rules across all tenses, interrogative sentences, imperative orders & solved CDS/AFCAT exercises.",
    "meta": "7 Pages",
    "documentKey": "nda-cds-english-chapter-14"
  },
  {
    "num": "Chapter 15",
    "tag": "Grammar",
    "title": "Direct & Indirect Speech",
    "desc": "Narration change rules, reported speech reporting verbs, pronouns/tenses backshift, wh-questions & exclamatory sentences.",
    "meta": "10 Pages",
    "documentKey": "nda-cds-english-chapter-15"
  },
  {
    "num": "Chapter 16",
    "tag": "Grammar",
    "title": "Sentence Improvement",
    "desc": "High-frequency NDA & CDS PYQ sentence improvement sets with official keys and structured grammatical explanations.",
    "meta": "12 Pages",
    "documentKey": "nda-cds-english-chapter-16"
  },
  {
    "num": "Chapter 17",
    "tag": "Grammar",
    "title": "Sentence Completion",
    "desc": "Grammar-based sentence completion and connector clause selection for NDA & CDS examinations.",
    "meta": "8 Pages",
    "documentKey": "nda-cds-english-chapter-17"
  },
  {
    "num": "Chapter 18",
    "tag": "Vocabulary",
    "title": "Vocabulary Drill & Word Lists",
    "desc": "Root words, high-frequency defence vocabulary lists, definitions, contextual examples, and introductory drills.",
    "meta": "9 Pages",
    "documentKey": "nda-cds-english-chapter-18"
  },
  {
    "num": "Chapter 19",
    "tag": "Vocabulary",
    "title": "Synonyms Master Archive",
    "desc": "2011\u20132025 NDA & CDS past year synonyms archive with contextual sentences, word connotations & answer keys.",
    "meta": "25 Pages",
    "documentKey": "nda-cds-english-chapter-19"
  },
  {
    "num": "Chapter 20",
    "tag": "Vocabulary",
    "title": "Antonyms Master Archive",
    "desc": "2011\u20132025 NDA & CDS past year antonyms archive covering exact opposite meanings, prefixes & contrasting sentence drills.",
    "meta": "22 Pages",
    "documentKey": "nda-cds-english-chapter-20"
  },
  {
    "num": "Chapter 21",
    "tag": "Vocabulary",
    "title": "Paired Words & Confusing Words",
    "desc": "Homophones, commonly confused word pairs, semantic distinctions, and targeted multiple-choice tests.",
    "meta": "15 Pages",
    "documentKey": "nda-cds-english-chapter-21"
  },
  {
    "num": "Chapter 22",
    "tag": "Vocabulary",
    "title": "Foreign Words & Phrases",
    "desc": "Latin, French & Greek legal and military expressions (ad hoc, de facto, status quo, bona fide, caveat emptor) with CDS PYQs.",
    "meta": "4 Pages",
    "documentKey": "nda-cds-english-chapter-22"
  },
  {
    "num": "Chapter 23",
    "tag": "Vocabulary",
    "title": "Spelling Correction",
    "desc": "Commonly misspelled words in defence exams, double consonant rules, silent letters & practice questions.",
    "meta": "1 Page",
    "documentKey": "nda-cds-english-chapter-23"
  },
  {
    "num": "Chapter 24",
    "tag": "Vocabulary",
    "title": "Word Meaning in Context",
    "desc": "Contextual word meanings, denotations vs. connotations, shades of meaning, and CDS vocabulary exercises.",
    "meta": "5 Pages",
    "documentKey": "nda-cds-english-chapter-24"
  },
  {
    "num": "Chapter 25",
    "tag": "Vocabulary",
    "title": "Word Improvement",
    "desc": "Precision in word choice, single word substitution, and contextually appropriate diction drills.",
    "meta": "2 Pages",
    "documentKey": "nda-cds-english-chapter-25"
  },
  {
    "num": "Chapter 26",
    "tag": "Vocabulary",
    "title": "Correlating Sentences",
    "desc": "Connecting paired thoughts, logical sentence relationships, semantic transitions & official CDS questions.",
    "meta": "5 Pages",
    "documentKey": "nda-cds-english-chapter-26"
  },
  {
    "num": "Chapter 27",
    "tag": "Vocabulary",
    "title": "Correct Use of Word in Sentences",
    "desc": "CDS new pattern: Testing whether a specified word is correctly used across multiple alternative sentences.",
    "meta": "5 Pages",
    "documentKey": "nda-cds-english-chapter-27"
  },
  {
    "num": "Chapter 28",
    "tag": "Vocabulary",
    "title": "Word Usage in Multiple Sentences",
    "desc": "Advanced CDS pattern testing multi-sentence polysemy and idiomatic word correctness.",
    "meta": "3 Pages",
    "documentKey": "nda-cds-english-chapter-28"
  },
  {
    "num": "Chapter 29",
    "tag": "Reading",
    "title": "Idioms & Phrasal Expressions",
    "desc": "37-page master compendium of defence idioms, Hindi meanings, origin notes, and comprehensive 15-year NDA/CDS PYQs.",
    "meta": "37 Pages",
    "documentKey": "nda-cds-english-chapter-29"
  },
  {
    "num": "Chapter 30",
    "tag": "Reading",
    "title": "Cloze Test Master Module",
    "desc": "Passage-level gap filling testing integrated grammar, vocabulary & contextual coherence across 2013\u20132025 NDA/CDS exams.",
    "meta": "19 Pages",
    "documentKey": "nda-cds-english-chapter-30"
  },
  {
    "num": "Chapter 31",
    "tag": "Reading",
    "title": "Reading Comprehension Passages",
    "desc": "Diverse passages (philosophy, defence, science, history, current affairs) with fact-based & inferential question banks.",
    "meta": "35 Pages",
    "documentKey": "nda-cds-english-chapter-31"
  },
  {
    "num": "Chapter 32",
    "tag": "Reading",
    "title": "Ordering of Words in a Sentence (PQRS)",
    "desc": "Ordering of words into meaningful sentences (P, Q, R, S technique), grammar cues, pronoun links & 2013\u20132025 solved PYQs.",
    "meta": "29 Pages",
    "documentKey": "nda-cds-english-chapter-32"
  },
  {
    "num": "Chapter 33",
    "tag": "Reading",
    "title": "Ordering of Sentences (S1 \u2013 S6)",
    "desc": "Advanced CDS paragraph rearrangement: Fixed opening (S1) and closing (S6) with four intermediate sentences (P, Q, R, S).",
    "meta": "32 Pages",
    "documentKey": "nda-cds-english-chapter-33"
  },
  {
    "num": "Chapter 34",
    "tag": "Reading",
    "title": "Fill in the Blanks Master Archive",
    "desc": "18 pages of 160+ CDS & NDA fill-in-the-blank questions testing grammar, prepositions, phrasal verbs & official answer keys.",
    "meta": "18 Pages",
    "documentKey": "nda-cds-english-chapter-34"
  }
];

export const PYQ_YEARS: PYQYearItem[] = [
  {
    "year": "NDA 2026",
    "tag": "Official Solved",
    "papers": [
      {
        "name": "NDA 1 (2026) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2026-1"
      },
      {
        "name": "NDA 1 (2026) \u2014 Mathematics",
        "documentKey": "pyq-nda-2026-2"
      }
    ]
  },
  {
    "year": "NDA 2025",
    "tag": "Official Solved",
    "papers": [
      {
        "name": "NDA 1 (2025) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2025-1"
      },
      {
        "name": "NDA 1 (2025) \u2014 Mathematics",
        "documentKey": "pyq-nda-2025-2"
      },
      {
        "name": "NDA 2 (2025) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2025-3"
      },
      {
        "name": "NDA 2 (2025) \u2014 Mathematics",
        "documentKey": "pyq-nda-2025-4"
      }
    ]
  },
  {
    "year": "NDA 2024",
    "tag": "Official Solved",
    "papers": [
      {
        "name": "NDA 1 (2024) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2024-1"
      },
      {
        "name": "NDA 1 (2024) \u2014 Mathematics",
        "documentKey": "pyq-nda-2024-2"
      },
      {
        "name": "NDA 2 (2024) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2024-3"
      },
      {
        "name": "NDA 2 (2024) \u2014 Mathematics",
        "documentKey": "pyq-nda-2024-4"
      }
    ]
  },
  {
    "year": "NDA 2023",
    "tag": "Official Archive",
    "papers": [
      {
        "name": "NDA 1 (2023) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2023-1"
      },
      {
        "name": "NDA 1 (2023) \u2014 Mathematics",
        "documentKey": "pyq-nda-2023-2"
      },
      {
        "name": "NDA 2 (2023) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2023-3"
      },
      {
        "name": "NDA 2 (2023) \u2014 Mathematics",
        "documentKey": "pyq-nda-2023-4"
      }
    ]
  },
  {
    "year": "NDA 2022",
    "tag": "Official Archive",
    "papers": [
      {
        "name": "NDA 1 (2022) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2022-1"
      },
      {
        "name": "NDA 1 (2022) \u2014 Mathematics",
        "documentKey": "pyq-nda-2022-2"
      },
      {
        "name": "NDA 2 (2022) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2022-3"
      },
      {
        "name": "NDA 2 (2022) \u2014 Mathematics",
        "documentKey": "pyq-nda-2022-4"
      }
    ]
  },
  {
    "year": "NDA 2021",
    "tag": "Official Archive",
    "papers": [
      {
        "name": "NDA 1 (2021) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2021-1"
      },
      {
        "name": "NDA 1 (2021) \u2014 Mathematics",
        "documentKey": "pyq-nda-2021-2"
      },
      {
        "name": "NDA 2 (2021) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2021-3"
      },
      {
        "name": "NDA 2 (2021) \u2014 Mathematics",
        "documentKey": "pyq-nda-2021-4"
      }
    ]
  },
  {
    "year": "NDA 2020",
    "tag": "Official Archive",
    "papers": [
      {
        "name": "NDA 1&2 (2020) \u2014 General Ability (GAT)",
        "documentKey": "pyq-nda-2020-1"
      },
      {
        "name": "NDA 1&2 (2020) \u2014 Mathematics",
        "documentKey": "pyq-nda-2020-2"
      }
    ]
  },
  {
    "year": "CDS 2026",
    "tag": "Official Solved",
    "papers": [
      {
        "name": "CDS 1 (2026) \u2014 English",
        "documentKey": "pyq-cds-2026-1"
      },
      {
        "name": "CDS 1 (2026) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2026-2"
      },
      {
        "name": "CDS 1 (2026) \u2014 Mathematics",
        "documentKey": "pyq-cds-2026-3"
      }
    ]
  },
  {
    "year": "CDS 2025",
    "tag": "Official Solved",
    "papers": [
      {
        "name": "CDS 1 (2025) \u2014 English",
        "documentKey": "pyq-cds-2025-1"
      },
      {
        "name": "CDS 1 (2025) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2025-2"
      },
      {
        "name": "CDS 1 (2025) \u2014 Mathematics",
        "documentKey": "pyq-cds-2025-3"
      },
      {
        "name": "CDS 2 (2025) \u2014 English",
        "documentKey": "pyq-cds-2025-4"
      },
      {
        "name": "CDS 2 (2025) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2025-5"
      },
      {
        "name": "CDS 2 (2025) \u2014 Mathematics",
        "documentKey": "pyq-cds-2025-6"
      }
    ]
  },
  {
    "year": "CDS 2024",
    "tag": "Official Solved",
    "papers": [
      {
        "name": "CDS 1 (2024) \u2014 English",
        "documentKey": "pyq-cds-2024-1"
      },
      {
        "name": "CDS 1 (2024) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2024-2"
      },
      {
        "name": "CDS 1 (2024) \u2014 Mathematics",
        "documentKey": "pyq-cds-2024-3"
      },
      {
        "name": "CDS 2 (2024) \u2014 English",
        "documentKey": "pyq-cds-2024-4"
      },
      {
        "name": "CDS 2 (2024) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2024-5"
      },
      {
        "name": "CDS 2 (2024) \u2014 Mathematics",
        "documentKey": "pyq-cds-2024-6"
      }
    ]
  },
  {
    "year": "CDS 2023",
    "tag": "Official Archive",
    "papers": [
      {
        "name": "CDS 1 (2023) \u2014 English",
        "documentKey": "pyq-cds-2023-1"
      },
      {
        "name": "CDS 1 (2023) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2023-2"
      },
      {
        "name": "CDS 1 (2023) \u2014 Mathematics",
        "documentKey": "pyq-cds-2023-3"
      },
      {
        "name": "CDS 2 (2023) \u2014 English",
        "documentKey": "pyq-cds-2023-4"
      },
      {
        "name": "CDS 2 (2023) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2023-5"
      },
      {
        "name": "CDS 2 (2023) \u2014 Mathematics",
        "documentKey": "pyq-cds-2023-6"
      }
    ]
  },
  {
    "year": "CDS 2022",
    "tag": "Official Archive",
    "papers": [
      {
        "name": "CDS 1 (2022) \u2014 English",
        "documentKey": "pyq-cds-2022-1"
      },
      {
        "name": "CDS 1 (2022) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2022-2"
      },
      {
        "name": "CDS 1 (2022) \u2014 Mathematics",
        "documentKey": "pyq-cds-2022-3"
      }
    ]
  },
  {
    "year": "CDS 2021",
    "tag": "Official Archive",
    "papers": [
      {
        "name": "CDS 1 (2021) \u2014 English",
        "documentKey": "pyq-cds-2021-1"
      },
      {
        "name": "CDS 1 (2021) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2021-2"
      },
      {
        "name": "CDS 1 (2021) \u2014 Mathematics",
        "documentKey": "pyq-cds-2021-3"
      },
      {
        "name": "CDS 2 (2021) \u2014 English",
        "documentKey": "pyq-cds-2021-4"
      },
      {
        "name": "CDS 2 (2021) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2021-5"
      },
      {
        "name": "CDS 2 (2021) \u2014 Mathematics",
        "documentKey": "pyq-cds-2021-6"
      }
    ]
  },
  {
    "year": "CDS 2020",
    "tag": "Official Archive",
    "papers": [
      {
        "name": "CDS 1 (2020) \u2014 English",
        "documentKey": "pyq-cds-2020-1"
      },
      {
        "name": "CDS 1 (2020) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2020-2"
      },
      {
        "name": "CDS 1 (2020) \u2014 Mathematics",
        "documentKey": "pyq-cds-2020-3"
      },
      {
        "name": "CDS 2 (2020) \u2014 English",
        "documentKey": "pyq-cds-2020-4"
      },
      {
        "name": "CDS 2 (2020) \u2014 General Knowledge",
        "documentKey": "pyq-cds-2020-5"
      },
      {
        "name": "CDS 2 (2020) \u2014 Mathematics",
        "documentKey": "pyq-cds-2020-6"
      }
    ]
  }
];
