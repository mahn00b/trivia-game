import type { NextApiRequest, NextApiResponse } from 'next';
import { tallyQuestions } from '../../utils';
import {
    getQuizReport,
    setQuizReport,
    requestNewSessionToken,
    getNewQuestions
} from '../../data';

interface NewQuizResponse {
  sessionId: string,
  questions: Question[],
  report: QuizReport,
}

function generateQuizReport(sessionId: string, initialQuestions: Question[]): QuizReport {
  const timeStamp = new Date().getTime();

  const [numEasy, numMedium, numHard] = tallyQuestions(initialQuestions);

  return {
    sessionId,
    totalQuestions: initialQuestions.length,
    answeredQuestions: 0,
    answers: {
      easy: {
        correct: 0,
        incorrect: 0,
        unanswered: numEasy,
        total: numEasy,
      },
      medium:  {
        correct: 0,
        incorrect: 0,
        unanswered: numMedium,
        total: numMedium,
      },
      hard:  {
        correct: 0,
        incorrect: 0,
        unanswered: numHard,
        total: numHard,
      }
    },
    createdAt: timeStamp,
    updatedAt: timeStamp
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewQuizResponse | string>
) {
  let report = getQuizReport(req);

  const token = await requestNewSessionToken();

  const questions = await getNewQuestions(token, req.query);

  report = generateQuizReport(token, questions);

  setQuizReport(res, report);

  res.status(200).json({
    sessionId: token,
    questions,
    report,
  });
}
