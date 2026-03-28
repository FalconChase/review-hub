// ─── Subjects / Courses ───────────────────────────────────────────────────────
export const subjects = [
  {
    id: 'subject-1',
    title: 'General Education',
    description: 'Core academic competencies across mathematics, science, and language.',
    icon: 'BookOpen',
    color: 'indigo',
    topicCount: 8,
    quizCount: 24,
  },
  {
    id: 'subject-2',
    title: 'Professional Education',
    description: 'Principles of teaching, curriculum design, and classroom management.',
    icon: 'GraduationCap',
    color: 'violet',
    topicCount: 10,
    quizCount: 30,
  },
  {
    id: 'subject-3',
    title: 'Specialization',
    description: 'In-depth subject matter expertise for your chosen teaching field.',
    icon: 'Layers',
    color: 'cyan',
    topicCount: 12,
    quizCount: 36,
  },
]

// ─── Topics ───────────────────────────────────────────────────────────────────
export const topics = [
  {
    id: 'topic-1',
    subjectId: 'subject-1',
    title: 'Number Theory & Algebra',
    description: 'Integers, rational numbers, polynomials, and algebraic expressions.',
    questionCount: 40,
    difficulty: 'Medium',
  },
  {
    id: 'topic-2',
    subjectId: 'subject-1',
    title: 'Reading Comprehension',
    description: 'Inferencing, main idea, vocabulary in context, and critical reading.',
    questionCount: 35,
    difficulty: 'Easy',
  },
  {
    id: 'topic-3',
    subjectId: 'subject-2',
    title: 'Principles of Teaching',
    description: 'Instructional methods, lesson planning, and learner-centered approaches.',
    questionCount: 50,
    difficulty: 'Medium',
  },
  {
    id: 'topic-4',
    subjectId: 'subject-2',
    title: 'Child and Adolescent Development',
    description: 'Developmental stages, learning theories, and individual differences.',
    questionCount: 45,
    difficulty: 'Hard',
  },
]

// ─── Sample Quiz Questions ────────────────────────────────────────────────────
export const questions = [
  {
    id: 'q-1',
    topicId: 'topic-1',
    type: 'multiple-choice',
    difficulty: 'Medium',
    stem: 'Which of the following is a prime number?',
    choices: [
      { id: 'a', text: '1' },
      { id: 'b', text: '9' },
      { id: 'c', text: '13' },
      { id: 'd', text: '21' },
    ],
    correctAnswer: 'c',
    explanation:
      '13 is divisible only by 1 and itself, making it prime. 1 is not prime by definition; 9 = 3×3; 21 = 3×7.',
  },
  {
    id: 'q-2',
    topicId: 'topic-1',
    type: 'multiple-choice',
    difficulty: 'Easy',
    stem: 'What is the value of x in the equation 2x + 6 = 14?',
    choices: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '10' },
    ],
    correctAnswer: 'b',
    explanation: '2x = 14 − 6 = 8, so x = 4.',
  },
  {
    id: 'q-3',
    topicId: 'topic-3',
    type: 'multiple-choice',
    difficulty: 'Medium',
    stem: 'Which teaching strategy BEST promotes higher-order thinking skills?',
    choices: [
      { id: 'a', text: 'Rote memorization drills' },
      { id: 'b', text: 'Socratic questioning and guided inquiry' },
      { id: 'c', text: 'Copying notes from the board' },
      { id: 'd', text: 'Silent independent seatwork' },
    ],
    correctAnswer: 'b',
    explanation:
      'Socratic questioning challenges students to analyze, evaluate, and synthesize — hallmarks of higher-order thinking in Bloom\'s Taxonomy.',
  },
  {
    id: 'q-4',
    topicId: 'topic-4',
    type: 'multiple-choice',
    difficulty: 'Hard',
    stem: "According to Vygotsky's sociocultural theory, learning is most effective when:",
    choices: [
      { id: 'a', text: 'Students work alone without any assistance.' },
      { id: 'b', text: 'Tasks are within the Zone of Proximal Development with guided support.' },
      { id: 'c', text: 'The teacher lectures while students listen passively.' },
      { id: 'd', text: 'Content is broken into the smallest possible units.' },
    ],
    correctAnswer: 'b',
    explanation:
      "Vygotsky's ZPD describes tasks a learner can perform with guidance but not yet independently — the sweet spot for scaffolded learning.",
  },
]

// ─── Mock User Progress ───────────────────────────────────────────────────────
export const userProgress = {
  userId: 'user-demo',
  displayName: 'Juan dela Cruz',
  overallScore: 72,
  quizzesCompleted: 14,
  quizzesTotal: 90,
  topicProgress: {
    'topic-1': { completed: 20, total: 40, lastScore: 80 },
    'topic-2': { completed: 10, total: 35, lastScore: 65 },
    'topic-3': { completed: 15, total: 50, lastScore: 70 },
    'topic-4': { completed: 5,  total: 45, lastScore: 55 },
  },
  recentActivity: [
    { date: '2026-03-27', topicId: 'topic-1', score: 80, questionsAttempted: 10 },
    { date: '2026-03-25', topicId: 'topic-3', score: 70, questionsAttempted: 10 },
    { date: '2026-03-22', topicId: 'topic-2', score: 65, questionsAttempted: 10 },
  ],
}