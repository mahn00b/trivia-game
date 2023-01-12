// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
    getQuizReport,
    setQuizReport,
    getNewQuestions,
} from '../../data'
import { tallyQuestions } from '../../utils';
import { DIFFICULTY_LEVELS } from '../../constants';

declare interface NewQuestionsResponse {
  questions: Question[];
  report: QuizReport;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewQuestionsResponse | string>
) {
  const report = getQuizReport(req) as QuizReport;

  if (!report) {
    return res.status(404).send('No session found. Start a new session using /start');
  }

  const questions = await getNewQuestions(report.sessionId, req.query)

  const tally = tallyQuestions(questions);

  const numQuestions = {
    easy: tally[0],
    medium: tally[1],
    hard: tally[2]
  }

  DIFFICULTY_LEVELS.forEach((level) => {
    report.answers[level].total += numQuestions[level];
    report.answers[level].unanswered += numQuestions[level];
  })

  report.totalQuestions += questions.length;

  setQuizReport(res, report);

  res.status(200).json({
    questions,
    report
  });
}
