export default {
  sessionId: "testId",
  totalQuestions: 15,
  answeredQuestions: 13,
  answers: {
    easy: {
      correct: 5,
      incorrect: 0,
      unanswered: 0
    },
    medium: {
      correct: 4,
      incorrect: 1,
      unanswered: 0
    },
    hard: {
      correct: 2,
      incorrect: 1,
      unanswered: 2
    }
  },
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime()
} as QuizReport;
