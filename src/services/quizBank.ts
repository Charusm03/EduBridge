import { Question } from '@/types/types';

const allQuestions: Question[] = [
  // MATHEMATICS
  // Class 6-8
  {
    id: 101, question: "What is the square root of 144?", options: ["10", "11", "12", "14"],
    correctAnswer: 2, explanation: "12 × 12 = 144, so the square root of 144 is 12.",
    subject: "Mathematics", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 102, question: "What is the value of π (pi) approximately?", options: ["3.14", "2.71", "1.61", "3.41"],
    correctAnswer: 0, explanation: "Pi (π) is approximately 3.14159..., commonly rounded to 3.14.",
    subject: "Mathematics", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 103, question: "If a triangle has angles 60° and 70°, what is the third angle?", options: ["40°", "50°", "60°", "70°"],
    correctAnswer: 1, explanation: "The sum of angles in a triangle is 180°. 180 - 60 - 70 = 50°.",
    subject: "Mathematics", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 104, question: "What is the LCM of 12 and 18?", options: ["24", "36", "48", "72"],
    correctAnswer: 1, explanation: "The Least Common Multiple of 12 and 18 is 36.",
    subject: "Mathematics", gradeLevel: ["Class 6-8"], difficulty: "Medium"
  },
  {
    id: 105, question: "What is 25% of 200?", options: ["25", "50", "75", "100"],
    correctAnswer: 1, explanation: "25% of 200 = 0.25 × 200 = 50.",
    subject: "Mathematics", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 106, question: "Solve for x: 2x + 5 = 15", options: ["4", "5", "6", "10"],
    correctAnswer: 1, explanation: "2x = 15 - 5 = 10, so x = 5.",
    subject: "Mathematics", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  // Class 9-10
  {
    id: 107, question: "What is the sum of the first 10 natural numbers?", options: ["45", "50", "55", "60"],
    correctAnswer: 2, explanation: "Using the formula n(n+1)/2: 10×11/2 = 55.",
    subject: "Mathematics", gradeLevel: ["Class 9-10"], difficulty: "Medium"
  },
  {
    id: 108, question: "If the discriminant (b² - 4ac) of a quadratic equation is zero, the roots are:", options: ["Real and distinct", "Real and equal", "Imaginary", "Rational"],
    correctAnswer: 1, explanation: "When discriminant = 0, the quadratic has two real and equal roots.",
    subject: "Mathematics", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Medium"
  },
  {
    id: 109, question: "In a right triangle, if sin θ = 3/5, what is cos θ?", options: ["3/5", "4/5", "5/4", "5/3"],
    correctAnswer: 1, explanation: "Using sin²θ + cos²θ = 1, cos θ = √(1 - 9/25) = √(16/25) = 4/5.",
    subject: "Mathematics", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Hard"
  },
  {
    id: 110, question: "What is the formula for the nth term of an arithmetic progression?", options: ["a + (n-1)d", "a + nd", "arⁿ⁻¹", "a - nd"],
    correctAnswer: 0, explanation: "The nth term of an AP is a + (n-1)d, where a is the first term and d is the common difference.",
    subject: "Mathematics", gradeLevel: ["Class 9-10"], difficulty: "Medium"
  },
  // Class 11-12
  {
    id: 111, question: "What is the derivative of sin(x)?", options: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"],
    correctAnswer: 0, explanation: "d/dx[sin(x)] = cos(x).",
    subject: "Mathematics", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  {
    id: 112, question: "The integral of 1/x dx is:", options: ["x²/2", "ln|x|", "eˣ", "1/x²"],
    correctAnswer: 1, explanation: "∫(1/x)dx = ln|x| + C.",
    subject: "Mathematics", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  {
    id: 113, question: "What is the value of i² (where i is the imaginary unit)?", options: ["1", "-1", "i", "-i"],
    correctAnswer: 1, explanation: "By definition, i = √(-1), so i² = -1.",
    subject: "Mathematics", gradeLevel: ["Class 11-12"], difficulty: "Easy"
  },
  {
    id: 114, question: "A matrix with only one row is called a:", options: ["Column matrix", "Row matrix", "Square matrix", "Diagonal matrix"],
    correctAnswer: 1, explanation: "A matrix with a single row is called a row matrix or row vector.",
    subject: "Mathematics", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },
  // Undergraduate
  {
    id: 115, question: "What does the rank of a matrix represent?", options: ["Number of rows", "Number of columns", "Maximum number of linearly independent rows/columns", "Determinant value"],
    correctAnswer: 2, explanation: "The rank of a matrix is the maximum number of linearly independent row or column vectors.",
    subject: "Mathematics", gradeLevel: ["Undergraduate"], difficulty: "Medium"
  },
  {
    id: 116, question: "In probability, if P(A) = 0.6 and P(B) = 0.5, and A and B are independent, what is P(A ∩ B)?", options: ["0.1", "0.3", "0.5", "1.1"],
    correctAnswer: 1, explanation: "For independent events, P(A ∩ B) = P(A) × P(B) = 0.6 × 0.5 = 0.3.",
    subject: "Mathematics", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },

  // PHYSICS
  // Class 6-8
  {
    id: 201, question: "Which of these is a good conductor of electricity?", options: ["Rubber", "Wood", "Copper", "Plastic"],
    correctAnswer: 2, explanation: "Copper is a metal and an excellent conductor of electricity.",
    subject: "Physics", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 202, question: "What is the SI unit of force?", options: ["Watt", "Newton", "Joule", "Pascal"],
    correctAnswer: 1, explanation: "The Newton (N) is the SI unit of force.",
    subject: "Physics", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 203, question: "Light travels fastest in:", options: ["Water", "Glass", "Air (vacuum)", "Diamond"],
    correctAnswer: 2, explanation: "Light travels fastest in a vacuum (approximately 3×10⁸ m/s).",
    subject: "Physics", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 204, question: "Which color of light has the longest wavelength?", options: ["Blue", "Green", "Red", "Violet"],
    correctAnswer: 2, explanation: "Red light has the longest wavelength in the visible spectrum.",
    subject: "Physics", gradeLevel: ["Class 9-10"], difficulty: "Medium"
  },
  // Class 9-10
  {
    id: 205, question: "According to Newton's Third Law, forces always occur in:", options: ["Singles", "Pairs", "Triples", "Groups of four"],
    correctAnswer: 1, explanation: "Newton's Third Law: For every action, there is an equal and opposite reaction. Forces occur in pairs.",
    subject: "Physics", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 206, question: "What is the formula for kinetic energy?", options: ["mgh", "½mv²", "mv", "F × d"],
    correctAnswer: 1, explanation: "Kinetic Energy = ½mv², where m is mass and v is velocity.",
    subject: "Physics", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 207, question: "The refractive index of a medium is the ratio of:", options: ["Speed of light in medium to speed in vacuum", "Speed in vacuum to speed in medium", "Wavelength in medium to wavelength in vacuum", "Frequency in vacuum to frequency in medium"],
    correctAnswer: 1, explanation: "Refractive index n = c/v, where c is speed in vacuum and v is speed in the medium.",
    subject: "Physics", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Medium"
  },
  // Class 11-12
  {
    id: 208, question: "What is the de Broglie wavelength of a particle?", options: ["λ = h/mv", "λ = mc²", "λ = v/f", "λ = E/h"],
    correctAnswer: 0, explanation: "De Broglie wavelength λ = h/p = h/(mv), where h is Planck's constant.",
    subject: "Physics", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Hard"
  },
  {
    id: 209, question: "In a simple harmonic motion, acceleration is proportional to:", options: ["Velocity", "Displacement", "Time", "Amplitude squared"],
    correctAnswer: 1, explanation: "In SHM, a = -ω²x, so acceleration is proportional to displacement and directed toward the mean position.",
    subject: "Physics", gradeLevel: ["Class 11-12"], difficulty: "Medium"
  },
  {
    id: 210, question: "The escape velocity from Earth is approximately:", options: ["7.9 km/s", "11.2 km/s", "3 × 10⁸ m/s", "340 m/s"],
    correctAnswer: 1, explanation: "The escape velocity from Earth's surface is approximately 11.2 km/s.",
    subject: "Physics", gradeLevel: ["Class 11-12"], difficulty: "Medium"
  },
  {
    id: 211, question: "According to the laws of thermodynamics, energy cannot be:", options: ["Created or destroyed", "Transferred", "Converted", "Measured"],
    correctAnswer: 0, explanation: "The First Law of Thermodynamics states that energy can neither be created nor destroyed, only transferred or converted.",
    subject: "Physics", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },
  // Undergraduate
  {
    id: 212, question: "Schrödinger's wave equation describes:", options: ["Classical particles", "Quantum mechanical systems", "Thermal radiation", "Electromagnetic waves"],
    correctAnswer: 1, explanation: "Schrödinger's equation describes how the quantum state of a physical system changes over time.",
    subject: "Physics", gradeLevel: ["Undergraduate"], difficulty: "Hard"
  },
  {
    id: 213, question: "Maxwell's equations describe:", options: ["Gravitational fields", "Nuclear forces", "Electromagnetic fields", "Fluid dynamics"],
    correctAnswer: 2, explanation: "Maxwell's equations are a set of four equations that form the foundation of classical electromagnetism.",
    subject: "Physics", gradeLevel: ["Undergraduate"], difficulty: "Medium"
  },

  // CHEMISTRY
  // Class 6-8
  {
    id: 301, question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Silver", "Oxygen", "Iron"],
    correctAnswer: 2, explanation: "The chemical symbol for Oxygen is 'O'.",
    subject: "Chemistry", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 302, question: "What is the pH of pure water?", options: ["0", "7", "14", "1"],
    correctAnswer: 1, explanation: "Pure water is neutral with a pH of 7 at 25°C.",
    subject: "Chemistry", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 303, question: "Which gas is essential for respiration?", options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
    correctAnswer: 2, explanation: "Oxygen (O₂) is essential for aerobic respiration in most living organisms.",
    subject: "Chemistry", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  // Class 9-10
  {
    id: 304, question: "What is the molecular formula of glucose?", options: ["C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "CH₄", "C₂H₅OH"],
    correctAnswer: 0, explanation: "Glucose is a simple sugar with the molecular formula C₆H₁₂O₆.",
    subject: "Chemistry", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 305, question: "In the periodic table, elements are arranged by:", options: ["Atomic mass", "Atomic number", "Alphabetical order", "Color"],
    correctAnswer: 1, explanation: "The modern periodic table arranges elements by increasing atomic number (number of protons).",
    subject: "Chemistry", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 306, question: "Which type of bond involves the sharing of electron pairs?", options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
    correctAnswer: 1, explanation: "A covalent bond involves the sharing of electron pairs between atoms.",
    subject: "Chemistry", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 307, question: "What is Avogadro's number?", options: ["6.022 × 10²³", "3.14", "9.8", "2.718"],
    correctAnswer: 0, explanation: "Avogadro's number is 6.022 × 10²³, representing the number of particles in one mole.",
    subject: "Chemistry", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  // Class 11-12
  {
    id: 308, question: "In an electrolytic cell, oxidation occurs at the:", options: ["Cathode", "Anode", "Salt bridge", "Electrode"],
    correctAnswer: 1, explanation: "In an electrolytic cell, oxidation occurs at the anode and reduction at the cathode.",
    subject: "Chemistry", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  {
    id: 309, question: "The rate of a chemical reaction generally increases with temperature because:", options: ["Molecules move slower", "Activation energy decreases", "More molecules have energy ≥ activation energy", "Pressure increases"],
    correctAnswer: 2, explanation: "Higher temperature means more molecules possess kinetic energy equal to or greater than the activation energy.",
    subject: "Chemistry", gradeLevel: ["Class 11-12"], difficulty: "Medium"
  },
  {
    id: 310, question: "Benzene has the formula C₆H₆. What type of bonds does it contain?", options: ["Only single bonds", "Only double bonds", "Alternating single and double bonds (resonance)", "Triple bonds"],
    correctAnswer: 2, explanation: "Benzene has a delocalized π-electron system with resonance between alternating single and double bonds.",
    subject: "Chemistry", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  // Undergraduate
  {
    id: 311, question: "What is the hybridization of carbon in methane (CH₄)?", options: ["sp", "sp²", "sp³", "dsp²"],
    correctAnswer: 2, explanation: "Carbon in methane is sp³ hybridized, forming four equivalent tetrahedral bonds.",
    subject: "Chemistry", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  {
    id: 312, question: "In the titration of a strong acid with a strong base, the equivalence point pH is:", options: ["Less than 7", "Equal to 7", "Greater than 7", "Depends on concentration"],
    correctAnswer: 1, explanation: "For strong acid-strong base titrations, the equivalence point occurs at pH = 7.",
    subject: "Chemistry", gradeLevel: ["Undergraduate"], difficulty: "Medium"
  },

  // BIOLOGY
  // Class 6-8
  {
    id: 401, question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    correctAnswer: 1, explanation: "Mitochondria are known as the powerhouse of the cell because they produce ATP through cellular respiration.",
    subject: "Biology", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 402, question: "Which blood cells help fight infections?", options: ["Red blood cells", "White blood cells", "Platelets", "Plasma cells"],
    correctAnswer: 1, explanation: "White blood cells (leukocytes) are the immune system's primary defense against infections.",
    subject: "Biology", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 403, question: "Photosynthesis occurs in which part of a plant cell?", options: ["Nucleus", "Mitochondria", "Chloroplast", "Vacuole"],
    correctAnswer: 2, explanation: "Photosynthesis takes place in the chloroplasts, which contain chlorophyll.",
    subject: "Biology", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 404, question: "What is the largest organ in the human body?", options: ["Liver", "Brain", "Skin", "Heart"],
    correctAnswer: 2, explanation: "The skin is the largest organ of the human body by surface area and weight.",
    subject: "Biology", gradeLevel: ["Class 6-8"], difficulty: "Easy"
  },
  // Class 9-10
  {
    id: 405, question: "Which process produces gametes?", options: ["Mitosis", "Meiosis", "Binary fission", "Budding"],
    correctAnswer: 1, explanation: "Meiosis is the type of cell division that produces gametes (sperm and egg cells) with half the chromosome number.",
    subject: "Biology", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 406, question: "DNA replication is described as semi-conservative because:", options: ["Only one strand is copied", "Each new DNA has one old and one new strand", "It happens in the cytoplasm", "It requires RNA primers only"],
    correctAnswer: 1, explanation: "In semi-conservative replication, each new DNA molecule contains one original (parental) strand and one newly synthesized strand.",
    subject: "Biology", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Medium"
  },
  {
    id: 407, question: "The functional unit of the kidney is the:", options: ["Neuron", "Nephron", "Alveolus", "Villus"],
    correctAnswer: 1, explanation: "The nephron is the structural and functional unit of the kidney responsible for filtering blood.",
    subject: "Biology", gradeLevel: ["Class 9-10"], difficulty: "Medium"
  },
  // Class 11-12
  {
    id: 408, question: "Which enzyme joins Okazaki fragments during DNA replication?", options: ["Helicase", "DNA ligase", "DNA polymerase", "Primase"],
    correctAnswer: 1, explanation: "DNA ligase joins the discontinuous Okazaki fragments on the lagging strand.",
    subject: "Biology", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Hard"
  },
  {
    id: 409, question: "In the lac operon, the repressor protein binds to the:", options: ["Promoter", "Operator", "Structural genes", "CAP site"],
    correctAnswer: 1, explanation: "The lac repressor binds to the operator region to block transcription of the structural genes.",
    subject: "Biology", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Hard"
  },
  {
    id: 410, question: "Which kingdom includes organisms that are both autotrophic and heterotrophic?", options: ["Plantae", "Animalia", "Fungi", "Protista"],
    correctAnswer: 3, explanation: "Protista includes diverse organisms; some like Euglena are both autotrophic (photosynthetic) and heterotrophic.",
    subject: "Biology", gradeLevel: ["Class 11-12"], difficulty: "Medium"
  },
  // Undergraduate
  {
    id: 411, question: "In the Calvin cycle, CO₂ is fixed by which enzyme?", options: ["PEP carboxylase", "Rubisco", "Nitrogenase", "ATP synthase"],
    correctAnswer: 1, explanation: "RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase) catalyzes the first major step of carbon fixation.",
    subject: "Biology", gradeLevel: ["Undergraduate"], difficulty: "Hard"
  },
  {
    id: 412, question: "The central dogma of molecular biology describes:", options: ["DNA → RNA → Protein", "Protein → RNA → DNA", "RNA → DNA → Protein", "DNA → Protein → RNA"],
    correctAnswer: 0, explanation: "The central dogma describes the flow of genetic information: DNA is transcribed to RNA, which is translated to protein.",
    subject: "Biology", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },

  // HISTORY
  // Class 6-8
  {
    id: 501, question: "Who was the first Emperor of unified China?", options: ["Liu Bang", "Qin Shi Huang", "Kublai Khan", "Sun Yat-sen"],
    correctAnswer: 1, explanation: "Qin Shi Huang was the first emperor to unify China in 221 BCE.",
    subject: "History", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 502, question: "The Great Pyramid of Giza was built for which pharaoh?", options: ["Tutankhamun", "Khufu", "Ramses II", "Cleopatra"],
    correctAnswer: 1, explanation: "The Great Pyramid was built as a tomb for Pharaoh Khufu (Cheops) around 2560 BCE.",
    subject: "History", gradeLevel: ["Class 6-8"], difficulty: "Medium"
  },
  // Class 9-10
  {
    id: 503, question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1, explanation: "Romeo and Juliet is a tragedy written by William Shakespeare early in his career around 1597.",
    subject: "History", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 504, question: "The French Revolution began in which year?", options: ["1776", "1789", "1804", "1815"],
    correctAnswer: 1, explanation: "The French Revolution began in 1789 with the storming of the Bastille on July 14.",
    subject: "History", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 505, question: "The Industrial Revolution began in which country?", options: ["United States", "France", "Great Britain", "Germany"],
    correctAnswer: 2, explanation: "The Industrial Revolution began in Great Britain in the late 18th century.",
    subject: "History", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 506, question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
    correctAnswer: 2, explanation: "George Washington was the first President of the United States (1789-1797).",
    subject: "History", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  // Class 11-12
  {
    id: 507, question: "The Treaty of Versailles (1919) officially ended:", options: ["World War I", "World War II", "The Cold War", "The Napoleonic Wars"],
    correctAnswer: 0, explanation: "The Treaty of Versailles officially ended World War I between Germany and the Allied Powers.",
    subject: "History", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },
  {
    id: 508, question: "The Non-Aligned Movement was formally established in:", options: ["1947", "1955", "1961", "1971"],
    correctAnswer: 2, explanation: "The Non-Aligned Movement was formally established in 1961 in Belgrade, Yugoslavia.",
    subject: "History", gradeLevel: ["Class 11-12"], difficulty: "Medium"
  },
  {
    id: 509, question: "The Cold War was primarily between which two powers?", options: ["USA and Germany", "USA and USSR", "UK and France", "China and Japan"],
    correctAnswer: 1, explanation: "The Cold War was a period of geopolitical tension between the United States and the Soviet Union.",
    subject: "History", gradeLevel: ["Class 11-12"], difficulty: "Easy"
  },
  // Undergraduate
  {
    id: 510, question: "The Berlin Conference of 1884-85 was primarily about:", options: ["Ending World War I", "Regulating European colonization of Africa", "Forming the European Union", "The slave trade abolition"],
    correctAnswer: 1, explanation: "The Berlin Conference regulated European colonization and trade in Africa during the New Imperialism period.",
    subject: "History", gradeLevel: ["Undergraduate"], difficulty: "Medium"
  },

  // GEOGRAPHY
  // Class 6-8
  {
    id: 601, question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: 1, explanation: "The Nile River in Africa is traditionally considered the longest river at about 6,650 km.",
    subject: "Geography", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 602, question: "Which continent is the largest by area?", options: ["Africa", "North America", "Asia", "Europe"],
    correctAnswer: 2, explanation: "Asia is the largest continent, covering about 30% of Earth's total land area.",
    subject: "Geography", gradeLevel: ["Class 6-8"], difficulty: "Easy"
  },
  {
    id: 603, question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: 2, explanation: "Canberra is the capital city of Australia, chosen as a compromise between Sydney and Melbourne.",
    subject: "Geography", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  // Class 9-10
  {
    id: 604, question: "The Himalayas were formed by the collision of which two tectonic plates?", options: ["African and Eurasian", "Indian and Eurasian", "Pacific and North American", "Antarctic and South American"],
    correctAnswer: 1, explanation: "The Himalayas were formed by the collision of the Indian Plate and the Eurasian Plate.",
    subject: "Geography", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Medium"
  },
  {
    id: 605, question: "Which type of rainfall occurs when warm air is forced to rise over a mountain?", options: ["Convectional", "Cyclonic", "Orographic", "Frontal"],
    correctAnswer: 2, explanation: "Orographic rainfall occurs when an air mass is forced to rise over a mountain range, cooling and condensing.",
    subject: "Geography", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Medium"
  },
  {
    id: 606, question: "The Tropic of Cancer passes through how many continents?", options: ["2", "3", "4", "5"],
    correctAnswer: 1, explanation: "The Tropic of Cancer passes through North America, Africa, and Asia — 3 continents.",
    subject: "Geography", gradeLevel: ["Class 9-10"], difficulty: "Medium"
  },
  // Class 11-12
  {
    id: 607, question: "Monsoons in India are caused primarily by:", options: ["Temperature difference between land and sea", "Earth's rotation", "Solar flares", "Ocean currents"],
    correctAnswer: 0, explanation: "The Indian monsoon is driven by the differential heating of land and sea, creating seasonal wind reversals.",
    subject: "Geography", gradeLevel: ["Class 11-12"], difficulty: "Medium"
  },
  {
    id: 608, question: "Which projection preserves area but distorts shape?", options: ["Mercator", "Cylindrical", "Equal-area (Mollweide)", "Conic"],
    correctAnswer: 2, explanation: "Equal-area projections like Mollweide preserve area relationships but distort shapes, especially near the poles.",
    subject: "Geography", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Hard"
  },
  // Undergraduate
  {
    id: 609, question: "El Niño is associated with warming of which ocean?", options: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctAnswer: 2, explanation: "El Niño is the warm phase of the El Niño-Southern Oscillation (ENSO) and is associated with warming of the central and eastern tropical Pacific Ocean.",
    subject: "Geography", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },

  // ENGLISH / LITERATURE
  // Class 6-8
  {
    id: 701, question: "Which figure of speech compares two unlike things using 'like' or 'as'?", options: ["Metaphor", "Simile", "Personification", "Hyperbole"],
    correctAnswer: 1, explanation: "A simile explicitly compares two things using 'like' or 'as' (e.g., 'as brave as a lion').",
    subject: "English", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 702, question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childen"],
    correctAnswer: 1, explanation: "'Children' is the irregular plural form of 'child'.",
    subject: "English", gradeLevel: ["Class 6-8"], difficulty: "Easy"
  },
  // Class 9-10
  {
    id: 703, question: "In grammar, a sentence that makes a statement is called:", options: ["Interrogative", "Imperative", "Declarative", "Exclamatory"],
    correctAnswer: 2, explanation: "A declarative sentence makes a statement and ends with a period.",
    subject: "English", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 704, question: "What is the past participle of the verb 'write'?", options: ["Writed", "Wrote", "Written", "Writing"],
    correctAnswer: 2, explanation: "The past participle of 'write' is 'written' (e.g., 'has written').",
    subject: "English", gradeLevel: ["Class 9-10"], difficulty: "Easy"
  },
  {
    id: 705, question: "'To be or not to be' is a famous soliloquy from which play?", options: ["Macbeth", "Hamlet", "Othello", "King Lear"],
    correctAnswer: 1, explanation: "This is Hamlet's famous soliloquy from Act 3, Scene 1 of Shakespeare's Hamlet.",
    subject: "English", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  // Class 11-12
  {
    id: 706, question: "Which literary device uses words that imitate natural sounds?", options: ["Alliteration", "Onomatopoeia", "Assonance", "Consonance"],
    correctAnswer: 1, explanation: "Onomatopoeia refers to words that phonetically imitate the sound they describe (e.g., 'buzz', 'hiss').",
    subject: "English", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 707, question: "In '1984' by George Orwell, what is the name of the totalitarian regime's leader?", options: ["Big Brother", "The Party", "O'Brien", "Goldstein"],
    correctAnswer: 0, explanation: "'Big Brother' is the symbolic leader of the totalitarian regime in Orwell's dystopian novel.",
    subject: "English", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  {
    id: 708, question: "Which literary movement emphasized emotion, nature, and individualism?", options: ["Classicism", "Romanticism", "Realism", "Modernism"],
    correctAnswer: 1, explanation: "Romanticism emphasized emotion, imagination, nature, and individual expression over reason and industrialization.",
    subject: "English", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },

  // COMPUTER SCIENCE
  // Class 6-8
  {
    id: 801, question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Central Program Unit"],
    correctAnswer: 0, explanation: "CPU stands for Central Processing Unit, the primary component that performs most of the processing.",
    subject: "Computer Science", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 802, question: "Which device is used to input data into a computer?", options: ["Monitor", "Printer", "Keyboard", "Speaker"],
    correctAnswer: 2, explanation: "A keyboard is an input device used to enter text and commands into a computer.",
    subject: "Computer Science", gradeLevel: ["Class 6-8"], difficulty: "Easy"
  },
  // Class 9-10
  {
    id: 803, question: "What is the binary equivalent of decimal 5?", options: ["100", "101", "110", "111"],
    correctAnswer: 1, explanation: "5 in decimal is 101 in binary (4 + 0 + 1).",
    subject: "Computer Science", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 804, question: "Which sorting algorithm has the best average-case time complexity?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correctAnswer: 2, explanation: "Merge Sort has O(n log n) average-case time complexity, which is optimal for comparison-based sorting.",
    subject: "Computer Science", gradeLevel: ["Class 9-10", "Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  {
    id: 805, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correctAnswer: 0, explanation: "HTML stands for Hyper Text Markup Language, used for creating web pages.",
    subject: "Computer Science", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  // Class 11-12
  {
    id: 806, question: "In object-oriented programming, inheritance allows a class to:", options: ["Hide data", "Acquire properties of another class", "Create objects", "Compile faster"],
    correctAnswer: 1, explanation: "Inheritance allows a derived class to acquire the properties and methods of a base class.",
    subject: "Computer Science", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },
  {
    id: 807, question: "What is the time complexity of searching in a balanced Binary Search Tree?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 1, explanation: "In a balanced BST, search takes O(log n) time as half the tree is eliminated at each step.",
    subject: "Computer Science", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  {
    id: 808, question: "TCP/IP stands for:", options: ["Transfer Control Protocol / Internet Protocol", "Transmission Control Protocol / Internet Protocol", "Technical Control Protocol / Information Protocol", "Text Control Protocol / Internet Protocol"],
    correctAnswer: 1, explanation: "TCP/IP stands for Transmission Control Protocol / Internet Protocol, the fundamental suite for internet communication.",
    subject: "Computer Science", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },
  // Undergraduate
  {
    id: 809, question: "In a relational database, what ensures that each row is uniquely identified?", options: ["Foreign key", "Primary key", "Index", "Constraint"],
    correctAnswer: 1, explanation: "A primary key uniquely identifies each record in a database table.",
    subject: "Computer Science", gradeLevel: ["Undergraduate"], difficulty: "Easy"
  },
  {
    id: 810, question: "Which data structure uses LIFO (Last In, First Out) principle?", options: ["Queue", "Stack", "Linked List", "Array"],
    correctAnswer: 1, explanation: "A Stack follows the LIFO principle where the last element added is the first one removed.",
    subject: "Computer Science", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },

  // ECONOMICS
  // Class 9-10
  {
    id: 901, question: "What does GDP stand for?", options: ["Gross Domestic Product", "General Domestic Production", "Gross Development Plan", "Global Domestic Price"],
    correctAnswer: 0, explanation: "GDP stands for Gross Domestic Product, the total monetary value of all goods and services produced in a country.",
    subject: "Economics", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  {
    id: 902, question: "Inflation refers to:", options: ["Increase in unemployment", "Increase in general price levels", "Decrease in money supply", "Increase in exports"],
    correctAnswer: 1, explanation: "Inflation is the rate at which the general level of prices for goods and services rises.",
    subject: "Economics", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
  // Class 11-12
  {
    id: 903, question: "The law of demand states that, ceteris paribus, as price increases:", options: ["Demand increases", "Demand decreases", "Supply decreases", "Income increases"],
    correctAnswer: 1, explanation: "The law of demand states that, all else being equal, as the price increases, quantity demanded decreases.",
    subject: "Economics", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },
  {
    id: 904, question: "In economics, 'opportunity cost' refers to:", options: ["The monetary cost of production", "The value of the next best alternative foregone", "The total cost of all resources", "The fixed cost of a business"],
    correctAnswer: 1, explanation: "Opportunity cost is the value of the next best alternative that must be given up when making a choice.",
    subject: "Economics", gradeLevel: ["Class 9-10", "Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  {
    id: 905, question: "Which market structure has many sellers offering identical products?", options: ["Monopoly", "Oligopoly", "Perfect Competition", "Monopolistic Competition"],
    correctAnswer: 2, explanation: "Perfect competition features many sellers, identical products, free entry and exit, and price-taking firms.",
    subject: "Economics", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Medium"
  },
  // Undergraduate
  {
    id: 906, question: "The Phillips Curve describes the relationship between:", options: ["Inflation and unemployment", "GDP and inflation", "Interest rates and investment", "Supply and demand"],
    correctAnswer: 0, explanation: "The Phillips Curve shows an inverse relationship between inflation and unemployment in the short run.",
    subject: "Economics", gradeLevel: ["Undergraduate"], difficulty: "Medium"
  },
  {
    id: 907, question: "Fiscal policy is conducted by:", options: ["Central Bank", "Government / Treasury", "Commercial Banks", "International Monetary Fund"],
    correctAnswer: 1, explanation: "Fiscal policy (taxation and government spending) is conducted by the government/treasury, not the central bank.",
    subject: "Economics", gradeLevel: ["Class 11-12", "Undergraduate"], difficulty: "Easy"
  },

  // GENERAL / OTHER (cross-subject general knowledge)
  {
    id: 1001, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1, explanation: "Mars is called the Red Planet due to iron oxide (rust) in its soil.",
    subject: "Other", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 1002, question: "How many bones does an adult human skeleton have?", options: ["186", "206", "216", "226"],
    correctAnswer: 1, explanation: "An adult human skeleton typically has 206 bones.",
    subject: "Other", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 1003, question: "Which gas makes up about 78% of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctAnswer: 2, explanation: "Nitrogen (N₂) makes up approximately 78% of Earth's atmosphere by volume.",
    subject: "Other", gradeLevel: ["Class 6-8", "Class 9-10"], difficulty: "Easy"
  },
  {
    id: 1004, question: "The speed of light in vacuum is approximately:", options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
    correctAnswer: 1, explanation: "The speed of light in a vacuum is approximately 299,792,458 m/s (~3 × 10⁸ m/s).",
    subject: "Other", gradeLevel: ["Class 9-10", "Class 11-12"], difficulty: "Easy"
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuiz(subject: string, grade: string, questionCount = 5): Question[] {
  // Filter by subject first
  let pool = allQuestions.filter(q => q.subject === subject);

  // If not enough questions for the exact subject, fallback to "Other" and general science
  if (pool.length < questionCount) {
    const fallback = allQuestions.filter(q => q.subject === "Other" || (subject !== "Other" && q.subject !== subject));
    pool = [...pool, ...fallback];
  }

  // Further filter by grade level if possible
  const gradeMatched = pool.filter(q => q.gradeLevel.includes(grade));
  if (gradeMatched.length >= questionCount) {
    pool = gradeMatched;
  }

  // Shuffle and pick required number
  const shuffled = shuffleArray(pool);
  const selected = shuffled.slice(0, questionCount);

  // Reassign sequential IDs for the quiz session
  return selected.map((q, idx) => ({
    ...q,
    id: idx + 1,
  }));
}

export function getAvailableSubjects(): string[] {
  const subjects = new Set(allQuestions.map(q => q.subject));
  return Array.from(subjects).sort();
}

export function getQuestionCountForSubject(subject: string, grade: string): number {
  return allQuestions.filter(q => q.subject === subject && q.gradeLevel.includes(grade)).length;
}
