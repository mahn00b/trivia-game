// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
    getQuizReport,
    setQuizReport,
} from '../../data';
import { validateAnswer } from '../../utils';

interface AnswerValidationRequest {
  question: Question;
  answer: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ report:QuizReport } | string>
) {
  const report = getQuizReport(req);

  if (!report) {
    return res.status(404).send('No session found');
  }

  if (report.answeredQuestions === report.totalQuestions) {
    return res.status(422).send('All questions answered');
  }

  const { question, answer } = req.body as AnswerValidationRequest;

  const { difficulty } = question;
  const isCorrect = validateAnswer(question, answer);

  report.answeredQuestions++;

  if (isCorrect)
    report.answers[difficulty].correct++;
  else
    report.answers[difficulty].incorrect++;

    report.answers[difficulty].unanswered--;

    setQuizReport(res, report);

  res.status(200).json({ report });
}
