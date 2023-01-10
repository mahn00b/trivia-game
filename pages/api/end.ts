// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
    getQuizReport,
    deleteQuizReport,
    endSession,
} from '../../data'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizReport | string>
) {
  const report = getQuizReport(req);

  if (!report) {
    return res.status(404).send('No session found');
  }

  deleteQuizReport(res);
  await endSession(report.sessionId);

  res.status(200).json(report);
}
